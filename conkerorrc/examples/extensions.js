
// session_pref('extensions.checkCompatibility', false);
session_pref("xpinstall.whitelist.required", false);


///
/// MozRepl
///
let (mozrepl_init = get_home_directory()) {
    mozrepl_init.appendRelativePath(".conkerorrc/mozrepl/mozrepl_init.js");
    session_pref('extensions.mozrepl.initUrl', make_uri(mozrepl_init).spec);
}

if ('@hyperstruct.net/mozlab/mozrepl;1' in Cc) {
  var mozrepl = Cc['@hyperstruct.net/mozlab/mozrepl;1']
    .getService(Ci.nsIMozRepl);
  if (! mozrepl.isActive())
    mozrepl.start(4242);
}

// user_pref('extensions.mozrepl.autoStart', true);


///
/// Glue code
///
require("adblockplus");
try { require("dom-inspector"); } catch (e) {}


//
// ViewMarks
//
// https://addons.mozilla.org/en-US/firefox/addon/242697/
// http://conkeror.org/Extensions#ViewMarks
//
interactive("viewmarks",
    "Open ViewMarks window.",
    function (I) {
        make_chrome_window('chrome://viewmarks/content/viewmark.xul');
    });


//
// CookieCuller
//
interactive("cookie-culler-dialog",
    "Show the CookieCuller settings in a dialog box.",
    function (I) {
        window_watcher.openWindow(
            null, "chrome://cookieculler/content/CookieCuller.xul",
            "CookieCuller", "centerscreen,chrome,dialog,modal,resizable", null);
    });

interactive("cookie-culler",
    "Open the CookieCuller settings in a new buffer.",
    "find-url-new-buffer",
    $browser_object = "chrome://cookieculler/content/CookieCuller.xul");
