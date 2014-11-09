
define_webjump("google-scholar", "http://scholar.google.com/scholar?q=%s");
define_webjump("google-books", "http://www.google.com/search?q=%s&tbm=bks");

define_webjump("gh-clj", "https://github.com/search?utf8=%E2%9C%93&q=%s+language%3AClojure+extension%3Aclj&type=Code&ref=advsearch&l=Clojure");
define_webjump("code", "https://code.whytheluckystiff.net/%s");

define_webjump("wpe", "http://en.wikipedia.org/wiki/%s")
define_webjump("wpes", "http://en.wikipedia.org/Special:Search?search=%s&go=Go&fulltext=search")


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

