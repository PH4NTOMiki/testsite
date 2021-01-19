var version = 'worker_1.0.7';
var filesToCache = ['/', '/offline/', '/favicon.ico'];
// Cache IDs
var coreID = version + '_core';
var pageID = version + '_pages';
var imgID = version + '_img';
var cacheIDs = [coreID, pageID, imgID];

// Font files
/* var fontFiles = [
	'/fonts/pt-serif-v11-latin-regular.woff',
	'/fonts/pt-serif-v11-latin-regular.woff2',
	'/fonts/pt-serif-v11-latin-italic.woff',
	'/fonts/pt-serif-v11-latin-italic.woff2',
	'/fonts/pt-serif-v11-latin-700.woff',
	'/fonts/pt-serif-v11-latin-700.woff2',
	'/fonts/pt-serif-v11-latin-700italic.woff',
	'/fonts/pt-serif-v11-latin-700italic.woff2'
]; */


//
// Methods
//

/**
 * Remove cached items over a certain number
 * @param {string} key The cache key
 * @param {number} max The max number of items allowed
 */
var trimCache = function (key, max) {
	caches.open(key).then(function (cache) {
		cache.keys().then(function (keys) {
			cache.delete(keys[0]).then(function () {
				trimCache(key);
			});
		});
	});
};


//
// Event Listeners
//

// On install, cache some stuff
self.addEventListener('install', function (event) {
	self.skipWaiting();
	event.waitUntil(caches.open(coreID).then(function (cache) {
		filesToCache.forEach(function(e){
			cache.add(new Request(e));
		});
		//cache.add(new Request('/offline/'));
		//cache.add(new Request('/favicon.ico'));
		// cache.add(new Request('/css/images/banner.jpg'));
		/* fontFiles.forEach(function (file) {
			cache.add(new Request(file));
		}); */
		return cache;
	}));
});

// On version update, remove old cached files
self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return !cacheIDs.includes(key);
		}).map(function (key) {
			return caches.delete(key);
		}));
	}).then(function () {
		return self.clients.claim();
	}));
});

// listen for requests
self.addEventListener('fetch', function (event) {

	// Get the request
	const request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;

	// Ignore non-GET requests
	if (request.method !== 'GET') return;

	// Ignore protocols other than https and http
	if(!(request.url.startsWith('https://') || request.url.startsWith('http://'))) return;

	// Ignore wp-admin or wp-login routes if this site is Wordpress powered
	if(['wp-admin', 'wp-login'].includes(location.href.split('?')[0].split('.php')[0].split('/').slice(3)[0])) return;

	const acceptHeader = request.headers.get('Accept').toLowerCase();

	// HTML files
	// Network-first
	if (acceptHeader.includes('text/html') || acceptHeader.includes('/css') || acceptHeader.includes('/javascript') || request.url.endsWith('/') || request.url.toLowerCase().split('?')[0].endsWith('.js') || request.url.toLowerCase().split('?')[0].endsWith('.css')) {
		event.respondWith(
			fetch(request).then(function (response) {
				if (response.type !== 'opaque') {
					var copy = response.clone();
					var copy2 = response.clone();
					event.waitUntil(caches.open(pageID).then(function (cache) {
						return cache.put(request, copy);
					}).then(function() {//console.log('reached filesToCache check');
						const url = new URL(response.url);
						if(location.origin !== url.origin || !filesToCache.includes(url.pathname))return Promise.resolve();
						return caches.open(coreID).then(function (cache) {
							//console.log('opened core cache', cache, 'caching ', request.url);
							let a = cache.put(request, copy2);
							//console.log(a)
							return a;
						})
					}));
				}
				return response;
			}).catch(function (error) {
				return caches.match(request).then(function (response) {
					if(response)return response;
					if(acceptHeader.includes('/css') || acceptHeader.includes('/javascript'))return new Response('', {status: 500, statusText: 'offline'});
					return caches.match('/offline/');
				});
			})
		);
		return;
	}

	// Images & Fonts
	// Offline-first
	if (acceptHeader.includes('image') || acceptHeader.includes('font/') || ['fonts.googleapis.com', 'fonts.gstatic.com'].includes(request.url.split('/')[2]) || request.url.toLowerCase().includes('fontawesome')) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {

					// If an image, stash a copy of this image in the images cache
					//if (acceptHeader.includes('image')) {
						var copy = response.clone();
						var copy2 = response.clone();
						event.waitUntil(caches.open(imgID).then(function (cache) {
							return cache.put(request, copy);
						}).then(function() {
							const url = new URL(response.url);
							if(location.origin !== url.origin || !filesToCache.includes(url.pathname))return Promise.resolve();
							return caches.open(coreID).then(function (cache) {
								return cache.put(request, copy2);
							})
						}));
					//}

					// Return the requested file
					return response;

				});
			})
		);
	}

});

// Trim caches over a certain size
self.addEventListener('message', function (event) {
	if (event.data !== 'cleanUp') return;
	trimCache(pageID);
	trimCache(imgID);
});
