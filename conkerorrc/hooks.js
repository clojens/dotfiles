

// favicons hook
add_hook("mode_line_hook", mode_line_adder(buffer_icon_widget), true);
add_hook("mode_line_hook", mode_line_adder(loading_count_widget), true);
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);

//browser_prevent_automatic_form_focus_mode(true);
google_search_bind_number_shortcuts();

