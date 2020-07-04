self.addEventListener('fetch', (evt) => {
	if(evt.request.url.indexOf("hello")>-1 && self.mods) {
		evt.respondWith(new Promise( (res, fail) => {
			let resp = new Response(self.mods.hello, { headers: { "Content-Type": "text/javascript" } })
			res(resp)
		}))
	}
})
self.onmessage = async (evt) => {
	if(evt.data.msg == "install") {
		if(self.mods) {
			let client = await clients.get(evt.source.id)
			client.postMessage("modules already extant")
		} else {
			self.mods = evt.data.payload
			let client = await clients.get(evt.source.id)
			client.postMessage("modules installed")
		}
	} else if(evt.data.msg == "uninstall") {
		if(!self.mods) {
			let client = await clients.get(evt.source.id)
			client.postMessage("modules not detected")	
		} else {
			self.mods = null
			let client = await clients.get(evt.source.id)
			client.postMessage("modules uninstalled")
		}
	}
}

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});