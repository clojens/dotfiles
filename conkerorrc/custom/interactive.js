

//----------------------------------------------------------------------------
// speed dial
//----------------------------------------------------------------------------

interactive("open-stat-corbina", "go to corbina statistics page", "follow",
            $browser_object = "http://stat.corbina.net/");
define_key(content_buffer_normal_keymap, "f2", "open-stat-corbina");

interactive("open-km-news", "go to km news", "follow",
            $browser_object = "http://news.km.ru/");
define_key(content_buffer_normal_keymap, "f3", "open-km-news");

interactive("open-linuxforum", "go to linuxforum", "follow",
            $browser_object = "http://linuxforum.ru/");
define_key(content_buffer_normal_keymap, "f4", "open-linuxforum");

interactive("open-inbox", "go to inbox mail", "follow",
            $browser_object = "http://inbox.com/login.aspx");
define_key(content_buffer_normal_keymap, "f6", "open-inbox");

interactive("open-altair", "go to altair linux forum", "follow",
            $browser_object = "http://forums.altair-tv.net/index.php?showforum=66");
define_key(content_buffer_normal_keymap, "f7", "open-altair");

interactive("open-lor", "go to lor", "follow",
            $browser_object = "http://linux.org.ru/");
define_key(content_buffer_normal_keymap, "f9", "open-lor");


