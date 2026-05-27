export function normalizeWhatsappNumber(rawNumber: string): string {
  return rawNumber.replace(/\D/g, "");
}

export function buildWhatsappUrl(number: string, message: string): string {
  const safeNumber = normalizeWhatsappNumber(number);
  const safeMessage = encodeURIComponent(message);
  return `https://wa.me/${safeNumber}?text=${safeMessage}`;
}

export function openExternalLink(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}

