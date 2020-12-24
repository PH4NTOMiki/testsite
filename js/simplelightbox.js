!function(){var t=document.createElement("style");t.innerHTML='.slbOverlay,.slbWrapOuter,.slbWrap{position:fixed;top:0;right:0;bottom:0;left:0}.slbOverlay{overflow:hidden;z-index:2000;background-color:#000;opacity:0.7;-webkit-animation:slbOverlay 0.5s;-moz-animation:slbOverlay 0.5s;animation:slbOverlay 0.5s}.slbWrapOuter{overflow-x:hidden;overflow-y:auto;z-index:2010}.slbWrap{position:absolute;text-align:center}.slbWrap:before{content:"";display:inline-block;height:100%;vertical-align:middle}.slbContentOuter{position:relative;display:inline-block;vertical-align:middle;margin:0px auto;padding:0 1em;box-sizing:border-box;z-index:2020;text-align:left;max-width:100%}.slbContentEl .slbContentOuter{padding:1em}.slbContent{position:relative}.slbContentEl .slbContent{-webkit-animation:slbEnter 0.3s;-moz-animation:slbEnter 0.3s;animation:slbEnter 0.3s;background-color:#fff;box-shadow:0 0.2em 1em rgba(0,0,0,0.4)}.slbImageWrap{-webkit-animation:slbEnter 0.3s;-moz-animation:slbEnter 0.3s;animation:slbEnter 0.3s;position:relative}.slbImageWrap:after{content:"";position:absolute;left:0;right:0;top:5em;bottom:5em;display:block;z-index:-1;box-shadow:0 0.2em 1em rgba(0,0,0,0.6);background-color:#FFF}.slbDirectionNext .slbImageWrap{-webkit-animation:slbEnterNext 0.4s;-moz-animation:slbEnterNext 0.4s;animation:slbEnterNext 0.4s}.slbDirectionPrev .slbImageWrap{-webkit-animation:slbEnterPrev 0.4s;-moz-animation:slbEnterPrev 0.4s;animation:slbEnterPrev 0.4s}.slbImage{width:auto;max-width:100%;height:auto;display:block;line-height:0;box-sizing:border-box;padding:5em 0;margin:0 auto}.slbCaption{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;font-size:1.4em;position:absolute;left:0;right:0;bottom:0;padding:.71429em 0;color:#fff;color:rgba(255,255,255,0.7);text-align:center}.slbCloseBtn,.slbArrow{margin:0;padding:0;border:0;cursor:pointer;background:none}.slbCloseBtn::-moz-focus-inner,.slbArrow::-moz-focus-inner{padding:0;border:0}.slbCloseBtn:hover,.slbArrow:hover{opacity:0.5;box-shadow:none}.slbCloseBtn:active,.slbArrow:active{opacity:0.8;box-shadow:none}.slbCloseBtn{-webkit-animation:slbEnter 0.3s;-moz-animation:slbEnter 0.3s;animation:slbEnter 0.3s;font-size:3em;width:1.66667em;height:1.66667em;line-height:1.66667em;position:absolute;right:-.33333em;top:0;color:#fff;color:rgba(255,255,255,0.7);text-align:center;box-shadow:none}.slbLoading .slbCloseBtn{display:none}.slbLoadingText{font-size:1.4em;color:#fff;color:rgba(255,255,255,0.9)}.slbArrows{position:fixed;top:50%;left:0;right:0}.slbLoading .slbArrows{display:none}.slbArrow{position:absolute;top:50%;margin-top:-5em;width:5em;height:10em;opacity:0.7;text-indent:-999em;overflow:hidden}.slbArrow:before{content:"";position:absolute;top:50%;left:50%;margin:-.8em 0 0 -.8em;border:.8em solid transparent}.slbArrow.next{right:0}.slbArrow.next:before{border-left-color:#fff}.slbArrow.prev{left:0}.slbArrow.prev:before{border-right-color:#fff}.slbIframeCont{width:80em;height:0;overflow:hidden;padding-top:56.25%;margin:5em 0}.slbIframe{position:absolute;top:0;left:0;width:100%;height:100%;box-shadow:0 0.2em 1em rgba(0,0,0,0.6);background:#000}@-webkit-keyframes slbOverlay{from{opacity:0}to{opacity:0.7}}@-moz-keyframes slbOverlay{from{opacity:0}to{opacity:0.7}}@keyframes slbOverlay{from{opacity:0}to{opacity:0.7}}@-webkit-keyframes slbEnter{from{opacity:0;-webkit-transform:translate3d(0, -1em, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0)}}@-moz-keyframes slbEnter{from{opacity:0;-moz-transform:translate3d(0, -1em, 0)}to{opacity:1;-moz-transform:translate3d(0, 0, 0)}}@keyframes slbEnter{from{opacity:0;-webkit-transform:translate3d(0, -1em, 0);-moz-transform:translate3d(0, -1em, 0);-ms-transform:translate3d(0, -1em, 0);-o-transform:translate3d(0, -1em, 0);transform:translate3d(0, -1em, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@-webkit-keyframes slbEnterNext{from{opacity:0;-webkit-transform:translate3d(4em, 0, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0)}}@-moz-keyframes slbEnterNext{from{opacity:0;-moz-transform:translate3d(4em, 0, 0)}to{opacity:1;-moz-transform:translate3d(0, 0, 0)}}@keyframes slbEnterNext{from{opacity:0;-webkit-transform:translate3d(4em, 0, 0);-moz-transform:translate3d(4em, 0, 0);-ms-transform:translate3d(4em, 0, 0);-o-transform:translate3d(4em, 0, 0);transform:translate3d(4em, 0, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@-webkit-keyframes slbEnterPrev{from{opacity:0;-webkit-transform:translate3d(-4em, 0, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0)}}@-moz-keyframes slbEnterPrev{from{opacity:0;-moz-transform:translate3d(-4em, 0, 0)}to{opacity:1;-moz-transform:translate3d(0, 0, 0)}}@keyframes slbEnterPrev{from{opacity:0;-webkit-transform:translate3d(-4em, 0, 0);-moz-transform:translate3d(-4em, 0, 0);-ms-transform:translate3d(-4em, 0, 0);-o-transform:translate3d(-4em, 0, 0);transform:translate3d(-4em, 0, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}',document.head.appendChild(t)}(),function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.SimpleLightbox=e()}(this,(function(){function t(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];if(n)for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])}return t}function e(t,e){t&&e&&(t.className+=" "+e)}function n(t,e){t&&e&&(t.className=t.className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)")," ").trim())}function o(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.childNodes[0]}function s(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector).call(t,e)}function i(t){this.init.apply(this,arguments)}return i.defaults={elementClass:"",elementLoadingClass:"slbLoading",htmlClass:"slbActive",closeBtnClass:"",nextBtnClass:"",prevBtnClass:"",loadingTextClass:"",closeBtnCaption:"Close",nextBtnCaption:"Next",prevBtnCaption:"Previous",loadingCaption:"Loading...",bindToItems:!0,closeOnOverlayClick:!0,closeOnEscapeKey:!0,nextOnImageClick:!0,showCaptions:!0,captionAttribute:"title",urlAttribute:"href",startAt:0,loadingTimeout:100,appendTarget:"body",beforeSetContent:null,beforeClose:null,afterClose:null,beforeDestroy:null,afterDestroy:null,videoRegex:new RegExp(/youtube.com|vimeo.com/)},t(i.prototype,{init:function(e){e=this.options=t({},i.defaults,e);var n,o=this;e.$items&&(n=e.$items.get()),e.elements&&(n=[].slice.call("string"==typeof e.elements?document.querySelectorAll(e.elements):e.elements)),this.eventRegistry={lightbox:[],thumbnails:[]},this.items=[],this.captions=[],n&&n.forEach((function(t,n){o.items.push(t.getAttribute(e.urlAttribute)),o.captions.push(t.getAttribute(e.captionAttribute)),e.bindToItems&&o.addEvent(t,"click",(function(t){t.preventDefault(),o.showPosition(n)}),"thumbnails")})),e.items&&(this.items=e.items),e.captions&&(this.captions=e.captions)},addEvent:function(t,e,n,o){return this.eventRegistry[o||"lightbox"].push({element:t,eventName:e,callback:n}),t.addEventListener(e,n),this},removeEvents:function(t){return this.eventRegistry[t].forEach((function(t){t.element.removeEventListener(t.eventName,t.callback)})),this.eventRegistry[t]=[],this},next:function(){return this.showPosition(this.currentPosition+1)},prev:function(){return this.showPosition(this.currentPosition-1)},normalizePosition:function(t){return t>=this.items.length?t=0:t<0&&(t=this.items.length-1),t},showPosition:function(t){var e=this.normalizePosition(t);return void 0!==this.currentPosition&&(this.direction=e>this.currentPosition?"next":"prev"),this.currentPosition=e,this.setupLightboxHtml().prepareItem(this.currentPosition,this.setContent).show()},loading:function(t){var o=this,s=this.options;t?this.loadingTimeout=setTimeout((function(){e(o.$el,s.elementLoadingClass),o.$content.innerHTML='<p class="slbLoadingText '+s.loadingTextClass+'">'+s.loadingCaption+"</p>",o.show()}),s.loadingTimeout):(n(this.$el,s.elementLoadingClass),clearTimeout(this.loadingTimeout))},prepareItem:function(t,e){var n=this,s=this.items[t];if(this.loading(!0),this.options.videoRegex.test(s))e.call(n,o('<div class="slbIframeCont"><iframe class="slbIframe" frameborder="0" allowfullscreen src="'+s+'"></iframe></div>'));else{var i=o('<div class="slbImageWrap"><img class="slbImage" src="'+s+'" /></div>');this.$currentImage=i.querySelector(".slbImage"),this.options.showCaptions&&this.captions[t]&&i.appendChild(o('<div class="slbCaption">'+this.captions[t]+"</div>")),this.loadImage(s,(function(){n.setImageDimensions(),e.call(n,i),n.loadImage(n.items[n.normalizePosition(n.currentPosition+1)])}))}return this},loadImage:function(t,e){if(!this.options.videoRegex.test(t)){var n=new Image;e&&(n.onload=e),n.src=t}},setupLightboxHtml:function(){var t=this.options;return this.$el||(this.$el=o('<div class="slbElement '+t.elementClass+'"><div class="slbOverlay"></div><div class="slbWrapOuter"><div class="slbWrap"><div class="slbContentOuter"><div class="slbContent"></div><button type="button" title="'+t.closeBtnCaption+'" class="slbCloseBtn '+t.closeBtnClass+'">×</button>'+(1<this.items.length?'<div class="slbArrows"><button type="button" title="'+t.prevBtnCaption+'" class="prev slbArrow'+t.prevBtnClass+'">'+t.prevBtnCaption+'</button><button type="button" title="'+t.nextBtnCaption+'" class="next slbArrow'+t.nextBtnClass+'">'+t.nextBtnCaption+"</button></div>":"")+"</div></div></div></div>"),this.$content=this.$el.querySelector(".slbContent")),this.$content.innerHTML="",this},show:function(){return this.modalInDom||(document.querySelector(this.options.appendTarget).appendChild(this.$el),e(document.documentElement,this.options.htmlClass),this.setupLightboxEvents(),this.modalInDom=!0),this},setContent:function(t){var s="string"==typeof t?o(t):t;return this.loading(!1),this.setupLightboxHtml(),n(this.$content,"slbDirectionNext"),n(this.$content,"slbDirectionPrev"),this.direction&&e(this.$content,"next"===this.direction?"slbDirectionNext":"slbDirectionPrev"),this.options.beforeSetContent&&this.options.beforeSetContent(s,this),this.$content.appendChild(s),this},setImageDimensions:function(){this.$currentImage&&(this.$currentImage.style.maxHeight=("innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight)+"px")},setupLightboxEvents:function(){var t=this;return this.eventRegistry.lightbox.length||this.addEvent(this.$el,"click",(function(e){var n=e.target;s(n,".slbCloseBtn")||t.options.closeOnOverlayClick&&s(n,".slbWrap")?t.close():s(n,".slbArrow")?s(n,".next")?t.next():t.prev():t.options.nextOnImageClick&&1<t.items.length&&s(n,".slbImage")&&t.next()})).addEvent(document,"keyup",(function(e){t.options.closeOnEscapeKey&&27===e.keyCode&&t.close(),1<t.items.length&&((39===e.keyCode||68===e.keyCode)&&t.next(),(37===e.keyCode||65===e.keyCode)&&t.prev())})).addEvent(window,"resize",(function(){t.setImageDimensions()})),this},close:function(){this.modalInDom&&(this.runHook("beforeClose"),this.removeEvents("lightbox"),this.$el&&this.$el.parentNode.removeChild(this.$el),n(document.documentElement,this.options.htmlClass),this.modalInDom=!1,this.runHook("afterClose")),this.direction=void 0,this.currentPosition=this.options.startAt},destroy:function(){this.close(),this.runHook("beforeDestroy"),this.removeEvents("thumbnails"),this.runHook("afterDestroy")},runHook:function(t){this.options[t]&&this.options[t](this)}}),i.open=function(t){var e=new i(t);return t.content?e.setContent(t.content).show():e.showPosition(e.options.startAt)},i.registerAsJqueryPlugin=function(t){t.fn.simpleLightbox=function(e){var n,o=this;return this.each((function(){t.data(this,"simpleLightbox")||(n=n||new i(t.extend({},e,{$items:o})),t.data(this,"simpleLightbox",n))}))},t.SimpleLightbox=i},"undefined"!=typeof window&&window.jQuery&&i.registerAsJqueryPlugin(window.jQuery),i}));