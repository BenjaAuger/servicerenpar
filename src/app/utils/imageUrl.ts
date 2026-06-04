const DRIVE_FILE_PATH_REGEX = /drive\.google\.com\/file\/d\/([^/]+)/i;
const DRIVE_OPEN_ID_REGEX = /[?&]id=([^&]+)/i;

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** Extrae el FILE_ID de enlaces compartidos de Google Drive. */
export function extractDriveFileId(rawUrl: string): string | null {
  const trimmedUrl = rawUrl.trim();
  const filePathMatch = trimmedUrl.match(DRIVE_FILE_PATH_REGEX);
  if (filePathMatch?.[1]) return filePathMatch[1];

  const idQueryMatch = trimmedUrl.match(DRIVE_OPEN_ID_REGEX);
  if (idQueryMatch?.[1]) return idQueryMatch[1];

  return null;
}

/**
 * Variantes de URL para mostrar una imagen de Drive en <img>.
 * Si una falla, ImageWithFallback prueba la siguiente.
 */
export function getDriveImageCandidates(rawUrl: string): string[] {
  const fileId = extractDriveFileId(rawUrl);
  if (!fileId) return [];

  return [
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://lh3.googleusercontent.com/d/${fileId}=w1920`,
  ];
}

/**
 * Normaliza URLs de imágenes externas.
 * Convierte enlaces compartidos de Google Drive al formato más compatible para <img>.
 */
export function resolveImageUrl(rawUrl: string): string {
  if (!rawUrl) return "";

  const trimmedUrl = rawUrl.trim();
  const driveCandidates = getDriveImageCandidates(trimmedUrl);
  if (driveCandidates.length > 0) return driveCandidates[0];

  return isHttpUrl(trimmedUrl) ? trimmedUrl : "";
}

/**
 * Lista de URLs a probar para una imagen (Drive con fallbacks o URL directa).
 */
export function getImageCandidates(rawUrl: string): string[] {
  if (!rawUrl) return [];

  const trimmedUrl = rawUrl.trim();
  const driveCandidates = getDriveImageCandidates(trimmedUrl);
  if (driveCandidates.length > 0) return driveCandidates;

  const resolved = isHttpUrl(trimmedUrl) ? trimmedUrl : "";
  return resolved ? [resolved] : [];
}
