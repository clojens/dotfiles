
// search engines
define_webjump("ixquick", "http://ixquick.com/do/metasearch.pl?query=%s");

define_webjump("google-scholar", "http://scholar.google.com/scholar?q=%s");
define_webjump("google-books", "http://www.google.com/search?q=%s&tbm=bks");
define_webjump("google-translate", "http://translate.google.com/translate_t#auto|en|%s");

define_webjump("gh-clj", "https://github.com/search?utf8=%E2%9C%93&q=%s+language%3AClojure+extension%3Aclj&type=Code&ref=advsearch&l=Clojure");
define_webjump("ohloh", "https://www.ohloh.net/p?query=%s");
define_webjump("codesearch", "http://www.google.com/codesearch?q=%s");
//define_webjump("code", "https://code.whytheluckystiff.net/%s");

// wikipedia
define_webjump("wpe", "http://en.wikipedia.org/wiki/%s")
define_webjump("wpes", "http://en.wikipedia.org/Special:Search?search=%s&go=Go&fulltext=search")
wikipedia_enable_didyoumean = true;
define_wikipedia_webjumps("en", "nl");

define_webjump("duck", "http://duckduckgo.com/?q=%s");
define_webjump("b", "http://blekko.com/ws/%s", $alternative = "http://blekko.com/"); //Blekko
define_webjump("bi", "http://blekko.com/ws/%s/images"); //Blekko Image Search
define_webjump("ix", "http://ixquick.com/do/metasearch.pl?query=%s"); //IxQuick
define_webjump("wa", "http://www.wolframalpha.com/input/?i=%s"); //WolframAlpha
define_webjump("y", "http://www.youtube.com/results?search_query=%s&search=Search"); //Youtube
define_webjump("zb", "javascript:(function(){var%20e=document.getElementsByTagName('body')[0].setAttribute('style','background-image:none;');})()");
define_webjump("tv", "http://thetvdb.com/?string=%s&searchseriesid=&tab=listseries&function=Search"); //TV Database
define_webjump("mv", "http://www.themoviedb.org/search?query=%s"); //Movie Database
define_webjump("bin", "http://www.bing.com/images/search?q=%s"); //Bing Image Search

// Webjump oneliners
define_webjump("identica", "http://identi.ca/%s");
define_webjump("imdb", "http://imdb.com/find?q=%s");
define_webjump("twitter", "http://twitter.com/%s");
define_webjump("urban", "http://www.urbandictionary.com/define.php?term=%s");

function define_scuttle_webjumps (username, url) {
    if (! url) url = "http://www.delicious.com/";
    define_webjump("scuttle", url + username + "/%s",
    127                    $alternative = url + username);
    define_webjump("ascuttle", "javascript:location.href='"+url+"save"+
    129                    "?v=2&url='+encodeURIComponent(location.href)+'&title='+"+
    130                    "encodeURIComponent(document.title);");
    define_webjump("sscuttle", url+"search?p=%s&u="+username+
    132                    "&chk=&context=userposts&fr=del_icio_us&lc=1");
    define_webjump("sascuttle", url+"search/all?search=%s");
}

// Personalized Webjumps
define_scuttle_webjumps("abe", "https://noone.org/semanticscuttle/");
define_delicious_webjumps("xtaran");
define_lastfm_webjumps("XTaran");


