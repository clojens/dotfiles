
define_browser_object_class("embed", null,
    xpath_browser_object_handler("//object | //xhtml:object"),
    $hint = "select embed");
define_key(content_buffer_normal_keymap, "* E", "browser-object-embed");

/*
mozrepl session
---------------
repl.enter(conkeror)
w = window_watcher.activeWindow
flash = w.navigator.mimeTypes["application/x-shockwave-flash"]
flash.enabledPlugin.description.match(/[\d.]+/)
b = w.buffers.current
o = b.document.getElementsByTagName("object")[0]
o.width
e = b.document.embeds[1]
e.Zoom(200)
e.Play()
e.StopPlay()
e.Rewind()
e.TGetProperty(nameOfTargetMovieClip, propertyIndex)
e.GotoFrame(num)
e.SetVariable(name, value)
e.GetVariable(name)
e.PercentLoaded()
e.IsPlaying()
e.LoadMovie(0, "mymovie.swf")
e.TotalFrames()
e.TCurrentFrame("/")

e.TCallLabel(target, label) // "/", "HandleScriptNotify"

e.GetVariable("$version") // flash plugin version

e.TGetProperty("/",8) // width
e.TGetProperty("/",9) // height



// youtube player stuff
//
// id: movie_player
//
//
// internal variables:
//
// movie = "_level0.player.movie"
// /:video_id
// /:l              // total time?
// /:t              // track_id
// /:hl             // language?
// /:playnext
// /:BASE_YT_URL    // url for youtube
// /:vq
// is_playing
// e.SetVariable("playnext","0")
// e.SetVariable("playnext","1")
// /:enablejsapi
//
// e.TCallFrame("/",0)

*/

