!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Fuse",[],t):"object"==typeof exports?exports.Fuse=t():e.Fuse=t()}(this,(function(){return r={},e.m=t=[function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o=r(2),i=r(8),a=r(0),s=(function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(c.prototype,[{key:"setCollection",value:function(e){return this.list=e}},{key:"search",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var r=this._prepareSearchers(e),n=r.tokenSearchers,o=r.fullSearcher,i=this._search(n,o),a=i.weights,s=i.results;return this._computeScore(a,s),this.options.shouldSort&&this._sort(s),t.limit&&"number"==typeof t.limit&&(s=s.slice(0,t.limit)),this._format(s)}},{key:"_prepareSearchers",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var r=e.split(this.options.tokenSeparator),n=0,i=r.length;n<i;n+=1)t.push(new o(r[n],this.options));return{tokenSearchers:t,fullSearcher:new o(e,this.options)}}},{key:"_search",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=1<arguments.length?arguments[1]:void 0,r=this.list,n={},o=[];if("string"==typeof r[0]){for(var i=0,a=r.length;i<a;i+=1)this._analyze({key:"",value:r[i],record:i,index:i},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});return{weights:null,results:o}}for(var s={},c=0,h=r.length;c<h;c+=1)for(var l=r[c],u=0,f=this.options.keys.length;u<f;u+=1){var d=this.options.keys[u];if("string"!=typeof d){if(s[d.name]={weight:1-d.weight||1},d.weight<=0||1<d.weight)throw new Error("Key weight has to be > 0 and <= 1");d=d.name}else s[d]={weight:1};this._analyze({key:d,value:this.options.getFn(l,d),record:l,index:c},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t})}return{weights:s,results:o}}},{key:"_analyze",value:function(e,t){var r=e.key,n=e.arrayIndex,o=void 0===n?-1:n,i=e.value,s=e.record,c=e.index,h=t.tokenSearchers,l=void 0===h?[]:h,u=t.fullSearcher,f=void 0===u?[]:u,d=t.resultMap,v=void 0===d?{}:d,p=t.results,g=void 0===p?[]:p;if(null!=i){var y=!1,m=-1,k=0;if("string"==typeof i){this._log("\nKey: ".concat(""===r?"-":r));var S=f.search(i);if(this._log('Full text: "'.concat(i,'", score: ').concat(S.score)),this.options.tokenize){for(var x=i.split(this.options.tokenSeparator),b=[],M=0;M<l.length;M+=1){var _=l[M];this._log('\nPattern: "'.concat(_.pattern,'"'));for(var L=!1,w=0;w<x.length;w+=1){var A=x[w],C=_.search(A),I={};C.isMatch?(I[A]=C.score,L=y=!0,b.push(C.score)):(I[A]=1,this.options.matchAllTokens||b.push(1)),this._log('Token: "'.concat(A,'", score: ').concat(I[A]))}L&&(k+=1)}m=b[0];for(var O=b.length,j=1;j<O;j+=1)m+=b[j];m/=O,this._log("Token score average:",m)}var P=S.score;-1<m&&(P=(P+m)/2),this._log("Score average:",P);var F=!this.options.tokenize||!this.options.matchAllTokens||k>=l.length;if(this._log("\nCheck Matches: ".concat(F)),(y||S.isMatch)&&F){var T=v[c];T?T.output.push({key:r,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}):(v[c]={item:s,output:[{key:r,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}]},g.push(v[c]))}}else if(a(i))for(var z=0,E=i.length;z<E;z+=1)this._analyze({key:r,arrayIndex:z,value:i[z],record:s,index:c},{resultMap:v,results:g,tokenSearchers:l,fullSearcher:f})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var r=0,n=t.length;r<n;r+=1){for(var o=t[r].output,i=o.length,a=1,s=1,c=0;c<i;c+=1){var h=e?e[o[c].key].weight:1,l=(1===h?o[c].score:o[c].score||.001)*h;1!==h?s=Math.min(s,l):a*=o[c].nScore=l}t[r].score=1===s?a:s,this._log(t[r])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var r=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,(function(e,t){if("object"===n(t)&&null!==t){if(-1!==r.indexOf(t))return;r.push(t)}return t}))),r=null}var o=[];this.options.includeMatches&&o.push((function(e,t){var r=e.output;t.matches=[];for(var n=0,o=r.length;n<o;n+=1){var i=r[n];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&-1<i.arrayIndex&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}})),this.options.includeScore&&o.push((function(e,t){t.score=e.score}));for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c)}else t.push(s.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}]),c);function c(e,t){var r=t.location,n=void 0===r?0:r,o=t.distance,a=void 0===o?100:o,s=t.threshold,h=void 0===s?.6:s,l=t.maxPatternLength,u=void 0===l?32:l,f=t.caseSensitive,d=void 0!==f&&f,v=t.tokenSeparator,p=void 0===v?/ +/g:v,g=t.findAllMatches,y=void 0!==g&&g,m=t.minMatchCharLength,k=void 0===m?1:m,S=t.id,x=void 0===S?null:S,b=t.keys,M=void 0===b?[]:b,_=t.shouldSort,L=void 0===_||_,w=t.getFn,A=void 0===w?i:w,C=t.sortFn,I=void 0===C?function(e,t){return e.score-t.score}:C,O=t.tokenize,j=void 0!==O&&O,P=t.matchAllTokens,F=void 0!==P&&P,T=t.includeMatches,z=void 0!==T&&T,E=t.includeScore,K=void 0!==E&&E,$=t.verbose,J=void 0!==$&&$;!function(e){if(!(e instanceof c))throw new TypeError("Cannot call a class as a function")}(this),this.options={location:n,distance:a,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k,id:x,keys:M,includeMatches:z,includeScore:K,shouldSort:L,getFn:A,sortFn:I,verbose:J,tokenize:j,matchAllTokens:F},this.setCollection(e)}e.exports=s},function(e,t,r){var n=r(3),o=r(4),i=r(7),a=(function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(s.prototype,[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,r=t.maxPatternLength,i=t.tokenSeparator;if(this.pattern.length>r)return n(e,this.pattern,i);var a=this.options,s=a.location,c=a.distance,h=a.threshold,l=a.findAllMatches,u=a.minMatchCharLength;return o(e,this.pattern,this.patternAlphabet,{location:s,distance:c,threshold:h,findAllMatches:l,minMatchCharLength:u})}}]),s);function s(e,t){var r=t.location,n=void 0===r?0:r,o=t.distance,a=void 0===o?100:o,c=t.threshold,h=void 0===c?.6:c,l=t.maxPatternLength,u=void 0===l?32:l,f=t.isCaseSensitive,d=void 0!==f&&f,v=t.tokenSeparator,p=void 0===v?/ +/g:v,g=t.findAllMatches,y=void 0!==g&&g,m=t.minMatchCharLength,k=void 0===m?1:m;!function(e){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}(this),this.options={location:n,distance:a,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k},this.pattern=this.options.isCaseSensitive?e:e.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=i(this.pattern))}e.exports=a},function(e,t){var r=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(r,"\\$&").replace(n,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1])}return{score:a?.5:1,isMatch:a,matchedIndices:s}}},function(e,t,r){var n=r(5),o=r(6);e.exports=function(e,t,r,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,d=void 0!==f&&f,v=i.minMatchCharLength,p=void 0===v?1:v,g=s,y=e.length,m=u,k=e.indexOf(t,g),S=t.length,x=[],b=0;b<y;b+=1)x[b]=0;if(-1!==k){var M=n(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});if(m=Math.min(M,m),-1!==(k=e.lastIndexOf(t,g+S))){var _=n(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});m=Math.min(_,m)}}k=-1;for(var L=[],w=1,A=S+y,C=1<<S-1,I=0;I<S;I+=1){for(var O=0,j=A;O<j;)n(t,{errors:I,currentLocation:g+j,expectedLocation:g,distance:h})<=m?O=j:A=j,j=Math.floor((A-O)/2+O);A=j;var P=Math.max(1,g-j+1),F=d?y:Math.min(g+j,y)+S,T=Array(F+2);T[F+1]=(1<<I)-1;for(var z=F;P<=z;z-=1){var E=z-1,K=r[e.charAt(E)];if(K&&(x[E]=1),T[z]=(T[z+1]<<1|1)&K,0!==I&&(T[z]|=(L[z+1]|L[z])<<1|1|L[z+1]),T[z]&C&&(w=n(t,{errors:I,currentLocation:E,expectedLocation:g,distance:h}))<=m){if(m=w,(k=E)<=g)break;P=Math.max(1,2*g-k)}}if(n(t,{errors:I+1,currentLocation:g,expectedLocation:g,distance:h})>m)break;L=T}return{isMatch:0<=k,score:0===w?.001:w,matchedIndices:o(x,p)}}},function(e,t){e.exports=function(e,t){var r=t.errors,n=void 0===r?0:r,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=n/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l}},function(e,t){e.exports=function(){for(var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,r=[],n=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===n?n=i:s||-1===n||((o=i-1)-n+1>=t&&r.push([n,o]),n=-1)}return e[i-1]&&t<=i-n&&r.push([n,i-1]),r}},function(e,t){e.exports=function(e){for(var t={},r=e.length,n=0;n<r;n+=1)t[e.charAt(n)]=0;for(var o=0;o<r;o+=1)t[e.charAt(o)]|=1<<r-o-1;return t}},function(e,t,r){var n=r(0);e.exports=function(e,t){return function e(t,r,o){if(r){var i=r.indexOf("."),a=r,s=null;-1!==i&&(a=r.slice(0,i),s=r.slice(i+1));var c=t[a];if(null!=c)if(s||"string"!=typeof c&&"number"!=typeof c)if(n(c))for(var h=0,l=c.length;h<l;h+=1)e(c[h],s,o);else s&&e(c,s,o);else o.push(c.toString())}else o.push(t);return o}(e,t,[])}}],e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)e.d(n,o,function(e){return t[e]}.bind(null,o));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=1);function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t,r}));var cdn="";!function(t){var a=t("#search-form-wrap"),e=!1,n=function(){e=!0},o=function(t){setTimeout((function(){e=!1,t&&t()}),200)};t("#nav-search-btn").on("click",(function(){e||(n(),a.addClass("on"),o((function(){t(".search-form-input").focus()})))})),t(".search-form-input").on("blur",(function(){n(),a.removeClass("on"),o()})),t("body").on("click",(function(){t(".article-share-box.on").removeClass("on")})).on("click",".article-share-link",(function(a){a.stopPropagation();var e=t(this),n=e.attr("data-url"),o=encodeURIComponent(n),i="article-share-box-"+e.attr("data-id"),r=e.offset();if(t("#"+i).length){if((c=t("#"+i)).hasClass("on"))return void c.removeClass("on")}else{var s=['<div id="'+i+'" class="article-share-box">','<input class="article-share-input" value="'+n+'">','<div class="article-share-links">','<a href="https://twitter.com/intent/tweet?url='+o+'" class="article-share-twitter" target="_blank" title="Twitter"></a>','<a href="https://www.facebook.com/sharer.php?u='+o+'" class="article-share-facebook" target="_blank" title="Facebook"></a>','<a href="http://pinterest.com/pin/create/button/?url='+o+'" class="article-share-pinterest" target="_blank" title="Pinterest"></a>','<a href="https://plus.google.com/share?url='+o+'" class="article-share-google" target="_blank" title="Google+"></a>',"</div>","</div>"].join(""),c=t(s);t("body").append(c)}t(".article-share-box.on").hide(),c.css({top:r.top+25,left:r.left}).addClass("on")})).on("click",".article-share-box",(function(t){t.stopPropagation()})).on("click",".article-share-box-input",(function(){t(this).select()})).on("click",".article-share-box-link",(function(t){t.preventDefault(),t.stopPropagation(),window.open(this.href,"article-share-box-window-"+Date.now(),"width=500,height=450")})),t(".article-entry").each((function(a){t(this).find("img").each((function(){if(!t(this).parent().hasClass("fancybox")){var a=this.alt;a&&t(this).after('<span class="caption">'+a+"</span>"),t(this).wrap('<a href="'+this.src+'" title="'+a+'" class="fancybox"></a>')}})),t(this).find(".fancybox").each((function(){t(this).attr("rel","article"+a)}));var e=t(this).find("center");if(e.attr("data-imgs")){t(this);t(window).on("load",(function(){var n=e.attr("data-imgs").split(","),o=n[0],i=[];t.each(n.slice(1),(function(t,e){var n=e.split(".");n[n.length-2]+="-thumb",i.push('<a class="fancybox" href="'+cdn+"/images/"+o+"/"+e+'" rel="article'+a+'"><img class="gallth" width="200px" height="160px" src="'+cdn+"/images/"+o+"/"+n.join(".")+'" alt=""></a>')})),e.append(i.join("")),e.removeAttr("data-imgs")}))}})),t.fancybox&&t(".fancybox").fancybox();var i=t("#container"),r=!1;function s(t){var a=new RegExp("[?&]"+t+"=([^&#]*)").exec(window.location.href);return null==a?null:a[1]||0}t("#main-nav-toggle").on("click",(function(){r||(r=!0,i.toggleClass("mobile-nav-on"),setTimeout((function(){r=!1}),200))})),t("#wrap").on("click",(function(){!r&&i.hasClass("mobile-nav-on")&&i.removeClass("mobile-nav-on")})),window.location.pathname.indexOf("/pretraga")>-1&&(s("q")?t.getJSON(cdn+"/json-feed.json",(function(a){fuse=new Fuse(a,{shouldSort:!0,threshold:.4,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["t","u","c"]});var e,n=decodeURIComponent(s("q").replace(/\+/g," ")),o=fuse.search(n),i=[];for(e=0;e<20&&e<o.length;e++)i.push('<h2><a href="'+o[e].u+'">'+o[e].t+"</a></h2>");var r=o.length>1?"o":"";t("#found").text('Za traženi pojam "'+n+'" '+(o.length?"pronađen"+r+" je "+o.length+" rezultat"+r.replace("o","a")+" - prikazan"+r+" "+e:"nije pronađen nijedan rezultat")),t("#results").html(i.join(""))})).fail(console.error):(t("#found").text("Niste unijeli pojam za pretragu."),t("#results").html("")))}(jQuery);