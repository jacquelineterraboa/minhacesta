const CACHE_NAME = 'da-roca-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/beneficios.html',
  '/nossos-itens.html',
  '/minha-cesta/entrar.html',
  '/minha-cesta/cadastro-cliente.html',
  '/minha-cesta/cadastro-fornecedores.html',
  '/escolher-cadastro.html',
  '/css/estilo.css', // ajuste o caminho conforme seu projeto
  '/img/logo.png',   // coloque aqui o logo, se houver
];

// Instala o service worker e faz cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o novo SW e limpa caches antigos se necessário
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercepta as requisições e serve os arquivos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se estiver no cache, retorna
      if (response) {
        return response;
      }
      // Se não, busca na rede
      return fetch(event.request);
    })
  );
});
