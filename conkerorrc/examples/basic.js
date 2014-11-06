
// homepage = "about:blank";
//homepage = "http://www.bjp.org.cn/apod/today.htm";
homepage = "http://apod.nasa.gov/apod/";


/*
 * Completion options for the read-url browser object.
 */
url_completion_use_webjumps = true;
url_completion_use_bookmarks = false;
url_completion_use_history = true;

/*
 * url-completion-toggle is a temporary workaround for the problem
 * that url_completion_use_bookmarks and url_completion_use_history
 * are mutually exclusive.
 */
function url_completion_toggle (I) {
    if (url_completion_use_bookmarks) {
        url_completion_use_bookmarks = false;
        url_completion_use_history = true;
    } else {
        url_completion_use_bookmarks = true;
        url_completion_use_history = false;
    }
}
interactive("url-completion-toggle",
            "toggle between bookmark and history completion",
            url_completion_toggle);
define_key(content_buffer_normal_keymap, "C-c t", "url-completion-toggle");


// session_pref('general.smoothScroll', true);

/// Form filling
///
///  https://bugzilla.mozilla.org/show_bug.cgi?id=201056
///
session_pref("browser.formfill.enable", false);
