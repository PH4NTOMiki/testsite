var version = 'worker_1.0.0';
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
 * @param  {String}  key The cache key
 * @param  {Integer} max The max number of items allowed
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
		cache.add(new Request('/offline/'));
		cache.add(new Request('/favicon.ico'));
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
	var request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// Ignore non-GET requests
	if (request.method !== 'GET') return;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html') || request.url.endsWith('/') || request.url.toLowerCase().endsWith('.js') || request.url.toLowerCase().endsWith('.css')) {
		event.respondWith(
			fetch(request).then(function (response) {
				if (response.type !== 'opaque') {
					var copy = response.clone();
					event.waitUntil(caches.open(pageID).then(function (cache) {
						return cache.put(request, copy);
					}));
				}
				return response;
			}).catch(function (error) {
				return caches.match(request).then(function (response) {
					return response || caches.match('/offline/');
				});
			})
		);
		return;
	}

	// Images & Fonts
	// Offline-first
	if (request.headers.get('Accept').includes('image') /* || request.url.includes('pt-serif-v11') || request.url.includes('/css/fonts.css') */) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {

					// If an image, stash a copy of this image in the images cache
					if (request.headers.get('Accept').includes('image')) {
						var copy = response.clone();
						event.waitUntil(caches.open(imgID).then(function (cache) {
							return cache.put(request, copy);
						}));
					}

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