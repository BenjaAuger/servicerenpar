import { useEffect, useState, type CSSProperties } from "react";
import type { HeroSlide } from "../config/siteContent";
import { resolveImageUrl } from "../utils/imageUrl";
import { ImageWithFallback } from "./ImageWithFallback";

interface HeroCarouselProps {
  slides: readonly HeroSlide[];
  intervalMs?: number;
  className?: string;
}

const DEFAULT_INTERVAL_MS = 30_000;

function getSlideImageStyle(slide: HeroSlide): CSSProperties {
  return {
    objectFit: slide.objectFit ?? "cover",
    objectPosition: slide.objectPosition ?? "center",
  };
}

function renderSlideImage(slide: HeroSlide, loading: "eager" | "lazy") {
  return (
    <div className="absolute inset-0 bg-[#1e3a5f]">
      <ImageWithFallback
        src={resolveImageUrl(slide.image)}
        alt={slide.alt}
        className="h-full w-full"
        style={getSlideImageStyle(slide)}
        loading={loading}
      />
    </div>
  );
}

export function HeroCarousel({
  slides,
  intervalMs = DEFAULT_INTERVAL_MS,
  className = "",
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (slides.length === 0) {
    return null;
  }

  if (slides.length === 1) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {renderSlideImage(slides[0], "eager")}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galería de imágenes principal"
    >
      {slides.map((slide, index) => (
        <div
          key={`${slide.image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          {renderSlideImage(slide, index === 0 ? "eager" : "lazy")}
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.image}-${index}`}
            type="button"
            aria-label={`Mostrar imagen ${index + 1}: ${slide.alt}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
