
function get_profiles () {
    var profile_service = Cc["@mozilla.org/toolkit/profile-service;1"]
        .getService(Components.interfaces.nsIToolkitProfileService);
    var ret = [];
    var profiles = profile_service.profiles;
    while (profiles.hasMoreElements()) {
        var p = profiles.getNext().QueryInterface(Ci.nsIToolkitProfile);
        ret.push(p.name);
    }
    return ret;
}
