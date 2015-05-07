Cache.prototype.add||(Cache.prototype.add=function(request){return this.addAll([request])}),Cache.prototype.addAll||(Cache.prototype.addAll=function(requests){function NetworkError(message){this.name="NetworkError",this.code=19,this.message=message}var cache=this;return NetworkError.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return requests=requests.map(function(request){return request instanceof Request?request:String(request)}),Promise.all(requests.map(function(request){"string"==typeof request&&(request=new Request(request));var scheme=new URL(request.url).protocol;if("http:"!==scheme&&"https:"!==scheme)throw new NetworkError("Invalid scheme");return fetch(request.clone())}))}).then(function(responses){return Promise.all(responses.map(function(response,i){return cache.put(requests[i],response)}))}).then(function(){return void 0})}),CacheStorage.prototype.match||(CacheStorage.prototype.match=function(request,opts){var caches=this;return this.keys().then(function(cacheNames){var match;return cacheNames.reduce(function(chain,cacheName){return chain.then(function(){return match||caches.open(cacheName).then(function(cache){return cache.match(request,opts)}).then(function(response){return match=response})})},Promise.resolve())})});
//# sourceMappingURL=../../../lib/serviceworker-cache-polyfill.js/dist/serviceworker-cache-polyfill.js.map