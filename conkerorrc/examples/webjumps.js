// -*- outline-minor-mode: t; outline-regexp: "/\\*+ "; -*-

// Notes:
//
//   The webjumps in this file are organized in outline form that can be
// used with outline-minor-mode in emacs.  To allow emacs to automatically
// turn on outline-minor-mode when you load this file, put this in your
// .emacs:
//
//   (add-to-list 'safe-local-variable-values '(outline-minor-mode . t))
//

opensearch_load_paths.unshift(make_file("~/.conkerorrc/search-engines"));

/* astronomy */

define_webjump("clear-sky-chart",
  "http://cleardarksky.com/csk/getcsk.php?id=%s",
  $completer = all_word_completer(
      $completions = ["CntrlaWA", "GraRapKMI", "JCVnOBMI"],
      $get_description = function (x)
      ({CntrlaWA:"Centralia, Washington",
        JCVnOBMI:"James C. Veen Observatory, Lowell Michigan",
        GraRapKMI:"Grand Rapids, Michigan"}[x])));

define_webjump("nasa-hsf-sightings",
    "http://spaceflight1.nasa.gov/realdata/sightings/cities/view.cgi?"+
    "country=United_States&region=Michigan&city=Grand_Rapids");

/* biology */

// encyclopedia of life
define_webjump("eol", "http://eol.org/search?q=%s&ie=UTF-8&search_type=text");

/* music */

define_webjump("bwr", "http://bluewaterramblers.com/performances"+
               new Date().getFullYear()+"/#%s",
               $completer = prefix_completer(
                   $completions = ["january", "february", "march",
                                   "april", "may", "june", "july",
                                   "august", "september", "october",
                                   "november", "december"]));

/* computer programs */
/** apache **/

define_webjump("apache2",
    "http://www.google.com/search?as_q=%s&num=10&hl=en&ie=ISO-8859-1&"+
    "btnG=Google+Search&as_epq=Version+2.0&as_oq=&as_eq=%22List-Post%22&"+
    "lr=&as_ft=i&as_filetype=&as_qdr=all&as_occt=any&as_dt=i&"+
    "as_sitesearch=httpd.apache.org&safe=off");

/** emacs **/
define_webjump("emacswiki",
    "http://www.google.com/cse?cx=004774160799092323420%3A6-ff2s0o6yi&q=%s&sa=Search&siteurl=emacswiki.org%2F",
    $alternative="http://www.emacswiki.org/");

/** imagemagick **/

// magick-options is a webjump for imagemagick command line options.
//
// magick-options caches its completions in a preference.  To clear the cache
// and force magick-options to fetch the information anew, just do:
//
//   clear_pref('conkeror.webjump.magick-options.cache');
//
// last modified: November 25, 2009
//
function magick_options_completer (input, cursor_position, conservative) {
    var completions;
    try {
        completions = get_pref('conkeror.webjump.magick-options.cache').split(' ');
    } catch (e) {}
    if (! completions) {
        try {
            var content = yield send_http_request(
                load_spec({uri: "http://www.imagemagick.org/script/command-line-options.php"}));
            completions = content.responseText
                .match(/([a-z]+)(?=\">-\1<\/a>)/g)
                .filter(remove_duplicates_filter());
            user_pref('conkeror.webjump.magick-options.cache', completions.join(' '));
        } catch (e) {
            completions = [];
        }
    }
    yield co_return(prefix_completer($completions = completions)
                    (input, cursor_position, conservative));
}
define_webjump("magick-options",
    "http://www.imagemagick.org/script/command-line-options.php#%s",
    $alternative = "http://www.imagemagick.org/script/command-line-options.php",
    $completer = magick_options_completer);


/* language */

define_webjump("anagram", "http://wordsmith.org/anagram/anagram.cgi?anagram=%s&t=1000&a=n");

/** esperanto **/

define_webjump("revo", "http://reta-vortaro.de/cgi-bin/sercxu.pl?cx=1&sercxata=%s");
define_webjump("sonja", "http://kisa.ca/vortaro/search.php?someaction=search&word=%s");

/** mandarin chinese **/

define_webjump("popupchinese",
    function (term) {
        return load_spec(
            { uri: "http://popupchinese.com/words/dictionary",
              post_data: make_post_data([['search', term]]) });
    },
    $alternative = "http://popupchinese.com/dictionary",
    $argument = 'optional');

define_webjump("nciku", "http://www.nciku.com/search/all/%s");

define_webjump("mdbg",
    "http://www.mdbg.net/chindict/chindict.php?page=worddictbasic&wdqb=%s&wdrst=0&wdeac=1",
    $alternative = "http://www.mdbg.net/chindict/chindict.php");

define_webjump("baidu",
    function (term) {
        return make_uri("http://www.baidu.com/s?wd="+term,
                        "gb2312").spec;
    },
    $alternative = "http://www.baidu.com/");

/* math */

define_webjump("mathworld", "http://mathworld.wolfram.com/search/?query=%s&x=0&y=0");

/* news */

define_webjump("news", "http://news.google.com/news/search?q=%s");

define_webjump("hackernews", "http://searchyc.com/%s",
               $alternative = "http://news.ycombinator.com/");

/* programming */

define_webjump("rfc", "http://www.ietf.org/rfc/rfc%s.txt");

/** haskell **/

define_webjump("hoogle", "http://haskell.org/hoogle/?hoogle=%s",
               $alternative = "http://haskell.org/hoogle/");

/** latex **/

define_webjump("ctan-desc", "http://www.ctan.org/cgi-bin/search.py?"+
               "metadataSearch=%s&metadataSearchSubmit=Search");
define_webjump("ctan-pack", "http://www.ctan.org/cgi-bin/search.py?"+
               "tdsFilename=%s&tdsFilenameSearch=Search");
define_webjump("ctan-file", "http://www.ctan.org/cgi-bin/filenameSearch.py?"+
               "filename=%s&Search=Search");
define_webjump("ctan-doc", "http://www.ctan.org/cgi-bin/searchFullText.py?"+
               "fullTextSearch=%s&fullTextSearchSubmit=Search");

/** mozilla **/

define_webjump("mozilla-central-ident", "http://mxr.mozilla.org/mozilla-central/ident?i=%s");
define_webjump("mozilla-central-text", "http://mxr.mozilla.org/mozilla-central/search?string=%s");
define_webjump("mozilla-central-file", "http://mxr.mozilla.org/mozilla-central/find?text=&string=%s");

/** perl **/

define_webjump("perldoc", "http://perldoc.perl.org/search.html?q=%s");
define_webjump("cpan", "http://search.cpan.org/search?query=%s&mode=all");

/** bash **/

define_webjump("bashfaq",
    "http://mywiki.wooledge.org/BashFAQ?action=fullsearch&context=180&value=%s&fullsearch=Text",
    $alternative = "http://mywiki.wooledge.org/BashFAQ");

define_webjump("commandlinefu", 
    function(term) {
        return 'http://www.commandlinefu.com/commands/matching/' +
            term.replace(/[^a-zA-Z0-9_\-]/g, '')
                .replace(/[\s\-]+/g, '-') +
            '/' + btoa(term);
    },
    $argument = 'optional',
    $alternative = "http://www.commandlinefu.com/");
define_webjump("mdc", "https://developer.mozilla.org/Special:Search?search=%s&type=fulltext&go=Search");

/** scheme **/

function chickadee_completer (input, cursor_position, conservative) {
    var completions = [];
    var content = yield send_http_request(
        load_spec({uri: "http://api.call-cc.org/cdoc/ajax/prefix?q="+
                   encodeURIComponent(input)}));
    if (content.responseText) {
        var parser = Cc["@mozilla.org/xmlextras/domparser;1"]  
            .createInstance(Ci.nsIDOMParser);  
        var doc = parser.parseFromString(content.responseText, "text/xml");
        var res = doc.getElementsByTagName("li")
        for (let i = 0, n = res.length; i < n; ++i) {
            completions.push(res[i].textContent);
        }
    }
    yield co_return(prefix_completer($completions = completions)
                    (input, cursor_position, conservative));
}
define_webjump("chickadee",
    "http://api.call-cc.org/cdoc?q=%s&query-name=Lookup",
    $alternative = "http://api.call-cc.org/doc/",
    $completer = chickadee_completer);

define_webjump("eggref4", "http://wiki.call-cc.org/eggref/4/%s",
               $alternative = "http://wiki.call-cc.org/chicken-projects/egg-index-4.html");


/* debian */

define_webjump("debpkg", "http://packages.debian.org/%s");
define_webjump("debfile", "http://packages.debian.org/?searchon=contents&keywords=%s&mode=path&suite=unstable&arch=any");
define_webjump("debbugs", "http://bugs.debian.org/%s");
define_webjump("debpts", "http://packages.qa.debian.org/%s");
define_webjump("debpopcon", "http://qa.debian.org/popcon.php?package=%s");
define_webjump("buildd", "https://buildd.debian.org/%s");
define_webjump("buildd-ports", "http://buildd.debian-ports.org/build.php?pkg=%s");
define_webjump("debqa", "http://qa.debian.org/developer.php?login=%s");

define_webjump("debianwiki",
    "http://wiki.debian.org/Suspend?action=fullsearch&context=180&value=%s&fullsearch=Text");

/* misc */

define_webjump("grlug-wiki", "http://wiki.grlug.org/index.php?search=%s&fulltext=Search");
define_webjump("kdl",
    "http://frodo.llcoop.org/iii/encore/search?formids=target&lang=eng&suite=def&"+
               "reservedids=lang%2Csuite&submitmode=&submitname=&target=%s&x=0&y=0",
    $alternative = "http://www.kdl.org/");

/* search engines */

define_opensearch_webjump("blekko", "blekko.xml");
define_opensearch_webjump("image", "googleimages.xml");
define_webjump("sogou", "http://www.sogou.com/web?query=%s");
define_webjump("ixquick", "http://ixquick.com/do/metasearch.pl?query=%s");
define_webjump("lmgtfy", "http://lmgtfy.com/?q=%s");
define_webjump("scroogle", "http://www.scroogle.org/cgi-bin/nbbw.cgi?Gw=%s");

/* network tools */

add_delicious_webjumps("jjfoerch");

define_webjump("down?",
    function (url) {
        if (url)
            return "http://downforeveryoneorjustme.com/" + url;
        else
            return "javascript:window.location.href='http://downforeveryoneorjustme.com/'+window.location.href;";
    },
    $argument = "optional");

define_webjump("wayback",
    function (url) {
        if (url)
            return "http://web.archive.org/web/*/" + url;
        else
            return "javascript:window.location.href='http://web.archive.org/web/*/'+window.location.href;";
    },
    $argument = "optional");

define_webjump("validate",
    "http://validator.w3.org/check?uri=%s&charset=%28detect+automatically%29&doctype=Inline&group=0");

define_webjump("validate-css",
    "http://jigsaw.w3.org/css-validator/validator?uri=%s&profile=css21&usermedium=all&warning=1&lang=en");

define_webjump("friday?", "http://docgno.me/is-it-friday-yet.php");

define_webjump("julian-day->calendar-date",
               "http://aa.usno.navy.mil/cgi-bin/aa_jdconv.pl",
               $post_data = [["jd", "%s"]]);

define_webjump("gmane", "http://gmane.org/find.php?list=%s");

/* gitweb */

/*
 *  Call gitweb-webjump-get-opml to init completions info.
 */
/*
require("gitweb-webjump");
gitweb_webjumps_opml_directory = get_home_directory();
gitweb_webjumps_opml_directory.appendRelativePath(".conkerorrc/gitweb-webjumps-opml");

define_gitweb_summary_webjump("repo.or.cz", "http://repo.or.cz/w",
                              $alternative = "http://repo.or.cz/");
*/

/* entertainment */

define_webjump("reads", "http://www.goodreads.com/search?query=%s");
define_webjump("imdb", "http://imdb.com/find?q=%s");
define_webjump("memory-alpha", "http://memory-alpha.org/wiki/Special:Search/?search=%s");
define_webjump("youtube", "http://www.youtube.com/results?search_query=%s&search=Search");
define_webjump("youtube-user", "http://youtube.com/profile_videos?user=%s");
define_webjump("lurkersguide",
    "http://www.google.com/search?q=site%3Ahttp%3A%2F%2Fwww.midwinter.com%2Flurk%2F+%s",
    $alternative = "http://www.midwinter.com/lurk/");
define_webjump("knowyourmeme", "http://knowyourmeme.com/search?q=%s");

/* sports */

define_webjump("geocaching-waypoint", "http://www.geocaching.com/seek/cache_details.aspx?wp=%s");


/* shopping */

define_webjump("amazon", "http://www.amazon.com/exec/obidos/external-search/?field-keywords=%s&mode=blended");
define_webjump("emusic", "http://www.emusic.com/search.html?mode=x&QT=%s");
