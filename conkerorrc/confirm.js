
add_hook("before_quit_hook",
         function () {
             var w = get_recent_conkeror_window();
             var result = (w == null) ||
                 "y" == (yield w.minibuffer.read_single_character_option(
                     $prompt = "Quit Conkeror? (y/n)",
                     $options = ["y", "n"]));
             yield co_return(result);
         });

add_hook("window_before_close_hook",
         function (w) {
             var result = yield w.minibuffer.read_single_character_option(
                 $prompt = "Close window? (y/n)",
                 $options = ["y", "n"]);
             yield co_return(result == "y");
         });
