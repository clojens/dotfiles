
require("content-policy");

add_hook("content_policy_hook", content_policy_bytype);


// utility function that might make it into conkeror in one form or
// another.. more likely as a new feature of add_hook than as a separate
// function.
function replace_hook (hook_name, func) {
    var hook = conkeror[hook_name];
    var i = array_find_index(hook, function (x) x.name == func.name);
    if (i >= 0)
        hook.splice(i, 1, func);
    else
        add_hook(hook_name, func);
}

/*
 * Blockers
 */

var host_blacklist = host_blacklist || {};

function block_by_host (content_type, content_location) {
    var N = content_policy_reject;
    return (host_blacklist[content_location.host] || null);
}
replace_hook("content_policy_hook", block_by_host);


var flash_host_whitelist = flash_host_whitelist || {};

function block_flash (content_type, content_location) {
    var Y = content_policy_accept, N = content_policy_reject;
    var action = (flash_host_whitelist[content_location.host] || N);
    if (action == N)
        dumpln("blocked flash: "+content_location.spec);
    return action;
}
content_policy_bytype_table.object = block_flash;


// this one is still experimental..
function block_subdocuments (content_type, content_location,
                             request_origin, context, mime_type_guess,
                             extra) {
    if (content_location.scheme == 'file' ||
        context.ownerDocument &&
        context.ownerDocument.location == conkeror_chrome_uri)
    {
        return content_policy_accept;
    } else
        return content_policy_reject;
}
//add_hook("content_policy_hook", block_subdocuments);
