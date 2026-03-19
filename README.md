# examenIbero

Plataforma web de preparacion para el examen de admision a secundaria de la Universidad Iberoamericana Ciudad de Mexico.

## Estado actual
- La app puede correr en dos modos:
- `npm run serve`: frontend + backend integrado (login real, sesiones y progreso persistente).
- `npm run serve:static`: solo frontend estatico, util para emular GitHub Pages.
- No debe abrirse con doble clic en `index.html` (`file://`), porque el navegador bloquea la carga dinamica de lecciones y preguntas.

## Estructura principal
- `index.html`: entrada principal de la app.
- `css/`: estilos del sitio.
- `js/`: logica principal, overrides y analitica de aprendizaje.
- `data/`: banco de preguntas JSON.
- `lessons/`: lecturas y contenido pedagogico.
- `infoexterna/`: imagenes, audio y videos locales.
- `tests/`: pruebas visuales automatizadas con Playwright.

## Desarrollo local
1. Instalar dependencias:
   `npm install`
2. Levantar app completa con backend:
   `npm run serve`
3. Abrir en navegador:
   `http://127.0.0.1:4173`

## Backend local
- API disponible en `/api/*`
- Login con sesion HTTP y persistencia en `backend/data/app-db.json`
- Seed versionada en `backend/data/app-db.seed.json`
- Usuario inicial:
  - `ari / santa0249`

## Crear otra alumna
- Comando:
  `npm run create:student -- <usuario> <password> <Nombre Visible>`
- Ejemplo:
  `npm run create:student -- ana clave123 Ana Lopez`

## Cloudflare Pages + Functions
- Functions en `functions/api/*`
- Esquema D1 en `backend/d1/schema.sql`
- Seed D1 en `backend/d1/seed.sql`
- Configuracion activa en `wrangler.toml`
- Scripts utiles:
  - `npm run cf:deploy`
  - `npm run cf:d1:schema`
  - `npm run cf:d1:seed`
  - `npm run create:student:cf -- <usuario> <password> <Nombre Visible>`

## Pruebas
- `npm run test:visual`
- `npm run test:visual:headed`

## Publicacion en navegador con GitHub Pages
El proyecto ya incluye workflow en:
- `.github/workflows/deploy-pages.yml`

Para publicarlo:
1. Sube esta version a un repositorio GitHub.
2. Usa la rama `main`.
3. En GitHub, habilita `Settings > Pages` si te lo pide.
4. Cada push a `main` desplegara el sitio automaticamente.

## Observaciones de despliegue
- Las rutas del proyecto son relativas, asi que funcionan bien en GitHub Pages.
- Los datos y lecciones se cargan desde `data/` y `lessons/`, por lo que requieren hosting web normal, no apertura local por archivo.
- GitHub Pages no ejecuta el backend Node de `tools/full-server.js`.
- Si publicas solo en GitHub Pages, la app funciona en modo estatico y cae a respaldo local.
- Para autenticacion real multiusuario y progreso compartido entre dispositivos, hay que desplegarla en un hosting con Node o migrar la API a un backend edge/serverless.
