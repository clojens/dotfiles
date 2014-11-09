
define_key(default_global_keymap, "C-x C-m", "execute-extended-command");

//Unfocus input fields
define_key(content_buffer_normal_keymap, "M-q", "unfocus");  

//Follow new link in background buffer
define_key(content_buffer_normal_keymap, "d", "follow-new-buffer-background");

// To suppress loading of all of Conkeror's default key bindings
// Note the use of user_pref. The default binding set is loaded before the rc,
// so disabling it must be controlled with a user preference.
//user_pref("conkeror.load.bindings/default/bindings", 0);

// Then make your own set of bindings. The easiest way to get started will be to
// copy the default bindings directory from the Conkeror source, and modify them.
// Add the location of your bindings to Conkeror's load_paths, and load them as
// you would load any module:
//require("my-bindings/bindings");



// -*- mode: js -*-

require("global-overlay-keymap.js");

define_key_alias("C-m", "return");

// vim-like movement keys h,j,k,l
define_key(default_global_keymap, "h", "cmd_scrollLeft");
define_key(default_global_keymap, "j", "cmd_scrollLineDown");
define_key(default_global_keymap, "k", "cmd_scrollLineUp");
define_key(default_global_keymap, "l", "cmd_scrollRight");
undefine_key(content_buffer_normal_keymap, "l");

// b for buffer
define_key(default_global_keymap, "b", "switch-to-buffer");
undefine_key(content_buffer_normal_keymap, "b");

// d for delete buffer
define_key(default_global_keymap, "d", "kill-current-buffer");
undefine_key(content_buffer_normal_keymap, "d");

// a for anchor
define_key(content_buffer_normal_keymap, "a", "bookmark");

// slash / search like vim and ? backwards
define_key(default_global_keymap, "/", "isearch-forward");
define_key(default_global_keymap, "?", "isearch-backward");
define_key(default_global_keymap, "n", "isearch-continue-forward");
undefine_key(content_buffer_normal_keymap, "n");
define_key(default_global_keymap, "p", "isearch-continue-backward");

define_key(content_buffer_normal_keymap, "back_space", "back");
define_key(content_buffer_normal_keymap, "S-back_space", "forward");

define_key(content_buffer_normal_keymap, "S-space", "cmd_scrollPageUp")

define_key(default_global_keymap, "C-tab", "buffer-next");
define_key(default_global_keymap, "S-C-tab", "buffer-previous");

define_key(content_buffer_normal_keymap, "F", "follow-new-buffer-background");

undefine_key(content_buffer_normal_keymap, "g");
//TODO: add g overlay keymap
define_key(default_global_keymap, "G", "cmd_scrollBottom");
undefine_key(content_buffer_normal_keymap, "G");

define_key(default_global_keymap, "t", "find-url-new-buffer");
undefine_key(content_buffer_normal_keymap, "t");
define_key(default_global_keymap, "o", "find-url");



/*

If you want to be able to talk about how Conkeror's keyboard handling works, it
is important to understand some high level terminology.

context keymap

The context keymap is the keymap corresponding to the focused element, such as
an input box, a button, and anchor, or just the base "normal mode" keymap. It
can also be a special keymap corresponding to an input mode like quote-mode or
caret-mode. Examples of context keymaps are content_buffer_normal_keymap,
content_buffer_textarea_keymap, &c.

active keymap

This is either the same as the context keymap, or when you are in the middle of
a key sequence, like just after typing C-x the keymap associated with C-x.

overlay keymap

More specifically, I.overlay_keymap. This is a keymap that can be set in the
interactive context by a prefix command in a key sequence. It has precedence
over the context keymap or active keymap in the following keystrokes within the
key sequence. This is how universal_argument_keymap is implemented.

global-overlay-keymap

not to be confused with overlay keymap described above. This is the keymap by
which key aliases and sticky modifiers are implemented. It gets called via
keypress_hook. It is completely modular, so if global-overlay-keymap.js is not
loaded, this keymap does not exist.

override keymap

This is a keymap for any modal interaction such as a minibuffer prompt. In fact
the minibuffer is the only thing that uses it currently. It would not be too
inaccurate to think of the override keymap as the context keymap of the
minibuffer.

*/



