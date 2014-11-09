
/*
<jbms> I figured out a cool trick for making debugging easier, btw:  [21:31]
<jbms> you define:
<jbms> const DEBUG_HERE = "function (__DEBUG_HERE) { return
       eval(__DEBUG_HERE); }";
<jbms> and then do:  conkeror.myblah = eval(DEBUG_HERE);  [21:32]
<jbms> then you can use myblah("any expression here") to evaluate it in the
       original context
*/

// const DEBUG_HERE = "function (__DEBUG_HERE) { return eval(__DEBUG_HERE); }";

