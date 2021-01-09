var version="worker_1.0.3",filesToCache=["/","/offline/","/favicon.ico"],coreID=version+"_core",pageID=version+"_pages",imgID=version+"_img",cacheIDs=[coreID,pageID,imgID],trimCache=function(e,t){caches.open(e).then((function(t){t.keys().then((function(n){t.delete(n[0]).then((function(){trimCache(e)}))}))}))};self.addEventListener("install",(function(e){self.skipWaiting(),e.waitUntil(caches.open(coreID).then((function(e){return filesToCache.forEach((function(t){e.add(new Request(t))})),e})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.filter((function(e){return!cacheIDs.includes(e)})).map((function(e){return caches.delete(e)})))})).then((function(){return self.clients.claim()})))})),self.addEventListener("fetch",(function(e){var t=e.request;"only-if-cached"===t.cache&&"same-origin"!==t.mode||"GET"===t.method&&(t.url.startsWith("https://")||t.url.startsWith("http://"))&&(["wp-admin","wp-login"].includes(location.href.split("?")[0].split(".php")[0].split("/").slice(3)[0])||(t.headers.get("Accept").includes("text/html")||t.headers.get("Accept").includes("/css")||t.headers.get("Accept").includes("/javascript")||t.url.endsWith("/")||t.url.toLowerCase().split("?")[0].endsWith(".js")||t.url.toLowerCase().split("?")[0].endsWith(".css")?e.respondWith(fetch(t).then((function(n){if("opaque"!==n.type){var c=n.clone(),i=n.clone();e.waitUntil(caches.open(pageID).then((function(e){return e.put(t,c)})).then((function(){const e=new URL(n.url);return location.origin===e.origin&&filesToCache.includes(e.pathname)?caches.open(coreID).then((function(e){return e.put(t,i)})):Promise.resolve()})))}return n})).catch((function(e){return caches.match(t).then((function(e){return e||(t.headers.get("Accept").includes("/css")||t.headers.get("Accept").includes("/javascript")?new Response("",{status:500,statusText:"offline"}):caches.match("/offline/"))}))}))):(t.headers.get("Accept").includes("image")||["fonts.googleapis.com","fonts.gstatic.com"].includes(t.url.split("/")[2])||t.url.toLowerCase().includes("fontawesome"))&&e.respondWith(caches.match(t).then((function(n){return n||fetch(t).then((function(n){var c=n.clone(),i=n.clone();return e.waitUntil(caches.open(imgID).then((function(e){return e.put(t,c)})).then((function(){const e=new URL(n.url);return location.origin===e.origin&&filesToCache.includes(e.pathname)?caches.open(coreID).then((function(e){return e.put(t,i)})):Promise.resolve()}))),n}))})))))})),self.addEventListener("message",(function(e){"cleanUp"===e.data&&(trimCache(pageID),trimCache(imgID))}));