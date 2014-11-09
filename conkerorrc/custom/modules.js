
// Open links in a new buffer (foreground)
require("clicks-in-new-buffer.js");
clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND;

// Enable tabs
//require("tab-bar.js");
require("new-tabs.js"); // (Uses CSS (see chrome))

require("index-webjump.js");
require("page-modes/google-search-results.js");
require("page-modes/wikipedia.js");
require("session.js");
require("block-content-focus-change.js");
require("favicon");


/*
load_paths.unshift("chrome://conkeror-contrib/content/");
require("mode-line-buttons.js");
mode_line_add_buttons(standard_mode_line_buttons, true);
*/

