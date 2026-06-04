import { Clock, Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { HeroCarousel } from "./components/HeroCarousel";
import { ImageWithFallback } from "./components/ImageWithFallback";
import {
  BUSINESS_HOURS,
  MAIN_SERVICES,
  DEFAULT_PRODUCTS,
  SERVICE_OPTIONS,
  SITE_CONTENT,
  type ApplianceType,
  type ModalType,
  type Product,
  type ServiceOption,
} from "./config/siteContent";
import { resolveImageUrl } from "./utils/imageUrl";
import { normalizeProductsCatalog } from "./utils/productCatalog";
import { buildWhatsappUrl, normalizeWhatsappNumber, openExternalLink } from "./utils/whatsapp";

function getServiceOptionImageStyle(option: ServiceOption): CSSProperties {
  return {
    objectFit: option.objectFit ?? "cover",
    objectPosition: option.objectPosition ?? "center",
  };
}

function getServiceImageContainerClass(option: ServiceOption): string {
  const base = "w-full overflow-hidden bg-[#1e3a5f]/5";

  if (option.imageVariant === "portrait") {
    return `${base} aspect-[3/4]`;
  }

  return `${base} h-48`;
}

const currencyFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default function AppMain() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [productsLoadedFromJson, setProductsLoadedFromJson] = useState(false);
  const whatsappNumber = useMemo(() => normalizeWhatsappNumber(SITE_CONTENT.whatsappNumber), []);
  const defaultWhatsappMessage = "Hola. Me interesa más información sobre sus servicios.";

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  useEffect(() => {
    let isMounted = true;

    async function loadProductsCatalog(): Promise<void> {
      try {
        const response = await fetch("/products.json", { method: "GET", cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const rawCatalog: unknown = await response.json();
        const normalizedProducts = normalizeProductsCatalog(rawCatalog);

        if (isMounted && normalizedProducts.length > 0) {
          setProducts(normalizedProducts);
          setProductsLoadedFromJson(true);
        }
      } catch {
        // Comentario intencional: fallback silencioso a DEFAULT_PRODUCTS.
      }
    }

    loadProductsCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const openWhatsapp = (message: string) => {
    openExternalLink(buildWhatsappUrl(whatsappNumber, message));
  };

  const handleServiceRequest = (mode: "repair" | "maintenance", applianceType: ApplianceType) => {
    const actionText = mode === "repair" ? "agendar una reparación" : "agendar un mantenimiento";
    openWhatsapp(`Hola, deseo ${actionText} para una ${applianceType}.`);
    setActiveModal(null);
  };

  const handleProductLead = (product: Product) => {
    openWhatsapp(
      `INTERÉS EN COMPRA\n\nProducto: ${product.name}\nTipo: ${product.type}\nModelo: ${product.model}\nPrecio: ${currencyFormatter.format(product.price)}\n\nMe gustaría saber si este producto está disponible.`,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#60a5fa] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#60a5fa] blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8">
          <div className="space-y-8">
            <div>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">{SITE_CONTENT.businessName}</h1>
              <h2 className="text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Expertos en <span className="text-[#60a5fa]">Electrodomésticos</span>
              </h2>
            </div>
            <p className="text-lg text-gray-200 sm:text-2xl">
              Reparación, mantenimiento y venta de lavadoras, secadoras y lava vajillas. Servicio rápido y confiable.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href={buildWhatsappUrl(whatsappNumber, defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:bg-[#20BA5A]">
                <Phone className="mr-2 h-5 w-5" />
                Contactar Ahora
              </a>
              <a href="#servicios" className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-white transition-all hover:bg-white/20">Ver Servicios</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <HeroCarousel
              slides={SITE_CONTENT.heroImages}
              intervalMs={SITE_CONTENT.heroCarouselIntervalMs}
              className="h-[320px] w-full sm:h-[400px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1e3a5f] sm:text-4xl">Nuestros Servicios</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">Soluciones completas para todas tus necesidades de electrodomésticos.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {MAIN_SERVICES.map((service) => (
              <button key={service.title} type="button" onClick={() => setActiveModal(service.modal)} className="w-full rounded-2xl border-2 border-transparent bg-white p-8 text-left shadow-lg transition-all hover:-translate-y-2 hover:border-[#60a5fa] hover:shadow-xl">
                <div className={`${service.color} mb-6 flex h-16 w-16 items-center justify-center rounded-xl`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#1e3a5f]">{service.title}</h3>
                <p className="leading-relaxed text-gray-600">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1e3a5f] sm:text-4xl">Horarios y Ubicación</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#60a5fa] shadow-xl">
              {BUSINESS_HOURS.map((item, index) => (
                <div key={item.day} className={`flex flex-col items-center justify-between gap-3 p-6 sm:flex-row sm:p-8 ${index !== BUSINESS_HOURS.length - 1 ? "border-b border-white/20" : ""}`}>
                  <div className="flex items-center">
                    <Clock className="mr-3 h-6 w-6 rounded-full bg-white p-1 text-[#60a5fa]" />
                    <span className="text-lg font-semibold text-white">{item.day}</span>
                  </div>
                  <span className="text-lg text-white/90">{item.hours}</span>
                </div>
              ))}
            </div>
            <div className="min-h-[300px] overflow-hidden rounded-2xl shadow-xl">
              <iframe src={SITE_CONTENT.mapEmbedUrl} width="100%" height="100%" style={{ border: 0, minHeight: "300px" }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title={`Ubicación de ${SITE_CONTENT.businessName}`} sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-gray-50 px-6 py-4">
              <MapPin className="h-6 w-6 text-[#60a5fa]" />
              <p className="text-lg font-semibold text-[#1e3a5f]">{SITE_CONTENT.address}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-3xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <Phone className="mx-auto mb-4 h-8 w-8 text-[#60a5fa]" />
            <h3 className="mb-2 text-lg font-bold text-[#1e3a5f]">Teléfono</h3>
            <p className="text-gray-600">{SITE_CONTENT.phone}</p>
          </div>
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <Mail className="mx-auto mb-4 h-8 w-8 text-[#60a5fa]" />
            <h3 className="mb-2 text-lg font-bold text-[#1e3a5f]">Email</h3>
            <p className="break-all text-gray-600">{SITE_CONTENT.email}</p>
          </div>
        </div>
      </section>

      <a href={buildWhatsappUrl(whatsappNumber, defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="group fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-2xl transition-all hover:scale-110 hover:bg-[#20BA5A]">
        <Phone className="h-8 w-8" />
      </a>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setActiveModal(null)} role="presentation">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            {(activeModal === "repair" || activeModal === "maintenance") && (
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#1e3a5f] sm:text-3xl">{activeModal === "repair" ? "Solicitar Reparación" : "Solicitar Mantenimiento"}</h2>
                  <button type="button" onClick={() => setActiveModal(null)} className="rounded-full p-2 hover:bg-gray-100" aria-label="Cerrar modal"><X className="h-6 w-6 text-gray-500" /></button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICE_OPTIONS.map((option) => (
                    <div key={option.id} className="group overflow-hidden rounded-2xl border-2 border-gray-200 bg-white">
                      <div className={getServiceImageContainerClass(option)}>
                        <ImageWithFallback
                          src={resolveImageUrl(option.image)}
                          alt={option.type}
                          className="h-full w-full"
                          style={getServiceOptionImageStyle(option)}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="mb-4 text-center text-xl font-bold text-[#1e3a5f]">{option.type}</h3>
                        <button type="button" onClick={() => handleServiceRequest(activeModal, option.type)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white">
                          <Phone className="h-5 w-5" />
                          {activeModal === "repair" ? "Agendar Reparación" : "Agendar Mantenimiento"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeModal === "sales" && (
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#1e3a5f] sm:text-3xl">Productos en Venta</h2>
                  <button type="button" onClick={() => setActiveModal(null)} className="rounded-full p-2 hover:bg-gray-100" aria-label="Cerrar modal"><X className="h-6 w-6 text-gray-500" /></button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {products.map((product) => (
                    <article key={product.id} className="group overflow-hidden rounded-2xl border-2 border-gray-200 bg-white">
                      <ImageWithFallback src={resolveImageUrl(product.image)} alt={product.name} className="h-48 w-full object-cover" />
                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-[#1e3a5f]">{product.name}</h3>
                        <p className="mb-1 text-gray-600">Modelo: {product.model}</p>
                        <p className="mb-4 text-3xl font-bold text-[#60a5fa]">{currencyFormatter.format(product.price)}</p>
                        <button type="button" onClick={() => handleProductLead(product)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white">
                          <Phone className="h-5 w-5" />
                          Consultar por WhatsApp
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!productsLoadedFromJson && (
        <div className="sr-only" aria-live="polite">
          Se están utilizando productos de respaldo local.
        </div>
      )}
    </div>
  );
}
