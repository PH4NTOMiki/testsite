var version="worker_1.0.0",coreID=version+"_core",pageID=version+"_pages",imgID=version+"_img",cacheIDs=[coreID,pageID,imgID],trimCache=function(e,t){caches.open(e).then((function(t){t.keys().then((function(n){t.delete(n[0]).then((function(){trimCache(e)}))}))}))};self.addEventListener("install",(function(e){self.skipWaiting(),e.waitUntil(caches.open(coreID).then((function(e){return["/offline/","/favicon.ico","/"].forEach((function(t){e.add(new Request(t))})),e})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.filter((function(e){return!cacheIDs.includes(e)})).map((function(e){return caches.delete(e)})))})).then((function(){return self.clients.claim()})))})),self.addEventListener("fetch",(function(e){var t=e.request;"only-if-cached"===e.request.cache&&"same-origin"!==e.request.mode||"GET"===t.method&&(t.headers.get("Accept").includes("text/html")||t.headers.get("Accept").includes("/css")||t.headers.get("Accept").includes("/javascript")||t.url.endsWith("/")||t.url.toLowerCase().split("?")[0].endsWith(".js")||t.url.toLowerCase().split("?")[0].endsWith(".css")?e.respondWith(fetch(t).then((function(n){if("opaque"!==n.type){var c=n.clone();e.waitUntil(caches.open(pageID).then((function(e){return e.put(t,c)})))}return n})).catch((function(e){return caches.match(t).then((function(e){return e||(t.headers.get("Accept").includes("/css")||t.headers.get("Accept").includes("/javascript")?new Response("",{status:500,statusText:"offline"}):caches.match("/offline/"))}))}))):t.headers.get("Accept").includes("image")&&e.respondWith(caches.match(t).then((function(n){return n||fetch(t).then((function(n){if(t.headers.get("Accept").includes("image")){var c=n.clone();e.waitUntil(caches.open(imgID).then((function(e){return e.put(t,c)})))}return n}))}))))})),self.addEventListener("message",(function(e){"cleanUp"===e.data&&(trimCache(pageID),trimCache(imgID))}));