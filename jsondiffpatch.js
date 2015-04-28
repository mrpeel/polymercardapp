!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.jsondiffpatch=e()}}(function(){return function e(t,r,i){function n(s,f){if(!r[s]){if(!t[s]){var l="function"==typeof require&&require;if(!f&&l)return l(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var a=r[s]={exports:{}};t[s][0].call(a.exports,function(e){var r=t[s][1][e];return n(r?r:e)},a,a.exports,e,t,r,i)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(e,t){function r(){}var i=t.exports={};i.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var r=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),r.length>0)){var i=r.shift();i()}},!0),function(e){r.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),i.title="browser",i.browser=!0,i.env={},i.argv=[],i.on=r,i.addListener=r,i.once=r,i.off=r,i.removeListener=r,i.removeAllListeners=r,i.emit=r,i.binding=function(){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(){throw new Error("process.chdir is not supported")}},{}],2:[function(e,t,r){var i=e("../pipe").Pipe,n=function(){};n.prototype.setResult=function(e){return this.result=e,this.hasResult=!0,this},n.prototype.exit=function(){return this.exiting=!0,this},n.prototype.switchTo=function(e,t){return"string"==typeof e||e instanceof i?this.nextPipe=e:(this.next=e,t&&(this.nextPipe=t)),this},n.prototype.push=function(e,t){return e.parent=this,"undefined"!=typeof t&&(e.childName=t),e.root=this.root||this,e.options=e.options||this.options,this.children?(this.children[this.children.length-1].next=e,this.children.push(e)):(this.children=[e],this.nextAfterChildren=this.next||null,this.next=e),e.next=this,this},r.Context=n},{"../pipe":15}],3:[function(e,t,r){var i=e("./context").Context,n=function(e,t){this.left=e,this.right=t,this.pipe="diff"};n.prototype=new i,r.DiffContext=n},{"./context":2}],4:[function(e,t,r){var i=e("./context").Context,n=function(e,t){this.left=e,this.delta=t,this.pipe="patch"};n.prototype=new i,r.PatchContext=n},{"./context":2}],5:[function(e,t,r){var i=e("./context").Context,n=function(e){this.delta=e,this.pipe="reverse"};n.prototype=new i,r.ReverseContext=n},{"./context":2}],6:[function(e,t){t.exports=function(e,t){var r;return"string"==typeof t&&(r=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+\-])(\d{2}):(\d{2}))$/.exec(t))?new Date(Date.UTC(+r[1],+r[2]-1,+r[3],+r[4],+r[5],+r[6],+(r[7]||0))):t}},{}],7:[function(e,t,r){var i=e("./processor").Processor,n=e("./pipe").Pipe,o=e("./contexts/diff").DiffContext,s=e("./contexts/patch").PatchContext,f=e("./contexts/reverse").ReverseContext,l=e("./filters/trivial"),a=e("./filters/nested"),c=e("./filters/arrays"),u=e("./filters/dates"),h=e("./filters/texts"),p=function(e){this.processor=new i(e),this.processor.pipe(new n("diff").append(a.collectChildrenDiffFilter,l.diffFilter,u.diffFilter,h.diffFilter,a.objectsDiffFilter,c.diffFilter).shouldHaveResult()),this.processor.pipe(new n("patch").append(a.collectChildrenPatchFilter,c.collectChildrenPatchFilter,l.patchFilter,h.patchFilter,a.patchFilter,c.patchFilter).shouldHaveResult()),this.processor.pipe(new n("reverse").append(a.collectChildrenReverseFilter,c.collectChildrenReverseFilter,l.reverseFilter,h.reverseFilter,a.reverseFilter,c.reverseFilter).shouldHaveResult())};p.prototype.options=function(){return this.processor.options.apply(this.processor,arguments)},p.prototype.diff=function(e,t){return this.processor.process(new o(e,t))},p.prototype.patch=function(e,t){return this.processor.process(new s(e,t))},p.prototype.reverse=function(e){return this.processor.process(new f(e))},p.prototype.unpatch=function(e,t){return this.patch(e,this.reverse(t))},r.DiffPatcher=p},{"./contexts/diff":3,"./contexts/patch":4,"./contexts/reverse":5,"./filters/arrays":9,"./filters/dates":10,"./filters/nested":12,"./filters/texts":13,"./filters/trivial":14,"./pipe":15,"./processor":16}],8:[function(e,t,r){(function(t){var i=e("./diffpatcher").DiffPatcher;r.DiffPatcher=i,r.create=function(e){return new i(e)},r.dateReviver=e("./date-reviver");var n;r.diff=function(){return n||(n=new i),n.diff.apply(n,arguments)},r.patch=function(){return n||(n=new i),n.patch.apply(n,arguments)},r.unpatch=function(){return n||(n=new i),n.unpatch.apply(n,arguments)},r.reverse=function(){return n||(n=new i),n.reverse.apply(n,arguments)};var o="undefined"!=typeof t&&"string"==typeof t.execPath;if(o){var s=e("./formatters/index");r.formatters=s,r.console=s.console}else r.homepage="https://github.com/benjamine/jsondiffpatch",r.version="0.1.8"}).call(this,e("1YiZ5S"))},{"./date-reviver":6,"./diffpatcher":7,"1YiZ5S":1}],9:[function(e,t,r){var i=e("../contexts/diff").DiffContext,n=e("../contexts/patch").PatchContext,o=e("../contexts/reverse").ReverseContext,s=e("./lcs"),f=3,l="function"==typeof Array.isArray?Array.isArray:function(e){return e instanceof Array},a="function"==typeof Array.prototype.indexOf?function(e,t){return e.indexOf(t)}:function(e,t){for(var r=e.length,i=0;r>i;i++)if(e[i]===t)return i;return-1},c=function(e){if(e.leftIsArray){for(var t,r,n,o,l=e.options&&e.options.objectHash,c=function(e,t,r,i,n){var o=e[r],s=t[i];if(o===s)return!0;if("object"!=typeof o||"object"!=typeof s)return!1;if(!l)return!1;var f,a;return"number"==typeof r?(n.hashCache1=n.hashCache1||[],f=n.hashCache1[r],"undefined"==typeof f&&(n.hashCache1[r]=f=l(o,r))):f=l(o),"undefined"==typeof f?!1:("number"==typeof i?(n.hashCache2=n.hashCache2||[],a=n.hashCache2[i],"undefined"==typeof a&&(n.hashCache2[i]=a=l(s,i))):a=l(s),"undefined"==typeof a?!1:f===a)},u={},h=0,p=0,d=e.left,v=e.right,y=d.length,x=v.length;y>h&&x>h&&c(d,v,h,h,u);)t=h,o=new i(e.left[t],e.right[t]),e.push(o,t),h++;for(;y>p+h&&x>p+h&&c(d,v,y-1-p,x-1-p,u);)r=y-1-p,n=x-1-p,o=new i(e.left[r],e.right[n]),e.push(o,n),p++;var g;if(h+p===y){if(y===x)return void e.setResult(void 0).exit();for(g=g||{_t:"a"},t=h;x-p>t;t++)g[t]=[v[t]];return void e.setResult(g).exit()}if(h+p===x){for(g=g||{_t:"a"},t=h;y-p>t;t++)g["_"+t]=[d[t],0,0];return void e.setResult(g).exit()}u={};var m=d.slice(h,y-p),w=v.slice(h,x-p),C=s.get(m,w,c,u),R=[];for(g=g||{_t:"a"},t=h;y-p>t;t++)a(C.indices1,t-h)<0&&(g["_"+t]=[d[t],0,0],R.push(t));var _=!0;e.options&&e.options.arrays&&e.options.arrays.detectMove===!1&&(_=!1);var F=!1;e.options&&e.options.arrays&&e.options.arrays.includeValueOnMove&&(F=!0);var b=R.length;for(t=h;x-p>t;t++){var N=a(C.indices2,t-h);if(0>N){var A=!1;if(_&&b>0)for(var P=0;b>P;P++)if(r=R[P],c(m,w,r-h,t-h,u)){g["_"+r].splice(1,2,t,f),F||(g["_"+r][0]=""),n=t,o=new i(e.left[r],e.right[n]),e.push(o,n),R.splice(P,1),A=!0;break}A||(g[t]=[v[t]])}else r=C.indices1[N]+h,n=C.indices2[N]+h,o=new i(e.left[r],e.right[n]),e.push(o,n)}e.setResult(g).exit()}};c.filterName="arrays";var u={numerically:function(e,t){return e-t},numericallyBy:function(e){return function(t,r){return t[e]-r[e]}}},h=function(e){if(e.nested&&"a"===e.delta._t){var t,r,i=e.delta,o=e.left,s=[],l=[],a=[];for(t in i)if("_t"!==t)if("_"===t[0]){if(0!==i[t][2]&&i[t][2]!==f)throw new Error("only removal or move can be applied at original array indices, invalid diff type: "+i[t][2]);s.push(parseInt(t.slice(1),10))}else 1===i[t].length?l.push({index:parseInt(t,10),value:i[t][0]}):a.push({index:parseInt(t,10),delta:i[t]});for(s=s.sort(u.numerically),t=s.length-1;t>=0;t--){r=s[t];var c=i["_"+r],h=o.splice(r,1)[0];c[2]===f&&l.push({index:c[1],value:h})}l=l.sort(u.numericallyBy("index"));var p=l.length;for(t=0;p>t;t++){var d=l[t];o.splice(d.index,0,d.value)}var v,y=a.length;if(y>0)for(t=0;y>t;t++){var x=a[t];v=new n(e.left[x.index],x.delta),e.push(v,x.index)}return e.children?void e.exit():void e.setResult(e.left).exit()}};h.filterName="arrays";var p=function(e){if(e&&e.children&&"a"===e.delta._t){for(var t,r=e.children.length,i=0;r>i;i++)t=e.children[i],e.left[t.childName]=t.result;e.setResult(e.left).exit()}};p.filterName="arraysCollectChildren";var d=function(e){if(!e.nested)return void(e.delta[2]===f&&(e.newName="_"+e.delta[1],e.setResult([e.delta[0],parseInt(e.childName.substr(1),10),f]).exit()));if("a"===e.delta._t){var t,r;for(t in e.delta)"_t"!==t&&(r=new o(e.delta[t]),e.push(r,t));e.exit()}};d.filterName="arrays";var v=function(e,t,r){var i=t;if("string"==typeof t&&"_"===t[0])i=parseInt(t.substr(1),10);else{var n="_"+t;if(l(r)&&0===r[2])i=n;else for(var o in e){var s=e[o];l(s)&&s[2]===f&&s[1].toString()===t&&(i=o.substr(1))}}return i},y=function(e){if(e&&e.children&&"a"===e.delta._t){for(var t,r=e.children.length,i={_t:"a"},n=0;r>n;n++){t=e.children[n];var o=t.newName;"undefined"==typeof o&&(o=v(e.delta,t.childName,t.result)),i[o]!==t.result&&(i[o]=t.result)}e.setResult(i).exit()}};y.filterName="arraysCollectChildren",r.diffFilter=c,r.patchFilter=h,r.collectChildrenPatchFilter=p,r.reverseFilter=d,r.collectChildrenReverseFilter=y},{"../contexts/diff":3,"../contexts/patch":4,"../contexts/reverse":5,"./lcs":11}],10:[function(e,t,r){var i=function(e){e.left instanceof Date?(e.setResult(e.right instanceof Date?e.left.getTime()!==e.right.getTime()?[e.left,e.right]:void 0:[e.left,e.right]),e.exit()):e.right instanceof Date&&e.setResult([e.left,e.right]).exit()};i.filterName="dates",r.diffFilter=i},{}],11:[function(e,t,r){var i=function(e,t,r,i){return e[r]===t[i]},n=function(e,t,r,i){var n,o,s=e.length,f=t.length,l=[s+1];for(n=0;s+1>n;n++)for(l[n]=[f+1],o=0;f+1>o;o++)l[n][o]=0;for(l.match=r,n=1;s+1>n;n++)for(o=1;f+1>o;o++)l[n][o]=r(e,t,n-1,o-1,i)?l[n-1][o-1]+1:Math.max(l[n-1][o],l[n][o-1]);return l},o=function(e,t,r,i,n,s){if(0===i||0===n)return{sequence:[],indices1:[],indices2:[]};if(e.match(t,r,i-1,n-1,s)){var f=o(e,t,r,i-1,n-1,s);return f.sequence.push(t[i-1]),f.indices1.push(i-1),f.indices2.push(n-1),f}return e[i][n-1]>e[i-1][n]?o(e,t,r,i,n-1,s):o(e,t,r,i-1,n,s)},s=function(e,t,r,s){s=s||{};var f=n(e,t,r||i,s),l=o(f,e,t,e.length,t.length,s);return"string"==typeof e&&"string"==typeof t&&(l.sequence=l.sequence.join("")),l};r.get=s},{}],12:[function(e,t,r){var i=e("../contexts/diff").DiffContext,n=e("../contexts/patch").PatchContext,o=e("../contexts/reverse").ReverseContext,s=function(e){if(e&&e.children){for(var t,r=e.children.length,i=e.result,n=0;r>n;n++)t=e.children[n],"undefined"!=typeof t.result&&(i=i||{},i[t.childName]=t.result);i&&e.leftIsArray&&(i._t="a"),e.setResult(i).exit()}};s.filterName="collectChildren";var f=function(e){if(!e.leftIsArray&&"object"===e.leftType){var t,r;for(t in e.left)r=new i(e.left[t],e.right[t]),e.push(r,t);for(t in e.right)"undefined"==typeof e.left[t]&&(r=new i(void 0,e.right[t]),e.push(r,t));return e.children&&0!==e.children.length?void e.exit():void e.setResult(void 0).exit()}};f.filterName="objects";var l=function(e){if(e.nested&&!e.delta._t){var t,r;for(t in e.delta)r=new n(e.left[t],e.delta[t]),e.push(r,t);e.exit()}};l.filterName="objects";var a=function(e){if(e&&e.children&&!e.delta._t){for(var t,r=e.children.length,i=0;r>i;i++)t=e.children[i],e.left[t.childName]!==t.result&&(e.left[t.childName]=t.result);e.setResult(e.left).exit()}};a.filterName="collectChildren";var c=function(e){if(e.nested&&!e.delta._t){var t,r;for(t in e.delta)r=new o(e.delta[t]),e.push(r,t);e.exit()}};c.filterName="objects";var u=function(e){if(e&&e.children&&!e.delta._t){for(var t,r=e.children.length,i={},n=0;r>n;n++)t=e.children[n],i[t.childName]!==t.result&&(i[t.childName]=t.result);e.setResult(i).exit()}};u.filterName="collectChildren",r.collectChildrenDiffFilter=s,r.objectsDiffFilter=f,r.patchFilter=l,r.collectChildrenPatchFilter=a,r.reverseFilter=c,r.collectChildrenReverseFilter=u},{"../contexts/diff":3,"../contexts/patch":4,"../contexts/reverse":5}],13:[function(e,t,r){var i=2,n=60,o=null,s=function(){if(!o){var t;if("undefined"!=typeof diff_match_patch)t=new diff_match_patch;else if("function"==typeof e){var r=e("../../external/diff_match_patch_uncompressed");t=new r.diff_match_patch}if(!t){var i=new Error("text diff_match_patch library not found");throw i.diff_match_patch_not_found=!0,i}o={diff:function(e,r){return t.patch_toText(t.patch_make(e,r))},patch:function(e,r){for(var i=t.patch_apply(t.patch_fromText(r),e),n=0;n<i[1].length;n++)if(!i[1][n]){var o=new Error("text patch failed");o.textPatchFailed=!0}return i[0]}}}return o},f=function(e){if("string"===e.leftType){var t=e.options&&e.options.textDiff&&e.options.textDiff.minLength||n;if(e.left.length<t||e.right.length<t)return void e.setResult([e.left,e.right]).exit();var r=s().diff;e.setResult([r(e.left,e.right),0,i]).exit()}};f.filterName="texts";var l=function(e){if(!e.nested&&e.delta[2]===i){var t=s().patch;e.setResult(t(e.left,e.delta[0])).exit()}};l.filterName="texts";var a=function(e){var t,r,i,n,o,s,f,l,a=null,c=/^@@ +\-(\d+),(\d+) +\+(\d+),(\d+) +@@$/;for(i=e.split("\n"),t=0,r=i.length;r>t;t++){n=i[t];var u=n.slice(0,1);"@"===u?(a=c.exec(n),s=t,f=null,l=null,i[s]="@@ -"+a[3]+","+a[4]+" +"+a[1]+","+a[2]+" @@"):"+"===u?(f=t,i[t]="-"+i[t].slice(1),"+"===i[t-1].slice(0,1)&&(o=i[t],i[t]=i[t-1],i[t-1]=o)):"-"===u&&(l=t,i[t]="+"+i[t].slice(1))}return i.join("\n")},c=function(e){e.nested||e.delta[2]===i&&e.setResult([a(e.delta[0]),0,i]).exit()};c.filterName="texts",r.diffFilter=f,r.patchFilter=l,r.reverseFilter=c},{}],14:[function(e,t,r){var i="function"==typeof Array.isArray?Array.isArray:function(e){return e instanceof Array},n=function(e){if(e.left===e.right)return void e.setResult(void 0).exit();if("undefined"==typeof e.left){if("function"==typeof e.right)throw new Error("functions are not supported");return void e.setResult([e.right]).exit()}if("undefined"==typeof e.right)return void e.setResult([e.left,0,0]).exit();if("function"==typeof e.left||"function"==typeof e.right)throw new Error("functions are not supported");return e.leftType=null===e.left?"null":typeof e.left,e.rightType=null===e.right?"null":typeof e.right,e.leftType!==e.rightType?void e.setResult([e.left,e.right]).exit():"boolean"===e.leftType||"number"===e.leftType?void e.setResult([e.left,e.right]).exit():("object"===e.leftType&&(e.leftIsArray=i(e.left)),"object"===e.rightType&&(e.rightIsArray=i(e.right)),e.leftIsArray!==e.rightIsArray?void e.setResult([e.left,e.right]).exit():void 0)};n.filterName="trivial";var o=function(e){return"undefined"==typeof e.delta?void e.setResult(e.left).exit():(e.nested=!i(e.delta),e.nested?void 0:1===e.delta.length?void e.setResult(e.delta[0]).exit():2===e.delta.length?void e.setResult(e.delta[1]).exit():3===e.delta.length&&0===e.delta[2]?void e.setResult(void 0).exit():void 0)};o.filterName="trivial";var s=function(e){return"undefined"==typeof e.delta?void e.setResult(e.delta).exit():(e.nested=!i(e.delta),e.nested?void 0:1===e.delta.length?void e.setResult([e.delta[0],0,0]).exit():2===e.delta.length?void e.setResult([e.delta[1],e.delta[0]]).exit():3===e.delta.length&&0===e.delta[2]?void e.setResult([e.delta[0]]).exit():void 0)};s.filterName="trivial",r.diffFilter=n,r.patchFilter=o,r.reverseFilter=s},{}],15:[function(e,t,r){var i=function(e){this.name=e,this.filters=[]};i.prototype.process=function(e){if(!this.processor)throw new Error("add this pipe to a processor before using it");for(var t=this.debug,r=this.filters.length,i=e,n=0;r>n;n++){var o=this.filters[n];if(t&&this.log("filter: "+o.filterName),o(i),"object"==typeof i&&i.exiting){i.exiting=!1;break}}!i.next&&this.resultCheck&&this.resultCheck(i)},i.prototype.log=function(e){console.log("[jsondiffpatch] "+this.name+" pipe, "+e)},i.prototype.append=function(){return this.filters.push.apply(this.filters,arguments),this},i.prototype.prepend=function(){return this.filters.unshift.apply(this.filters,arguments),this},i.prototype.indexOf=function(e){if(!e)throw new Error("a filter name is required");for(var t=0;t<this.filters.length;t++){var r=this.filters[t];if(r.filterName===e)return t}throw new Error("filter not found: "+e)},i.prototype.list=function(){for(var e=[],t=0;t<this.filters.length;t++){var r=this.filters[t];e.push(r.filterName)}return e},i.prototype.after=function(e){var t=this.indexOf(e),r=Array.prototype.slice.call(arguments,1);if(!r.length)throw new Error("a filter is required");return r.unshift(t+1,0),Array.prototype.splice.apply(this.filters,r),this},i.prototype.before=function(e){var t=this.indexOf(e),r=Array.prototype.slice.call(arguments,1);if(!r.length)throw new Error("a filter is required");return r.unshift(t,0),Array.prototype.splice.apply(this.filters,r),this},i.prototype.clear=function(){return this.filters.length=0,this},i.prototype.shouldHaveResult=function(e){if(e===!1)return void(this.resultCheck=null);if(!this.resultCheck){var t=this;return this.resultCheck=function(e){if(!e.hasResult){console.log(e);var r=new Error(t.name+" failed");throw r.noResult=!0,r}},this}},r.Pipe=i},{}],16:[function(e,t,r){var i=function(e){this.selfOptions=e,this.pipes={}};i.prototype.options=function(e){return e&&(this.selfOptions=e),this.selfOptions},i.prototype.pipe=function(e,t){if("string"==typeof e){if("undefined"==typeof t)return this.pipes[e];this.pipes[e]=t}if(e&&e.name){if(t=e,t.processor===this)return t;this.pipes[t.name]=t}return t.processor=this,t},i.prototype.process=function(e,t){var r=e;r.options=this.options();for(var i,n,o=t||e.pipe||"default";o;)"undefined"!=typeof r.nextAfterChildren&&(r.next=r.nextAfterChildren,r.nextAfterChildren=null),"string"==typeof o&&(o=this.pipe(o)),o.process(r),n=r,i=o,o=null,r&&r.next&&(r=r.next,o=n.nextPipe||r.pipe||i);return r.hasResult?r.result:void 0},r.Processor=i},{}]},{},[8])(8)});