self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function (response) {
                caches.open('images').then(function (cache) {
                    cache.put(event.request, response.clone());
                });
                return response;
            });
        })
    );
});
