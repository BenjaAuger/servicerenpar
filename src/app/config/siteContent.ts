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
}

export interface MainService {
  icon: typeof Wrench;
  title: string;
  description: string;
  color: string;
  modal: Exclude<ModalType, null>;
}

/**
 * Configuración principal editable del sitio.
 * Mantener este objeto como fuente única para facilitar cambios futuros.
 */
export const SITE_CONTENT = {
  businessName: "ServiceRenPar",
  whatsappNumber: "56912345678",
  phone: "+56 9 1234 5678",
  email: "info@servicerenpar.com",
  address: "Jorge Guerra Squella 9161, Lo Espejo, Región Metropolitana",
  heroImage:
    "https://images.unsplash.com/photo-1775210727386-4c798dfae209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.6394949586997!2d-70.70191232378838!3d-33.51934409741537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d0e4e8e4e8e5%3A0x1234567890abcdef!2sJorge%20Guerra%20Squella%209161%2C%20Lo%20Espejo%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl",
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
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    type: "Secadora",
    image:
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    type: "Lava Vajillas",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
  },
];

export const MAIN_SERVICES: MainService[] = [
  {
    icon: Wrench,
    title: "Reparación de Electrodomésticos",
    description: "Reparación de lavadoras, secadoras y lava vajillas",
    color: "bg-[#1e3a5f]",
    modal: "repair",
  },
  {
    icon: Clock,
    title: "Mantenimiento Preventivo",
    description: "Mantenimiento para lavadoras, secadoras y lava vajillas",
    color: "bg-[#60a5fa]",
    modal: "maintenance",
  },
  {
    icon: ShoppingCart,
    title: "Venta de Electrodomésticos",
    description: "Lavadoras, secadoras y lava vajillas nuevos",
    color: "bg-[#1e3a5f]",
    modal: "sales",
  },
];

