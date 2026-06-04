# Servicio Ren-Par — Landing page

Proyecto React + Vite para mostrar servicios, productos y contacto por WhatsApp.

Repositorio: [github.com/BenjaAuger/servicerenpar](https://github.com/BenjaAuger/servicerenpar)  
Sitio: [servicerenpar.cl](https://servicerenpar.cl)

## Ramas

| Rama | Uso |
|------|-----|
| `main` | Producción (deploy en Cloudflare Pages) |
| `develop` | Desarrollo e integración de cambios |
| `dev` | Alias histórico (sincronizada con `develop`) |

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
| `src/app/config/siteContent.ts` | Empresa, WhatsApp, teléfono, email, dirección, mapa, horarios, carrusel hero, imágenes de servicios |
| `public/products.json` | Catálogo de productos en venta |
| `seo.config.json` | URL pública del sitio (`siteUrl`) para `robots.txt` y `sitemap.xml` |

Guía detallada: [INSTRUCCIONES_EDICION.md](./INSTRUCCIONES_EDICION.md)

## Carrusel del hero

- Slides en `SITE_CONTENT.heroImages` (Google Drive o URL directa).
- Intervalo por defecto: 30 s (`heroCarouselIntervalMs`).
- Por slide: `objectFit` (`cover` / `contain`) y `objectPosition` para encuadre.

## Imágenes (Google Drive)

Puedes usar en `image`:

- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/uc?export=view&id=FILE_ID`

La app convierte enlaces compartidos y prueba varias URLs si una falla (`ImageWithFallback`).

**Importante:** el archivo en Drive debe estar en modo “Cualquier persona con el enlace”.

## Validación de `products.json`

Al cargar la web se valida:

- `id`, `name`, `model`, `price`, `type`, `image`
- `type`: solo `Lavadora`, `Secadora`, `Lava Vajillas`
- `image`: URL HTTP/HTTPS válida
- IDs duplicados se omiten (se conserva el primero)

Productos inválidos se omiten. Si falla todo el JSON, se usa catálogo de respaldo en `siteContent.ts`.

## SEO y Google Search Console

Archivos generados en `public/`:

- `robots.txt` — indexación y enlace al sitemap
- `sitemap.xml` — URL principal del sitio

Configura la URL en `seo.config.json`:

```json
{
  "siteUrl": "https://servicerenpar.cl",
  "siteName": "Servicio Ren-Par"
}
```

Regeneración automática en `npm run dev` y `npm run build`, o manual:

```bash
npm run generate:seo
```

### Pasos en Search Console

1. [Google Search Console](https://search.google.com/search-console) → propiedad `https://servicerenpar.cl`.
2. Verificar dominio (DNS en Cloudflare recomendado).
3. Sitemaps → `https://servicerenpar.cl/sitemap.xml`.
4. Inspección de URL → solicitar indexación de la home.

## Deploy en Cloudflare Pages

| Campo | Valor |
|-------|--------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Variable | `NODE_VERSION = 20` |
| Rama producción | `main` |

Incluye `public/_headers` (CSP y headers de seguridad).

No uses `public/_redirects` con `/* /index.html 200`: provoca error `100324` (bucle infinito) en Workers/Pages. Esta landing usa anclas (`#servicios`), no rutas SPA.

### Dominio en nic.cl

1. Agrega el dominio en Cloudflare.
2. En [nic.cl](https://www.nic.cl), cambia los **nameservers** a Cloudflare.
3. Pages → **Custom domains** → asocia `servicerenpar.cl`.
4. SSL se activa automáticamente.

## Visibilidad y publicidad (Google / Meta)

La web está lista como landing de conversión (WhatsApp). Para más tráfico:

1. Perfil de **Google Empresa** (Maps) con dirección y enlace a la web.
2. **Google Ads** (búsqueda local) y **Meta Ads** (Facebook/Instagram) apuntando a `servicerenpar.cl`.
3. Instalar píxeles de medición (GA4 / Meta Pixel) cuando tengas cuentas de anuncios.

## Releases

| Tag | Descripción |
|-----|-------------|
| `v0.0.1` | Release inicial |
| `v0.0.2` | Fix deploy Cloudflare, contacto cliente y README |
| `v0.0.3` | Carrusel hero, SEO (`robots`/`sitemap`), imágenes Drive, encuadre servicios, dominio `servicerenpar.cl`, deduplicación catálogo |
