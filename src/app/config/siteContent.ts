import { Clock, ShoppingCart, Wrench } from "lucide-react";

export type ApplianceType = "Lavadora" | "Secadora" | "Lava Vajillas";
export type ModalType = "repair" | "maintenance" | "sales" | null;

export interface BusinessSchedule {
  day: string;
  hours: string;
}

export interface Product {
  id: number;
  name: string;
  model: string;
  price: number;
  type: ApplianceType;
  image: string;
}

export interface ServiceOption {
  id: number;
  type: ApplianceType;
  image: string;
  /**
   * landscape = franja horizontal (por defecto).
   * portrait = recuadro vertical; ideal para fotos tomadas de pie.
   */
  imageVariant?: "landscape" | "portrait";
  objectPosition?: string;
  objectFit?: "cover" | "contain";
}

export interface MainService {
  icon: typeof Wrench;
  title: string;
  description: string;
  color: string;
  modal: Exclude<ModalType, null>;
}

export interface HeroSlide {
  image: string;
  alt: string;
  /**
   * Encuadre al recortar la foto.
   * Ejemplos: "center", "top", "bottom", "center top", "50% 30%"
   */
  objectPosition?: string;
  /**
   * cover = llena el cuadro (puede recortar bordes).
   * contain = muestra la foto completa (puede dejar bandas laterales).
   */
  objectFit?: "cover" | "contain";
}

/**
 * Configuración principal editable del sitio.
 * Mantener este objeto como fuente única para facilitar cambios futuros.
 */
export const SITE_CONTENT = {
  businessName: "Servicio Ren-Par",
  whatsappNumber: "56986828614",
  phone: "+56 9 8682 8614",
  email: "Renaug67@gmail.com",
  address: "9 de Enero 2682, Lo Espejo, Región Metropolitana",
  // Carrusel del hero: agrega o quita slides. Cambia cada 30 segundos.
  // Google Drive: https://drive.google.com/file/d/FILE_ID/view (público con enlace).
  heroCarouselIntervalMs: 30_000,
  heroImages: [
    {
      image: "https://drive.google.com/file/d/1mG3p-bDyZ7hKn5n5fT9m6oEigJQDUcsk/view",
      alt: "Servicio Ren-Par - electrodomésticos",
      objectPosition: "center",
    },
    {
      image: "https://drive.google.com/file/d/1tYh-vtLqLPabayCaYlMK75eIr7M5gUzN/view",
      alt: "Lavadoras y servicio técnico",
      objectFit: "contain",
      objectPosition: "center",
    },
    {
      image: "https://drive.google.com/file/d/1pfDxUHGUyBs6pKGfEwVKheyw2vFuMy26/view",
      alt: "Electrodomésticos en venta",
      objectPosition: "center",
    },
    {
      image: "https://drive.google.com/file/d/1jS95SMWMcdMXC37tUsh41B3cxAwe1rxe/view",
      alt: "Electrodomésticos en venta",
      objectFit: "contain",
      objectPosition: "center",
    },
  ] satisfies HeroSlide[],
  // Mapa: en Google Maps → Compartir → Insertar mapa, pega aquí el src del iframe si quieres el embed oficial.
  mapEmbedUrl:
    "https://maps.google.com/maps?q=9%20de%20Enero%202682%2C%20Lo%20Espejo%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile&hl=es&z=16&output=embed",
} as const;

/**
 * Horarios visibles para clientes.
 */
export const BUSINESS_HOURS: BusinessSchedule[] = [
  { day: "Lunes - Sábado", hours: "9:00 AM - 7:00 PM" },
  { day: "Domingo", hours: "Cerrado" },
];

/**
 * Fallback local si falla la carga de `public/products.json`.
 * Mantener esta lista mínima para que la web nunca quede vacía.
 */
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lavadora Samsung 18kg",
    model: "WA18R6780CV",
    price: 599000,
    type: "Lavadora",
    image: "https://drive.google.com/file/d/1Oq_k1WfahNRjeMaAWCqSQK7QMdAviKMB/view",
  },
  {
    id: 2,
    name: "Secadora LG 9kg",
    model: "DLE3470W",
    price: 549000,
    type: "Secadora",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Lava Vajillas Bosch 12 Servicios",
    model: "SMS46MI08E",
    price: 699000,
    type: "Lava Vajillas",
    image:
      "https://drive.google.com/file/d/1Xl81VEiVQAETnccVGSNz_bul8cjq1C6l/view",
  },
  {
    id: 4,
    name: "Lavadora Whirlpool 15kg",
    model: "WTW5000DW",
    price: 499000,
    type: "Lavadora",
    image:
      "https://images.unsplash.com/photo-1621847468516-bf0f87bdf58f?auto=format&fit=crop&w=1200&q=80",
  },
];

/**
 * Catálogo de tipos para reparación/mantenimiento.
 */
export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 1,
    type: "Lavadora",
    image:
      "https://drive.google.com/file/d/10SBJjnBPmdsbxqtOyyo0DUXWsh4cBgvD/view",
  },
  {
    id: 2,
    type: "Secadora",
    image:
      "https://drive.google.com/file/d/1NuhK6kx8mxIQ-bZpXXhPg06XMYkoVtHj/view?usp=sharing",
    imageVariant: "landscape",
    objectFit: "contain",
    objectPosition: "center",
  },
  {
    id: 3,
    type: "Lava Vajillas",
    image:
      "https://drive.google.com/file/d/1qEJHgoEEQAGN7O0psqpZycMoafO3tOZh/view?usp=sharing",
    imageVariant: "landscape",
    objectFit: "contain",
    objectPosition: "center 5%",
  },
];

export const MAIN_SERVICES: MainService[] = [
  {
    icon: Wrench,
    title: "Reparación de Electrodomésticos",
    description: "Reparación de lavadoras, secadoras y lava vajillas.",
    color: "bg-[#1e3a5f]",
    modal: "repair",
  },
  {
    icon: Clock,
    title: "Mantenimiento Preventivo",
    description: "Mantenimiento para lavadoras, secadoras y lava vajillas.",
    color: "bg-[#60a5fa]",
    modal: "maintenance",
  },
  {
    icon: ShoppingCart,
    title: "Venta de Electrodomésticos",
    description: "Lavadoras, secadoras y lava vajillas.",
    color: "bg-[#1e3a5f]",
    modal: "sales",
  },
];

