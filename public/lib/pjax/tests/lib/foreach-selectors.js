var tape=require("tape"),forEachEls=require("../../lib/foreach-selectors.js"),cb=function(e){e.className="modified"};tape("test forEachSelector",(function(e){forEachEls(["html","body"],cb),e.equal(document.documentElement.className,"modified","callback has been executed on first selector"),e.equal(document.body.className,"modified","callback has been executed on first selector"),document.documentElement.className="",document.body.className="",forEachEls(["html","body"],cb,null,document.documentElement),e.equal(document.documentElement.className,"","callback has not been executed on first selector when context is used"),e.equal(document.body.className,"modified","callback has been executed on first selector when context is used"),e.end()}));