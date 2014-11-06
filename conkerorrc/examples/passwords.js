
// http://kb.mozillazine.org/About:config_entries#Signon..2A
// https://wiki.mozilla.org/Firefox:Password_Manager_Debugging

session_pref("signon.rememberSignons", true);
session_pref("signon.expireMasterPassword", false);
session_pref("signon.SignonFileName", "signons.txt");
//session_pref("signon.debug", true);

Cc["@mozilla.org/login-manager;1"]
    .getService(Ci.nsILoginManager);

