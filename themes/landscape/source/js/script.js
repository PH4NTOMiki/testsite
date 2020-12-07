(function($){window.galleryMaker = galleryMaker;
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" disabled value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  function galleryMaker(first){$('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

	$(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
	var $center = $(this).find('center[data-imgs]');
    if($center){var $this = $(this);
      function loadImages(){
	  var imgs = $center.attr('data-imgs').split(','), galleryName = imgs[0];
      $center.append($.map(imgs.slice(1),function(curr){
		  var thumb=curr.split('.');thumb[thumb.length-2]+='-thumb';
		  return '<a class="fancybox" href="<%-c.cdn%><%- c.root && c.root.length>1 ? c.root : c.startslash %>images/'+galleryName+'/'+curr+'" rel="article'+i+'"><img class="gallth" width="200px" height="160px" src="<%-c.cdn%><%- c.root && c.root.length>1 ? c.root : c.startslash %>images/'+galleryName+'/'+thumb.join('.')+'" alt="'/*+curr.split('.').slice(0,-1).join('.')*/+'"></a>';
	  }).join(''));
	  $center.removeAttr('data-imgs');
	  };
	  
	  if(first)$(window).on('load', loadImages);
	  else loadImages();
    }
  });}
  galleryMaker(true);

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
  <% if (c.counter){ %>
    if(!/(localhost$|^127\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\.)/.test(location.hostname)){$(window).on('load',function(){setTimeout(function(){(new Image()).src=unescape("%68%74%74%70%73%3A%2F%2F<%-c.counter%>%2E%67%6F%61%74%63%6F%75%6E%74%65%72%2E%63%6F%6D%2F%63%6F%75%6E%74%3F")+"p="+encodeURIComponent(location.pathname+location.search||"/")+"&t="+encodeURIComponent(document.title||"")+"&r="+encodeURIComponent(document.referrer)+"&s="+encodeURIComponent(window.screen.width+","+window.screen.height+","+(window.devicePixelRatio||1))+"&rnd="+(+new Date())},2000);});}
  <% } %>
	function urlParam(name){var res=new RegExp('[\?&]'+name+'=([^&#]*)').exec(window.location.href);return res==null?null:(res[1]||0);}
	if(window.location.pathname.toLowerCase().indexOf("/pretraga")>-1){
		if(urlParam('q')){
		$.getJSON('<%-c.cdn%>/json-feed.json',function(response){
			fuse = new Fuse(response,{shouldSort:true,threshold:0.4,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["t","u","c"]});
			var query = decodeURIComponent(urlParam('q').replace(/\+/g,' ')), results = fuse.search(query), resArr = [], i;
			for (i = 0; i < 20 && i < results.length; i++) {
				resArr.push('<h2><a href="'+results[i].u+'">'+results[i].t+'</a></h2>');
			}
			var plural = results.length > 1 ? 'o' : '';
			$("#found").text('Za traženi pojam "'+query+'" ' + (results.length?('pronađen'+plural+' je '+results.length+' rezultat'+plural.replace('o','a')+' - prikazan'+plural+' ' + i):'nije pronađen nijedan rezultat'));
			$("#results").html(resArr.join(''));
		}).fail(console.error);
		} else {
			$("#found").text('Niste unijeli pojam za pretragu.');
			$("#results").html('');
		}
}
  <% if (c.prefetchstyle){ %>
    !function(){var e=document.createElement("link");e.relList&&e.relList.supports&&e.relList.supports("prefetch")&&(e.rel="prefetch",e.href="<%- c.url_for('/css/style.css') %>",document.head.appendChild(e))}();
  <% } %>
  <% if (c.useprefetch){ %>
    !function(){var t=document.createElement("link");if(window.Set&&document.documentElement.dataset&&t.relList&&t.relList.supports&&t.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype){var e,n,o=new Set,a="instantAllowQueryString"in document.body.dataset,i="instantAllowExternalLinks"in document.body.dataset,r="instantWhitelist"in document.body.dataset,s=65,c=!1,d=!1,l=!1;if("instantIntensity"in document.body.dataset){var u=document.body.dataset.instantIntensity;if("mousedown"==u.substr(0,"mousedown".length))c=!0,"mousedown-only"==u&&(d=!0);else if("viewport"==u.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType.indexOf("2g")>-1)||("viewport"==u?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(l=!0):"viewport-all"==u&&(l=!0));else{var f=parseInt(u);isNaN(f)||(s=f)}}var m={capture:!0,passive:!0};if(d||document.addEventListener("touchstart",function(t){n=performance.now();var e=t.target.closest("a");h(e)&&p(e.href)},m),c?document.addEventListener("mousedown",function(t){var e=t.target.closest("a");h(e)&&p(e.href)},m):document.addEventListener("mouseover",function(t){if(!(performance.now()-n<1100)){var o=t.target.closest("a");h(o)&&(o.addEventListener("mouseout",v,{passive:!0}),e=setTimeout(function(){p(o.href),e=void 0},s))}},m),l)(window.requestIdleCallback?function(t){requestIdleCallback(t,{timeout:1500})}:function(t){t()})(function(){var t=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var n=e.target;t.unobserve(n),p(n.href)}})});[].slice.call(document.querySelectorAll("a")).forEach(function(e){h(e)&&t.observe(e)})});function v(t){t.relatedTarget&&t.target.closest("a")==t.relatedTarget.closest("a")||e&&(clearTimeout(e),e=void 0)}function h(t){if(t&&t.href&&(!r||"instant"in t.dataset)&&(i||t.origin==location.origin||"instant"in t.dataset)&&["http:","https:"].indexOf(t.protocol)>-1&&("http:"!=t.protocol||"https:"!=location.protocol)&&(a||!t.search||"instant"in t.dataset)&&!((t.hash||"#"==t.href.slice(-1))&&t.pathname+t.search==location.pathname+location.search||"noInstant"in t.dataset))return!0}function p(t){if(!o.has(t)){var e=document.createElement("link");e.rel="prefetch",e.href=t,document.head.appendChild(e),o.add(t)}}}}();
  <% } %>

  "serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/service-worker.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})});
  <% if (c.ajaxloader){ %>
    if(history.pushState){cache=(window.localStorage||(window.localStorage={}))&&localStorage.cache?JSON.parse(localStorage.cache):{},prefetched=[];var $main=$("#main"),$container=$("#container"),tempCache={html:$main.html(),title:document.title,url:location.href.replace(/index\.html(?!.*index\.html)/i,"")};function getAnchorTag(e){var t=e.target;if("closest"in t)return t.closest("a");var a=e.path||(e.composedPath?e.composedPath():null);if(a)for(var c=0;c<a.length;c++)if(a[c].nodeName&&"a"===a[c].nodeName.toLowerCase()&&a[c].href)return a[c]}function renderHTML(e,t){$(".article-share-box").remove(),$container.removeClass("mobile-nav-on"),t||history.pushState(e,e.title,e.url),document.title=e.title,$main.html(e.html),t||scrollTo(0,0),galleryMaker()}function ajaxLoad(e,t,a){t&&cache[e]&&renderHTML(cache[e]),!a&&cache[e]||$.get(e,function(a){a=String(a);var c=document.createElement("textarea");c.innerHTML=a.replace(/.*?<title>(.*?)<\/title>.*/i,"$1");var o=c.value,r=a.replace(/.*?<section id="main">(.*?)<\/section>.*/i,"$1");cache[e]={html:r,url:e,title:o},t&&renderHTML(cache[e]),localStorage.cache=JSON.stringify(cache)},"text")}function prefetchLinks(e){$("a.main-nav-link, a.article-date").each(function(t,a){ajaxLoad(a.href,!1,!!e)}),e||$.ajax("/json-feed.json",{method:"HEAD",success:function(e,t,a){tempcacheKey=a.getResponseHeader("content-length"),tempcacheKey?cache.key&&tempcacheKey!=cache.key&&(prefetchLinks(!0),cache.key=tempcacheKey,localStorage.cache=JSON.stringify(cache)):window.useGet=!0}})}function checkForUpdates(){$.ajax("/json-feed.json",{method:window.useGet?"GET":"HEAD",success:function(e,t,a){var c=window.useGet?e.length:a.getResponseHeader("content-length");cache.key&&c!=cache.key&&prefetchLinks(!0),c!=cache.key&&(cache.key=c,localStorage.cache=JSON.stringify(cache))}})}cache[tempCache.url]=tempCache,history.replaceState(tempCache,tempCache.title,tempCache.url),localStorage.cache=JSON.stringify(cache),$(document).on("click","a",function(e){var t=e.currentTarget;if(t.href==location.href)return e.preventDefault(),!1;if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.defaultPrevented&&t.href&&t.origin==location.origin&&["http:","https:"].indexOf(t.protocol)>-1&&["jpg","jpeg","png","gif","pdf","xml","json"].indexOf(t.href.toLowerCase().split(".").pop())<0&&("http:"!=t.protocol||"https:"!=location.protocol)&&!t.search&&!t.hash&&"#"!=t.href.slice(-1)){var a=getAnchorTag(e);if(!a||a.hasAttribute("download")||"external"===a.getAttribute("rel"))return;return e.preventDefault(),ajaxLoad(t.href,!0),!1}}).on("mouseover touchstart","a",function(e){var t=e.currentTarget;if(t.href&&t.origin==location.origin&&["http:","https:"].indexOf(t.protocol)>-1&&("http:"!=t.protocol||"https:"!=location.protocol)&&!t.search&&!t.hash&&"#"!=t.href.slice(-1))if(["jpg","jpeg","png","gif","pdf","xml","json"].indexOf(t.href.toLowerCase().split(".").pop())<0)ajaxLoad(t.href);else if(prefetched.indexOf(t.href)<0){prefetched.push(t.href);var a=document.createElement("link");a.rel="prefetch",a.href=t.href,document.head.appendChild(a)}}),window.onpopstate=function(e){e.state&&renderHTML(e.state,!0)},prefetchLinks();var updatesInt=setInterval(checkForUpdates,3e4)}else location.href!=location.href.replace(/index\.html(?!.*index\.html)/i,"")&&(location.href=location.href.replace(/index\.html(?!.*index\.html)/i,""));
  <% } %>
})(jQuery);
