!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function n(e,n){return e.line-n.line||e.ch-n.ch}function t(e,n,t,i){this.line=n,this.ch=t,this.cm=e,this.text=e.getLine(n),this.min=i?Math.max(i.from,e.firstLine()):e.firstLine(),this.max=i?Math.min(i.to-1,e.lastLine()):e.lastLine()}function i(e,n){var t=e.cm.getTokenTypeAt(h(e.line,n));return t&&/\btag\b/.test(t)}function r(e){if(!(e.line>=e.max))return e.ch=0,e.text=e.cm.getLine(++e.line),!0}function u(e){if(!(e.line<=e.min))return e.text=e.cm.getLine(--e.line),e.ch=e.text.length,!0}function f(e){for(;;){var n=e.text.indexOf(">",e.ch);if(-1==n){if(r(e))continue;return}{if(i(e,n+1)){var t=e.text.lastIndexOf("/",n),u=t>-1&&!/\S/.test(e.text.slice(t+1,n));return e.ch=n+1,u?"selfClose":"regular"}e.ch=n+1}}}function o(e){for(;;){var n=e.ch?e.text.lastIndexOf("<",e.ch-1):-1;if(-1==n){if(u(e))continue;return}if(i(e,n+1)){x.lastIndex=n,e.ch=n;var t=x.exec(e.text);if(t&&t.index==n)return t}else e.ch=n}}function l(e){for(;;){x.lastIndex=e.ch;var n=x.exec(e.text);if(!n){if(r(e))continue;return}{if(i(e,n.index+1))return e.ch=n.index+n[0].length,n;e.ch=n.index+1}}}function c(e){for(;;){var n=e.ch?e.text.lastIndexOf(">",e.ch-1):-1;if(-1==n){if(u(e))continue;return}{if(i(e,n+1)){var t=e.text.lastIndexOf("/",n),r=t>-1&&!/\S/.test(e.text.slice(t+1,n));return e.ch=n+1,r?"selfClose":"regular"}e.ch=n}}}function a(e,n){for(var t=[];;){var i,r=l(e),u=e.line,o=e.ch-(r?r[0].length:0);if(!r||!(i=f(e)))return;if("selfClose"!=i)if(r[1]){for(var c=t.length-1;c>=0;--c)if(t[c]==r[2]){t.length=c;break}if(c<0&&(!n||n==r[2]))return{tag:r[2],from:h(u,o),to:h(e.line,e.ch)}}else t.push(r[2])}}function s(e,n){for(var t=[];;){var i=c(e);if(!i)return;if("selfClose"!=i){var r=e.line,u=e.ch,f=o(e);if(!f)return;if(f[1])t.push(f[2]);else{for(var l=t.length-1;l>=0;--l)if(t[l]==f[2]){t.length=l;break}if(l<0&&(!n||n==f[2]))return{tag:f[2],from:h(e.line,e.ch),to:h(r,u)}}}else o(e)}}var h=e.Pos,F="A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",x=new RegExp("<(/?)(["+F+"][A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*)","g");e.registerHelper("fold","xml",function(e,n){for(var i=new t(e,n.line,0);;){var r,u=l(i);if(!u||i.line!=n.line||!(r=f(i)))return;if(!u[1]&&"selfClose"!=r){var o=h(i.line,i.ch),c=a(i,u[2]);return c&&{from:o,to:c.from}}}}),e.findMatchingTag=function(e,i,r){var u=new t(e,i.line,i.ch,r);if(-1!=u.text.indexOf(">")||-1!=u.text.indexOf("<")){var l=f(u),c=l&&h(u.line,u.ch),F=l&&o(u);if(l&&F&&!(n(u,i)>0)){var x={from:h(u.line,u.ch),to:c,tag:F[2]};return"selfClose"==l?{open:x,close:null,at:"open"}:F[1]?{open:s(u,F[2]),close:x,at:"close"}:(u=new t(e,c.line,c.ch,r),{open:x,close:a(u,F[2]),at:"open"})}}},e.findEnclosingTag=function(e,n,i,r){for(var u=new t(e,n.line,n.ch,i);;){var f=s(u,r);if(!f)break;var o=new t(e,n.line,n.ch,i),l=a(o,f.tag);if(l)return{open:f,close:l}}},e.scanForClosingTag=function(e,n,i,r){return a(new t(e,n.line,n.ch,r?{from:0,to:r}:null),i)}});