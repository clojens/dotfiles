url_completion_use_webjumps = true;
url_completion_use_bookmarks = true;
url_completion_use_history = false;

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
            "Toggle between bookmark and history completion.",
            url_completion_toggle);
define_key(content_buffer_normal_keymap, "f12", "url-completion-toggle");

