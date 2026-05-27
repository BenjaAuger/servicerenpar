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

function toDrivePreviewUrl(rawUrl: string): string | null {
  const filePathMatch = rawUrl.match(DRIVE_FILE_PATH_REGEX);
  if (filePathMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${filePathMatch[1]}`;
  }

  const idQueryMatch = rawUrl.match(DRIVE_OPEN_ID_REGEX);
  if (idQueryMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${idQueryMatch[1]}`;
  }

  return null;
}

/**
 * Normaliza URLs de imágenes externas.
 * Convierte enlaces compartidos de Google Drive a formato directo para <img>.
 */
export function resolveImageUrl(rawUrl: string): string {
  if (!rawUrl) return "";

  const trimmedUrl = rawUrl.trim();
  const drivePreviewUrl = toDrivePreviewUrl(trimmedUrl);
  const candidate = drivePreviewUrl ?? trimmedUrl;

  return isHttpUrl(candidate) ? candidate : "";
}

