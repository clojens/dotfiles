
require("client-redirect");

define_client_redirect("google-images",
    function (uri) {
        return /(images|www)\.google\.com$/.test(uri.host)
            && uri.filePath == "/imgres"
            && regexp_exec(/imgurl=([^&]+)/, uri.query, 1);
    });

define_client_redirect("imgur",
    build_url_regexp($domain = "imgur", $path = /(?:.*\/)?([^\/]+)/),
    function (m) {
        return "http://i.imgur.com/"+m[1]+".jpg";
    });
