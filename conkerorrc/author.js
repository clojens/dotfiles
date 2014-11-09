//in_module(null);

// Utils
//

function author_css_property_to_js_property (prop) {
    prop = prop.split("-");
    var s = prop[0];
    for (var i = 1, n = prop.length; i < n; ++i) {
        s += prop[i][0].toUpperCase() + prop[i].substring(1);
    }
    return s;
}

function author_append_separator (container) {
    var window = container.ownerDocument.defaultView;
    var sep = create_XUL(window, "toolbarseparator");
    container.appendChild(sep);
}

function author_wrap_element_align (window, element) {
    var al = create_XUL(window, "toolbaritem");
    al.setAttribute("align", "center");
    al.appendChild(element);
    return al;
}

function author_get_element (control) {
    var window = control.ownerDocument.defaultView;
    var panel = author_get_panel(window);
    try {
        if (! window.buffers.current._author.element)
            throw 1;
        var el = window.buffers.current._author.element
            .QueryReferent(Ci.nsIDOMHTMLElement);
    } catch (e) {
        panel.target.setAttribute("value", "null");
        window.minibuffer.message("No element selected");
        return null;
    }
    return el;
}

function author_get_property (control) {
    var window = control.ownerDocument.defaultView;
    var panel = author_get_panel(window);
    return panel.property.getAttribute("value");
}


// Controls
//

var author_controls = {
    colorpicker: function (window, container) {
        function handler (event) {
            var picker = event.target;
            var el = author_get_element(picker);
            if (! el)
                return;
            picker.label.setAttribute("value", picker.color);
            var prop = author_get_property(picker);
            el.style[author_css_property_to_js_property(prop)] = picker.color;
        }
        var cp = create_XUL(window, "colorpicker");
        cp.setAttribute("type", "button");
        cp.addEventListener("change", handler);
        cp.label = create_XUL(window, "label");
        cp.label.setAttribute("value", cp.color);
        container.appendChild(author_wrap_element_align(window, cp.label));
        container.appendChild(cp);
    },

    measure: function (window, container) {
        function handler (event) {
            var control = event.target;
            var el = author_get_element(control);
            if (! el)
                return;
            var prop = author_get_property(control);
            el.style[author_css_property_to_js_property(prop)] = control.value;
        }
        function spinclick (event) {
            var up = (event.originalTarget.className.indexOf("-up") > -1);
            var control = event.target.input;
            var el = author_get_element(control);
            if (! el)
                return;
            var prop = author_get_property(control);
            var m = control.value.match(/^(-?\d*)(.*)$/);
            if (m[1] && m[1] != "") {
                if (up)
                    control.value = (parseInt(m[1]) + 1) + m[2];
                else
                    control.value = (parseInt(m[1]) - 1) + m[2];
            }
            el.style[author_css_property_to_js_property(prop)] = control.value;
        }
        var control = create_XUL(window, "textbox");
        control.addEventListener("change", handler);
        var spin = create_XUL(window, "spinbuttons");
        spin.addEventListener("click", spinclick);
        spin.input = control;
        container.appendChild(control);
        container.appendChild(spin);
    },

    select: function (options) {
        function handler (event) {
            var ml = event.target;
            var el = author_get_element(ml);
            if (! el)
                return;
            var prop = author_get_property(ml);
            el.style[author_css_property_to_js_property(prop)] =
                ml.getAttribute("value");
        }
        return function (window, container) {
            var sel = create_XUL(window, "menulist");
            sel.addEventListener("command", handler);
            var p = create_XUL(window, "menupopup");
            sel.appendChild(p);
            for (var i = 0, o; o = options[i]; ++i) {
                var item = create_XUL(window, "menuitem");
                item.setAttribute("label", o);
                item.setAttribute("value", o);
                p.appendChild(item);
            }
            container.appendChild(sel);
        };
    }
};


var author_css_properties = {
    // "accelerator": [],
    // "azimuth": [],
    // "background": [],
    // "background-attachment": [],
    "background-color": ["colorpicker"],
    // "background-image": [],
    // "background-position": [],
    // "background-position-x": [],
    // "background-position-y": [],
    // "background-repeat": [],
    // "behavior": [],
    // "border": [],
    // "border-bottom": [],
    // "border-bottom-color": [],
    // "border-bottom-style": [],
    // "border-bottom-width": [],
    // "border-collapse": [],
    "border-color": ["colorpicker"],
    // "border-left": [],
    // "border-left-color": [],
    // "border-left-style": [],
    // "border-left-width": [],
    // "border-right": [],
    // "border-right-color": [],
    // "border-right-style": [],
    // "border-right-width": [],
    // "border-spacing": [],
    // "border-style": [],
    // "border-top": [],
    // "border-top-color": [],
    // "border-top-style": [],
    // "border-top-width": [],
    // "border-width": [],
    // "bottom": [],
    // "caption-side": [],
    "clear": [["select", ["inherit", "left", "right", "both", "none"]]],
    // "clip": [],
    "color": ["colorpicker"],
    // "content": [],
    // "counter-increment": [],
    // "counter-reset": [],
    // "cue": [],
    // "cue-after": [],
    // "cue-before": [],
    // "cursor": [],
    // "direction": [],
    "display": [["select", ["inherit", "none", "inline", "block", "inline-block", "list-item", "run-in",
                            "table", "table-caption", "table-cell", "table-column", "table-column-group",
                            "table-footer-group", "table-header-group", "table-row", "table-row-group"]]],
    // "elevation": [],
    // "empty-cells": [],
    // "filter": [],
    "float": [["select", ["inherit", "left", "right", "none"]]],
    // "font": [],
    // "font-family": [],
    "font-size": ["measure"],
    // "font-size-adjust": [],
    // "font-stretch": [],
    // "font-style": [],
    // "font-variant": [],
    // "font-weight": [],
    // "height": [],
    // "ime-mode": [],
    // "include-source": [],
    // "layer-background-color": [],
    // "layer-background-image": [],
    // "layout-flow": [],
    // "layout-grid": [],
    // "layout-grid-char": [],
    // "layout-grid-char-spacing": [],
    // "layout-grid-line": [],
    // "layout-grid-mode": [],
    // "layout-grid-type": [],
    // "left": [],
    // "letter-spacing": [],
    // "line-break": [],
    "line-height": ["measure"],
    // "list-style": [],
    // "list-style-image": [],
    // "list-style-position": [],
    // "list-style-type": [],
    // "margin": [],
    // "margin-bottom": [],
    // "margin-left": [],
    // "margin-right": [],
    // "margin-top": [],
    // "marker-offset": [],
    // "marks": [],
    // "max-height": [],
    // "max-width": [],
    // "min-height": [],
    // "min-width": [],
    // "-moz-binding": [],
    // "-moz-border-radius": [],
    // "-moz-border-radius-topleft": [],
    // "-moz-border-radius-topright": [],
    // "-moz-border-radius-bottomright": [],
    // "-moz-border-radius-bottomleft": [],
    // "-moz-border-top-colors": [],
    // "-moz-border-right-colors": [],
    // "-moz-border-bottom-colors": [],
    // "-moz-border-left-colors": [],
    // "-moz-opacity": [],
    // "-moz-outline": [],
    // "-moz-outline-color": [],
    // "-moz-outline-style": [],
    // "-moz-outline-width": [],
    // "-moz-user-focus": [],
    // "-moz-user-input": [],
    // "-moz-user-modify": [],
    // "-moz-user-select": [],
    // "orphans": [],
    // "outline": [],
    // "outline-color": [],
    // "outline-style": [],
    // "outline-width": [],
    // "overflow": [],
    // "overflow-X": [],
    // "overflow-Y": [],
    // "padding": [],
    // "padding-bottom": [],
    // "padding-left": [],
    // "padding-right": [],
    // "padding-top": [],
    // "page": [],
    // "page-break-after": [],
    // "page-break-before": [],
    // "page-break-inside": [],
    // "pause": [],
    // "pause-after": [],
    // "pause-before": [],
    // "pitch": [],
    // "pitch-range": [],
    // "play-during": [],
    // "position": [],
    // "quotes": [],
    // "-replace": [],
    // "richness": [],
    // "right": [],
    // "ruby-align": [],
    // "ruby-overhang": [],
    // "ruby-position": [],
    // "-set-link-source": [],
    // "size": [],
    // "speak": [],
    // "speak-header": [],
    // "speak-numeral": [],
    // "speak-punctuation": [],
    // "speech-rate": [],
    // "stress": [],
    // "scrollbar-arrow-color": [],
    // "scrollbar-base-color": [],
    // "scrollbar-dark-shadow-color": [],
    // "scrollbar-face-color": [],
    // "scrollbar-highlight-color": [],
    // "scrollbar-shadow-color": [],
    // "scrollbar-3d-light-color": [],
    // "scrollbar-track-color": [],
    // "table-layout": [],
    "text-align": [["select", ["inherit", "left", "right", "center", "justify"]]],
    // "text-align-last": [],
    // "text-decoration": [],
    // "text-indent": [],
    // "text-justify": [],
    // "text-overflow": [],
    // "text-shadow": [],
    // "text-transform": [],
    // "text-autospace": [],
    // "text-kashida-space": [],
    // "text-underline-position": [],
    // "top": [],
    // "unicode-bidi": [],
    // "-use-link-source": [],
    // "vertical-align": [],
    // "visibility": [],
    // "voice-family": [],
    // "volume": [],
    // "white-space": [],
    // "widows": [],
    // "width": [],
    // "word-break": [],
    // "word-spacing": [],
    // "word-wrap": [],
    // "writing-mode": [],
    // "z-index": [],
    // "zoom": [],
};


// Panel
//

function author_get_panel (window) {
    return window.document.getElementById("author-panel");
}

function author_get_panel_create (window) {
    var panel = author_get_panel(window);
    if (! panel) {
        var panel = create_XUL(window, "hbox");
        panel.setAttribute("id", "author-panel");
        panel.target = create_XUL(window, "label");
        panel.target.setAttribute("value", "null");
        panel.appendChild(author_wrap_element_align(window, panel.target));
        panel.property = create_XUL(window, "label");
        panel.appendChild(author_wrap_element_align(window, panel.property));
        panel.controls = create_XUL(window, "hbox");
        panel.appendChild(panel.controls);
        var deck = window.document.getElementById("buffer-container");
        deck.parentNode.insertBefore(panel, deck.nextSibling);
    }
    return panel;
}

function author_panel_remove (window) {
    var panel = author_get_panel(window);
    if (panel)
        panel.parentNode.removeChild(panel)
}

function author_panel_destroy (window) {
    author_panel_remove(window);
    window.buffers.for_each(function (b) delete b._author);
}

function author_panel_destroy_all () {
    for_each_window(author_panel_destroy);
}

function author_panel_update (buffer, interactivep) {
    var panel = author_get_panel_create(buffer.window);
    panel.setAttribute("collapsed", "false"); 

    // do target
    var target = null;
    if (buffer._author.element) {
        try {
            target = buffer._author.element
                .QueryReferent(Ci.nsIDOMHTMLElement);
        } catch (e) {}
    }
    panel.target.setAttribute("value", String(target));

    // do property
    var prop = buffer._author.property || null;
    if (prop != panel.property.getAttribute("value")) {
        var window = buffer.window;
        var container = panel.controls;
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        panel.property.setAttribute("value", prop);
        if (! prop)
            return;
        var ctors = author_css_properties[prop];
        if (interactivep && ! ctors)
            window.minibuffer.message("unknown or unsupported property");
        if (! ctors)
            return;
        for (var i = 0, ctor; ctor = ctors[i]; ++i) {
            author_append_separator(container);
            if (array_p(ctor))
                (author_controls[ctor[0]](ctor[1]))(window, container);
            else
                author_controls[ctor](window, container);
        }
        author_append_separator(container);
    }
}

function author_select_buffer (buffer) {
    var panel = author_get_panel(buffer.window);
    if (buffer._author)
        author_panel_update(buffer, false);
    else if (panel)
        panel.setAttribute("collapsed", "true");
}

add_hook("select_buffer_hook", author_select_buffer); // put this in a mode


//XXX: commands available when mode isn't necessarily on.
interactive("author-set-property",
    null,
    function (I) {
        var prop = yield I.minibuffer.read(
            $prompt = "CSS Property?",
            $history = "author-css-property",
            $completer = prefix_completer(
                $completions = [k for ([k,v] in Iterator(author_css_properties))]),
            $auto_complete,
            $auto_complete_initial,
            $match_required,
            $space_completes);
        if (! I.buffer._author)
            I.buffer._author = {};
        I.buffer._author.property = prop;
        author_panel_update(I.buffer, true);
    });

interactive("author-pick-element",
    null,
    function (I) {
        var el = yield read_browser_object(I);
        if (! I.buffer._author)
            I.buffer._author = {};
        I.buffer._author.element = el
            .QueryInterface(Ci.nsISupportsWeakReference)
            .GetWeakReference();
        author_panel_update(I.buffer, true);
    },
    $browser_object = browser_object_dom_node);

interactive("author-panel-close",
    null,
    function (I) {
        // close panel for this buffer.  with prefix, do all buffers in
        // window.  with double prefix, do all buffers in all windows.
        if (I.buffer._author)
            delete I.buffer._author;
        var panel = author_get_panel(I.window);
        if (panel)
            panel.setAttribute("collapsed", "true");
    });

//provide("author");
