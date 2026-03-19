# examenIbero

Plataforma web de preparacion para el examen de admision a secundaria de la Universidad Iberoamericana Ciudad de Mexico.

## Estado actual
- La app funciona como sitio web estatico para navegador.
- No debe abrirse con doble clic en `index.html` (`file://`), porque el navegador bloquea la carga dinamica de lecciones y preguntas.
- Para uso local se levanta con servidor estatico.
- Para uso publico puede publicarse en GitHub Pages u otro hosting estatico.

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
2. Levantar servidor local:
   `npm run serve`
3. Abrir en navegador:
   `http://127.0.0.1:4173`

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
- El panel de evolucion del aprendizaje guarda avance en `localStorage` del navegador del alumno.
