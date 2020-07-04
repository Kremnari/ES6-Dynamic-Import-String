const mods = { }
mods.hello = `
	export function say() {
	globalThis.msg("hello from base!")
	}
`
mods.goodbye =`
	export function say() {
	globalThis.msg("goodbye from base!")
	}
`
self.modList = mods

async function install(evt, uninstall = false) {
	if(uninstall)
	     navigator.serviceWorker.controller.postMessage({msg: 'uninstall', payload: null})
	else navigator.serviceWorker.controller.postMessage({msg: 'install', payload: self.modList })
}

async function onClick(evt) {
	let module = prompt("Which module to load?")
	import("./"+module+".js?"+Date.now())  //Date prevents import caching
		.then( obj => {
			 obj.say()
		 })
}
navigator.serviceWorker.ready.then( () => {
	document.querySelector("#install").disabled = false
	console.log("sw ready")
})
navigator.serviceWorker.addEventListener('message', (msg) => {
	globalThis.msg(msg.data)
})
globalThis.modClick = onClick
globalThis.install = install
globalThis.msg = (msg) => {
	document.querySelector("#message").textContent = msg
}