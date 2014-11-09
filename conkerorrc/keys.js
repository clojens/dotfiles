
key_bindings_ignore_capslock = true;

require("global-overlay-keymap");
define_key_alias("C-m", "return");
define_key_alias("C-i", "tab");
define_key_alias("C-I", "S-tab");

// define_sticky_modifier("escape", "M");


// Scrolling movement
//
define_key(content_buffer_normal_keymap, "h", "cmd_scrollLeft");
define_key(content_buffer_normal_keymap, "j", "cmd_scrollLineDown");
define_key(content_buffer_normal_keymap, "k", "cmd_scrollLineUp");
define_key(content_buffer_normal_keymap, "l", "cmd_scrollRight");

define_key(content_buffer_normal_keymap, "C-h", "cmd_scrollLeft");
define_key(content_buffer_normal_keymap, "C-j", "cmd_scrollLineDown");
define_key(content_buffer_normal_keymap, "C-k", "cmd_scrollLineUp");
define_key(content_buffer_normal_keymap, "C-l", "cmd_scrollRight");

define_key(content_buffer_normal_keymap, "M-h", "cmd_scrollLeft");
define_key(content_buffer_normal_keymap, "M-j", "cmd_scrollLineDown");
define_key(content_buffer_normal_keymap, "M-k", "cmd_scrollLineUp");
define_key(content_buffer_normal_keymap, "M-l", "cmd_scrollRight");

call_after_load("google-search-results",
    function () {
        undefine_key(google_search_results_keymap, "j");
        undefine_key(google_search_results_keymap, "k");
    });


// Selection movement
//
define_key(content_buffer_normal_keymap, "H", "cmd_selectCharPrevious");
define_key(content_buffer_normal_keymap, "J", "cmd_selectLineNext");
define_key(content_buffer_normal_keymap, "K", "cmd_selectLinePrevious");
define_key(content_buffer_normal_keymap, "L", "cmd_selectCharNext");


// define_key(content_buffer_normal_keymap, "u", "cmd_scrollPageUp");
define_key(content_buffer_normal_keymap, "C-x u", "up");

// Text box movement
//
define_key(text_keymap, "C-j", "forward-line");
define_key(text_keymap, "C-k", "backward-line");

define_key(content_buffer_textarea_keymap, "C-j", "forward-line");
define_key(content_buffer_textarea_keymap, "C-k", "backward-line");
define_key(text_keymap, "C-h", "backward-char");
define_key(text_keymap, "M-h", "backward-word");
define_key(text_keymap, "C-l", "forward-char");
define_key(text_keymap, "M-l", "forward-word");

define_key(minibuffer_keymap, "C-j", "minibuffer-complete");
define_key(minibuffer_keymap, "C-k", "minibuffer-complete-previous");

// Caret-mode movement
//
//define_key(caret_keymap, "C-h", "caret-backward-char");
//define_key(caret_keymap, "M-h", "caret-backward-word");
//define_key(caret_keymap, "C-l", "caret-forward-char");
//define_key(caret_keymap, "M-l", "caret-forward-word");
//define_key(caret_keymap, "C-j", "caret-forward-line");
//define_key(caret_keymap, "C-k", "caret-backward-line");
//define_key(caret_keymap, "h", "caret-backward-char");
//define_key(caret_keymap, "l", "caret-forward-char");
//define_key(caret_keymap, "j", "caret-forward-line");
//define_key(caret_keymap, "k", "caret-backward-line");
//define_key(caret_keymap, "u", "caret-backward-page");

// C-p as Help key
//
define_key(default_base_keymap, "C-p", default_help_keymap);
//define_key(caret_keymap, "C-p", default_help_keymap);
undefine_key(content_buffer_normal_keymap, "C-p");
undefine_key(content_buffer_textarea_keymap, "C-p");
undefine_key(minibuffer_keymap, "C-p");


define_key(text_keymap, "C-b", "cut-to-end-of-line");


// Browser objects
define_key(content_buffer_normal_keymap, "* f", "browser-object-file");
//define_key(content_buffer_normal_keymap, "d", "browser-object-scrape-url");

// number keys
//
//for (var i = 0; i <= 9; ++i)
//    define_key(content_buffer_normal_keymap, String(i), null, $hook = universal_digit);

require('eye-guide');
eye_guide_highlight_new = true;
define_key(content_buffer_normal_keymap, "space", "eye-guide-scroll-down");
define_key(content_buffer_normal_keymap, "back_space", "eye-guide-scroll-up");
define_key(content_buffer_normal_keymap, "u", "eye-guide-scroll-up");
define_key(special_buffer_keymap, "space", "eye-guide-scroll-down");
define_key(special_buffer_keymap, "back_space", "eye-guide-scroll-up");
define_key(special_buffer_keymap, "u", "eye-guide-scroll-up");
