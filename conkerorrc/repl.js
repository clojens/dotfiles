

let (mozrepl_init = get_home_directory()) {
    mozrepl_init.appendRelativePath(".mozrepl-conkeror.js");
    session_pref('extensions.mozrepl.initUrl', make_uri(mozrepl_init).spec);
}

//user_pref('extensions.mozrepl.autoStart', true);

//// Mozrepl
////
//if ('@hyperstruct.net/mozlab/mozrepl;1' in Cc) {
  //let mozrepl = Cc['@hyperstruct.net/mozlab/mozrepl;1']
    //.getService(Ci.nsIMozRepl);
  //if (! mozrepl.isActive())
    //mozrepl.start(4242);
//}

