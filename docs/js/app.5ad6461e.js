(function(e){function t(t){for(var r,o,c=t[0],i=t[1],f=t[2],l=0,d=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(t);while(d.length)d.shift()();return u.push.apply(u,f||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a={app:0},u=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-8d3ae226":"3bd6a4c4","chunk-67def1b3":"cc2bcc36","chunk-f5e196d4":"24f94169"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-8d3ae226":1,"chunk-67def1b3":1,"chunk-f5e196d4":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-8d3ae226":"ad800ac0","chunk-67def1b3":"7bca4f30","chunk-f5e196d4":"44b800f5"}[e]+".css",a=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var f=u[c],l=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){f=d[c],l=f.getAttribute("data-href");if(l===r||l===a)return t()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=t,s.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],s.parentNode.removeChild(s),n(u)},s.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(s)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var f,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var d=new Error;f=function(t){l.onerror=l.onload=null,clearTimeout(s);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var s=setTimeout((function(){f({type:"timeout",target:l})}),12e4);l.onerror=l.onload=f,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="https://ph2017.github.io/kitchen-h5/",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],l=f.push.bind(f);f.push=t,f=f.slice();for(var d=0;d<f.length;d++)t(f[d]);var s=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o={id:"app"};function a(e,t){var n=Object(r["F"])("router-view");return Object(r["y"])(),Object(r["f"])("div",o,[Object(r["i"])(n)])}n("6988");var u=n("6b0d"),c=n.n(u);const i={};var f=c()(i,[["render",a]]),l=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),d=[{name:"notFound",path:"/:path(.*)+",redirect:{name:"goods"}},{name:"goods",path:"/goods",component:function(){return Promise.all([n.e("chunk-8d3ae226"),n.e("chunk-f5e196d4")]).then(n.bind(null,"00ce"))},meta:{title:"定制我的智能家电"}},{name:"result",path:"/result",component:function(){return Promise.all([n.e("chunk-8d3ae226"),n.e("chunk-67def1b3")]).then(n.bind(null,"e981"))},meta:{title:"预定成功"}}],s=Object(l["a"])({routes:d,history:Object(l["b"])()});s.beforeEach((function(e,t,n){var r=e.meta&&e.meta.title;r&&(document.title=r),n()}));n("fc4a");var p=Object(r["e"])(f);p.use(s),p.mount("#app")},6988:function(e,t,n){"use strict";n("82f9")},"82f9":function(e,t,n){},fc4a:function(e,t,n){}});
//# sourceMappingURL=app.5ad6461e.js.map