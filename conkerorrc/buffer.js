

function define_key_buffer_switch(key, buf_num) {
        define_key(content_buffer_normal_keymap, key, function (I) {
                switch_to_buffer(I.window, I.window.buffers.get_buffer(buf_num));
        });
        define_key(download_buffer_keymap, key, function (I) {
                switch_to_buffer(I.window, I.window.buffers.get_buffer(buf_num));
        });
}
for (let i = 0; i < 10; ++i) {
        define_key_buffer_switch(i == 9 ? "0" : (i+1).toString(), i);
}

define_key(content_buffer_normal_keymap, "f10", "quit");


