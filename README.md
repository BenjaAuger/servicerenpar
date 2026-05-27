# Landing page para servicios

Proyecto React + Vite para mostrar servicios, productos y contacto por WhatsApp.

## Requisitos

- Node.js 20+
- npm 10+ (o pnpm si prefieres)

## Ejecutar en local

```bash
npm install
npm run dev
```

Para probar la versión de producción:

```bash
npm run build
npm run preview
```

## Dónde editar contenido

El contenido editable queda dividido en dos zonas:

- `src/app/config/siteContent.ts`
- `public/products.json`

En `siteContent.ts` puedes cambiar:

- Nombre de negocio
- WhatsApp, teléfono y correo
- Dirección y mapa de Google
- Horarios
- Servicios

En `public/products.json` puedes cambiar:

- Catálogo de productos
- Precios
- Imágenes
- Tipos de producto

## Imágenes con Google Drive

Puedes usar cualquiera de estos formatos en `image`:

- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/uc?export=view&id=FILE_ID`

La app convierte automáticamente los enlaces compartidos de Drive al formato compatible para `<img>`.

## Validación automática de catálogo

Al iniciar, la app carga `public/products.json` y valida:

- `id`: número
- `name`: texto obligatorio
- `model`: texto obligatorio
- `price`: número mayor a 0
- `type`: solo `Lavadora`, `Secadora`, `Lava Vajillas`
- `image`: URL HTTP/HTTPS válida (incluye Google Drive)

Si algún producto está mal, se descarta automáticamente.
Si todo el JSON falla, la app usa un catálogo de respaldo.

## Deploy en Cloudflare Pages

El proyecto ya incluye:

- `public/_headers` con headers de seguridad base

No uses `public/_redirects` con regla `/* /index.html 200` en Workers/Pages actuales: puede provocar error `100324` (bucle infinito). Esta landing no usa React Router; con anclas (`#servicios`) no necesita fallback SPA.

Build command en Cloudflare Pages:

- `npm run build`

Output directory:

- `dist`

Checklist rápido:

1. Verifica local: `npm run build`.
2. Sube repo a GitHub.
3. En Cloudflare Pages: **Create a project**.
4. Conecta repo y branch principal.
5. Framework: **Vite**.
6. Build command: `npm run build`.
7. Output directory: `dist`.
8. Node version env var:
   - `NODE_VERSION = 20`
9. Deploy.
10. Revisa que funcionen:
   - Home y secciones con anclas (`#servicios`)
   - Headers de seguridad (`_headers`)
   - Carga de `products.json`
  