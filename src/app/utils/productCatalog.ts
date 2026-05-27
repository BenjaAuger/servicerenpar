import { resolveImageUrl } from "./imageUrl";
import type { ApplianceType, Product } from "../config/siteContent";

const APPLIANCE_TYPES: ApplianceType[] = ["Lavadora", "Secadora", "Lava Vajillas"];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function sanitizePrice(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return Math.round(value);
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) return Math.round(parsed);
  }
  return null;
}

/**
 * Valida y normaliza el catálogo editable de `public/products.json`.
 * Retorna solo productos válidos y omite entradas dañadas.
 */
export function normalizeProductsCatalog(rawCatalog: unknown): Product[] {
  if (!Array.isArray(rawCatalog)) return [];

  const normalizedProducts: Product[] = [];

  for (const item of rawCatalog) {
    if (!isObject(item)) continue;

    const idValue = item.id;
    const nameValue = item.name;
    const modelValue = item.model;
    const typeValue = item.type;
    const imageValue = item.image;
    const priceValue = item.price;

    if (typeof idValue !== "number" || !Number.isFinite(idValue)) continue;
    if (!isNonEmptyString(nameValue)) continue;
    if (!isNonEmptyString(modelValue)) continue;
    if (!isNonEmptyString(typeValue) || !APPLIANCE_TYPES.includes(typeValue as ApplianceType)) continue;

    const safePrice = sanitizePrice(priceValue);
    if (safePrice === null) continue;

    const normalizedImageUrl = resolveImageUrl(isNonEmptyString(imageValue) ? imageValue : "");
    if (!normalizedImageUrl) continue;

    normalizedProducts.push({
      id: Math.round(idValue),
      name: nameValue.trim(),
      model: modelValue.trim(),
      type: typeValue as ApplianceType,
      price: safePrice,
      image: normalizedImageUrl,
    });
  }

  return normalizedProducts;
}

