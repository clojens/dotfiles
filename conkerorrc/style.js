
theme_load_paths.unshift("~/.conkeror.mozdev.org/conkeror/vejhdcwj.default/themes/");
theme_unload("default");
theme_load("conkeror-theme-zenburn");

//register_user_stylesheet(
 //   "data:text/css,"+
  //      escape("#minibuffer, tree.completions, .mode-line { font-family: Inconsolata; font-size: 12pt; }"));


interactive("toggle-stylesheets",
            "Toggle whether conkeror uses style sheets (CSS) for the " +
            "current buffer.  It is sometimes useful to turn off style " +
            "sheets when the web site makes obnoxious choices.",
            function(I) {
  var s = I.buffer.document.styleSheets;
  for (var i = 0; i < s.length; i++)
    s[i].disabled = !s[i].disabled;
});

//Big Hint Numbers
register_user_stylesheet(
    "data:text/css," +
        escape(
            "@namespace url(\"http://www.w3.org/1999/xhtml\");\n" +
            "span.__conkeror_hint {\n"+
            "  font-size: 14px !important;\n"+
            "  line-height: 14px !important;\n"+
            "}"));


