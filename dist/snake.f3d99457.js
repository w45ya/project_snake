parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hRTX":[function(require,module,exports) {
"use strict";module.exports=function(r,n){return function(){for(var t=new Array(arguments.length),e=0;e<t.length;e++)t[e]=arguments[e];return r.apply(n,t)}};
},{}],"Feqj":[function(require,module,exports) {
"use strict";var r=require("./helpers/bind"),t=Object.prototype.toString;function n(r){return"[object Array]"===t.call(r)}function e(r){return void 0===r}function o(r){return null!==r&&!e(r)&&null!==r.constructor&&!e(r.constructor)&&"function"==typeof r.constructor.isBuffer&&r.constructor.isBuffer(r)}function i(r){return"[object ArrayBuffer]"===t.call(r)}function u(r){return"undefined"!=typeof FormData&&r instanceof FormData}function c(r){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(r):r&&r.buffer&&r.buffer instanceof ArrayBuffer}function f(r){return"string"==typeof r}function a(r){return"number"==typeof r}function l(r){return null!==r&&"object"==typeof r}function s(r){if("[object Object]"!==t.call(r))return!1;var n=Object.getPrototypeOf(r);return null===n||n===Object.prototype}function p(r){return"[object Date]"===t.call(r)}function d(r){return"[object File]"===t.call(r)}function y(r){return"[object Blob]"===t.call(r)}function b(r){return"[object Function]"===t.call(r)}function j(r){return l(r)&&b(r.pipe)}function v(r){return"undefined"!=typeof URLSearchParams&&r instanceof URLSearchParams}function B(r){return r.replace(/^\s*/,"").replace(/\s*$/,"")}function m(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function g(r,t){if(null!=r)if("object"!=typeof r&&(r=[r]),n(r))for(var e=0,o=r.length;e<o;e++)t.call(null,r[e],e,r);else for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&t.call(null,r[i],i,r)}function A(){var r={};function t(t,e){s(r[e])&&s(t)?r[e]=A(r[e],t):s(t)?r[e]=A({},t):n(t)?r[e]=t.slice():r[e]=t}for(var e=0,o=arguments.length;e<o;e++)g(arguments[e],t);return r}function O(t,n,e){return g(n,function(n,o){t[o]=e&&"function"==typeof n?r(n,e):n}),t}function h(r){return 65279===r.charCodeAt(0)&&(r=r.slice(1)),r}module.exports={isArray:n,isArrayBuffer:i,isBuffer:o,isFormData:u,isArrayBufferView:c,isString:f,isNumber:a,isObject:l,isPlainObject:s,isUndefined:e,isDate:p,isFile:d,isBlob:y,isFunction:b,isStream:j,isURLSearchParams:v,isStandardBrowserEnv:m,forEach:g,merge:A,extend:O,trim:B,stripBOM:h};
},{"./helpers/bind":"hRTX"}],"phSU":[function(require,module,exports) {
"use strict";var e=require("./../utils");function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}module.exports=function(i,n,t){if(!n)return i;var a;if(t)a=t(n);else if(e.isURLSearchParams(n))a=n.toString();else{var c=[];e.forEach(n,function(i,n){null!=i&&(e.isArray(i)?n+="[]":i=[i],e.forEach(i,function(i){e.isDate(i)?i=i.toISOString():e.isObject(i)&&(i=JSON.stringify(i)),c.push(r(n)+"="+r(i))}))}),a=c.join("&")}if(a){var o=i.indexOf("#");-1!==o&&(i=i.slice(0,o)),i+=(-1===i.indexOf("?")?"?":"&")+a}return i};
},{"./../utils":"Feqj"}],"xpeW":[function(require,module,exports) {
"use strict";var t=require("./../utils");function e(){this.handlers=[]}e.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},e.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},e.prototype.forEach=function(e){t.forEach(this.handlers,function(t){null!==t&&e(t)})},module.exports=e;
},{"./../utils":"Feqj"}],"IAOH":[function(require,module,exports) {
"use strict";var r=require("./../utils");module.exports=function(t,u,e){return r.forEach(e,function(r){t=r(t,u)}),t};
},{"./../utils":"Feqj"}],"mXc0":[function(require,module,exports) {
"use strict";module.exports=function(t){return!(!t||!t.__CANCEL__)};
},{}],"njyv":[function(require,module,exports) {
"use strict";var e=require("../utils");module.exports=function(t,r){e.forEach(t,function(e,o){o!==r&&o.toUpperCase()===r.toUpperCase()&&(t[r]=e,delete t[o])})};
},{"../utils":"Feqj"}],"Lpyz":[function(require,module,exports) {
"use strict";module.exports=function(e,i,s,t,n){return e.config=i,s&&(e.code=s),e.request=t,e.response=n,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e};
},{}],"NZT3":[function(require,module,exports) {
"use strict";var r=require("./enhanceError");module.exports=function(e,n,o,t,u){var a=new Error(e);return r(a,n,o,t,u)};
},{"./enhanceError":"Lpyz"}],"Ztkp":[function(require,module,exports) {
"use strict";var t=require("./createError");module.exports=function(e,s,u){var a=u.config.validateStatus;u.status&&a&&!a(u.status)?s(t("Request failed with status code "+u.status,u.config,null,u.request,u)):e(u)};
},{"./createError":"NZT3"}],"MLCl":[function(require,module,exports) {
"use strict";var e=require("./../utils");module.exports=e.isStandardBrowserEnv()?{write:function(n,t,o,r,i,u){var s=[];s.push(n+"="+encodeURIComponent(t)),e.isNumber(o)&&s.push("expires="+new Date(o).toGMTString()),e.isString(r)&&s.push("path="+r),e.isString(i)&&s.push("domain="+i),!0===u&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var n=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};
},{"./../utils":"Feqj"}],"R56a":[function(require,module,exports) {
"use strict";module.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)};
},{}],"uRyQ":[function(require,module,exports) {
"use strict";module.exports=function(e,r){return r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e};
},{}],"dm4E":[function(require,module,exports) {
"use strict";var e=require("../helpers/isAbsoluteURL"),r=require("../helpers/combineURLs");module.exports=function(s,u){return s&&!e(u)?r(s,u):u};
},{"../helpers/isAbsoluteURL":"R56a","../helpers/combineURLs":"uRyQ"}],"Zn5P":[function(require,module,exports) {
"use strict";var e=require("./../utils"),t=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];module.exports=function(r){var i,o,n,s={};return r?(e.forEach(r.split("\n"),function(r){if(n=r.indexOf(":"),i=e.trim(r.substr(0,n)).toLowerCase(),o=e.trim(r.substr(n+1)),i){if(s[i]&&t.indexOf(i)>=0)return;s[i]="set-cookie"===i?(s[i]?s[i]:[]).concat([o]):s[i]?s[i]+", "+o:o}}),s):s};
},{"./../utils":"Feqj"}],"Rpqp":[function(require,module,exports) {
"use strict";var t=require("./../utils");module.exports=t.isStandardBrowserEnv()?function(){var r,e=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");function a(t){var r=t;return e&&(o.setAttribute("href",r),r=o.href),o.setAttribute("href",r),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}return r=a(window.location.href),function(e){var o=t.isString(e)?a(e):e;return o.protocol===r.protocol&&o.host===r.host}}():function(){return!0};
},{"./../utils":"Feqj"}],"akUF":[function(require,module,exports) {
"use strict";var e=require("./../utils"),r=require("./../core/settle"),t=require("./../helpers/cookies"),s=require("./../helpers/buildURL"),o=require("../core/buildFullPath"),n=require("./../helpers/parseHeaders"),a=require("./../helpers/isURLSameOrigin"),i=require("../core/createError");module.exports=function(u){return new Promise(function(l,d){var p=u.data,c=u.headers;e.isFormData(p)&&delete c["Content-Type"];var f=new XMLHttpRequest;if(u.auth){var h=u.auth.username||"",m=u.auth.password?unescape(encodeURIComponent(u.auth.password)):"";c.Authorization="Basic "+btoa(h+":"+m)}var w=o(u.baseURL,u.url);if(f.open(u.method.toUpperCase(),s(w,u.params,u.paramsSerializer),!0),f.timeout=u.timeout,f.onreadystatechange=function(){if(f&&4===f.readyState&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))){var e="getAllResponseHeaders"in f?n(f.getAllResponseHeaders()):null,t={data:u.responseType&&"text"!==u.responseType?f.response:f.responseText,status:f.status,statusText:f.statusText,headers:e,config:u,request:f};r(l,d,t),f=null}},f.onabort=function(){f&&(d(i("Request aborted",u,"ECONNABORTED",f)),f=null)},f.onerror=function(){d(i("Network Error",u,null,f)),f=null},f.ontimeout=function(){var e="timeout of "+u.timeout+"ms exceeded";u.timeoutErrorMessage&&(e=u.timeoutErrorMessage),d(i(e,u,"ECONNABORTED",f)),f=null},e.isStandardBrowserEnv()){var R=(u.withCredentials||a(w))&&u.xsrfCookieName?t.read(u.xsrfCookieName):void 0;R&&(c[u.xsrfHeaderName]=R)}if("setRequestHeader"in f&&e.forEach(c,function(e,r){void 0===p&&"content-type"===r.toLowerCase()?delete c[r]:f.setRequestHeader(r,e)}),e.isUndefined(u.withCredentials)||(f.withCredentials=!!u.withCredentials),u.responseType)try{f.responseType=u.responseType}catch(T){if("json"!==u.responseType)throw T}"function"==typeof u.onDownloadProgress&&f.addEventListener("progress",u.onDownloadProgress),"function"==typeof u.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",u.onUploadProgress),u.cancelToken&&u.cancelToken.promise.then(function(e){f&&(f.abort(),d(e),f=null)}),p||(p=null),f.send(p)})};
},{"./../utils":"Feqj","./../core/settle":"Ztkp","./../helpers/cookies":"MLCl","./../helpers/buildURL":"phSU","../core/buildFullPath":"dm4E","./../helpers/parseHeaders":"Zn5P","./../helpers/isURLSameOrigin":"Rpqp","../core/createError":"NZT3"}],"g5IB":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"A14q":[function(require,module,exports) {
var process = require("process");
var e=require("process"),t=require("./utils"),r=require("./helpers/normalizeHeaderName"),n={"Content-Type":"application/x-www-form-urlencoded"};function a(e,r){!t.isUndefined(e)&&t.isUndefined(e["Content-Type"])&&(e["Content-Type"]=r)}function i(){var t;return"undefined"!=typeof XMLHttpRequest?t=require("./adapters/xhr"):void 0!==e&&"[object process]"===Object.prototype.toString.call(e)&&(t=require("./adapters/http")),t}var o={adapter:i(),transformRequest:[function(e,n){return r(n,"Accept"),r(n,"Content-Type"),t.isFormData(e)||t.isArrayBuffer(e)||t.isBuffer(e)||t.isStream(e)||t.isFile(e)||t.isBlob(e)?e:t.isArrayBufferView(e)?e.buffer:t.isURLSearchParams(e)?(a(n,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):t.isObject(e)?(a(n,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};t.forEach(["delete","get","head"],function(e){o.headers[e]={}}),t.forEach(["post","put","patch"],function(e){o.headers[e]=t.merge(n)}),module.exports=o;
},{"./utils":"Feqj","./helpers/normalizeHeaderName":"njyv","./adapters/xhr":"akUF","./adapters/http":"akUF","process":"g5IB"}],"HALK":[function(require,module,exports) {
"use strict";var e=require("./../utils"),r=require("./transformData"),a=require("../cancel/isCancel"),t=require("../defaults");function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}module.exports=function(n){return s(n),n.headers=n.headers||{},n.data=r(n.data,n.headers,n.transformRequest),n.headers=e.merge(n.headers.common||{},n.headers[n.method]||{},n.headers),e.forEach(["delete","get","head","post","put","patch","common"],function(e){delete n.headers[e]}),(n.adapter||t.adapter)(n).then(function(e){return s(n),e.data=r(e.data,e.headers,n.transformResponse),e},function(e){return a(e)||(s(n),e&&e.response&&(e.response.data=r(e.response.data,e.response.headers,n.transformResponse))),Promise.reject(e)})};
},{"./../utils":"Feqj","./transformData":"IAOH","../cancel/isCancel":"mXc0","../defaults":"A14q"}],"fBI1":[function(require,module,exports) {
"use strict";var e=require("../utils");module.exports=function(n,t){t=t||{};var r={},o=["url","method","data"],i=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(n,t){return e.isPlainObject(n)&&e.isPlainObject(t)?e.merge(n,t):e.isPlainObject(t)?e.merge({},t):e.isArray(t)?t.slice():t}function d(o){e.isUndefined(t[o])?e.isUndefined(n[o])||(r[o]=c(void 0,n[o])):r[o]=c(n[o],t[o])}e.forEach(o,function(n){e.isUndefined(t[n])||(r[n]=c(void 0,t[n]))}),e.forEach(i,d),e.forEach(a,function(o){e.isUndefined(t[o])?e.isUndefined(n[o])||(r[o]=c(void 0,n[o])):r[o]=c(void 0,t[o])}),e.forEach(s,function(e){e in t?r[e]=c(n[e],t[e]):e in n&&(r[e]=c(void 0,n[e]))});var f=o.concat(i).concat(a).concat(s),u=Object.keys(n).concat(Object.keys(t)).filter(function(e){return-1===f.indexOf(e)});return e.forEach(u,d),r};
},{"../utils":"Feqj"}],"trUU":[function(require,module,exports) {
"use strict";var e=require("./../utils"),t=require("../helpers/buildURL"),r=require("./InterceptorManager"),o=require("./dispatchRequest"),s=require("./mergeConfig");function i(e){this.defaults=e,this.interceptors={request:new r,response:new r}}i.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[o,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},i.prototype.getUri=function(e){return e=s(this.defaults,e),t(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},e.forEach(["delete","get","head","options"],function(e){i.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}}),e.forEach(["post","put","patch"],function(e){i.prototype[e]=function(t,r,o){return this.request(s(o||{},{method:e,url:t,data:r}))}}),module.exports=i;
},{"./../utils":"Feqj","../helpers/buildURL":"phSU","./InterceptorManager":"xpeW","./dispatchRequest":"HALK","./mergeConfig":"fBI1"}],"qFUg":[function(require,module,exports) {
"use strict";function t(t){this.message=t}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,module.exports=t;
},{}],"VgQU":[function(require,module,exports) {
"use strict";var e=require("./Cancel");function n(n){if("function"!=typeof n)throw new TypeError("executor must be a function.");var o;this.promise=new Promise(function(e){o=e});var r=this;n(function(n){r.reason||(r.reason=new e(n),o(r.reason))})}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n(function(n){e=n}),cancel:e}},module.exports=n;
},{"./Cancel":"qFUg"}],"yisB":[function(require,module,exports) {
"use strict";module.exports=function(n){return function(t){return n.apply(null,t)}};
},{}],"Wzmt":[function(require,module,exports) {
"use strict";var e=require("./utils"),r=require("./helpers/bind"),n=require("./core/Axios"),u=require("./core/mergeConfig"),t=require("./defaults");function i(u){var t=new n(u),i=r(n.prototype.request,t);return e.extend(i,n.prototype,t),e.extend(i,t),i}var l=i(t);l.Axios=n,l.create=function(e){return i(u(l.defaults,e))},l.Cancel=require("./cancel/Cancel"),l.CancelToken=require("./cancel/CancelToken"),l.isCancel=require("./cancel/isCancel"),l.all=function(e){return Promise.all(e)},l.spread=require("./helpers/spread"),module.exports=l,module.exports.default=l;
},{"./utils":"Feqj","./helpers/bind":"hRTX","./core/Axios":"trUU","./core/mergeConfig":"fBI1","./defaults":"A14q","./cancel/Cancel":"qFUg","./cancel/CancelToken":"VgQU","./cancel/isCancel":"mXc0","./helpers/spread":"yisB"}],"O4Aa":[function(require,module,exports) {
module.exports=require("./lib/axios");
},{"./lib/axios":"Wzmt"}],"S1mk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.signIn=c,exports.signOut=d,exports.loggedIn=r;var e=n(require("axios"));function n(e){return e&&e.__esModule?e:{default:e}}var t=document.getElementById("container"),o=document.getElementById("login_container"),l=document.getElementById("loginButton"),s=document.getElementById("login"),u=document.getElementById("password"),i=null;function c(e){i=e,console.log("Вошёл пользователь")}function d(){i=null,console.log("Вышел пользователь")}function r(){return i}t.style.display="none",l.style.fontSize="20px",l.style.height="50px",l.onclick=function(){""!=s.value&&(o.style.display="none",t.style.display="block")};
},{"axios":"O4Aa"}],"OWQN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showTable=o,exports.addToScore=d;var e=document.getElementById("container"),t=document.createElement("table"),n=document.createElement("tbody"),r=[[1,"loser"],[100,"BeatMe"],[42,"Answer"]];function o(){for(;n.hasChildNodes();)n.removeChild(n.firstChild);var o=document.createElement("tr"),d=document.createElement("th");d.textContent="HighScore",d.colSpan="2",o.appendChild(d),n.appendChild(o);for(var a=0;a<r.length;a++){for(var l=r[a],c=document.createElement("tr"),p=0;p<l.length;p++){var i=document.createElement("td");i.textContent=l[p],c.appendChild(i)}n.appendChild(c)}t.appendChild(n),e.appendChild(t)}function d(e,t){r.push([e,t]),r.sort(function(e,t){return t[0]-e[0]})}
},{}],"UZK7":[function(require,module,exports) {
module.exports="/project_snake/GameOver.a95a4e0d.mp3";
},{}],"g3G5":[function(require,module,exports) {
module.exports="/project_snake/FoodEat.76446390.mp3";
},{}],"SA8a":[function(require,module,exports) {
"use strict";var e=i(require("./login")),l=i(require("./highscore.js"));function t(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return t=function(){return e},e}function i(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var l=t();if(l&&l.has(e))return l.get(e);var i={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in e)if(Object.prototype.hasOwnProperty.call(e,c)){var r=n?Object.getOwnPropertyDescriptor(e,c):null;r&&(r.get||r.set)?Object.defineProperty(i,c,r):i[c]=e[c]}return i.default=e,l&&l.set(e,i),i}var n=document.getElementById("cnvs"),c={},r=50,o=require("../data/GameOver.mp3"),y=new Audio(o);o=require("../data/FoodEat.mp3");var s=new Audio(o),f=document.getElementById("playButton"),a=document.getElementById("soundChk"),x=document.getElementById("container"),d=document.getElementById("canvas_container"),u=document.getElementById("login"),v=0,p=1,m=1;function h(){n.style.background="#000000",n.width=window.innerWidth-25-(window.innerWidth-25)%r-1,n.height=window.innerHeight-90-(window.innerHeight-90)%r-1,c.lastTick=performance.now(),c.lastRender=c.lastTick,c.tickLength=250,c.snake={x:5*r,y:r,vx:r,vy:0,cells:[],l:5,color:"#114400"},c.food={x:0,y:0,color:"#ffaa00"},c.antiFood={x:-r,y:-r,color:"#6201ff",isOnScreen:0,isOnScreenTimer:0,appearTime:300,lifeCycle:700,timer:0},c.superFruit={x:-r,y:-r,isOnScreen:0,isOnScreenTimer:0,color1:"#ff0000",color2:"#004200",appearTime:500,lifeCycle:300,timer:0};for(var e=0;e<c.snake.l;e++)c.snake.cells.push({x:c.snake.x-r*e,y:c.snake.y})}function S(e){c.stopCycle=window.requestAnimationFrame(S);var l=0;if(e>c.lastTick+c.tickLength){var t=e-c.lastTick;l=Math.floor(t/c.tickLength)}T(l),w(e),c.lastRender=e}function g(e,l){return Math.floor(Math.random()*(l-e)+e)}function O(e,l,t,i){for(var c,o,y=Math.floor(n.width/r),s=Math.floor(n.height/r),f=0;0===f;){c=g(0,y+1)*r,o=g(0,s+1)*r,f=1;for(var a=0;a<e.cells.length;a++)c===e.cells[a].x&&o===e.cells[a].y&&(f=0);(c===l.x&&o===l.y||c===t.x&&o===t.y||c===i.x&&o===i.y)&&(f=0)}return{x:c,y:o}}function w(e){v++;var l=n.getContext("2d"),t=Math.floor(n.width/r),i=Math.floor(n.height/r),o=c.food,y=c.antiFood,f=c.snake,a=c.superFruit;if(1===v&&(o.x=g(1,t)*r,o.y=g(1,i)*r),l.clearRect(0,0,n.width,n.height),l.fillStyle=o.color,l.fillRect(o.x+r/4,o.y+r/4,r/2,r/2),l.fillStyle=y.color,l.fillRect(y.x+r/3,y.y+r/3,r/3,r/3),l.fillStyle=a.color1,l.fillRect(a.x+r/4,a.y+r/4,r/2,r/2),l.fillStyle=a.color2,l.fillRect(a.x+r/2,a.y+2,r/5,r/5),0===y.isOnScreen&&(y.timer<y.appearTime&&(y.timer+=1),y.timer===y.appearTime)){var x=O(f,o,y,a);y.x=x.x,y.y=x.y,y.isOnScreen=1,y.timer=0}if(y.isOnScreen&&(y.isOnScreenTimer+=1,y.isOnScreenTimer===y.lifeCycle&&(y.isOnScreen=0,y.x=-r,y.y=-r,y.isOnScreenTimer=0)),0===a.isOnScreen&&(a.timer<a.appearTime&&(a.timer+=1),a.timer===a.appearTime)){var d=O(f,o,y,a);a.x=d.x,a.y=d.y,a.isOnScreen=1,a.timer=0}a.isOnScreen&&(a.isOnScreenTimer+=1,a.isOnScreenTimer===a.lifeCycle&&(a.isOnScreen=0,a.x=-r,a.y=-r,a.isOnScreenTimer=0)),f.l<=0&&R(c.stopCycle),f.cells.forEach(function(e,t){if(l.fillStyle=f.color,l.fillRect(e.x,e.y,r,r),l.fillStyle="#000000",0!==f.cells.indexOf(e)?(l.fillRect(e.x+2,e.y+2,r-4,r-4),l.fillStyle=f.color,l.fillRect(e.x+6,e.y+6,r-12,r-12)):0===f.cells.indexOf(e)&&(f.vx===r&&0===f.vy?(l.fillRect(e.x+3*r/5,e.y+r/5,r/5,r/5),l.fillRect(e.x+3*r/5,e.y+3*r/5,r/5,r/5),l.fillStyle="#ff0000",l.fillRect(e.x+r,e.y+2*r/5,r/5,r/5)):f.vx===-r&&0===f.vy?(l.fillRect(e.x+r/5,e.y+r/5,r/5,r/5),l.fillRect(e.x+r/5,e.y+3*r/5,r/5,r/5),l.fillStyle="#ff0000",l.fillRect(e.x-r/5,e.y+2*r/5,r/5,r/5)):0===f.vx&&f.vy===r?(l.fillRect(e.x+r/5,e.y+3*r/5,r/5,r/5),l.fillRect(e.x+3*r/5,e.y+3*r/5,r/5,r/5),l.fillStyle="#ff0000",l.fillRect(e.x+2*r/5,e.y+r,r/5,r/5)):0===f.vx&&f.vy===-r&&(l.fillRect(e.x+r/5,e.y+r/5,r/5,r/5),l.fillRect(e.x+3*r/5,e.y+r/5,r/5,r/5),l.fillStyle="#ff0000",l.fillRect(e.x+2*r/5,e.y-r/5,r/5,r/5))),e.x===o.x&&e.y===o.y){f.l++,1===m&&s.play();var i=O(f,o,y,a);o.x=i.x,o.y=i.y}if(e.x===y.x&&e.y===y.y){f.l--,f.cells.pop(),1===m&&s.play();O(f,o,y,a);y.isOnScreen=0,y.isOnScreenTimer=0,y.x=-r,y.y=-r}e.x===a.x&&e.y===a.y&&(f.l*=2,1===m&&s.play(),a.isOnScreen=0,a.isOnScreenTimer=0,a.x=-r,a.y=-r);for(var n=t+1;n<f.cells.length;n++)e.x===f.cells[n].x&&e.y===f.cells[n].y&&R(c.stopCycle)}),1===p&&(l.fillStyle="#ffffff",l.fillText("Frames: "+v,0,10),l.fillText("SnakeLength: "+f.l,0,20),l.fillText("SoundSet: "+m,0,30))}function k(e){var l=c.snake;l.x+=l.vx,l.y+=l.vy,l.cells.unshift({x:l.x,y:l.y}),l.cells.length>l.l&&l.cells.pop(),(l.y>n.height||l.y<0||l.x>n.width||l.x<0)&&R(c.stopCycle),document.addEventListener("keydown",function(e){"KeyW"!==e.code&&"ArrowUp"!==e.code||0!==l.vy||1!==l.l&&l.cells[1].y===l.cells[0].y-r?"KeyS"!==e.code&&"ArrowDown"!==e.code||0!==l.vy||1!==l.l&&l.cells[1].y===l.cells[0].y+r?"KeyA"!==e.code&&"ArrowLeft"!==e.code||0!==l.vx||1!==l.l&&l.cells[1].x===l.cells[0].x-r?"KeyD"!==e.code&&"ArrowRight"!==e.code||0!==l.vx||1!==l.l&&l.cells[1].x===l.cells[0].x+r?"KeyZ"===e.code?m=1:"KeyX"===e.code?m=0:"KeyI"===e.code?p=1:"KeyO"===e.code?p=0:"Escape"===e.code&&(m=0,R(c.stopCycle)):(l.vx=r,l.vy=0):(l.vx=-r,l.vy=0):(l.vy=r,l.vx=0):(l.vy=-r,l.vx=0)});var t=navigator.getGamepads()[0],i=t.buttons[12],o=t.buttons[13],y=t.buttons[14],s=t.buttons[15];!i.touched||0!==l.vy||1!==l.l&&l.cells[1].y===l.cells[0].y-r||(l.vy=-r,l.vx=0),!o.touched||0!==l.vy||1!==l.l&&l.cells[1].y===l.cells[0].y+r||(l.vy=r,l.vx=0),!y.touched||0!==l.vx||1!==l.l&&l.cells[1].x===l.cells[0].x-r||(l.vy=0,l.vx=-r),!s.touched||0!==l.vx||1!==l.l&&l.cells[1].x===l.cells[0].x+r||(l.vy=0,l.vx=r)}function T(e){for(var l=0;l<e;l++)c.lastTick=c.lastTick+c.tickLength,k(c.lastTick)}function R(e){var t;l.addToScore(c.snake.l,u.value),l.showTable(),window.cancelAnimationFrame(e),n.style.background="#ff0000",1===m?(y.play(),t=10500):t=2e3,setTimeout(function(){x.style.display="block",d.style.display="none"},t)}f.onclick=function(){x.style.display="none",d.style.display="block",m=a.checked?1:0,h(),n.style.border="3px solid #0be2c0",S()};
},{"./login":"S1mk","./highscore.js":"OWQN","../data/GameOver.mp3":"UZK7","../data/FoodEat.mp3":"g3G5"}]},{},["SA8a"], null)
//# sourceMappingURL=/project_snake/snake.f3d99457.js.map