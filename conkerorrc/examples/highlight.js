function hl_get_editor (el) {
    try { // regular input boxes
        return el
            .QueryInterface(Ci.nsIDOMNSEditableElement)
            .editor;
    } catch (e) {}
    try { // XUL text boxes
        if (el.editor)
            return el.editor.QueryInterface(Ci.nsIEditor);
    } catch (e) {}
    try { // contenteditables
        var win = el.ownerDocument.defaultView;
        var ed = win.QueryInterface(Ci.nsIInterfaceRequestor)
            .getInterface(Ci.nsIWebNavigation)
            .QueryInterface(Ci.nsIInterfaceRequestor)
            .getInterface(Ci.nsIEditingSession);
        if (ed.windowIsEditable(win) &&
            (! el ||
             win.getComputedStyle(el, null)
             .getPropertyValue("-moz-user-modify") == "read-write"))
        {
            return ed.getEditorForWindow(win);
        }
    } catch (e) {}
    return null;
}

function hl_get_selection_controller (el) {
    var ed = hl_get_editor(el);
    if (ed)
        return ed.selectionController;
    return el.ownerDocument.defaultView
        .QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIWebNavigation)
        .QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsISelectionDisplay)
        .QueryInterface(Ci.nsISelectionController);
}


function save_excursion (selc, thunk) {
    var sel = selc.getSelection(Ci.nsISelectionController.SELECTION_NORMAL);
    var ranges = [];
    for (var i = 0; i < sel.rangeCount; ++i) {
        ranges.push(sel.getRangeAt(i).cloneRange());
    }
    try {
        thunk();
    } finally {
        sel.removeAllRanges();
        for (let [_, r] in Iterator(ranges)) {
            sel.addRange(r);
        }
    }
}

var highlight_syntaxes = {
    scheme: {
        whitespace: /^\s+/,
        line_comment: [";", /^(;.*)\s+/],
        string: ["\"", /^("[\s\S]*?([^\\](\\\\)+)?")/],
        keyword: /^(#?:\S+|[^(\s]+:)/,
        paren: ["(", null, ")"]
    }
};

function highlight_find_matching_syntax (syntax, text, start) {
    for (let [name, def] in Iterator(syntax)) {
        var terminal = null;
        if (def instanceof RegExp)
            var r = def;
        else {
            if (text.substr(start, def[0].length) != def[0])
                continue;
            r = def[1];
            terminal = def[2] || null;
        }
        var m = r ? r.exec(text.substr(start))
                  : { 0:def[0], 1:def[0] };
        if (m) {
            m.name = name.replace("_", "-", "g");
            if (terminal)
                m.terminal = terminal;
            return m;
        }
    }
    return null;
}

function highlight (node, syntax) {
    var doc = node.ownerDocument;
    var selc = hl_get_selection_controller(node);
    var syntax = highlight_syntaxes[syntax];
    var sel = selc.getSelection(Ci.nsISelectionController.SELECTION_NORMAL);
    sel.removeAllRanges();
    var r = doc.createRange();
    node.normalize();
    r.selectNodeContents(node.firstChild);
    sel.addRange(r);

    var text = r.toString();
    var len = text.length;
    var start = 0, rstart = 0;
    var container = r.startContainer;
    var terminals = [];
    while (start < len) {
        var m = null;
        if (terminals[0]) {
            let [term, ct, st, name] = terminals[0];
            if (text.substr(start, term.length) == term) {
                terminals.shift();
                m = { 0:term, 1:term, name:name,
                      start_container:ct, start_offset:st };
            }
        }
        m = m || highlight_find_matching_syntax(syntax, text, start);
        if (m) {
            if (m.terminal)
                terminals.unshift([m.terminal, container, rstart, m.name]);
            if (m[1]) {
                var span = doc.createElement("span");
                span.setAttribute("class", "conkeror-"+m.name);
                if (m.terminal)
                    dom_add_class(span, "conkeror-"+m.name+(terminals.length - 1));
                if (m.start_container) {
                    dom_add_class(span, "conkeror-"+m.name+terminals.length);
                    dom_add_class(span, "conkeror-"+m.name+"-terminal");
                }
                r.setStart(container, rstart);
                r.setEnd(container, rstart + m[1].length);
                r.surroundContents(span);
                container = span.nextSibling;
                start += m[0].length;
                rstart = m[0].length - m[1].length;
            } else {
                start += m[0].length;
                rstart += m[0].length;
            }
            if (m.start_container) { // item was a terminal, markup the block
                span = doc.createElement("span");
                span.setAttribute("class", "conkeror-"+m.name+"-block");
                dom_add_class(span, "conkeror-"+m.name+terminals.length+"-block");
                r.setStart(m.start_container, m.start_offset);
                r.setEnd(container, rstart);
                r.surroundContents(span);
                container = span.nextSibling;
            }
        } else
            start++, rstart++;
    }
    sel.removeAllRanges();
    node.normalize();
}

function unhighlight (node) {
    for (let [k] in Iterator(highlight_syntaxes)) {
        dom_remove_class(node, "conkeror-highlight-"+k);
    }
    var doc = node.ownerDocument;
    var r = doc.createRange();
    r.selectNodeContents(node);
    node.textContent = r.toString();
}

define_browser_object_class(
    "preformatted-code",
    null,
    xpath_browser_object_handler("//pre | //xhtml:pre"),
    $hint = "select code block");

interactive(
    "highlight-syntax",
    null,
    function (I) {
        var node = yield read_browser_object(I);
        var syntaxes = [k for ([k] in Iterator(highlight_syntaxes))];
        var syntax = yield I.minibuffer.read(
            $prompt = "Syntax",
            $history = "highlight-syntax",
            $completer = prefix_completer(
                $completions = syntaxes),
            $match_required,
            $auto_complete,
            $auto_complete_initial,
            $default_completion = syntaxes[0],
            $space_completes);
        unhighlight(node);
        dom_add_class(node, "conkeror-highlight-"+syntax);
        highlight(node, syntax);
    },
    $browser_object = browser_object_preformatted_code);

define_key(content_buffer_normal_keymap, "M-o M-o", "highlight-syntax");

register_user_stylesheet(
    make_css_data_uri(
        [".conkeror-highlight-scheme .conkeror-line-comment { color: firebrick; }",
         ".conkeror-highlight-scheme .conkeror-keyword { color: #ff4500; }",
         ".conkeror-highlight-scheme .conkeror-string { color: #666; }"],
        $namespace = XHTML_NS));
