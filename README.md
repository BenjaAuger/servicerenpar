# ServiceRenPar — Landing page

Proyecto React + Vite para mostrar servicios, productos y contacto por WhatsApp.

Repositorio: [github.com/BenjaAuger/servicerenpar](https://github.com/BenjaAuger/servicerenpar)

## Ramas

| Rama | Uso |
|------|-----|
| `main` | Producción (deploy en Cloudflare Pages) |
| `dev` | Desarrollo y pruebas |

## Requisitos

- Node.js 20+
- npm 10+

## Ejecutar en local

```bash
npm install
npm run dev
```

Producción local:

```bash
npm run build
npm run preview
```

## Dónde editar contenido

| Archivo | Qué editar |
|---------|------------|
| `src/app/config/siteContent.ts` | Empresa, WhatsApp, teléfono, email, dirección, mapa, horarios, imágenes de servicios |
| `public/products.json` | Catálogo de productos en venta |

Guía detallada: [INSTRUCCIONES_EDICION.md](./INSTRUCCIONES_EDICION.md)

## Imágenes (Google Drive)

Puedes usar en `image`:

- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/uc?export=view&id=FILE_ID`

La app convierte automáticamente enlaces compartidos de Drive al formato compatible con `<img>`.

## Validación de `products.json`

Al cargar la web se valida:

- `id`, `name`, `model`, `price`, `type`, `image`
- `type`: solo `Lavadora`, `Secadora`, `Lava Vajillas`
- `image`: URL HTTP/HTTPS válida

Productos inválidos se omiten. Si falla todo el JSON, se usa catálogo de respaldo en `siteContent.ts`.

## Deploy en Cloudflare Pages

**Build command:** `npm run build`  
**Output directory:** `dist`  
**Variable:** `NODE_VERSION = 20`  
**Rama recomendada:** `main`

Incluye `public/_headers` (seguridad base).

No uses `public/_redirects` con `/* /index.html 200`: provoca error `100324` (bucle infinito) en Workers/Pages. Esta landing usa anclas (`#servicios`), no rutas SPA.

### Dominio en nic.cl

1. Agrega el dominio en Cloudflare.
2. En [nic.cl](https://www.nic.cl), cambia los **nameservers** a los de Cloudflare.
3. En Pages → **Custom domains**, asocia tu dominio.
4. SSL se activa automáticamente.

No se requiere ninguna API en el código solo por usar dominio propio.

## Releases

| Tag | Descripción |
|-----|-------------|
| `v0.0.1` | Release inicial |
| `v0.0.2` | Fix deploy Cloudflare, datos de contacto y README actualizado |
