
// url_remoting_fn = load_url_in_new_buffer;
// url_remoting_fn = load_url_in_current_buffer;


function jjf_url_remoting_fn (url, ctx) {
    if (ctx.prefix_argument)
        load_url_in_new_buffer(url, ctx);
    else
        load_url_in_new_window(url, ctx);
}

url_remoting_fn = jjf_url_remoting_fn;
