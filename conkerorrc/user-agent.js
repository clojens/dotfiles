
require("user-agent-policy");

user_agent_policy.define_policy("default",
    user_agent_firefox(),
    "images.google.com",
    build_url_regexp($domain = /(.*\.)?google/, $path = "images"),
    "plus.google.com");


var user_agents = {
    "conkeror": null,
    "chromium": "Mozilla/5.0 (X11; U; Linux x86_64; en-US) " +
        "AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63" +
        " Safari/534.3",
    "firefox": user_agent_firefox(),
    "iphone": "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7"
};

interactive("user-agent",
    "Pick a user agent from the list of presets",
    function (I) {
        var ua = (yield I.window.minibuffer.read_object_property(
            $prompt = "Agent:",
            $object = user_agents));
        set_user_agent(user_agents[ua]);
    });
