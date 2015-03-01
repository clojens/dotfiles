
// web development

// use with e.g. button, divider, header, icon, image, input, label, loader, progess, reveal, segment, step
define_webjump("semui-elem", "http://semantic-ui.com/elements/%s.html");
// use with e.g. breadcrumb, form, grid, menu, message, table
define_webjump("semui-coll", "http://semantic-ui.com/collections/%s.html");
// use with e.g. accordion, checkbox, dimmer, dropdown, modal, popup, rating, shape, sidebar, transition
define_webjump("semui-mods", "http://semantic-ui.com/modules/%s.html");
// use with e.g. comment, feed, item, list
define_webjump("semui-view", "http://semantic-ui.com/views/%s.html");

// search engines
define_webjump("ixquick", "http://ixquick.com/do/metasearch.pl?query=%s");
define_webjump("duck", "http://duckduckgo.com/?q=%s");
define_webjump("b", "http://blekko.com/ws/%s", $alternative = "http://blekko.com/");
define_webjump("bi", "http://blekko.com/ws/%s/images");
define_webjump("bin", "http://www.bing.com/images/search?q=%s");

// the google
define_webjump("google-scholar", "http://scholar.google.com/scholar?q=%s");
define_webjump("google-images", "https://www.google.com/search?q=%s&tbm=isch&tbs=isz:lt,islt:xga&ei=f-lfVN7nIcGraZCXgZgG");
define_webjump("google-books", "http://www.google.com/search?q=%s&tbm=bks");
define_webjump("google-translate", "http://translate.google.com/translate_t#auto|en|%s");

// code search
define_webjump("gh-clj", "https://github.com/search?utf8=%E2%9C%93&q=%s+language%3AClojure+extension%3Aclj&type=Code&ref=advsearch&l=Clojure");
define_webjump("ohloh", "https://www.ohloh.net/p?query=%s");
define_webjump("codesearch", "http://www.google.com/codesearch?q=%s");
define_webjump("cowhy", "https://code.whytheluckystiff.net/%s");

// wikipedia
define_webjump("wpe", "http://en.wikipedia.org/wiki/%s")
define_webjump("wpes", "http://en.wikipedia.org/Special:Search?search=%s&go=Go&fulltext=search")
wikipedia_enable_didyoumean = true;
define_wikipedia_webjumps("en", "nl");

// cheatsheets
define_webjump("ad", "http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/#%s");

// video and movies
define_webjump("y", "http://www.youtube.com/results?search_query=%s&search=Search");
define_webjump("mv", "http://www.themoviedb.org/search?query=%s");
define_webjump("tv", "http://thetvdb.com/?string=%s&searchseriesid=&tab=listseries&function=Search");
define_webjump("imdb", "http://imdb.com/find?q=%s");

// bookmarklets
define_webjump("zb", "javascript:(function(){var%20e=document.getElementsByTagName('body')[0].setAttribute('style','background-image:none;');})()");

// social
define_webjump("twitter", "http://twitter.com/%s");

// dictionaries
define_webjump("urban", "http://www.urbandictionary.com/define.php?term=%s");

function define_scuttle_webjumps (username, url) {
    if (! url) url = "http://www.delicious.com/";
    define_webjump("scuttle", url + username + "/%s",
                        $alternative = url + username);
    define_webjump("ascuttle", "javascript:location.href='"+url+"save"+
                        "?v=2&url='+encodeURIComponent(location.href)+'&title='+"+
                        "encodeURIComponent(document.title);");
    define_webjump("sscuttle", url+"search?p=%s&u="+username+
                        "&chk=&context=userposts&fr=del_icio_us&lc=1");
    define_webjump("sascuttle", url+"search/all?search=%s");
}

// Personalized Webjumps
define_scuttle_webjumps("abe", "https://noone.org/semanticscuttle/");
define_delicious_webjumps("xtaran");
define_lastfm_webjumps("XTaran");


