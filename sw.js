const V='uz-v2',CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'],T3='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all([c.addAll(CORE.map(u=>new Request(u,{cache:'reload'}))),fetch(T3,{mode:'no-cors'}).then(r=>c.put(T3,r)).catch(()=>{})])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* Archivos del juego: primero internet (siempre la última versión), y si no hay conexión, la copia guardada.
   Archivos de otros sitios (three.js): primero la copia guardada. */
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
const same=new URL(e.request.url).origin===self.location.origin;
if(same){e.respondWith(fetch(e.request,{cache:'no-cache'}).then(n=>{const cp=n.clone();caches.open(V).then(c=>c.put(e.request,cp));return n}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))))}
else{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(V).then(c=>c.put(e.request,cp));return n})))}});
