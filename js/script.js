!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Fuse",[],t):"object"==typeof exports?exports.Fuse=t():e.Fuse=t()}(this,function(){return n={},o.m=r=[function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,r){function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=r(2),$=r(8),E=r(0),o=(n(J.prototype,[{key:"setCollection",value:function(e){return this.list=e}},{key:"search",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var r=this._prepareSearchers(e),n=r.tokenSearchers,o=r.fullSearcher,i=this._search(n,o),a=i.weights,s=i.results;return this._computeScore(a,s),this.options.shouldSort&&this._sort(s),t.limit&&"number"==typeof t.limit&&(s=s.slice(0,t.limit)),this._format(s)}},{key:"_prepareSearchers",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var r=e.split(this.options.tokenSeparator),n=0,o=r.length;n<o;n+=1)t.push(new i(r[n],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=1<arguments.length?arguments[1]:void 0,r=this.list,n={},o=[];if("string"==typeof r[0]){for(var i=0,a=r.length;i<a;i+=1)this._analyze({key:"",value:r[i],record:i,index:i},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});return{weights:null,results:o}}for(var s={},c=0,h=r.length;c<h;c+=1)for(var l=r[c],u=0,f=this.options.keys.length;u<f;u+=1){var d=this.options.keys[u];if("string"!=typeof d){if(s[d.name]={weight:1-d.weight||1},d.weight<=0||1<d.weight)throw new Error("Key weight has to be > 0 and <= 1");d=d.name}else s[d]={weight:1};this._analyze({key:d,value:this.options.getFn(l,d),record:l,index:c},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t})}return{weights:s,results:o}}},{key:"_analyze",value:function(e,t){var r=e.key,n=e.arrayIndex,o=void 0===n?-1:n,i=e.value,a=e.record,s=e.index,c=t.tokenSearchers,h=void 0===c?[]:c,l=t.fullSearcher,u=void 0===l?[]:l,f=t.resultMap,d=void 0===f?{}:f,v=t.results,p=void 0===v?[]:v;if(null!=i){var g=!1,y=-1,m=0;if("string"==typeof i){this._log("\nKey: ".concat(""===r?"-":r));var k=u.search(i);if(this._log('Full text: "'.concat(i,'", score: ').concat(k.score)),this.options.tokenize){for(var S=i.split(this.options.tokenSeparator),x=[],b=0;b<h.length;b+=1){var M=h[b];this._log('\nPattern: "'.concat(M.pattern,'"'));for(var _=!1,L=0;L<S.length;L+=1){var w=S[L],A=M.search(w),C={};A.isMatch?(C[w]=A.score,_=g=!0,x.push(A.score)):(C[w]=1,this.options.matchAllTokens||x.push(1)),this._log('Token: "'.concat(w,'", score: ').concat(C[w]))}_&&(m+=1)}y=x[0];for(var I=x.length,O=1;O<I;O+=1)y+=x[O];y/=I,this._log("Token score average:",y)}var j=k.score;-1<y&&(j=(j+y)/2),this._log("Score average:",j);var P=!this.options.tokenize||!this.options.matchAllTokens||m>=h.length;if(this._log("\nCheck Matches: ".concat(P)),(g||k.isMatch)&&P){var F=d[s];F?F.output.push({key:r,arrayIndex:o,value:i,score:j,matchedIndices:k.matchedIndices}):(d[s]={item:a,output:[{key:r,arrayIndex:o,value:i,score:j,matchedIndices:k.matchedIndices}]},p.push(d[s]))}}else if(E(i))for(var T=0,z=i.length;T<z;T+=1)this._analyze({key:r,arrayIndex:T,value:i[T],record:a,index:s},{resultMap:d,results:p,tokenSearchers:h,fullSearcher:u})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var r=0,n=t.length;r<n;r+=1){for(var o=t[r].output,i=o.length,a=1,s=1,c=0;c<i;c+=1){var h=e?e[o[c].key].weight:1,l=(1===h?o[c].score:o[c].score||.001)*h;1!==h?s=Math.min(s,l):a*=o[c].nScore=l}t[r].score=1===s?a:s,this._log(t[r])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var r=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===l(t)&&null!==t){if(-1!==r.indexOf(t))return;r.push(t)}return t})),r=null}var n=[];this.options.includeMatches&&n.push(function(e,t){var r=e.output;t.matches=[];for(var n=0,o=r.length;n<o;n+=1){var i=r[n];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&-1<i.arrayIndex&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}}),this.options.includeScore&&n.push(function(e,t){t.score=e.score});for(var o=0,i=e.length;o<i;o+=1){var a=e[o];if(this.options.id&&(a.item=this.options.getFn(a.item,this.options.id)[0]),n.length){for(var s={item:a.item},c=0,h=n.length;c<h;c+=1)n[c](a,s);t.push(s)}else t.push(a.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}]),J);function J(e,t){var r=t.location,n=void 0===r?0:r,o=t.distance,i=void 0===o?100:o,a=t.threshold,s=void 0===a?.6:a,c=t.maxPatternLength,h=void 0===c?32:c,l=t.caseSensitive,u=void 0!==l&&l,f=t.tokenSeparator,d=void 0===f?/ +/g:f,v=t.findAllMatches,p=void 0!==v&&v,g=t.minMatchCharLength,y=void 0===g?1:g,m=t.id,k=void 0===m?null:m,S=t.keys,x=void 0===S?[]:S,b=t.shouldSort,M=void 0===b||b,_=t.getFn,L=void 0===_?$:_,w=t.sortFn,A=void 0===w?function(e,t){return e.score-t.score}:w,C=t.tokenize,I=void 0!==C&&C,O=t.matchAllTokens,j=void 0!==O&&O,P=t.includeMatches,F=void 0!==P&&P,T=t.includeScore,z=void 0!==T&&T,E=t.verbose,K=void 0!==E&&E;!function(e){if(!(e instanceof J))throw new TypeError("Cannot call a class as a function")}(this),this.options={location:n,distance:i,threshold:s,maxPatternLength:h,isCaseSensitive:u,tokenSeparator:d,findAllMatches:p,minMatchCharLength:y,id:k,keys:x,includeMatches:F,includeScore:z,shouldSort:M,getFn:L,sortFn:A,verbose:K,tokenize:I,matchAllTokens:j},this.setCollection(e)}e.exports=o},function(e,t,r){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=r(3),u=r(4),m=r(7),o=(n(k.prototype,[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,r=t.maxPatternLength,n=t.tokenSeparator;if(this.pattern.length>r)return l(e,this.pattern,n);var o=this.options,i=o.location,a=o.distance,s=o.threshold,c=o.findAllMatches,h=o.minMatchCharLength;return u(e,this.pattern,this.patternAlphabet,{location:i,distance:a,threshold:s,findAllMatches:c,minMatchCharLength:h})}}]),k);function k(e,t){var r=t.location,n=void 0===r?0:r,o=t.distance,i=void 0===o?100:o,a=t.threshold,s=void 0===a?.6:a,c=t.maxPatternLength,h=void 0===c?32:c,l=t.isCaseSensitive,u=void 0!==l&&l,f=t.tokenSeparator,d=void 0===f?/ +/g:f,v=t.findAllMatches,p=void 0!==v&&v,g=t.minMatchCharLength,y=void 0===g?1:g;!function(e){if(!(e instanceof k))throw new TypeError("Cannot call a class as a function")}(this),this.options={location:n,distance:i,threshold:s,maxPatternLength:h,isCaseSensitive:u,tokenSeparator:d,findAllMatches:p,minMatchCharLength:y},this.pattern=this.options.isCaseSensitive?e:e.toLowerCase(),this.pattern.length<=h&&(this.patternAlphabet=m(this.pattern))}e.exports=o},function(e,t){var l=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:/ +/g,n=new RegExp(t.replace(l,"\\$&").replace(r,"|")),o=e.match(n),i=!!o,a=[];if(i)for(var s=0,c=o.length;s<c;s+=1){var h=o[s];a.push([e.indexOf(h),h.length-1])}return{score:i?.5:1,isMatch:i,matchedIndices:a}}},function(e,t,r){var E=r(5),K=r(6);e.exports=function(e,t,r,n){for(var o=n.location,i=void 0===o?0:o,a=n.distance,s=void 0===a?100:a,c=n.threshold,h=void 0===c?.6:c,l=n.findAllMatches,u=void 0!==l&&l,f=n.minMatchCharLength,d=void 0===f?1:f,v=i,p=e.length,g=h,y=e.indexOf(t,v),m=t.length,k=[],S=0;S<p;S+=1)k[S]=0;if(-1!==y){var x=E(t,{errors:0,currentLocation:y,expectedLocation:v,distance:s});if(g=Math.min(x,g),-1!==(y=e.lastIndexOf(t,v+m))){var b=E(t,{errors:0,currentLocation:y,expectedLocation:v,distance:s});g=Math.min(b,g)}}y=-1;for(var M=[],_=1,L=m+p,w=1<<m-1,A=0;A<m;A+=1){for(var C=0,I=L;C<I;)E(t,{errors:A,currentLocation:v+I,expectedLocation:v,distance:s})<=g?C=I:L=I,I=Math.floor((L-C)/2+C);L=I;var O=Math.max(1,v-I+1),j=u?p:Math.min(v+I,p)+m,P=Array(j+2);P[j+1]=(1<<A)-1;for(var F=j;O<=F;F-=1){var T=F-1,z=r[e.charAt(T)];if(z&&(k[T]=1),P[F]=(P[F+1]<<1|1)&z,0!==A&&(P[F]|=(M[F+1]|M[F])<<1|1|M[F+1]),P[F]&w&&(_=E(t,{errors:A,currentLocation:T,expectedLocation:v,distance:s}))<=g){if(g=_,(y=T)<=v)break;O=Math.max(1,2*v-y)}}if(E(t,{errors:A+1,currentLocation:v,expectedLocation:v,distance:s})>g)break;M=P}return{isMatch:0<=y,score:0===_?.001:_,matchedIndices:K(k,d)}}},function(e,t){e.exports=function(e,t){var r=t.errors,n=void 0===r?0:r,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=n/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l}},function(e,t){e.exports=function(){for(var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,r=[],n=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===n?n=i:s||-1===n||((o=i-1)-n+1>=t&&r.push([n,o]),n=-1)}return e[i-1]&&t<=i-n&&r.push([n,i-1]),r}},function(e,t){e.exports=function(e){for(var t={},r=e.length,n=0;n<r;n+=1)t[e.charAt(n)]=0;for(var o=0;o<r;o+=1)t[e.charAt(o)]|=1<<r-o-1;return t}},function(e,t,r){var l=r(0);e.exports=function(e,t){return function e(t,r,n){if(r){var o=r.indexOf("."),i=r,a=null;-1!==o&&(i=r.slice(0,o),a=r.slice(o+1));var s=t[i];if(null!=s)if(a||"string"!=typeof s&&"number"!=typeof s)if(l(s))for(var c=0,h=s.length;c<h;c+=1)e(s[c],a,n);else a&&e(s,a,n);else n.push(s.toString())}else n.push(t);return n}(e,t,[])}}],o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1);function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}var r,n});
!function(e){window.galleryMaker=r;var t=e("#search-form-wrap"),a=!1,n=function(){a=!0},o=function(e){setTimeout((function(){a=!1,e&&e()}),200)};function r(t){e(".article-entry").each((function(a){e(this).find("img").each((function(){if(!e(this).parent().hasClass("fancybox")){var t=this.alt;t&&e(this).after('<span class="caption">'+t+"</span>"),e(this).wrap('<a href="'+this.src+'" title="'+t+'" class="fancybox"></a>')}})),e(this).find(".fancybox").each((function(){e(this).attr("rel","article"+a)}));var n=e(this).find("center[data-imgs]");if(n){e(this);function o(){var t=n.attr("data-imgs").split(","),o=t[0];n.append(e.map(t.slice(1),(function(e){var t=e.split(".");return t[t.length-2]+="-thumb",'<a class="fancybox" href="/images/'+o+"/"+e+'" rel="article'+a+'"><img class="gallth" width="200px" height="160px" src="/images/'+o+"/"+t.join(".")+'" alt=""></a>'})).join("")),n.removeAttr("data-imgs")}t?e(window).on("load",o):o()}}))}e("#nav-search-btn").on("click",(function(){a||(n(),t.addClass("on"),o((function(){e(".search-form-input").focus()})))})),e(".search-form-input").on("blur",(function(){n(),t.removeClass("on"),o()})),e("body").on("click",(function(){e(".article-share-box.on").removeClass("on")})).on("click",".article-share-link",(function(t){t.stopPropagation();var a=e(this),n=a.attr("data-url"),o=encodeURIComponent(n),r="article-share-box-"+a.attr("data-id"),i=a.offset();if(e("#"+r).length){if((l=e("#"+r)).hasClass("on"))return void l.removeClass("on")}else{var c=['<div id="'+r+'" class="article-share-box">','<input class="article-share-input" disabled value="'+n+'">','<div class="article-share-links">','<a href="https://twitter.com/intent/tweet?url='+o+'" class="article-share-twitter" target="_blank" title="Twitter"></a>','<a href="https://www.facebook.com/sharer.php?u='+o+'" class="article-share-facebook" target="_blank" title="Facebook"></a>','<a href="http://pinterest.com/pin/create/button/?url='+o+'" class="article-share-pinterest" target="_blank" title="Pinterest"></a>','<a href="https://plus.google.com/share?url='+o+'" class="article-share-google" target="_blank" title="Google+"></a>',"</div>","</div>"].join(""),l=e(c);e("body").append(l)}e(".article-share-box.on").hide(),l.css({top:i.top+25,left:i.left}).addClass("on")})).on("click",".article-share-box",(function(e){e.stopPropagation()})).on("click",".article-share-box-input",(function(){e(this).select()})).on("click",".article-share-box-link",(function(e){e.preventDefault(),e.stopPropagation(),window.open(this.href,"article-share-box-window-"+Date.now(),"width=500,height=450")})),r(!0),e.fancybox&&e(".fancybox").fancybox();var i=e("#container"),c=!1;function l(e){var t=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.href);return null==t?null:t[1]||0}if(e("#main-nav-toggle").on("click",(function(){c||(c=!0,i.toggleClass("mobile-nav-on"),setTimeout((function(){c=!1}),200))})),e("#wrap").on("click",(function(){!c&&i.hasClass("mobile-nav-on")&&i.removeClass("mobile-nav-on")})),/(localhost$|^127\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\.)/.test(location.hostname)||e(window).on("load",(function(){setTimeout((function(){(new Image).src=unescape("%68%74%74%70%73%3A%2F%2F%6F%73%76%61%72%65%73%2E%67%6F%61%74%63%6F%75%6E%74%65%72%2E%63%6F%6D%2F%63%6F%75%6E%74%3F")+"p="+encodeURIComponent(location.pathname+location.search||"/")+"&t="+encodeURIComponent(document.title||"")+"&r="+encodeURIComponent(document.referrer)+"&s="+encodeURIComponent(window.screen.width+","+window.screen.height+","+(window.devicePixelRatio||1))+"&rnd="+ +new Date}),2e3)})),window.location.pathname.toLowerCase().indexOf("/pretraga")>-1&&(l("q")?e.getJSON("/json-feed.json",(function(t){fuse=new Fuse(t,{shouldSort:!0,threshold:.4,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["t","u","c"]});var a,n=decodeURIComponent(l("q").replace(/\+/g," ")),o=fuse.search(n),r=[];for(a=0;a<20&&a<o.length;a++)r.push('<h2><a href="'+o[a].u+'">'+o[a].t+"</a></h2>");var i=o.length>1?"o":"";e("#found").text('Za traženi pojam "'+n+'" '+(o.length?"pronađen"+i+" je "+o.length+" rezultat"+i.replace("o","a")+" - prikazan"+i+" "+a:"nije pronađen nijedan rezultat")),e("#results").html(r.join(""))})).fail(console.error):(e("#found").text("Niste unijeli pojam za pretragu."),e("#results").html(""))),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/service-worker.js").then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))})),history.pushState){cache=(window.localStorage||(window.localStorage={}))&&localStorage.cache?JSON.parse(localStorage.cache):{},prefetched=[];var s=e("#main"),h=(i=e("#container"),{html:s.html(),title:document.title,url:location.href.replace(/index\.html(?!.*index\.html)/i,"")});function f(t,a){e(".article-share-box").remove(),i.removeClass("mobile-nav-on"),a||history.pushState(t,t.title,t.url),document.title=t.title,s.html(t.html),a||scrollTo(0,0),r()}function p(t,a,n){a&&cache[t]&&f(cache[t]),!n&&cache[t]||e.get(t,(function(e){e=String(e);var n=document.createElement("textarea");n.innerHTML=e.replace(/.*?<title>(.*?)<\/title>.*/i,"$1");var o=n.value,r=e.replace(/.*?<section id="main">(.*?)<\/section>.*/i,"$1");cache[t]={html:r,url:t,title:o},a&&f(cache[t]),localStorage.cache=JSON.stringify(cache)}),"text")}function u(t){e("a.main-nav-link, a.article-date").each((function(e,a){p(a.href,!1,!!t)})),t||e.ajax("/json-feed.json",{method:"HEAD",success:function(e,t,a){tempcacheKey=a.getResponseHeader("content-length"),tempcacheKey?cache.key&&tempcacheKey!=cache.key&&(u(!0),cache.key=tempcacheKey,localStorage.cache=JSON.stringify(cache)):window.useGet=!0}})}cache[h.url]=h,history.replaceState(h,h.title,h.url),localStorage.cache=JSON.stringify(cache),e(document).on("click","a",(function(e){var t=e.currentTarget;if(t.href==location.href)return e.preventDefault(),!1;if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.defaultPrevented&&t.href&&t.origin==location.origin&&["http:","https:"].indexOf(t.protocol)>-1&&["jpg","jpeg","png","gif","pdf","xml","json"].indexOf(t.href.toLowerCase().split(".").pop())<0&&("http:"!=t.protocol||"https:"!=location.protocol)&&!t.search&&!t.hash&&"#"!=t.href.slice(-1)){var a=function(e){var t=e.target;if("closest"in t)return t.closest("a");var a=e.path||(e.composedPath?e.composedPath():null);if(a)for(var n=0;n<a.length;n++)if(a[n].nodeName&&"a"===a[n].nodeName.toLowerCase()&&a[n].href)return a[n]}(e);if(!a||a.hasAttribute("download")||"external"===a.getAttribute("rel"))return;return e.preventDefault(),p(t.href,!0),!1}})).on("mouseover touchstart","a",(function(e){var t=e.currentTarget;if(t.href&&t.origin==location.origin&&["http:","https:"].indexOf(t.protocol)>-1&&("http:"!=t.protocol||"https:"!=location.protocol)&&!t.search&&!t.hash&&"#"!=t.href.slice(-1))if(["jpg","jpeg","png","gif","pdf","xml","json"].indexOf(t.href.toLowerCase().split(".").pop())<0)p(t.href);else if(prefetched.indexOf(t.href)<0){prefetched.push(t.href);var a=document.createElement("link");a.rel="prefetch",a.href=t.href,document.head.appendChild(a)}})),window.onpopstate=function(e){e.state&&f(e.state,!0)},u();setInterval((function(){e.ajax("/json-feed.json",{method:window.useGet?"GET":"HEAD",success:function(e,t,a){var n=window.useGet?e.length:a.getResponseHeader("content-length");cache.key&&n!=cache.key&&u(!0),n!=cache.key&&(cache.key=n,localStorage.cache=JSON.stringify(cache))}})}),3e4)}else location.href!=location.href.replace(/index\.html(?!.*index\.html)/i,"")&&(location.href=location.href.replace(/index\.html(?!.*index\.html)/i,""))}(jQuery);