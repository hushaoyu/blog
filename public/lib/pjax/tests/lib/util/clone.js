var tape=require("tape"),clone=require("../../../lib/util/clone");tape("test clone method",(function(e){var o={one:1,two:2},t=clone(o);e.notEqual(o,t,"cloned object isn't the original object"),e.same(o,t,"cloned object has the same values as original object"),t.three=3,e.notSame(o,t,"modified cloned object doesn't have the same values as original object"),e.end()}));