// Get service worker help from walk-thru Webinar:
// https://www.youtube.com/watch?v=LvQe7xrUh7I&index=6&list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s&t=0s

const CACHE_VERSION = 1;
const STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;
const IMAGES_CACHE = `images-cache-v`;
const MAP_CACHE = `map-cache`;
const allCaches = [STATIC_CACHE, IMAGES_CACHE, MAP_CACHE];

function isImageURL(url) {
	let imageTypes = ['jpg', 'jpeg', 'png', 'gif'];
	let isImage = false;
	if (url.endsWith('jpg') || url.endsWith('png') || url.endsWith('gif') || url.endsWith('jpeg')) {
		isImage = true;
	}
	return isImage;
}

function storeInCache(cacheName, requestClone, responseClone) {
	return caches.open(cacheName).then(function(cache) {
		return cache.put(requestClone, responseClone)
	});
}

self.addEventListener('install', function(event) {
	event.waitUntil(
		// add the pages that we want to cache
		caches.open(STATIC_CACHE).then(function(cache) {
			console.log("Current cache is ", STATIC_CACHE);
			return cache.addAll([
				'/',
				'/index.html'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if(!allCaches.includes(cacheName)) {
						console.log(`Deleting: ${cacheName}`);
						return caches.delete(cacheName);
					}
					// return caches.delete(cacheName);
				})
			);
		})
	);
});

// Found help in student-curated resources
// Thanks to Matthew Cranford website https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if(response) {
				console.log('Found ', event.request, ' in cache');
				return response;
			}
			else {
				console.log('Cannot find ', event.request, ' in cache, FETCHING');
				return fetch(event.request)
				.then(function(response) {
					let useCache = isImageURL(event.request.url) ? IMAGES_CACHE : STATIC_CACHE;
					storeInCache(useCache, event.request.clone(), response.clone());
					return response;
				})
				.catch(function(err) {
					console.log(err);
				});
			}
		})
	);
});