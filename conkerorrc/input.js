
///XXX: conflicts with escape as a sticky meta.  enter a text box, then
///     hit escape to unfocus.  you're suddenly in a caret-like mode.
///
//define_sticky_modifier("escape", "M");

function input_setup_extra_key_events (window) {
    window.addEventListener("keydown", input_handle_keydown, true);
    window.addEventListener("keyup", input_handle_keyup, true);
}
add_hook("window_initialize_hook", input_setup_extra_key_events);
