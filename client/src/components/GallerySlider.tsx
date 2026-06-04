import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySliderProps {
  images: GalleryImage[];
  /** Auto-advance interval in ms */
  interval?: number;
  className?: string;
}

/**
 * Vollflächiger Bild-Slider, der seinen Container komplett ausfüllt (kein Padding).
 * Der Container MUSS position:relative und eine Höhe haben (z. B. min-h-[...]).
 * - läuft automatisch durch
 * - Wischen (Touch) blättert vor/zurück
 * - Klick auf ein Bild öffnet eine Vollbild-Lightbox mit Weiter/Zurück-Pfeilen
 * - Tastatur: Esc schließt, Pfeil links/rechts blättert
 */
export function GallerySlider({ images, interval = 4000, className = "" }: GallerySliderProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const count = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setCurrent(((index % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Automatischer Durchlauf – pausiert, solange die Lightbox offen ist
  useEffect(() => {
    if (lightboxOpen || count <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [lightboxOpen, count, interval]);

  // Tastatur-Navigation + Scroll-Sperre, solange Lightbox offen ist
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen, next, prev]);

  // Touch-/Wisch-Navigation. swiped verhindert, dass ein Wisch die Lightbox öffnet.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const SWIPE_THRESHOLD = 40; // px

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swiped.current = false;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // nur als Wisch werten, wenn horizontal genug und überwiegend horizontal
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      if (dx < 0) next();
      else prev();
    }
  };

  const onImageClick = () => {
    // Wisch nicht als Klick (Lightbox) interpretieren
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    setLightboxOpen(true);
  };

  if (count === 0) return null;

  return (
    <>
      {/* Inline-Slider – füllt den (relativen) Container komplett.
          absolute inset-0 statt h-full, weil h-full bei nur per min-height
          gesetzter Containerhöhe (mobil) auf 0px kollabiert. */}
      <div
        className={`group absolute inset-0 overflow-hidden ${className}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            onClick={onImageClick}
            className={`absolute inset-0 h-full w-full cursor-zoom-in object-cover transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            loading="eager"
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Vorheriges Bild"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Nächstes Bild"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Punkte-Indikator */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  aria-label={`Bild ${i + 1} anzeigen`}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Schließen"
            className="absolute right-4 top-4 p-2 text-white/80 transition-colors hover:text-white"
          >
            <X className="h-8 w-8" />
          </button>

          <img
            src={images[current].src}
            alt={images[current].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Vorheriges Bild"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Nächstes Bild"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-7 w-7" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
                {current + 1} / {count}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
