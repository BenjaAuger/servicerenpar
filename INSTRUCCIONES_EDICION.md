# Guía rápida de edición (ServiceRenPar)

## Archivo principal de edición

Edita estos archivos:

- `src/app/config/siteContent.ts`
- `public/products.json`

No es necesario modificar componentes React para cambios normales.

---

## Qué puedes cambiar fácilmente

Dentro de `SITE_CONTENT`:

- `businessName`: nombre de la empresa
- `whatsappNumber`: número en formato internacional (solo dígitos)
- `phone`: teléfono visible en la web
- `email`: correo visible
- `address`: dirección visible
- `heroImages`: carrusel de imágenes del hero (cambia cada 30 s)
- `heroCarouselIntervalMs`: milisegundos entre cambios (30000 = 30 s)
- Por cada slide en `heroImages` puedes ajustar:
  - `objectPosition`: encuadre (`"center"`, `"top"`, `"center top"`, `"50% 30%"`)
  - `objectFit`: `"cover"` (llena, puede recortar) o `"contain"` (foto completa)
- `mapEmbedUrl`: iframe URL de Google Maps

### SEO (Google Search Console)

Edita `seo.config.json` en la raíz del proyecto:

- `siteUrl`: URL pública del sitio (sin barra final). Ejemplo: `https://tudominio.cl`
- `siteName`: nombre para logs internos al generar archivos

Tras cambiar `siteUrl`, ejecuta `npm run generate:seo` o simplemente `npm run build`. Se actualizan `public/robots.txt` y `public/sitemap.xml`.

Dentro de `BUSINESS_HOURS`:

- Horarios por día

Dentro de `public/products.json`:

- Nombre, modelo, precio, tipo e imagen de cada producto.
- Es un arreglo JSON puro (sin comentarios).
- La app valida automáticamente cada registro.

Dentro de `SERVICE_OPTIONS`:

- Por cada tipo (Lavadora, Secadora, Lava Vajillas) puedes ajustar:
  - `imageVariant`: `"landscape"` (franja horizontal) o `"portrait"` (recuadro vertical, fotos de celular)
  - `objectPosition`: encuadre (`"center"`, `"center 40%"`, etc.)
  - `objectFit`: `"cover"` (recomendado) o `"contain"` (foto completa, puede dejar bandas vacías)

- Tipos e imágenes para reparación/mantenimiento

---

## Imágenes desde Google Drive

Puedes pegar en `image` cualquiera de estos enlaces:

1. Compartido:
   - `https://drive.google.com/file/d/FILE_ID/view`
2. Directo:
   - `https://drive.google.com/uc?export=view&id=FILE_ID`

La app ya transforma automáticamente el formato compartido al formato que funciona en imágenes.

---

## Estructura exacta de `products.json`

Cada producto debe tener este formato:

```json
{
  "id": 1,
  "name": "Lavadora Samsung 18kg",
  "model": "WA18R6780CV",
  "price": 599000,
  "type": "Lavadora",
  "image": "https://drive.google.com/file/d/FILE_ID/view"
}
```

Valores permitidos para `type`:

- `Lavadora`
- `Secadora`
- `Lava Vajillas`

Si un producto viene con error de formato o URL inválida:

- Se omite automáticamente.
- El resto del catálogo sigue funcionando.

### Cómo obtener el FILE_ID

Si tu enlace es:

`https://drive.google.com/file/d/1Oq_k1WfahNRjeMaAWCqSQK7QMdAviKMB/view`

El `FILE_ID` es:

`1Oq_k1WfahNRjeMaAWCqSQK7QMdAviKMB`

---

## Cambiar mapa de Google

1. Abre Google Maps.
2. Busca la dirección.
3. Click en **Compartir** -> **Insertar un mapa**.
4. Copia la URL del `src` del iframe.
5. Reemplaza `mapEmbedUrl` en `SITE_CONTENT`.

---

## Recomendaciones

- Usa imágenes optimizadas (ideal 1200px máx ancho, formato WebP/JPG).
- Evita nombres de archivo con caracteres extraños.
- Verifica que las imágenes de Drive estén en modo **Cualquier persona con el enlace**.

---

## Validación local

```bash
npm install
npm run build
npm run preview
```

Si `build` funciona, está lista para Cloudflare.

---

## Checklist deploy Cloudflare Pages

1. `npm run build` en local.
2. Commit y push a GitHub.
3. Cloudflare Pages -> Create project.
4. Selecciona repo.
5. Framework preset: **Vite**.
6. Build command: `npm run build`.
7. Build output directory: `dist`.
8. Environment variable:
   - `NODE_VERSION` = `20`
9. Deploy.
10. Validación post-deploy:
   - Abre home.
   - Verifica botón WhatsApp.
   - Abre modal de productos y confirma imágenes.
   - Revisa mapa.
