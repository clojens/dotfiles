
// show icons
read_buffer_show_icons = true;

// display url hints
hints_display_url_panel = true;

// cwd (set default download directory)
cwd=get_home_directory(); 
cwd.append("Downloads");

// no new window for downloads
download_buffer_automatic_open_target=OPEN_NEW_BUFFER;

// don't open download buffer automatically
//remove_hook("download_added_hook", open_download_buffer_automatically);

// reload this file on the fly
interactive("rc-reload",
            "Reload the Conkerorrc.",
            function(I) { load_rc_file("/home/acme/.conkerorrc/settings.js"); });

// open external links in new buffer (for Emacs)
url_remoting_fn = load_url_in_new_buffer;

// use emacsclient as external editor
editor_shell_command = "emacsclient -c"
view_source_use_external_editor = true;

// allow kill (q or C-x k) to kill last buffer
can_kill_last_buffer = false;

// let xkcd-mode put the funny alt text into the page.
xkcd_add_title = true;

// clear history after 1 day
session_pref('browser.history_expire_days', 1);

// reduce memory consumption
session_pref('browser.cache.memory.capacity', 4096);
session_pref('browser.cache.memory.enable', false); 

// reduce amount of time Firefox stores uncompressed images in memory
session_pref('mage.mem.min_discard_timeout_ms', 100000);

// clear downloads history on completion
session_pref('browser.download.manager.retention', 0); 

// start page
homepage = "https://www.github.com/LightTable/LightTable";


