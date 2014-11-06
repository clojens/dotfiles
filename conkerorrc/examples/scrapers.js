
/// hdstream.org
///
function media_scrape_hdstream (buffer, results) {
    var text = buffer.document.documentElement.innerHTML;
    var m = text.match(/<param name="flashvars" value="file=([^"]+)"/);
    if (m[1])
        results.push(load_spec({uri: m[1]}));
}
media_scrapers.unshift([/hdstream\.org/, media_scrape_hdstream]);


/// cinemahd.net
///
