
/**
 * This bit of code is how auto-cwd and cwd-inheritance can be done.
 * Auto-cwd means that buffers created from a command-line action will
 * get their cwd set to the working directory of the command-line
 * invocation.  Cwd-inheritance means that new buffers will inherit
 * their cwd from the buffer that caused them to be created.  For
 * auto-cwd, buffer.opener will be `instanceof interactive_context'.
 * For cwd-inheritance, buffer.opener will be `instanceof buffer'.
 */
function cwd_setup (buffer) {
    if (buffer.opener && buffer.opener.local) {
        if (buffer.opener.local.hasOwnProperty('cwd')) {
            buffer.local.cwd = buffer.opener.local.cwd;
        }
    }
}
add_hook('create_buffer_hook', cwd_setup);


/**
 * Per-host cwd.
 */
var auto_cwd = auto_cwd || {};

function jjf_set_cwd (b, rq, location) {
    try {
        var dir = (auto_cwd[location.host]);
        if (dir)
            b.page.local.cwd = make_file(dir);
    } catch (e) {}
}
add_hook("content_buffer_location_change_hook", jjf_set_cwd);
