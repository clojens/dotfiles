
var conkeror = Cc["@conkeror.mozdev.org/application;1"]
    .getService().wrappedJSObject;

repl.__defineGetter__("window",
    function () conkeror.get_recent_conkeror_window());
repl.__defineGetter__("buffer",
    function () repl.window.buffers.current);
repl.__defineGetter__("document",
    function () repl.buffer.document);

repl.enter(conkeror);
