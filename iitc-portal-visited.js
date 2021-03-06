// ==UserScript==
// @id                  iitc-plugin-portal-visited@takurua
// @name                IITC plugin: Show portal visited
// @category            Layer Highlighter
// @version             1.3.2
// @namespace           https://github.com/yuehuTi/iitc-portal-visited
// @downloadURL         https://raw.githubusercontent.com/yuehuTi/iitc-portal-visited/main/iitc-portal-visited.js
// @updateURL           https://raw.githubusercontent.com/yuehuTi/iitc-portal-visited/main/iitc-portal-visited.js
// @description         show upc/upv and scout controller maker on portal, use layer to draw semicircle outside a portal or change color by using highlighter.
//                      and thanks for https://github.com/EisFrei/IngressPortalHistoryFlags
// @include             *://*.ingress.com/intel*
// @include             *://intel.ingress.com/*
// @match               *://*.ingress.com/intel*
// @match               *://intel.ingress.com/*
// @grant               none
// ==/UserScript==


function wrapper(plugin_info) {
    if(typeof window.plugin !== 'function') window.plugin = function() {};
    plugin_info.buildName = 'iitc';
    plugin_info.dateTimeVersion = '20210228.160200';
    plugin_info.pluginId = 'upcv';

    // PLUGIN START ////////////////////////////////////////////////////////
    const KEY_SETTINGS  = "plugin-portal-visited";
    const UPC_COLOR     = "indigo";
    const UPV_COLOR     = "aqua";
    const SCOUT_COLOR   = "orange";
    const RADIUS = 50;

    const UPV_FLAG = 1;
    const UPC_FLAG = 2;
    const SCOUT_FLAG = 4;

    window.plugin.upcv = function() {};
    window.plugin.upcv.layerGroup = {};

//! XNColorPicker.js
//! https://github.com/fanaiai/xncolorpicker
!function(){"use strict";var n={"./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/function(r){r.exports=function(n){var a=[];return a.toString=function(){return this.map(function(r){var o=n(r);return r[2]?"@media ".concat(r[2]," {").concat(o,"}"):o}).join("")},a.i=function(r,o,n){"string"==typeof r&&(r=[[null,r,""]]);var t={};if(n)for(var e=0;e<this.length;e++){var i=this[e][0];null!=i&&(t[i]=!0)}for(var l=0;l<r.length;l++){var s=[].concat(r[l]);n&&t[s[0]]||(o&&(s[2]?s[2]="".concat(o," and ").concat(s[2]):s[2]=o),a.push(s))}},a}},"./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/function(r){function e(r,o){return function(r){if(Array.isArray(r))return r}(r)||function(r,o){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var n=[],t=!0,e=!1,i=void 0;try{for(var l,s=r[Symbol.iterator]();!(t=(l=s.next()).done)&&(n.push(l.value),!o||n.length!==o);t=!0);}catch(r){e=!0,i=r}finally{try{t||null==s.return||s.return()}finally{if(e)throw i}}return n}(r,o)||function(r,o){if(!r)return;if("string"==typeof r)return t(r,o);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(r);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(r,o)}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(r,o){(null==o||o>r.length)&&(o=r.length);for(var n=0,t=new Array(o);n<o;n++)t[n]=r[n];return t}r.exports=function(r){var o=e(r,4),n=o[1],t=o[3];if("function"!=typeof btoa)return[n].join("\n");r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),r="/*# ".concat(o," */"),o=t.sources.map(function(r){return"/*# sourceURL=".concat(t.sourceRoot||"").concat(r," */")});return[n].concat(o).concat([r]).join("\n")}},"./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/function(r){r.exports=function(r,o){return o=o||{},"string"!=typeof(r=r&&r.__esModule?r.default:r)?r:(/^['"].*['"]$/.test(r)&&(r=r.slice(1,-1)),o.hash&&(r+=o.hash),/["'() \t\n]/.test(r)||o.needQuotes?'"'.concat(r.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):r)}},"./src/colorFormat.min.js":
/*!********************************!*\
  !*** ./src/colorFormat.min.js ***!
  \********************************/function(n,t,e){var i;!function(){function r(r){return new o(r)}var o=function(r){var o,n=r&&r.color&&r.color.replace(/\s/g,"").toLowerCase()||"#f00",t=r&&r.format&&r.format.replace(/\s/g,"").toLowerCase()||"rgb",e=-1==t.indexOf("rgba")?0:1,r=-1==t.indexOf("hsla")?0:1;if(-1<n.indexOf("#"))"hex"==t?(o=this.hexToRgb(n),o=this.rgbToHex(o)):-1<t.indexOf("rgb")?o=this.hexToRgb(n,e):-1<t.indexOf("hsl")&&(o=this.hexToRgb(n),o=this.rgbToHsl(o,r));else if(-1<n.indexOf("rgb"))o=this.getRgb(n,e),"hex"==t?o=this.rgbToHex(o):-1<t.indexOf("hsl")&&(o=this.rgbToHsl(o,r));else if(-1<n.indexOf("hsl"))o=this.getHsl(n,r),o=this.hslToRgb(o,e),"hex"==t?o=this.rgbToHex(o):-1<t.indexOf("hsl")&&(o=this.rgbToHsl(o,r));else{for(var i,l=this.defineColor,s=0,a=l.length;s<a;s++)if(n==l[s].name){i=l[s].hex;break}if(!(i&&0<i.length))return!1;"hex"==t?(o=this.hexToRgb(i),o=this.rgbToHex(o)):-1<t.indexOf("rgb")?o=this.hexToRgb(i,e):-1<t.indexOf("hsl")&&(o=this.hexToRgb(i),o=this.rgbToHsl(o,r))}return o};o.prototype={constructor:this,defineColor:[{name:"red",hex:"#f00"},{name:"orange",hex:"#ffa500"},{name:"yellow",hex:"#ff0"},{name:"green",hex:"#0f0"},{name:"cyan",hex:"#0ff"},{name:"blue",hex:"#00f"},{name:"violet",hex:"#ee82ee"},{name:"black",hex:"#000"},{name:"white",hex:"#fff"}],getRgb:function(r,o){var n=-1==(r=r.toLowerCase()).indexOf("rgba")?0:1;r=(r=n?r.replace("rgba",""):r.replace("rgb","")).replace(/\s/g,"").split(",");var t=Number(r[0].slice(1)),e=Number(r[1]),i=n?Number(r[2]):Number(r[2].slice(0,-1));return{r:t,g:e,b:i,o:r=!n||1<Number(r[3].slice(0,-1))?1:Number(r[3].slice(0,-1)),complete:o?"rgba("+[t,e,i,r].join(",")+")":"rgb("+[t,e,i].join(",")+")"}},getHsl:function(r,o){var n=-1==(r=r.toLowerCase()).indexOf("hsla")?0:1;r=(r=n?r.replace("hsla",""):r.replace("hsl","")).replace(/\s/g,"").split(",");var t=Number(r[0].slice(1)),e=parseInt(r[1]),i=n?parseInt(r[2]):parseInt(r[2].slice(0,-1));return{h:t,s:e/100,l:i/100,o:r=!n||1<Number(r[3].slice(0,-1))?1:Number(r[3].slice(0,-1)),complete:o?"hsla("+[t,e,i,r].join(",")+")":"hsl("+[t,e,i].join(",")+")"}},rgbToHex:function(r){var o=Number(r.r).toString(16),n=Number(r.g).toString(16),t=Number(r.b).toString(16),e=Math.round(255*r.o).toString(16);return o.length<2&&(o=0+o),n.length<2&&(n=0+n),t.length<2&&(t=0+t),e.length<2&&(e=0+e),o[0]==o[1]&&n[0]==n[1]&&t[0]==t[1]&&(e[0],e[1]),{r:o,g:n,b:t,o:e,complete:"#"+(o+n+t+(1==r.o?"":e))}},rgbToHsl:function(r,o){var n,t=Number(r.r)/255,e=Number(r.g)/255,i=Number(r.b)/255,l=Number(r.o),s=Math.max(t,e,i),a=Math.min(t,e,i),r=(s+a)/2;if(s==a)n=d=0;else{var c=s-a,d=r<.5?c/(s+a):c/(2-s-a);switch(s){case t:n=(e-i)/c;break;case e:n=(i-t)/c+2;break;case i:n=(t-e)/c+4}n=(n*=60)<0?n+360:n}return{h:n=Math.round(n),s:d=Math.round(100*d)+"%",l:r=Math.round(100*r)+"%",o:l,complete:o?"hsla("+[n,d,r,l].join(",")+")":"hsl("+[n,d,r].join(",")+")"}},hexToRgb:function(r,o){var n,t,e,i,l=(r=r.replace("#","")).split("");return 3==r.length?(n=parseInt(l[0]+l[0],16),t=parseInt(l[1]+l[1],16),e=parseInt(l[2]+l[2],16),i=1):4==r.length?(n=parseInt(l[0]+l[0],16),t=parseInt(l[1]+l[1],16),e=parseInt(l[2]+l[2],16),i=Math.round(parseInt(l[3]+l[3],16)/255*100)/100):6==r.length?(n=parseInt(l[0]+l[1],16),t=parseInt(l[2]+l[3],16),e=parseInt(l[4]+l[5],16),i=1):8==r.length&&(n=parseInt(l[0]+l[1],16),t=parseInt(l[2]+l[3],16),e=parseInt(l[4]+l[5],16),i=Math.round(parseInt(l[6]+l[7],16)/255*100)/100),{r:n,g:t,b:e,o:i,complete:o?"rgba("+[n,t,e,i].join(",")+")":"rgb("+[n,t,e].join(",")+")"}},hslToRgb:function(r,o){var n,t,e,i=Number(r.h),l=Number(r.s),s=Number(r.l),a=Number(r.o);return 0==l?n=t=e=s:(n=(r=function(r,o,n){return n<0&&(n+=1),1<n&&--n,n<1/6?r+6*(o-r)*n:n<.5?o:n<2/3?r+(o-r)*(2/3-n)*6:r})(l=2*s-(s=s<.5?s*(1+l):s+l-s*l),s,(i/=360)+1/3),t=r(l,s,i),e=r(l,s,i-1/3)),{r:n=Math.round(255*n),g:t=Math.round(255*t),b:e=Math.round(255*e),o:a,complete:o?"rgba("+[n,t,e,a].join(",")+")":"rgb("+[n,t,e].join(",")+")"}}},function(){this||(0,eval)("this")}(),n.exports?n.exports=r:void 0===(i=function(){return r}.call(t,e,t,n))||(n.exports=i)}()},"./src/xnquery.js":
/*!************************!*\
  !*** ./src/xnquery.js ***!
  \************************/function(){var c,d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r};function o(r){"string"==typeof r&&(this.el=this.ConvertToArray(document.querySelectorAll(r))),r instanceof NodeList?this.el=this.ConvertToArray(r):Array.isArray(r)&&(this.el=r),r instanceof Node&&(this.el=[r]),this.el||(this.el=[])}function p(r){return new o(r)}
//! xnquery.js
//! 仙女座js方法库，使用es6实现部分jquery方法
//! version : 1.0.1
//! authors : 范媛媛
//! create date:2021/01/27 V1.0.0
//! create date:2021/01/28 V1.0.1
c=window,p.prototype=o.prototype={length:function(){return this.el.length},extend:function(){var r,o,n,t,e,i=arguments[0]||{},l=1,s=arguments.length,a=!1;for("boolean"==typeof i&&(a=i,i=arguments[1]||{},l=2),"object"!==(void 0===i?"undefined":d(i))&&(i={}),s===l&&(i=this,--l);l<s;l++)if(null!=(r=arguments[l]))for(o in r)e=i[o],i!==(n=r[o])&&(a&&n&&("object"==(void 0===n?"undefined":d(n))||(t=Array.isArray(n)))?(e=t?(t=!1,e&&Array.isArray(e)?e:[]):e&&"object"==(void 0===e?"undefined":d(e))?e:{},i[o]=this.extend(a,e,n)):void 0!==n&&(i[o]=n));return i},parent:function(){var r=this.el[0];return r&&r.parentNode?p([r.parentNode]):p([])},parents:function(r){var n=this.el[0];r=void 0===r?[document]:this.ConvertToArray(document.querySelectorAll(r));var t=[];return n&&r.forEach(function(r){for(var o=n.parentNode;o!=r&&null!=o;)o=o.parentNode;null!=o&&t.push(o)}),p(t)},reverseArryToNodeList:function(r){return r},hasClass:function(r){return 0<this.el.length&&this.el[0].classList.contains(r)},attr:function(o,n){return n?(this.el.forEach(function(r){r.setAttribute(o,n)}),this):this.el[0]?this.el[0].getAttribute(o):null},find:function(t){var o=this;if(!this.el||this.el.length<=0)return p([]);if("string"!=typeof t){var e=[];return this.el.forEach(function(r){for(var o=r.querySelectorAll("*"),n=0;n<o.length;n++)o[n]==t&&e.push(t)}),p(e)}e=[];return this.el.forEach(function(r){e=e.concat(o.ConvertToArray(r.querySelectorAll(t)))}),p(e)},children:function(o){var n=this;if(!this.el||this.el.length<=0)return p([]);var t=[];Array.isArray(o)&&(t=o);var e=[];this.el.forEach(function(r){e=e.concat(n.ConvertToArray(r.children)),"string"==typeof o&&(t=t.concat(n.ConvertToArray(r.querySelectorAll(o))))});for(var r=[],i=t.length,l=0;l<e.length;l++)for(var s=e[l],a=0;a<i;a++)if(t[a]==s){r.push(s);break}return p(r)},each:function(r){return this.el.forEach(r)},index:function(r){if(!r){for(var o=this.el[0].parentNode.childNodes,n=0;n<o.length;n++)if(o[n]==this.el[0])return n;return null}for(var t=0;t<this.el.length;t++)if(this.el[t]==r)return t},eq:function(r){r=this.el[r];return p(r?this.reverseArryToNodeList([r]):this.reverseArryToNodeList([]))},get:function(r){return this.el[r]},addClass:function(o){this.el.forEach(function(r){r.classList&&(r=r.classList).add.apply(r,function(r){if(Array.isArray(r)){for(var o=0,n=Array(r.length);o<r.length;o++)n[o]=r[o];return n}return Array.from(r)}(o.split(" ")))})},nextUntil:function(r,o){var n,t=this.el[0];if(!t)return p([]);n=r?"object"==(void 0===r?"undefined":d(r))&&r instanceof Node?r:t.parentNode.querySelector(r):null;for(var e=[],i=o?"previousSibling":"nextSibling",l=t[i];l!=n&&null!=l;)e.push(l),l=l[i];return p(e)},prevAll:function(){return this.nextUntil(null,!0)},nextAll:function(){return this.nextUntil()},removeClass:function(o){return this.el.forEach(function(r){r.classList.remove(o)}),this},val:function(o){if(!o)return this.el[0].value;this.el.forEach(function(r){r.value=o})},html:function(o){if(this.el&&this.el[0])return o?void this.el.forEach(function(r){r.innerHTML=o}):this.el[0].innerHTML},empty:function(){return this.el.forEach(function(r){r.innerHTML=""}),this},parseToDOM:function(r){var o=document.createElement("div");return"string"==typeof r&&(o.innerHTML=r),o.childNodes},ConvertToArray:function(o){var n=null;try{n=Array.prototype.slice.call(o,0)}catch(r){n=new Array;for(var t=0;t<o.length;t++)n.push(o[0])}return n},parseDomToString:function(r){},append:function(r){for(var n=this,t="string"==typeof r?(t=this.parseToDOM(r),this.ConvertToArray(t)):[r],e=0;e<t.length;e++)!function(){var o=t[e];n.el.forEach(function(r){r.appendChild(o)})}()},remove:function(){this.el.forEach(function(r){r.parentNode&&r.parentNode.removeChild(r)})},slideUp:function(r){this.el.forEach(function(r){r.style.display="none"})},css:function(){for(var r=this,o=arguments.length,n=Array(o),t=0;t<o;t++)n[t]=arguments[t];if("object"!=d(n[0]))return 1==n.length?this.el[0].style[n[0]]:2==n.length?(this.el.forEach(function(r){r.style[n[0]]=n[1]}),this):void 0;for(var e in n[0])!function(o){r.el.forEach(function(r){r.style[o]=n[0][o]})}(e);return this},fadeOut:function(o){var n=this;this.el.forEach(function(r){n.animate({opacity:0},o,r,function(){r.style.display="none"})})},fadeIn:function(o){var n=this;this.el.forEach(function(r){r.style.display="block",n.animate({opacity:1},o,r)})},animate:function(o,r,n,t){var e,i=(r=r||300)/50,l=0,s={};for(e in o)isNaN(parseFloat(o[e]))||(s[e]={init:parseFloat(n.style[e])||0,unit:String(o[e]).substring(String(parseFloat(o[e])).length)});var a=c.setInterval(function(){for(var r in s)n.style[r]=i<=l?o[r]:(parseFloat(o[r])-s[r].init)*l/i+s[r].init+s[r].unit;i<=l&&("function"==typeof t&&t(),c.clearInterval(a)),l++},20)},outerWidth:function(){return this.el[0].offsetWidth},outerHeight:function(){return this.el[0].offsetHeight},hide:function(){return this.el.forEach(function(r){r.style.display="none"}),this},show:function(){return this.el.forEach(function(r){r.style.display="block"}),this},position:function(){return{top:this.el[0].offsetTop,left:this.el[0].offsetLeft}},not:function(o){return this.el=this.el.filter(function(r){return r!=o}),this}},p.extend=p.prototype.extend,c.XNQuery=p},"./node_modules/css-loader/dist/cjs.js!./src/xncolorpicker.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/xncolorpicker.css ***!
  \*********************************************************************/function(r,o,n){n.r(o);var t=n(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */"./node_modules/css-loader/dist/runtime/cssWithMappingToString.js"),e=n.n(t),i=n(/*! ../node_modules/css-loader/dist/runtime/api.js */"./node_modules/css-loader/dist/runtime/api.js"),t=n.n(i),i=n(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */"./node_modules/css-loader/dist/runtime/getUrl.js"),i=n.n(i),n=n(/*! ./opacity.png */"./src/opacity.png"),e=t()(e()),n=i()(n.default);e.push([r.id,".fcolorpicker-curbox{\r\n    width: 60px;\r\n    height: 20px; dispaly: inline-table;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker{\r\n    width: 264px;\r\n    background: #fff;\r\n    border:1px solid #ccc;\r\n    position: fixed;\r\n    top: 100px;\r\n    padding: 6px 10px;\r\n    box-sizing: border-box;\r\n    z-index: 999999;\r\n    /*display: none;*/\r\n    user-select: none;\r\n}\r\n.fcolorpicker.canmove{\r\n    cursor: move;\r\n}\r\n.fcolorpicker>*{\r\n    cursor: auto;\r\n}\r\n.fcolorpicker .fcolor-list{\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    border-bottom: 1px solid #ddd;\r\n    margin-left: 2px;\r\n    padding: 4px 0;\r\n    padding-bottom: 0;\r\n}\r\n.fcolorpicker .color-item{\r\n    flex:0 0 39px;\r\n    cursor: pointer;\r\n    width:39px;\r\n    height:18px;\r\n    background:rgba(239,83,79,1);\r\n    border-radius:2px 0px 0px 0px;\r\n    margin-bottom: 1px;\r\n    margin-right:1px;\r\n    position: relative;\r\n    /*background-image: url(opacity.png);*/\r\n    /*border:1px solid #E0E0E0;*/\r\n}\r\n.fcolorpicker .color-item span{\r\n    position: absolute;\r\n    display: block;\r\n    pointer-events: none;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.fcolorpicker .color-item:before{\r\n    content:'';\r\n    display: block;\r\n    background:url("+n+");\r\n    -webkit-background-size: contain;\r\n    background-size: 8px;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    top:0;\r\n    left:0;\r\n}\r\n.fcolorpicker .color-latest .color-item{\r\n    width:26px;\r\n    height:18px;\r\n    background:rgba(255,255,255,1);\r\n    border-radius:2px;\r\n    /*border:1px solid rgba(224,224,224,1);*/\r\n    flex:0 0 26px;\r\n    margin-right: 4px;\r\n    margin-bottom: 4px;\r\n}\r\n.fcolorpicker .color-btns{\r\n    display: block;\r\n    /*justify-content: space-between;*/\r\n    padding-top: 10px;\r\n    /*align-items: center;*/\r\n}\r\n.fcolorpicker .color-btns .color-preview{\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom:6px;\r\n}\r\n.fcolorpicker .color-palette{\r\n    display: flex;\r\n    height: 131px;\r\n    /*padding: 8px;*/\r\n    margin-top:6px;\r\n}\r\n.fcolorpicker .color-palette .lightness{\r\n    flex:0 0 212px;\r\n    height: 129px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n    overflow: visible;\r\n}\r\n.fcolorpicker .color-palette .lightness canvas{\r\n    width:100%;\r\n    height: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .hue{\r\n    flex:0 0 6px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .hue canvas,.color-palette .opacity canvas{\r\n    height: 100%;\r\n    width: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .opacity{\r\n    flex:0 0 6px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .opacity canvas{\r\n    background:url("+n+");\r\n    -webkit-background-size: contain;\r\n    background-size: contain;\r\n}\r\n.fcolorpicker .color-palette .lightbar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: 0px;\r\n    box-shadow: 0 0px 2px rgba(204,204,192,1);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    margin-left:-7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: none;\r\n    border: 4px solid #e0e0e0;\r\n    box-sizing: border-box;\r\n}\r\n.fcolorpicker .color-palette .huebar,.color-palette .opacitybar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: -4px;\r\n    box-shadow: 0 2px 7px -1px rgb(81 81 78);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: #fff;\r\n    box-sizing: border-box;\r\n    z-index:9;\r\n}\r\n.fcolorpicker .current-color{\r\n    border-radius: 2px;\r\n    flex: 0 0 26px;\r\n    height: 26px;\r\n    /*border: 1px solid #f3f3f3;*/\r\n}\r\n.current-color-value{\r\n    border: 1px solid #ccc;\r\n    line-height: 24px;\r\n    height: 24px;\r\n    margin-left: 2px;\r\n    flex:auto;\r\n    padding: 0 6px;\r\n    font-size: 12px;\r\n    border-radius: 2px;\r\n    color: #666;\r\n    background: #fff;\r\n\r\n}\r\n.current-color-value input{\r\n    width: 100%;\r\n    border: 0;\r\n    outline: none;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-btn-group{\r\n    align-items: center;\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    flex: 0 0 82px;\r\n}\r\n.fcolorpicker .color-btn-group>a{\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    text-align: center;\r\n    background: red;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    height: 27px;\r\n    border-radius: 2px;\r\n    line-height: 26px;\r\n    padding: 0 10px;\r\n    margin-left: 6px;\r\n}\r\n.fcolorpicker .color-btn-group .cancel-color{\r\n    background: #d9e5f4;\r\n    color: #333;\r\n}\r\n.fcolorpicker .color-btn-group .confirm-color{\r\n    background: #57a4ff;\r\n}\r\n\r\n\r\n.fcolorpicker .color-gradient{\r\n    width: calc(100% - 18px);\r\n    margin-left: 9px;\r\n}\r\n.fcolorpicker .gradient-bar-container{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    position: relative;\r\n    padding-top:34px;\r\n}\r\n\r\n\r\n.fcolorpicker .gradient-colors{\r\n    position: absolute;\r\n    width: calc(100% - 22px);\r\n    left: 0;\r\n    top: 6px;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item{\r\n    width:16px;\r\n    height:16px;\r\n    position: absolute;\r\n    top:0;\r\n    border:1px solid #d9d7d7;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin-left: -9px;\r\n    cursor: pointer;\r\n    background: #fff;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.on{\r\n    border:1px solid #57a4ff;\r\n    /*background: #57a4ff;*/\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.deleting-item:after{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    background: rgba(0,0,0,.5);\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item:before{\r\n    position: absolute;\r\n    top: 12px;\r\n    color: #928f8f;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item .color{\r\n    background:blue;\r\n    width:12px;\r\n    height:12px;\r\n}\r\n.fcolorpicker .gradient-bar{\r\n    flex:auto;\r\n    height:14px;\r\n\r\n    margin-right:6px;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-bar span{\r\n    position: absolute;\r\n    top:0;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    display: block;\r\n}\r\n.fcolorpicker .gradient-bar:before{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    left:0;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background: url("+n+");\r\n    background-size: 10px;\r\n}\r\n.fcolorpicker .add-gradient{\r\n    flex:0 0 16px;\r\n    height:16px;\r\n    width:16px;\r\n    color: #57A4FF;\r\n    cursor:pointer;\r\n}\r\n.fcolorpicker .gradient-angle{\r\n    padding-top: 10px;\r\n    margin-bottom:22px;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle{\r\n    width:100%;\r\n    height:4px;\r\n    background:#d5d3d3;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle div{\r\n    width:14px;\r\n    height:14px;\r\n    border-radius:50%;\r\n    background:#57A4FF;\r\n    position: absolute;\r\n    top: -6px;\r\n    margin-left:-7px;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle span{\r\n    font-size: 12px;\r\n    position: absolute;\r\n    top: 8px;\r\n}\r\n.fcolorpicker .color-type{\r\n    font-size:14px;\r\n    margin-bottom:0px;\r\n}\r\n.fcolorpicker .color-type span{\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-type .on{\r\n    color: #57a4ff;\r\n    font-weight: BOLD;\r\n}\r\n.fcolorpicker .color-slidedown{\r\n    position: relative;\r\n    display: inline-block;\r\n    padding-right:14px;\r\n    cursor: pointer;\r\n    font-size: 12px;\r\n    margin-right:2px;\r\n}\r\n.fcolorpicker .color-slidedown:before{\r\n    position: absolute;\r\n    right: 0px;\r\n    top: 3px;\r\n    font-size: 12px;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-slidedown p{\r\n    margin:0;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-slidedown ul{\r\n    display: block;\r\n    position: absolute;\r\n    background: #000;\r\n    z-index: 9;\r\n    list-style: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    line-height: 26px;\r\n    box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);\r\n    border-radius: 2px;\r\n    padding: 4px 10px;\r\n    font-size: 12px;\r\n    color: #fff;\r\n    white-space: nowrap;\r\n    display: none;\r\n}\r\n.fcolorpicker .color-slidedown.down ul{\r\n    display: block;\r\n}\r\n.fcolorpicker .color-slidedown ul li{\r\n    cursor: pointer;\r\n}\r\n\r\n.fcolorpicker .color-slidedown.color-format-type ul{\r\n    bottom:20px;\r\n}\r\n","",{version:3,sources:["webpack://./src/xncolorpicker.css"],names:[],mappings:"AAAA;IACI,WAAW;IACX,YAAY;IACZ,eAAe;AACnB;AACA;IACI,YAAY;IACZ,gBAAgB;IAChB,qBAAqB;IACrB,eAAe;IACf,UAAU;IACV,iBAAiB;IACjB,sBAAsB;IACtB,eAAe;IACf,iBAAiB;IACjB,iBAAiB;AACrB;AACA;IACI,YAAY;AAChB;AACA;IACI,YAAY;AAChB;AACA;IACI,aAAa;IACb,eAAe;IACf,6BAA6B;IAC7B,gBAAgB;IAChB,cAAc;IACd,iBAAiB;AACrB;AACA;IACI,aAAa;IACb,eAAe;IACf,UAAU;IACV,WAAW;IACX,4BAA4B;IAC5B,6BAA6B;IAC7B,kBAAkB;IAClB,gBAAgB;IAChB,kBAAkB;IAClB,sCAAsC;IACtC,4BAA4B;AAChC;AACA;IACI,kBAAkB;IAClB,cAAc;IACd,oBAAoB;IACpB,WAAW;IACX,YAAY;AAChB;AACA;IACI,UAAU;IACV,cAAc;IACd,kDAA2B;IAC3B,gCAAgC;IAChC,oBAAoB;IACpB,kBAAkB;IAClB,UAAU;IACV,WAAW;IACX,KAAK;IACL,MAAM;AACV;AACA;IACI,UAAU;IACV,WAAW;IACX,8BAA8B;IAC9B,iBAAiB;IACjB,wCAAwC;IACxC,aAAa;IACb,iBAAiB;IACjB,kBAAkB;AACtB;AACA;IACI,cAAc;IACd,kCAAkC;IAClC,iBAAiB;IACjB,uBAAuB;AAC3B;AACA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,iBAAiB;AACrB;AACA;IACI,aAAa;IACb,aAAa;IACb,gBAAgB;IAChB,cAAc;AAClB;AACA;IACI,cAAc;IACd,aAAa;IACb,iBAAiB;IACjB,yBAAyB;IACzB,kBAAkB;IAClB,iBAAiB;AACrB;AACA;IACI,UAAU;IACV,YAAY;IACZ,eAAe;AACnB;AACA;IACI,YAAY;IACZ,iBAAiB;IACjB,yBAAyB;IACzB,kBAAkB;AACtB;AACA;IACI,YAAY;IACZ,WAAW;IACX,eAAe;AACnB;AACA;IACI,YAAY;IACZ,yBAAyB;IACzB,kBAAkB;AACtB;AACA;IACI,kDAA2B;IAC3B,gCAAgC;IAChC,wBAAwB;AAC5B;AACA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,SAAS;IACT,yCAAyC;IACzC,oBAAoB;IACpB,gBAAgB;IAChB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,gBAAgB;IAChB,yBAAyB;IACzB,sBAAsB;AAC1B;AACA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,UAAU;IACV,wCAAwC;IACxC,oBAAoB;IACpB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,gBAAgB;IAChB,sBAAsB;IACtB,SAAS;AACb;AACA;IACI,kBAAkB;IAClB,cAAc;IACd,YAAY;IACZ,6BAA6B;AACjC;AACA;IACI,sBAAsB;IACtB,iBAAiB;IACjB,YAAY;IACZ,gBAAgB;IAChB,SAAS;IACT,cAAc;IACd,eAAe;IACf,kBAAkB;IAClB,WAAW;IACX,gBAAgB;;AAEpB;AACA;IACI,WAAW;IACX,SAAS;IACT,aAAa;IACb,WAAW;AACf;AACA;IACI,mBAAmB;IACnB,aAAa;IACb,yBAAyB;IACzB,cAAc;AAClB;AACA;IACI,qBAAqB;IACrB,eAAe;IACf,kBAAkB;IAClB,eAAe;IACf,WAAW;IACX,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,gBAAgB;AACpB;AACA;IACI,mBAAmB;IACnB,WAAW;AACf;AACA;IACI,mBAAmB;AACvB;;;AAGA;IACI,wBAAwB;IACxB,gBAAgB;AACpB;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,kBAAkB;IAClB,gBAAgB;AACpB;;;AAGA;IACI,kBAAkB;IAClB,wBAAwB;IACxB,OAAO;IACP,QAAQ;AACZ;AACA;IACI,UAAU;IACV,WAAW;IACX,kBAAkB;IAClB,KAAK;IACL,wBAAwB;IACxB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,iBAAiB;IACjB,eAAe;IACf,gBAAgB;AACpB;AACA;IACI,wBAAwB;IACxB,uBAAuB;AAC3B;AACA;IACI,UAAU;IACV,cAAc;IACd,kBAAkB;IAClB,UAAU;IACV,WAAW;IACX,0BAA0B;AAC9B;AACA;IACI,kBAAkB;IAClB,SAAS;IACT,cAAc;AAClB;AACA;IACI,eAAe;IACf,UAAU;IACV,WAAW;AACf;AACA;IACI,SAAS;IACT,WAAW;;IAEX,gBAAgB;IAChB,kBAAkB;AACtB;AACA;IACI,kBAAkB;IAClB,KAAK;IACL,MAAM;IACN,UAAU;IACV,WAAW;IACX,cAAc;AAClB;AACA;IACI,UAAU;IACV,cAAc;IACd,kBAAkB;IAClB,MAAM;IACN,KAAK;IACL,UAAU;IACV,WAAW;IACX,mDAA4B;IAC5B,qBAAqB;AACzB;AACA;IACI,aAAa;IACb,WAAW;IACX,UAAU;IACV,cAAc;IACd,cAAc;AAClB;AACA;IACI,iBAAiB;IACjB,kBAAkB;AACtB;AACA;IACI,UAAU;IACV,UAAU;IACV,kBAAkB;IAClB,kBAAkB;AACtB;AACA;IACI,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;IAClB,SAAS;IACT,gBAAgB;IAChB,eAAe;AACnB;AACA;IACI,eAAe;IACf,kBAAkB;IAClB,QAAQ;AACZ;AACA;IACI,cAAc;IACd,iBAAiB;AACrB;AACA;IACI,eAAe;AACnB;AACA;IACI,cAAc;IACd,iBAAiB;AACrB;AACA;IACI,kBAAkB;IAClB,qBAAqB;IACrB,kBAAkB;IAClB,eAAe;IACf,eAAe;IACf,gBAAgB;AACpB;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,QAAQ;IACR,eAAe;IACf,WAAW;AACf;AACA;IACI,QAAQ;IACR,eAAe;AACnB;AACA;IACI,cAAc;IACd,kBAAkB;IAClB,gBAAgB;IAChB,UAAU;IACV,gBAAgB;IAChB,UAAU;IACV,SAAS;IACT,iBAAiB;IACjB,sCAAsC;IACtC,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,WAAW;IACX,mBAAmB;IACnB,aAAa;AACjB;AACA;IACI,cAAc;AAClB;AACA;IACI,eAAe;AACnB;;AAEA;IACI,WAAW;AACf",sourcesContent:[".fcolorpicker-curbox{\r\n    width: 30px;\r\n    height: 30px;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker{\r\n    width: 264px;\r\n    background: #fff;\r\n    border:1px solid #ccc;\r\n    position: fixed;\r\n    top: 100px;\r\n    padding: 6px 10px;\r\n    box-sizing: border-box;\r\n    z-index: 999999;\r\n    /*display: none;*/\r\n    user-select: none;\r\n}\r\n.fcolorpicker.canmove{\r\n    cursor: move;\r\n}\r\n.fcolorpicker>*{\r\n    cursor: auto;\r\n}\r\n.fcolorpicker .fcolor-list{\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    border-bottom: 1px solid #ddd;\r\n    margin-left: 2px;\r\n    padding: 4px 0;\r\n    padding-bottom: 0;\r\n}\r\n.fcolorpicker .color-item{\r\n    flex:0 0 39px;\r\n    cursor: pointer;\r\n    width:39px;\r\n    height:18px;\r\n    background:rgba(239,83,79,1);\r\n    border-radius:2px 0px 0px 0px;\r\n    margin-bottom: 1px;\r\n    margin-right:1px;\r\n    position: relative;\r\n    /*background-image: url(opacity.png);*/\r\n    /*border:1px solid #E0E0E0;*/\r\n}\r\n.fcolorpicker .color-item span{\r\n    position: absolute;\r\n    display: block;\r\n    pointer-events: none;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.fcolorpicker .color-item:before{\r\n    content:'';\r\n    display: block;\r\n    background:url(opacity.png);\r\n    -webkit-background-size: contain;\r\n    background-size: 8px;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    top:0;\r\n    left:0;\r\n}\r\n.fcolorpicker .color-latest .color-item{\r\n    width:26px;\r\n    height:18px;\r\n    background:rgba(255,255,255,1);\r\n    border-radius:2px;\r\n    /*border:1px solid rgba(224,224,224,1);*/\r\n    flex:0 0 26px;\r\n    margin-right: 4px;\r\n    margin-bottom: 4px;\r\n}\r\n.fcolorpicker .color-btns{\r\n    display: block;\r\n    /*justify-content: space-between;*/\r\n    padding-top: 10px;\r\n    /*align-items: center;*/\r\n}\r\n.fcolorpicker .color-btns .color-preview{\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom:6px;\r\n}\r\n.fcolorpicker .color-palette{\r\n    display: flex;\r\n    height: 131px;\r\n    /*padding: 8px;*/\r\n    margin-top:6px;\r\n}\r\n.fcolorpicker .color-palette .lightness{\r\n    flex:0 0 212px;\r\n    height: 129px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n    overflow: visible;\r\n}\r\n.fcolorpicker .color-palette .lightness canvas{\r\n    width:100%;\r\n    height: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .hue{\r\n    flex:0 0 6px;\r\n    margin-right: 8px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .hue canvas,.color-palette .opacity canvas{\r\n    height: 100%;\r\n    width: 100%;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-palette .opacity{\r\n    flex:0 0 6px;\r\n    /*border:1px solid #ccc;*/\r\n    position: relative;\r\n}\r\n.fcolorpicker .color-palette .opacity canvas{\r\n    background:url(opacity.png);\r\n    -webkit-background-size: contain;\r\n    background-size: contain;\r\n}\r\n.fcolorpicker .color-palette .lightbar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: 0px;\r\n    box-shadow: 0 0px 2px rgba(204,204,192,1);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    margin-left:-7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: none;\r\n    border: 4px solid #e0e0e0;\r\n    box-sizing: border-box;\r\n}\r\n.fcolorpicker .color-palette .huebar,.color-palette .opacitybar{\r\n    position: absolute;\r\n    border-radius: 50%;\r\n    left: -4px;\r\n    box-shadow: 0 2px 7px -1px rgb(81 81 78);\r\n    pointer-events: none;\r\n    margin-top: -7px;\r\n    width: 14px;\r\n    height: 14px;\r\n    background: #fff;\r\n    box-sizing: border-box;\r\n    z-index:9;\r\n}\r\n.fcolorpicker .current-color{\r\n    border-radius: 2px;\r\n    flex: 0 0 26px;\r\n    height: 26px;\r\n    /*border: 1px solid #f3f3f3;*/\r\n}\r\n.current-color-value{\r\n    border: 1px solid #ccc;\r\n    line-height: 24px;\r\n    height: 24px;\r\n    margin-left: 2px;\r\n    flex:auto;\r\n    padding: 0 6px;\r\n    font-size: 12px;\r\n    border-radius: 2px;\r\n    color: #666;\r\n    background: #fff;\r\n\r\n}\r\n.current-color-value input{\r\n    width: 100%;\r\n    border: 0;\r\n    outline: none;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-btn-group{\r\n    align-items: center;\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    flex: 0 0 82px;\r\n}\r\n.fcolorpicker .color-btn-group>a{\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    text-align: center;\r\n    background: red;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    height: 27px;\r\n    border-radius: 2px;\r\n    line-height: 26px;\r\n    padding: 0 10px;\r\n    margin-left: 6px;\r\n}\r\n.fcolorpicker .color-btn-group .cancel-color{\r\n    background: #d9e5f4;\r\n    color: #333;\r\n}\r\n.fcolorpicker .color-btn-group .confirm-color{\r\n    background: #57a4ff;\r\n}\r\n\r\n\r\n.fcolorpicker .color-gradient{\r\n    width: calc(100% - 18px);\r\n    margin-left: 9px;\r\n}\r\n.fcolorpicker .gradient-bar-container{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    position: relative;\r\n    padding-top:34px;\r\n}\r\n\r\n\r\n.fcolorpicker .gradient-colors{\r\n    position: absolute;\r\n    width: calc(100% - 22px);\r\n    left: 0;\r\n    top: 6px;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item{\r\n    width:16px;\r\n    height:16px;\r\n    position: absolute;\r\n    top:0;\r\n    border:1px solid #d9d7d7;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin-left: -9px;\r\n    cursor: pointer;\r\n    background: #fff;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.on{\r\n    border:1px solid #57a4ff;\r\n    /*background: #57a4ff;*/\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item.deleting-item:after{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    width:100%;\r\n    height:100%;\r\n    background: rgba(0,0,0,.5);\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item:before{\r\n    position: absolute;\r\n    top: 12px;\r\n    color: #928f8f;\r\n}\r\n.fcolorpicker .gradient-colors .gradient-item .color{\r\n    background:blue;\r\n    width:12px;\r\n    height:12px;\r\n}\r\n.fcolorpicker .gradient-bar{\r\n    flex:auto;\r\n    height:14px;\r\n\r\n    margin-right:6px;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-bar span{\r\n    position: absolute;\r\n    top:0;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    display: block;\r\n}\r\n.fcolorpicker .gradient-bar:before{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    left:0;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background: url(opacity.png);\r\n    background-size: 10px;\r\n}\r\n.fcolorpicker .add-gradient{\r\n    flex:0 0 16px;\r\n    height:16px;\r\n    width:16px;\r\n    color: #57A4FF;\r\n    cursor:pointer;\r\n}\r\n.fcolorpicker .gradient-angle{\r\n    padding-top: 10px;\r\n    margin-bottom:22px;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle{\r\n    width:100%;\r\n    height:4px;\r\n    background:#d5d3d3;\r\n    position: relative;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle div{\r\n    width:14px;\r\n    height:14px;\r\n    border-radius:50%;\r\n    background:#57A4FF;\r\n    position: absolute;\r\n    top: -6px;\r\n    margin-left:-7px;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .gradient-angle .current-angle span{\r\n    font-size: 12px;\r\n    position: absolute;\r\n    top: 8px;\r\n}\r\n.fcolorpicker .color-type{\r\n    font-size:14px;\r\n    margin-bottom:0px;\r\n}\r\n.fcolorpicker .color-type span{\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-type .on{\r\n    color: #57a4ff;\r\n    font-weight: BOLD;\r\n}\r\n.fcolorpicker .color-slidedown{\r\n    position: relative;\r\n    display: inline-block;\r\n    padding-right:14px;\r\n    cursor: pointer;\r\n    font-size: 12px;\r\n    margin-right:2px;\r\n}\r\n.fcolorpicker .color-slidedown:before{\r\n    position: absolute;\r\n    right: 0px;\r\n    top: 3px;\r\n    font-size: 12px;\r\n    color: #666;\r\n}\r\n.fcolorpicker .color-slidedown p{\r\n    margin:0;\r\n    cursor: pointer;\r\n}\r\n.fcolorpicker .color-slidedown ul{\r\n    display: block;\r\n    position: absolute;\r\n    background: #000;\r\n    z-index: 9;\r\n    list-style: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    line-height: 26px;\r\n    box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);\r\n    border-radius: 2px;\r\n    padding: 4px 10px;\r\n    font-size: 12px;\r\n    color: #fff;\r\n    white-space: nowrap;\r\n    display: none;\r\n}\r\n.fcolorpicker .color-slidedown.down ul{\r\n    display: block;\r\n}\r\n.fcolorpicker .color-slidedown ul li{\r\n    cursor: pointer;\r\n}\r\n\r\n.fcolorpicker .color-slidedown.color-format-type ul{\r\n    bottom:20px;\r\n}\r\n"],sourceRoot:""}]),o.default=e},"./src/xncolorpicker.css":
/*!*******************************!*\
  !*** ./src/xncolorpicker.css ***!
  \*******************************/function(r,o,n){n.r(o);var t=n(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),e=n.n(t),t=n(/*! !!../node_modules/css-loader/dist/cjs.js!./xncolorpicker.css */"./node_modules/css-loader/dist/cjs.js!./src/xncolorpicker.css"),n={insert:"head",singleton:!1};e()(t.default,n);o.default=t.default.locals||{}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/function(r,o,e){var n,t,s=function(){return n=void 0===n?Boolean(window&&document&&document.all&&!window.atob):n},i=(t={},function(r){if(void 0===t[r]){var o=document.querySelector(r);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(r){o=null}t[r]=o}return t[r]}),c=[];function d(r){for(var o=-1,n=0;n<c.length;n++)if(c[n].identifier===r){o=n;break}return o}function a(r,o){for(var n={},t=[],e=0;e<r.length;e++){var i=r[e],l=o.base?i[0]+o.base:i[0],s=n[l]||0,a="".concat(l," ").concat(s);n[l]=s+1;s=d(a),i={css:i[1],media:i[2],sourceMap:i[3]};-1!==s?(c[s].references++,c[s].updater(i)):c.push({identifier:a,updater:function(o,r){var n,t,e;{var i;e=r.singleton?(i=g++,n=u=u||p(r),t=A.bind(null,n,i,!1),A.bind(null,n,i,!0)):(n=p(r),t=function(r,o,n){var t=n.css,e=n.media,n=n.sourceMap;e?r.setAttribute("media",e):r.removeAttribute("media");n&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */"));if(r.styleSheet)r.styleSheet.cssText=t;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(t))}}.bind(null,n,r),function(){var r;null!==(r=n).parentNode&&r.parentNode.removeChild(r)})}return t(o),function(r){r?r.css===o.css&&r.media===o.media&&r.sourceMap===o.sourceMap||t(o=r):e()}}(i,o),references:1}),t.push(a)}return t}function p(r){var o,n=document.createElement("style"),t=r.attributes||{};if(void 0!==t.nonce||(o=e.nc)&&(t.nonce=o),Object.keys(t).forEach(function(r){n.setAttribute(r,t[r])}),"function"==typeof r.insert)r.insert(n);else{r=i(r.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}return n}var l,h=(l=[],function(r,o){return l[r]=o,l.filter(Boolean).join("\n")});function A(r,o,n,t){n=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;r.styleSheet?r.styleSheet.cssText=h(o,n):(t=document.createTextNode(n),(n=r.childNodes)[o]&&r.removeChild(n[o]),n.length?r.insertBefore(t,n[o]):r.appendChild(t))}var u=null,g=0;r.exports=function(r,i){(i=i||{}).singleton||"boolean"==typeof i.singleton||(i.singleton=s());var l=a(r=r||[],i);return function(r){if(r=r||[],"[object Array]"===Object.prototype.toString.call(r)){for(var o=0;o<l.length;o++){var n=d(l[o]);c[n].references--}for(var r=a(r,i),t=0;t<l.length;t++){var e=d(l[t]);0===c[e].references&&(c[e].updater(),c.splice(e,1))}l=r}}}},"./src/opacity.png":
/*!*************************!*\
  !*** ./src/opacity.png ***!
  \*************************/function(r,o,n){n.r(o),o.default="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA5SURBVHgB7dOxDQAgDANBgxjE+0/lTYARXKSIIn9tXRNl3R+MJDkzbBQXMGAH8LgfQNLa5SgBR4IPUi8JxinXq5EAAAAASUVORK5CYII="}},t={};function l(r){if(t[r])return t[r].exports;var o=t[r]={id:r,exports:{}};return n[r](o,o.exports,l),o.exports}l.n=function(r){var o=r&&r.__esModule?function(){return r.default}:function(){return r};return l.d(o,{a:o}),o},l.d=function(r,o){for(var n in o)l.o(o,n)&&!l.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:o[n]})},l.o=function(r,o){return Object.prototype.hasOwnProperty.call(r,o)},l.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},function(){
/*!******************************!*\
  !*** ./src/xncolorpicker.js ***!
  \******************************/
var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r};l(/*! ./xnquery.js */"./src/xnquery.js");var t=(r=r=l(/*! ./colorFormat.min.js */"./src/colorFormat.min.js"))&&r.__esModule?r:{default:r};l(/*! ./xncolorpicker.css */"./src/xncolorpicker.css");var e,s,o,r=(r=document.getElementsByTagName("script"))[r.length-1];function i(r){this.pos={left:0,top:0},this.moved=!1,this.id=this.getRandomString(),this.btns={cn:["取消","确定"],en:["Cancel","OK"]},this.colorTypeList={cn:{single:"纯色","linear-gradient":"线性渐变","radial-gradient":"径向渐变"},en:{single:"Solid","linear-gradient":"Linear","radial-gradient":"Radial"}},this.show=!1,this.option=s.extend({},o,r),r.prevcolors?this.option.prevcolors=r.prevcolors:this.option.prevcolors=o.prevcolors,this.option.colorTypeOption=this.option.colorTypeOption?this.option.colorTypeOption.split(","):["single","linear-gradient","radial-gradient"],this.currentColorFormat=this.option.format,this.option.selector,this.$el=s(this.option.selector),this.lastColor=this.option.color,this.initCurrentColorBox(),this.addPosEvent()}(r=document.querySelector?r.src:r.getAttribute("src",4)).substr(0,+r.lastIndexOf("/")),
function(r){for(var o=0;o<r.length;o++){var n=r[o],t=document.getElementsByTagName("head")[0],e=document.createElement("link");e.type="text/css",e.rel="stylesheet",e.href=n,t.appendChild(e)}}(["//at.alicdn.com/t/font_2330183_hjqs7adohe.css"]),e=window,s=XNQuery,o={color:"#ffffff",selector:"",showprecolor:!0,prevcolors:["#EF534F","#BA69C8","#FFD54F","#81C784","#7FDEEA","#90CAF9","#F44436","#AB47BC","#FFC106","#66BB6A","#25C6DA","#4EC3F7","#E53934","#9D27B0","#FFA726","#4CAF50","#00ACC1","#29B6F6","#D32E30","#8F24AA","#FB8C01","#378E3C","#0097A7","#02AAF4","#C62928","#7B1FA2","#F57C02","#2F7D31","#00838F","#029BE5","#B71B1C","#6A1B9A","#EF6C00","#34691D","#006164","#0388D1","#980A0B","#4A148C","#E65100","#1A5E20","#004D41","#01579B","#00000000","#FFFFFF","#DBDBDB","#979797","#606060","#000000"],showhistorycolor:!0,historycolornum:16,format:"rgba",showPalette:!0,show:!1,alwaysShow:!1,lang:"cn",colorTypeOption:"single,linear-gradient,radial-gradient",canMove:!0,autoConfirm:!1},i.prototype={getRandomString:function(r){r=r||8;for(var o="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",n=o.length,t="",e=0;e<r;e++)t+=o.charAt(Math.floor(Math.random()*n));return t},initCurrentColorBox:function(){var o=this;this.curcolordom=document.createElement("div"),this.curcolordom.classList.add("fcolorpicker-curbox"),this.curcolordom.style.background=this.option.color,this.$el.empty().append(this.curcolordom),this.curcolordom.onclick=function(r){o.changeShow()},this.option.show&&(o.init(),s(o.dom).show())},changeShow:function(r){this.dom&&"block"==s(this.dom).css("display")||r?this.option.alwaysShow||(s(this.dom).remove(),this.dom=null,this.moved=!1,this.show=!1):(this.init(),s(this.dom).show(),this.show=!0,this.setPosition())},init:function(){this.initDom(),this.initColorFormat(),this.option.showPalette?(this.initPalette(),this.initColorBand(),this.initOpacity()):this.dom.querySelector(".color-palette").style.display="none",this.setPrevColors(),this.getHistoryColors(),this.setPosition(),this.changeColorFormatType(!0),s(this.dom).hide()},initDom:function(){var r=!0,o=document.body.querySelector(".fcolorpicker#"+this.id);o||((o=document.createElement("div")).classList.add("fcolorpicker"),this.option.canMove&&o.classList.add("canmove"),o.id=this.id,r=!1);for(var n="",t=0;t<this.option.colorTypeOption.length;t++){var e=this.option.colorTypeOption[t];n+='<li class="color-type-item" data-type="'+e+'">'+this.colorTypeList[this.option.lang][e]+"</li>"}var i='\n            <div class="color-type color-slidedown iconfontcolorpicker iconcolorpickerxiala">\n               <p class="color-slidedown-curbox"></p>\n               <ul>\n                   '+n+'\n               </ul>\n            </div>\n            <div class="color-gradient">\n                <div class="gradient-bar-container">\n                    <div class="gradient-colors">\n                        <div class="gradient-item iconfontcolorpicker iconcolorpicker1" style="left:10%">\n                            <div class="color"></div>\n                        </div>\n                        <div class="gradient-item iconfontcolorpicker iconcolorpicker1" style="left:20%">\n                            <div class="color"></div>\n                        </div>\n                    </div>\n                    <div class="gradient-bar">\n                        <span></span>\n                    </div>\n                    <a class="add-gradient iconfontcolorpicker iconcolorpicker11"></a>\n                </div>\n                <div class="gradient-angle">\n                    <div class="current-angle">\n                      <div class="angle-bar"></div>\n                      <span>30°</span>\n</div>\n</div>\n            </div>\n            <div class="color-palette">\n                <div class="lightness">\n                    <div class="lightbar"></div>\n                </div>\n                <div class="hue">\n                    <div class="huebar"></div>\n                </div>\n                <div class="opacity">\n                    <div class="opacitybar"></div>\n                </div>\n            </div>\n            \x3c!--            <p>最近使用</p>--\x3e\n            <div class="color-latest fcolor-list">\n            </div>\n\x3c!--            <p>预置颜色</p>--\x3e\n            <div class="color-recommend fcolor-list">\n            </div>\n\n            <div class="color-btns">\n                <div class="color-preview">\n                    <div class="color-format-type color-slidedown iconfontcolorpicker iconcolorpickerxiala">\n                       <p class="color-slidedown-curbox">RGBA</p>\n                       <ul>\n                        <li class="color-format-type-item" data-type="rgba">RGBA</li>\n                        <li class="color-format-type-item" data-type="hex">HEX</li>\n                        <li class="color-format-type-item" data-type="hsla">HSLA</li>\n                       </ul>\n                    </div>\n                    <div class="current-color"></div>\n                    <div class="current-color-value">\n                        <input type="text" onfocus="this.select()">\n                    </div>\n                </div>\n                \n                <div class="color-btn-group">\n                    <a class="cancel-color">'+this.btns[this.option.lang][0]+'</a>\n                    <a class="confirm-color">'+this.btns[this.option.lang][1]+"</a>\n                </div>\n            </div>";o.innerHTML=i,this.dom=o,document.body.appendChild(this.dom),this.canvasSize={width:212,height:129},this.lightbar=this.dom.querySelector(".lightbar"),this.huebar=this.dom.querySelector(".huebar"),this.opacitybar=this.dom.querySelector(".opacitybar"),this.option.showprecolor||s(this.dom).find(".color-recommend").hide(),this.option.showhistorycolor||s(this.dom).find(".color-latest").hide(),this.option.colorTypeOption.length<2&&s(this.dom).find(".color-type").remove(),this.setPosition(),r||this.addEvent(),this.addBlurEvent()},addPosEvent:function(){var r=this;e.addEventListener("scroll",function(){r.setPosition()}),e.addEventListener("resize",function(){r.setPosition()})},moveDom:function(r,o){var n;this.dom&&(this.moved=!0,n=o.clientX-r.x+this.pos.left,r=o.clientY-r.y+this.pos.top,this.dom.style.top=r+"px",this.dom.style.left=n+"px")},setPosition:function(){var r,o,n,t,e,i,l;this.dom&&!this.moved&&this.show&&(r=document.documentElement.clientWidth,o=document.documentElement.clientHeight,t=(n=this.$el.get(0).querySelector("div")).getBoundingClientRect().top,l=n.getBoundingClientRect().left,e=s(this.dom).outerWidth(),i=s(this.dom).outerHeight(),l=r-l<=e?l-e-10:l+10+n.offsetWidth,(t=o-t<i?t-i-n.offsetHeight:t)<10&&(t=10),this.dom.style.top=t+"px",this.dom.style.left=l+"px",this.pos={left:l,top:t})},addHistoryColors:function(){var r=this.color[this.currentColorFormat];this.hiscolors||(this.hiscolors=[]);for(var o=0;o<this.hiscolors.length;o++)if((0,t.default)({color:this.hiscolors[o],format:this.currentColorFormat}).complete==r){this.hiscolors.splice(o,1);break}this.hiscolors.unshift(r),e.localStorage.setItem("fcolorpicker",this.hiscolors.join(";")),this.rendHisColors(),this.setPosition()},getHistoryColors:function(){var r=e.localStorage.getItem("fcolorpicker");this.hiscolors=(r||"").split(";"),this.rendHisColors()},clearHistoryColors:function(){this.hiscolors=[],e.localStorage.setItem("fcolorpicker",this.hiscolors.join(";")),this.rendHisColors(),this.setPosition()},rendHisColors:function(){if(this.option.showhistorycolor){s(this.dom).find(".color-latest").empty();for(var r,o=0;o<(this.option.historycolornum<0?this.hiscolors.length:this.option.historycolornum);o++)this.hiscolors[o]&&""!=this.hiscolors[o]&&(r='\n                    <div class="color-item" data-color="'+this.hiscolors[o]+'">\n                    <span style="background:'+this.hiscolors[o]+'"></span>\n</div>\n                ',s(this.dom).find(".color-latest").append(r))}},setPrevColors:function(){if(this.option.showprecolor)for(var r=0;r<this.option.prevcolors.length;r++){var o='\n                    <div class="color-item" data-color="'+this.option.prevcolors[r]+'">\n                    <span style="background:'+this.option.prevcolors[r]+'"></span>\n</div>\n                ';s(this.dom).find(".color-recommend").append(o)}},addBlurEvent:function(){var o=this;this.dom.querySelector("input").onblur=function(r){o.setColor(o.dom.querySelector(".current-color-value input").value)}},cancleFun:function(){this.initColorFormat(this.lastColor,!0);var r={colorType:this.currentColorType};"single"==this.currentColorType?(r.color=this.color,this.lastColor=this.color.rgba):(r.color=this.gradientColor,this.lastColor=this.gradientColor.str),this.changeCurColorDom(),this.option.onCancel(r),this.changeShow(!0)},getCurrentColor:function(r){this.initColorFormat(this.dom.querySelector(".current-color-value input").value,!0),this.addHistoryColors();var o={colorType:this.currentColorType};return"single"==this.currentColorType?(o.color=this.color,r&&(this.lastColor=this.color.rgba)):(o.color=this.gradientColor,r&&(this.lastColor=this.gradientColor.str)),this.changeCurColorDom(),o},addEvent:function(){var t=this,e=null,i=this,l={top:0,left:0,bartop:0,isGradientBar:!1,$ele:null};i.dom.addEventListener("mousedown",function(r){var o,n=s(r.target);e=null,0<n.parents(".lightness").length()&&(e="lightness"),0<n.parents(".hue").length()&&(e="hue",o=100*r.offsetY/i.canvasSize.height,i.huebar.style.top=o.toFixed(2)+"%",l.bartop=parseFloat(i.huebar.style.top)),0<n.parents(".opacity").length()&&(e="opacity",o=100*r.offsetY/i.canvasSize.height,i.opacitybar.style.top=o.toFixed(2)+"%",l.bartop=parseFloat(i.opacitybar.style.top)),l.x=r.clientX,l.y=r.clientY,e&&i.changeColor(e,r,null),(n=n.parents(".gradient-item").get(0)?n.parents(".gradient-item"):n).hasClass("gradient-item")&&(l.isGradientBar=!0,t.gradientIndex=n.index(),t.updateGradientBar(),t.setCurrentGradientColor(),l.$ele=n),n.hasClass("add-gradient")&&(t.gradientColor.arry.colors.push({per:100,color:"#ffffff"}),t.gradientColor=t.revertGradientToString(t.gradientColor.arry),t.gradientIndex=t.gradientColor.arry.colors.length-1,t.rendInputValue(),t.rendGradientColors(),t.updateGradientBar()),n.hasClass("angle-bar")&&(l.isGradientBar=!1,l.isAngleBar=!0),n.get(0)==t.dom&&t.option.canMove?l.isMove=!0:l.isMove=!1}),document.addEventListener("mousemove",function(r){var o;e?i.changeColor(e,r,l):l.isGradientBar?(o=(100*(r.clientX-s(t.dom).find(".gradient-colors").get(0).getBoundingClientRect().left)/s(t.dom).find(".gradient-colors").get(0).getBoundingClientRect().width).toFixed(1),t.gradientColor.arry.colors.length<3?(o=100<o?100:o)<0&&(o=0):-5<=(o=100<o&&o<=105?100:o)&&o<0&&(o=0),t.gradientColor.arry.colors[t.gradientIndex].per=o,l.$ele.css({left:o+"%"}),t.updateGradientColors(!0),t.changeCurColorDom(),o<-5||105<o?l.$ele.addClass("deleting-item"):l.$ele.removeClass("deleting-item")):l.isAngleBar&&(360<(o=(o=(360*(r.clientX-s(t.dom).find(".gradient-angle").get(0).getBoundingClientRect().left)/s(t.dom).find(".gradient-angle").get(0).getBoundingClientRect().width).toFixed(1))<0?0:o)&&(o=360),t.gradientColor.arry.angle=o,t.updateAngleBar(),t.updateGradientColors(),t.changeCurColorDom()),l.isMove&&t.moveDom(l,r)}),document.addEventListener("mouseup",function(r){var o;l.isGradientBar&&(o=(100*(r.clientX-s(t.dom).find(".gradient-colors").get(0).getBoundingClientRect().left)/s(t.dom).find(".gradient-colors").get(0).getBoundingClientRect().width).toFixed(1),2<t.gradientColor.arry.colors.length&&(105<o||o<-5)&&(t.gradientColor.arry.colors.splice(t.gradientIndex,1),l.$ele.remove(),t.updateGradientBar(),t.gradientColor=t.revertGradientToString(t.gradientColor.arry),t.rendInputValue()),o=i.getCurrentColor(t.option.autoConfirm),i.option.onChange(o),t.option.autoConfirm&&t.option.onConfirm(o)),(e||l.isAngleBar)&&(o=i.getCurrentColor(t.option.autoConfirm),i.option.onChange(o),t.option.autoConfirm&&t.option.onConfirm(o)),e=null,l.isGradientBar=!1,l.isAngleBar=!1,l.isMove&&(o=r.clientX-l.x+t.pos.left,r=r.clientY-l.y+t.pos.top,t.pos.left=o,t.pos.top=r),l.isMove=!1}),this.dom.addEventListener("click",function(r){r.stopPropagation();var o,r=s(r.target);if(r.hasClass("color-item")){i.getColorFormat(r.attr("data-color")),i.fillOpacity(),i.fillPalette(),i.addHistoryColors(),"single"!=t.currentColorType&&(t.updateGradientColors(),t.changeCurColorDom());var n=i.getCurrentColor(t.option.autoConfirm);return i.option.onChange(n),void(t.option.autoConfirm&&t.option.onConfirm(n))}if(r.hasClass("cancel-color")&&t.cancleFun(),r.hasClass("confirm-color")){n=i.getCurrentColor(!0);return i.option.onConfirm(n),void i.changeShow(!0)}(r=r.hasClass("color-slidedown-curbox")?r.parent():r).hasClass("color-slidedown")&&(r.hasClass("down")?r.removeClass("down"):r.addClass("down")),r.hasClass("color-type-item")&&(r.hasClass("on")?r.parents(".color-slidedown").removeClass("down"):(o=r.attr("data-type"),t.currentColorType=o,t.changeColorType())),r.hasClass("color-format-type-item")&&(r.hasClass("on")?r.parents(".color-slidedown").removeClass("down"):(o=r.attr("data-type"),t.currentColorFormat=o,t.changeColorFormatType()))});function r(r){r.stopPropagation(),i.dom&&r.target!=i.dom&&s(r.target).parents(".fcolorpicker").get(0)!=i.dom&&s(r.target).get(0)!=i.curcolordom&&"block"==s(i.dom).css("display")&&i.cancleFun(),s(t.dom).find(".color-slidedown").not(s(r.target).parents(".color-slidedown").get(0)).removeClass("down")}this.removeMouseDownEvent=function(){document.removeEventListener("mousedown",r)},document.addEventListener("mousedown",r)},changeColor:function(r,o,n){if(r){var t=o.offsetX,e=o.offsetY;if(n){var i=100*(o.clientY-n.y)/this.canvasSize.height+n.bartop;if(99.9<i&&"lightness"!=r)return;i<0&&(i=0)}else i=(100*o.offsetY/this.canvasSize.height).toFixed(2);switch(r){case"hue":this.huebar.style.top=i+"%",c="hsla("+360*i/100+","+this.color.hslav[1]+"%,"+this.color.hslav[2]+"%,"+this.color.hslav[3]+")";break;case"lightness":t=o.clientX-this.dom.querySelector(".lightness").getBoundingClientRect().left;(e=o.clientY-this.dom.querySelector(".lightness").getBoundingClientRect().top)<0&&(e=0),(t=t<0?0:t)>this.dom.querySelector(".lightness canvas").getBoundingClientRect().width&&(t=this.dom.querySelector(".lightness canvas").getBoundingClientRect().width),e>this.dom.querySelector(".lightness canvas").getBoundingClientRect().height&&(e=this.dom.querySelector(".lightness canvas").getBoundingClientRect().height);var l=this.color.hslav[0],s=t/this.canvasSize.width*100,a=100-e/this.canvasSize.height*100,a=this.HSBToRGB({h:l,s:s,b:a}),c="rgba("+a.r+","+a.g+","+a.b+","+this.color.rgbav[3]+")";this.lightbar.style.top=e+"px",this.lightbar.style.left=t+"px";break;case"opacity":i=99.2<i?100:i,this.opacitybar.style.top=i+"%",c="rgba("+this.color.rgbav[0]+","+this.color.rgbav[1]+","+this.color.rgbav[2]+","+((100-i)/100).toFixed(2)+")"}this.getColorFormat(c),"hue"==r&&(this.fillOpacity(),this.fillPalette()),this.setPosition(),"single"!=this.currentColorType&&this.updateGradientColors(),this.changeCurColorDom()}},HSBToRGB:function(r){var o={},n=r.h,t=255*r.s/100,e=255*r.b/100;return 0==t?o.r=o.g=o.b=e:(e=n%60*((r=e)-(t=(255-t)*e/255))/60,(n=360==n?0:n)<60?(o.r=r,o.b=t,o.g=t+e):n<120?(o.g=r,o.b=t,o.r=r-e):n<180?(o.g=r,o.r=t,o.b=t+e):n<240?(o.b=r,o.r=t,o.g=r-e):n<300?(o.b=r,o.g=t,o.r=t+e):n<360?(o.r=r,o.g=t,o.b=r-e):(o.r=0,o.g=0,o.b=0)),{r:Math.round(o.r),g:Math.round(o.g),b:Math.round(o.b)}},updateGradientColors:function(r){this.gradientColor.arry.colors[this.gradientIndex].color=this.color.rgba,this.updateGradientBar(),this.updateGradientColorItem(this.gradientIndex,this.color.rgba),this.gradientColor=this.revertGradientToString(this.gradientColor.arry),this.rendInputValue(),r||this.rendGradientColors()},rendInputValue:function(){this.dom&&this.dom.querySelector(".current-color")&&("single"!=this.currentColorType?(this.dom.querySelector(".current-color").style.background=this.gradientColor.str,this.dom.querySelector(".current-color-value input").value=this.gradientColor.str):(this.dom.querySelector(".current-color").style.background=this.color[this.currentColorFormat],this.dom.querySelector(".current-color-value input").value=this.color[this.currentColorFormat]))},initColorBand:function(){var r=document.createElement("canvas");this.ctxhue=r.getContext("2d"),r.width=10,r.height=this.canvasSize.height,this.dom.querySelector(".color-palette .hue").appendChild(r),this.ctxhue.rect(0,0,10,this.canvasSize.height);r=this.ctxhue.createLinearGradient(0,0,0,this.canvasSize.height);r.addColorStop(0,"rgba(255, 0, 0, 1)"),r.addColorStop(.17,"rgba(255, 255, 0, 1)"),r.addColorStop(.34,"rgba(0, 255, 0, 1)"),r.addColorStop(.51,"rgba(0, 255, 255, 1)"),r.addColorStop(.68,"rgba(0, 0, 255, 1)"),r.addColorStop(.85,"rgba(255, 0, 255, 1)"),r.addColorStop(1,"rgba(255, 0, 0, 1)"),this.ctxhue.fillStyle=r,this.ctxhue.fill()},initOpacity:function(){var r=document.createElement("canvas");this.ctxopacity=r.getContext("2d"),r.width=10,r.height=this.canvasSize.height,this.dom.querySelector(".color-palette .opacity").appendChild(r),this.fillOpacity()},fillOpacity:function(){var r;this.ctxopacity&&(this.ctxopacity.clearRect(0,0,10,this.canvasSize.height),(r=this.ctxlightness.createLinearGradient(0,0,10,this.canvasSize.height)).addColorStop(0,"rgba("+this.color.rgbav[0]+","+this.color.rgbav[1]+","+this.color.rgbav[2]+",1)"),r.addColorStop(1,"rgba("+this.color.rgbav[0]+","+this.color.rgbav[1]+","+this.color.rgbav[2]+",0)"),this.ctxopacity.fillStyle=r,this.ctxopacity.fillRect(0,0,10,this.canvasSize.height))},initPalette:function(){this.canvas=document.createElement("canvas"),this.ctxlightness=this.canvas.getContext("2d"),this.canvas.width=this.canvasSize.width,this.canvas.height=this.canvasSize.height,this.dom.querySelector(".color-palette .lightness").appendChild(this.canvas),this.fillPalette()},fillPalette:function(){var r,o,n;this.ctxlightness&&(this.ctxlightness.fillStyle="hsla("+this.color.hslav[0]+",100%,50%,1)",r=this.canvasSize.width,o=this.canvasSize.height,this.ctxlightness.fillRect(0,0,r,o),(n=this.ctxlightness.createLinearGradient(0,0,r,0)).addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(1,"rgba(255,255,255,0)"),this.ctxlightness.fillStyle=n,this.ctxlightness.fillRect(0,0,r,o),(n=this.ctxlightness.createLinearGradient(0,0,0,o)).addColorStop(0,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,1)"),this.ctxlightness.fillStyle=n,this.ctxlightness.fillRect(0,0,r,o),this.updatelightbar())},updatelightbar:function(){var r,o;this.dom&&(this.lightbar=this.dom.querySelector(".lightbar"),this.lightbar&&(r=(o=this.RGBToHSB({r:this.color.rgbav[0],g:this.color.rgbav[1],b:this.color.rgbav[2]})).s*this.canvasSize.width/100,o=(100-o.b)*this.canvasSize.height/100,this.lightbar.style.top=o+"px",this.lightbar.style.left=r+"px"))},RGBToHSB:function(r){var o={h:0,s:0,b:0},n=Math.min(r.r,r.g,r.b),t=Math.max(r.r,r.g,r.b),e=t-n;return o.b=t,o.s=0!=t?255*e/t:0,0!=o.s?r.r==t?o.h=(r.g-r.b)/e:r.g==t?o.h=2+(r.b-r.r)/e:o.h=4+(r.r-r.g)/e:o.h=-1,t==n&&(o.h=0),o.h*=60,o.h<0&&(o.h+=360),o.s*=100/255,o.b*=100/255,o},setColor:function(r){this.initColorFormat(r),this.fillOpacity(),this.fillPalette(),this.addHistoryColors(),this.changeCurColorDom(),this.lastColor=r},getColor:function(r){return this.color},initColorFormat:function(r,o){"object"==(void 0===(r=r||this.lastColor)?"undefined":n(r))?(this.gradientColor=this.revertGradientToString(r),-1<this.gradientColor.str.indexOf("linear-gradient")?this.currentColorType="linear-gradient":this.currentColorType="radial-gradient"):-1<r.toLowerCase().indexOf("linear-gradient")||-1<r.toLowerCase().indexOf("radial-gradient")?(this.gradientColor=this.revertGradientToArray(r),-1<this.gradientColor.str.indexOf("linear-gradient")?this.currentColorType="linear-gradient":this.currentColorType="radial-gradient"):(this.getColorFormat(r||"#000"),this.currentColorType="single"),o||(this.changeColorType(!0),"single"!=this.currentColorType&&(this.setCurrentGradientColor(),this.updateAngleBar(),this.updateGradientColors(),this.rendGradientColors()))},setCurrentGradientColor:function(){this.getColorFormat(this.gradientColor.arry.colors[this.gradientIndex].color),this.fillPalette()},updateAngleBar:function(){s(this.dom).find(".current-angle span").html(this.gradientColor.arry.angle+"°"),s(this.dom).find(".current-angle .angle-bar").css({left:this.gradientColor.arry.angle/3.6+"%"})},updateGradientColorItem:function(r,o){s(this.dom).find(".gradient-item").eq(r).find(".color").css({background:o})},updateGradientBar:function(){var r=this.revertGradientToString(this.gradientColor.arry,!0);s(this.dom).find(".gradient-bar span").css({background:r.str}),s(this.dom).find(".gradient-item").removeClass("on").eq(this.gradientIndex).addClass("on")},rendGradientColors:function(){for(var r="",o=0;o<this.gradientColor.arry.colors.length;o++)r+='<div class="gradient-item iconfontcolorpicker iconcolorpicker1" style="left:'+this.gradientColor.arry.colors[o].per+'%">\n                            <div class="color" style="background:'+this.gradientColor.arry.colors[o].color+'"></div>\n                        </div>';s(this.dom).find(".gradient-colors").empty().append(r),s(this.dom).find(".gradient-item").removeClass("on").eq(this.gradientIndex).addClass("on")},setColorTypeDom:function(){s(this.dom).find(".color-type").get(0)&&(s(this.dom).find(".color-type li").removeClass("on"),s(this.dom).find(".color-type-item[data-type="+this.currentColorType+"]").addClass("on"),s(this.dom).find(".color-type").removeClass("down"),s(this.dom).find(".color-type .color-slidedown-curbox").get(0).innerHTML=s(this.dom).find(".color-type-item[data-type="+this.currentColorType+"]").get(0).innerHTML)},changeColorFormatType:function(r){s(this.dom).find(".color-format-type li").removeClass("on"),s(this.dom).find(".color-format-type-item[data-type="+this.currentColorFormat+"]").addClass("on"),s(this.dom).find(".color-format-type").removeClass("down"),s(this.dom).find(".color-format-type .color-slidedown-curbox").get(0).innerHTML=s(this.dom).find(".color-format-type-item[data-type="+this.currentColorFormat+"]").get(0).innerHTML;var o=this.getCurrentColor(this.option.autoConfirm);this.rendInputValue(),r||(this.option.onChange(o),this.option.autoConfirm&&this.option.onConfirm(o))},changeColorType:function(r){this.gradientIndex=0;var o=this.option.colorTypeOption.indexOf(this.currentColorType)<0;o&&(this.currentColorType=this.option.colorTypeOption[0]),"single"==this.currentColorType?(r&&!o||this.getColorFormat(this.gradientColor?this.gradientColor.arry.colors[0].color:"#ffffff"),s(this.dom).find(".color-gradient").hide()):(r&&!o||this.gradientColor||(this.gradientColor={type:this.currentColorType},this.initColorFormat({type:this.currentColorType,angle:0,colors:[{per:0,color:this.color.rgba},{per:100,color:"rgba(0,0,0,0)"}]})),this.gradientColor.arry.type!=this.currentColorType&&(this.gradientColor.arry.type=this.currentColorType,this.gradientColor=this.revertGradientToString(this.gradientColor.arry)),s(this.dom).find(".color-gradient").show(),this.rendGradientColors(),this.updateGradientBar(),this.updateAngleBar(),this.changeCurColorDom(),"linear-gradient"==this.currentColorType?s(this.dom).find(".gradient-angle").show():s(this.dom).find(".gradient-angle").hide()),this.setColorTypeDom(),this.rendInputValue(),this.setPosition()},getColorFormat:function(r){if(this.color=this.getColorFormatFunc(r),this.color.rgbav=this.color.rgba.slice(5,this.color.rgba.indexOf(")")).split(","),this.color.hslav=this.color.hsla.slice(5,this.color.hsla.indexOf(")")).split(",").map(function(r){return-1<r.indexOf("%")?r.slice(0,r.indexOf("%")):r}),this.dom){if("single"==this.currentColorType){if(this.changeCurColorDom(),!this.show)return;this.dom.querySelector(".current-color").style.background=this.color.rgba,this.dom.querySelector(".current-color-value input").value=this.color[this.currentColorFormat]}this.setBarPos()}},changeCurColorDom:function(){"single"==this.currentColorType?this.curcolordom.style.background=this.color.rgba:this.curcolordom.style.background=this.gradientColor.str},getColorFormatFunc:function(r){r.indexOf("rgb")<0&&r.indexOf("#")<0&&r.indexOf("hsl")<0&&(r="rgba(0,0,0,0)");r={rgba:(0,t.default)({color:r,format:"rgba"}).complete,hsla:(0,t.default)({color:r,format:"hsla"}).complete,hex:(0,t.default)({color:r,format:"hex"}).complete};return!r.rgba||-1<r.rgba.indexOf("NaN")?this.dom?void(this.dom.querySelector(".current-color-value input").value=this.color[this.currentColorFormat]):void 0:r},setBarPos:function(){this.opacitybar.style.top=100*(1-this.color.rgbav[3])+"%",0!=parseFloat(this.color.hslav[1])&&(this.huebar.style.top=100*this.color.hslav[0]/360+"%")},replace:function(){var r=""+(arguments.length<=0?void 0:arguments[0]);return arguments.length<3?r:r.replace(arguments.length<=1?void 0:arguments[1],arguments.length<=2?void 0:arguments[2])},revertGradientToArray:function(r){var o=this,n="";r=r.toLowerCase();r=this.replace(r,/(rgba\(.*?\))/gi,function(r){return o.getColorFormatFunc(r).hex}),-1<(r=this.replace(r,/(hsla\(.*?\))/gi,function(r){return o.getColorFormatFunc(r).hex})).toLowerCase().indexOf("radial-gradient")&&(n="radial-gradient"),-1<r.toLowerCase().indexOf("linear-gradient")&&(n="linear-gradient");for(var t=r.slice(r.toLowerCase().indexOf(n)+16,r.toLowerCase().lastIndexOf(")")).split(",").map(function(r){return r.trim()}),e={type:n,angle:"linear-gradient"==n?parseFloat(t[0]).toFixed(0):0,colors:[]},i="linear-gradient"==n?1:0;i<t.length;i++){var l=t[i].split(" ");e.colors.push({color:l[0],per:l[1]?parseFloat(l[1]):100*(i-1)/(t.length-2)})}return{str:this.revertGradientToString(e).str,arry:e}},revertGradientToString:function(r,o){var n=(o?"linear-gradient":r.type)+"(";o?n+="to right,":"linear-gradient"==r.type&&(n+=parseFloat(r.angle).toFixed(1)+"deg,");for(var t=0;t<r.colors.length;t++){var e=this.getColorFormatFunc(r.colors[t].color)[this.currentColorFormat];n+=(r.colors[t].color=e)+" "+parseFloat(r.colors[t].per).toFixed(1),""!=r.colors[t].per&&(n+="%"),t<r.colors.length-1&&(n+=",")}return{str:n+=")",arry:r}},$copy:function(r){var o=document.createElement("textarea");o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="2em",o.style.height="2em",o.style.padding="0",o.style.border="none",o.style.outline="none",o.style.boxShadow="none",o.style.background="transparent",o.value=r,document.body.appendChild(o),o.select();try{var n=document.execCommand("copy")?"成功复制到剪贴板":"该浏览器不支持点击复制到剪贴板";layer.msg(n,{skin:"suclayer"})}catch(r){layer.msg("该浏览器不支持点击复制到剪贴板",{skin:"errorlayer"})}document.body.removeChild(o)},destroy:function(){s(this.dom).remove(),this.removeMouseDownEvent?this.removeMouseDownEvent():{},this.curcolordom.onclick=null}},e.XNColorPicker=i}()}();


    // these code copied from https://github.com/EisFrei/IngressPortalHistoryFlags, made some modifications.
    function svgToIcon(str, s) {
        const url = ("data:image/svg+xml," + encodeURIComponent(str)).replace(/#/g, '%23');
        return new L.Icon({
            iconUrl: url,
            iconSize: [s, s],
            iconAnchor: [s / 2, s / 2],
            className: 'no-pointer-events', //allows users to click on portal under the unique marker
        })
    }
    function drawPortalFlags(portal) {
        const drawMissing = window.plugin.upcv.settings.drawMissing;
        var type = portal.options.ent[2][18];
        portal._historyLayer = new L.LayerGroup();

        if(!(type & UPC_FLAG) && (type & UPV_FLAG)){
            L.marker(portal._latlng, {
                icon: window.plugin.upcv.iconVisited[portal.options.level],
                interactive: false,
                keyboard: false,
            }).addTo(portal._historyLayer);
        }
        if (drawMissing && !(type & UPV_FLAG) || !drawMissing && type & UPC_FLAG) {
            L.marker(portal._latlng, {
                icon: window.plugin.upcv.iconCaptured[portal.options.level],
                interactive: false,
                keyboard: false,
            }).addTo(portal._historyLayer);
        }
        if (drawMissing && !(type & SCOUT_FLAG) || !drawMissing && type & SCOUT_FLAG) {
            L.marker(portal._latlng, {
                icon: window.plugin.upcv.iconScouted[portal.options.level],
                interactive: false,
                keyboard: false,
            }).addTo(portal._historyLayer);
        }
        portal._historyLayer.addTo(window.plugin.upcv.layerGroup);
    }

    function drawAllFlags() {
        window.plugin.upcv.layerGroup.clearLayers();
        var tileParams = window.getCurrentZoomTileParameters ? window.getCurrentZoomTileParameters() : window.getMapZoomTileParameters();
        if (tileParams.level !== 0) {
            return;
        }

        for (let id in window.portals) {
            drawPortalFlags(window.portals[id]);
        }
    }
    function count_portals_stat(){
        var displayBounds = map.getBounds();
        var upv = 0
        var upc = 0
        var scouted = 0
        var total = 0

        $.each(window.portals, function(i, portal) {
            var type = portal.options.ent[2][18];
            var visit_state = type&2?2:type&1
            var scout_state = type&4

            if(!displayBounds.contains(portal.getLatLng())) return true;
            total++;
            if(scout_state) scouted++;
            switch (visit_state){
                case 1 :
                    upv++;
                    break;
                case 2 :
                    upc++;
                    break;
                default:
                    break;
            }
        });
        return {"upv":upv, "upc":upc, "scouted":scouted, "total":total}
    }

    function getSVGString(size, color, parts, offset) {
        const path = size * Math.PI/(2*parts);
        const cap = size * Math.PI*(1-1/(2*parts))
        const arcOffset = path / parts * (parts - 1);
        const rotate = 180/parts+(parts-1)*135+offset*90;
        return `<svg width="${(size+4)}" height="${(size+4)}" xmlns="http://www.w3.org/2000/svg"><circle stroke="${color}" stroke-width="4" fill="transparent" cx="${(size+4)/2}" cy="${(size+4)/2}" r="${(size/2)}" stroke-dasharray="${path}, ${cap}" stroke-dashoffset="${arcOffset}" transform="rotate(${rotate}, ${((size+4)/2)}, ${((size+4)/2)})" /></svg>`;
    }
    function format(str) {
      var re = /%s/;
      for(var i = 1; i < arguments.length; i++) {
        str = str.replace(re, arguments[i]);
      }
      return str;
    }
    function make_pie_label(startAngle, endAngle, color){
      var labelAngle = (endAngle + startAngle) / 2;
      var label = Math.round((endAngle - startAngle) * 100) + '%';
      labelAngle = 0.5 - labelAngle;
      var lx  = Math.sin(labelAngle * 2 * Math.PI) * RADIUS / 1.5;
      var ly  = Math.cos(labelAngle * 2 * Math.PI) * RADIUS / 1.5;

      var text = $('<text>')
        .attr({
          'text-anchor': 'middle',
          'dominant-baseline' :'central',
          x: lx,
          y: ly
        })
        .html(label);
      return text;
    }
    function make_pie(startAngle, endAngle, color) {
      if(startAngle == endAngle)
        return $([]);
      var large_arc = (endAngle - startAngle) > 0.5 ? 1 : 0;
      startAngle = 0.5 - startAngle;
      endAngle   = 0.5 - endAngle;      

      var p1x = Math.sin(startAngle * 2 * Math.PI) * RADIUS;
      var p1y = Math.cos(startAngle * 2 * Math.PI) * RADIUS;
      var p2x = Math.sin(endAngle   * 2 * Math.PI) * RADIUS;
      var p2y = Math.cos(endAngle   * 2 * Math.PI) * RADIUS;      

      // for a full circle, both coordinates would be identical, so no circle would be drawn
      if(startAngle == 0.5 && endAngle == -0.5)
        p2x -= 1E-5;      

      var path = $('<path>')
        .attr({
          fill: color,
          d: format('M %s,%s A %s,%s 0 %s 1 %s,%s L 0,0 z', p1x,p1y, RADIUS, RADIUS, large_arc, p2x,p2y)
        });

      return path; // concat path and text
    };
    function make_pie_graph(datas, svg){
      var last_data = 0;
      for (var i = 0; i < datas.length; i++) {
        startAngle = last_data;
        endAngle = last_data+datas[i].data;
        color = datas[i].color;
        make_pie(startAngle, endAngle, color).appendTo(svg);
        last_data = endAngle;
      }
      last_data = 0
      for (i = 0; i < datas.length; i++) {
        startAngle = last_data;
        endAngle = last_data+datas[i].data;
        color = datas[i].color;
        make_pie_label(startAngle, endAngle, color).appendTo(svg);
        last_data = endAngle;
      }
    }

    function make_state_piesvg(portals_state) {
        var svg = $('<svg width="260" height="120" id="portal-visited-pie">').css('margin-top', 10);
        var g = $('<g>')
          .attr('transform', format('translate(%s,%s)', 70, 50))
          .appendTo(svg);
        var datas = [
          {"data":portals_state.upv/portals_state.total, "color":window.plugin.upcv.settings.upv_color},
          {"data":portals_state.upc/portals_state.total, "color":window.plugin.upcv.settings.upc_color},
          {"data":1-(portals_state.upv+portals_state.upc)/portals_state.total, "color":COLORS[0]},
        ]
        make_pie_graph(datas, g)
        $('<text fill="white">UPV/C</text>')
            .attr('transform', format('translate(%s,%s)', -19, 65))
            .appendTo(g)

        g = $('<g>')
          .attr('transform', format('translate(%s,%s)', 190, 50))
          .appendTo(svg);
        datas = [
          {"data":portals_state.scouted/portals_state.total, "color":window.plugin.upcv.settings.scouted_color},
          {"data":1-(portals_state.scouted)/portals_state.total, "color":COLORS[0]},
        ]
        make_pie_graph(datas, g)
        $('<text fill="white">Scouted</text>')
            .attr('transform', format('translate(%s,%s)', -25, 65))
            .appendTo(g)

        var svg_html = $('<div>').append(svg).html()
        return svg_html
    }

    function createIcons() {
        var LEVEL_TO_RADIUS = [7, 7, 7, 7, 8, 8, 9, 10, 11];
        window.plugin.upcv.iconCaptured = {};
        window.plugin.upcv.iconVisited = {};
        window.plugin.upcv.iconScouted = {};

        const parts = window.plugin.upcv.settings.showVisited + window.plugin.upcv.settings.showScouted;

        LEVEL_TO_RADIUS.forEach((el, idx) => {
            let size = el * 2 + 8;
            let offset = 0;
            if (window.plugin.upcv.settings.showVisited) {
                window.plugin.upcv.iconVisited[idx] = svgToIcon(getSVGString(size, window.plugin.upcv.settings.upv_color, parts, offset), size + 4);
                window.plugin.upcv.iconCaptured[idx] = svgToIcon(getSVGString(size, window.plugin.upcv.settings.upc_color, parts, offset), size + 4);
                offset++;
            } else {
                window.plugin.upcv.iconVisited[idx] = svgToIcon(getSVGString(size, 'transparent', parts, offset), size + 4);
                window.plugin.upcv.iconCaptured[idx] = svgToIcon(getSVGString(size, 'transparent', parts, offset), size + 4);
            }
            if (window.plugin.upcv.settings.showScouted) {
                window.plugin.upcv.iconScouted[idx] = svgToIcon(getSVGString(size, window.plugin.upcv.settings.scouted_color, parts, offset), size + 4);
            } else {
                window.plugin.upcv.iconScouted[idx] = svgToIcon(getSVGString(size, 'transparent', parts, offset), size + 4);
            }
        });
    }

    window.plugin.upcv.removePortalFromMap = function (data) {
        if (!data.portal._historyLayer) {
            return;
        }
        window.plugin.upcv.layerGroup.removeLayer(data.portal._historyLayer);
    }

    window.plugin.upcv.addToPortalMap = function (data) {
        var type = data.portal.options.ent[2][18];
        var portal_level = data.portal.options.data.level;
        if (portal_level == undefined) return;
        var tileParams = window.getCurrentZoomTileParameters ? window.getCurrentZoomTileParameters() : window.getMapZoomTileParameters();
        if (tileParams.level === 0) {
            drawPortalFlags(data.portal);
        } else {
            window.plugin.upcv.removePortalFromMap(data);
        }
    }

    window.plugin.upcv.toggleDisplayMode = function () {
        var portals_state = count_portals_stat()

        var svg_html = make_state_piesvg(portals_state)

        var dialog_html =  `
        <div id="portal-visited">
            <table>
                <th style="text-align:left; color:#ffce00">Uniques count in view</th>
                <tr><td>Toral:</td><td>${portals_state.total}</td></tr>
                <tr><td>UPV:</td><td>${portals_state.upv}</td></tr>
                <tr><td>UPC:</td><td>${portals_state.upc}</td></tr>
                <tr><td>Scouted:</td><td>${portals_state.scouted}</td></tr>
            </table>
            ${svg_html}
            <hr>
            <table>
                <th style="text-align:left; color:#ffce00">Settings</th>
                <tr>
                  <td>
                    <label>Dispaly mode:</label>
                  </td>
                </tr>
                <tr>
                    <td>
                        <label><input name="portal-visited-settings--display-mode" id="portal-visited-settings-display-recived" style="vertical-align: text-bottom;outline:none;" type="radio" value="recived"  ${window.plugin.upcv.settings.drawMissing?'':'checked'}/>recived</label> 
                        <label><input name="portal-visited-settings--display-mode" id="portal-visited-settings-display-missing" style="vertical-align: text-bottom;outline:none;" type="radio" value="missing"  ${window.plugin.upcv.settings.drawMissing?'checked':''}/>missing</label> 
                    </td>
                </tr>
                <tr>
                  <td>
                    <label>Dispaly item:</label>
                  </td>
                </tr>
                <tr>
                    <td><input type="checkbox" id="portal-visited-settings--show-visited" ${window.plugin.upcv.settings.showVisited?'checked':''}><label> Show visited</label></td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td style="vertical-align: middle;">upv color: </td><td><div style ="display:inline-table" id="portal-visited-settings--color-visited"></div></td>
                                <td style="vertical-align: middle;">upc color: </td><td><div style ="display:inline-table" id="portal-visited-settings--color-captured"></div></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" id="portal-visited-settings--show-scouted" ${window.plugin.upcv.settings.showScouted?'checked':''}><label> Show scouted</label></td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td style="vertical-align: middle;">scouted color: </td>
                                <td><div style ="display:inline-table" id="portal-visited-settings--color-scouted"></div></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
`
        dialog({
            html: dialog_html,
            title: 'Portal Visited',
            id: 'plugin-portal-visited',
            width: '300px',
            closeCallback: function () {
                const elMode = document.getElementById('portal-visited-settings-display-missing');
                const elVisited = document.getElementById('portal-visited-settings--show-visited');
                const elScouted = document.getElementById('portal-visited-settings--show-scouted');

                window.plugin.upcv.settings.drawMissing = elMode.checked;
                window.plugin.upcv.settings.showVisited = elVisited.checked;
                window.plugin.upcv.settings.showScouted = elScouted.checked;

                try {
                    if (upv_pallete) {upv_pallete.destroy();}
                } catch (e) {
                    console.log("destroy got upv")
                }
                try {
                    if (upc_pallete) {upc_pallete.destroy();}
                } catch (e) {
                    console.log("destroy got upc")
                }
                try {
                    if (scouted_pallete) {scouted_pallete.destroy();}
                } catch (e) {
                    console.log("destroy got scout")
                }

                localStorage[KEY_SETTINGS] = JSON.stringify(window.plugin.upcv.settings);
                createIcons();
                drawAllFlags();
            }
        });

        var upv_pallete = new XNColorPicker({
            color: window.plugin.upcv.settings.upv_color,
            selector: "#portal-visited-settings--color-visited",
            showprecolor: true,
            prevcolors: null,
            showhistorycolor: false,
            format: 'hex',
            showPalette:true,
            show:false,
            lang:'en',
            colorTypeOption:'single',
            onError: function (e) {
            },
            onCancel:function(color){
            },
            onChange:function(color){
            },
            onConfirm:function(color){
                window.plugin.upcv.settings.upv_color = color.color.hex;
                $("#portal-visited-pie")[0].outerHTML = make_state_piesvg(portals_state)
            }
        })
        var upc_pallete = new XNColorPicker({
            color: window.plugin.upcv.settings.upc_color,
            selector: "#portal-visited-settings--color-captured",
            showprecolor: true,
            prevcolors: null,
            showhistorycolor: false,
            format: 'hex',
            showPalette:true,
            show:false,
            lang:'en',
            colorTypeOption:'single,linear-gradient,radial-gradient',
            onError: function (e) {
            },
            onCancel:function(color){
            },
            onChange:function(color){
            },
            onConfirm:function(color){
                window.plugin.upcv.settings.upc_color = color.color.hex;
                $("#portal-visited-pie")[0].outerHTML = make_state_piesvg(portals_state)
            }
        })
        var scouted_pallete = new XNColorPicker({
            color: window.plugin.upcv.settings.scouted_color,
            selector: "#portal-visited-settings--color-scouted",
            showprecolor: true,
            prevcolors: null,
            showhistorycolor: false,
            format: 'hex',
            showPalette:true,
            show:false,
            lang:'en',
            colorTypeOption:'single,linear-gradient,radial-gradient',
            onError: function (e) {
            },
            onCancel:function(color){
            },
            onChange:function(color){
            },
            onConfirm:function(color){
                window.plugin.upcv.settings.scouted_color = color.color.hex;
                $("#portal-visited-pie")[0].outerHTML = make_state_piesvg(portals_state)
            }
        })
    }
    ///////////////////////////////////////////////////////////////////////////////

    window.plugin.upcv.upcv = function(data) {
        var type = data.portal.options.ent[2][18];
        var portal_level = data.portal.options.data.level;
        if (portal_level == undefined) return;
        if(type & UPC_FLAG){
            data.portal.setStyle({fillColor: window.plugin.upcv.settings.upc_color, fillOpacity: 1 });
        }else if(type & UPV_FLAG){
            data.portal.setStyle({fillColor: window.plugin.upcv.settings.upv_color,fillOpacity: 1 });
        }
    }
    window.plugin.upcv.not_upcv = function(data) {
        var type = data.portal.options.ent[2][18];
        var portal_level = data.portal.options.data.level;
        if (portal_level == undefined) return;
        if(type&UPC_FLAG){
            return
        }
        if(type&UPV_FLAG){
            data.portal.setStyle({fillColor: window.plugin.upcv.settings.upv_color,fillOpacity: 1 });
        }
        else{
            data.portal.setStyle({fillColor: window.plugin.upcv.settings.upc_color, fillOpacity: 1 });
        }

    }
    window.plugin.upcv.scouted = function(data) {
        var type = data.portal.options.ent[2][18];
        var portal_level = data.portal.options.data.level;
        if (portal_level == undefined) return;
        if(type & SCOUT_FLAG){
            data.portal.setStyle({fillColor: window.plugin.upcv.settings.scouted_color, fillOpacity: 1});
        }
    }
    window.plugin.upcv.not_scouted = function(data) {
        var type = data.portal.options.ent[2][18];
        var portal_level = data.portal.options.data.level;
        if (portal_level == undefined) return;
        if(!(type & SCOUT_FLAG)){
            data.portal.setStyle({fillColor: window.plugin.upcv.settings.scouted_color, fillOpacity: 1 });
        }
    }

    var setup = function() {
        try {
            window.plugin.upcv.settings = JSON.parse(localStorage[KEY_SETTINGS]);
        } catch (e) {
            window.plugin.upcv.settings = {
                drawMissing: false,
                showVisited: true,
                showScouted: false,
                upv_color: UPV_COLOR,
                upc_color: UPC_COLOR,
                scouted_color: SCOUT_COLOR,
            };
        }
        createIcons()
        window.plugin.upcv.layerGroup = new L.LayerGroup();
        window.addLayerGroup('Portal Visited', window.plugin.upcv.layerGroup, false);

        window.addHook('portalAdded', window.plugin.upcv.addToPortalMap);
        window.addHook('portalRemoved', window.plugin.upcv.removePortalFromMap);
        window.map.on('zoom', drawAllFlags);
        $('#toolbox').append('<a onclick="window.plugin.upcv.toggleDisplayMode()">Portal Visited</a>');

        window.addPortalHighlighter('Portal UPC/V', window.plugin.upcv.upcv);
        window.addPortalHighlighter('Portal not UPC/V', window.plugin.upcv.not_upcv);
        window.addPortalHighlighter('Portal Scouted', window.plugin.upcv.scouted);
        window.addPortalHighlighter('Portal not Scouted', window.plugin.upcv.not_scouted);
    }
    // PLUGIN END //////////////////////////////////////////////////////////
    setup.info = plugin_info;
    if(!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    if(window.iitcLoaded && typeof setup === 'function') setup();
}
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
