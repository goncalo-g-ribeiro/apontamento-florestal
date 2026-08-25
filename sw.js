const CACHE_NAME = 'apontamento-florestal-v2';

// Garante o caminho exato dentro do repositório apontamento-florestal
const GH_PATH = '/apontamento-florestal';

const ASSETS_TO_CACHE = [
  `${GH_PATH}/`,
  `${GH_PATH}/index.html`,
  `${GH_PATH}/manifest.json`,
  `${GH_PATH}/icon-192.png`,
  `${GH_PATH}/icon-512.png`
];

// Instalação: Salva todos os arquivos no cache do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação: Limpa versões antigas do cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptação: Serve os arquivos do cache quando estiver sem internet (Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
