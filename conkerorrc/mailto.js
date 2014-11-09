
//set_protocol_handler("mailto", null);
set_protocol_handler("mailto", make_file("~/bin/handle-mailto"));
//set_protocol_handler("mailto", "https://mail.google.com/mail/?extsrc=mailto&url=%s");
