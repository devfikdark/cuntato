const cacheName = "cache-v1";
const preCachedResources = [
  "/",
  "public/css/style.min.css",
  "public/css/loader.css",
  "public/avatar.png",
  "public/blob.png",
  "public/blob2.png",
  "public/cuntato.png",
  "public/svg/authenticationsvg.svg",
  "public/svg/banner.svg",
  "public/svg/cuntato.png",
  "public/svg/empty.svg",
  "public/svg/setupsvg.svg",
  "public/svg/setupsvg1.svg",
  "public/svg/wave.svg",
  "public/js/app.js",
  "public/js/dashboardController.js",
  "public/js/profileController.js",
  "public/js/projectController.js",
  "views/index.ejs",
  "views/dashboard.ejs",
  "views/error.ejs",
  "views/profile.ejs",
  "views/project.ejs",
  "views/project.ejs",
  "model/authModel.js",
  "model/dataModel.js",
  "model/projectModel.js",
  "controllers/appController.js",
  "controllers/authController.js",
  "config/dgConfig.js",
  "router/appRouter.js",
  "router/authRouter.js",
  "router/basicRouter.js",
];

self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(preCachedResources);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cache.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
