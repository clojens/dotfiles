/*

  This stuff is well and good as a hack, but there are some questions
to be answered about the kind of UI we really want, before we can add
this to conkeror.  The emacs highight commands are probably a good
model to follow for the UI.

  We'll put key bindings in the `C-x w' keymap.

  Since we want to be able to show any attribute, perhaps that
information should be prompted for.

  Perhaps have a command called `reveal-attribute' and another command
called `unreveal-attribute' or some such.

*/

function titles_show (I) {
    var win = I.window;
    var doc = I.buffer.document;
    var fragment = doc.createDocumentFragment();

    var xpr = doc.evaluate(
        '//*[@title]', doc, null,
        Ci.nsIDOMXPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var node, rect, style;
    while ((node = xpr.iterateNext())) {
        rect = node.getBoundingClientRect();
        if ((rect.top >= win.scrollY &&
             rect.top < win.scrollY + win.innerHeight &&
             rect.left >= win.scrollX &&
             rect.left < win.scrollX + win.innerWidth &&
             (rect.bottom - rect.top > 0) &&
             (rect.right - rect.left > 0)))
        {
            style = win.getComputedStyle(node, "");
            if (style.display != "none" &&
                style.visibility != "hidden")
            {
                var title = doc.createElementNS(XHTML_NS, "div");
                title.className = "__conkeror_property_display";
                title.style.position = "absolute";
                title.style.top = rect.top+"px";
                title.style.left = rect.left+"px";
                title.style.background = "#ffd";
                title.style.border = "1px solid black"
                title.style["z-index"] = 10000001;
                title.textContent = node.getAttribute("title");
                fragment.appendChild(title);
            }
        }
    }
    doc.documentElement.appendChild(fragment);
}



interactive("titles-show",
            "",
            titles_show);


function titles_remove (I) {
    var doc = I.buffer.document;
    var nodes = doc.getElementsByClassName('__conkeror_property_display');
    for (var i = nodes.length -1; i >= 0; i--) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
}

interactive("titles-remove",
            "",
            titles_remove);
