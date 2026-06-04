import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One real cockpit photo — each slide zooms into a different zone
import cockpitReal from "@/assets/gallery_interior.jpeg";

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  tag: string;
  title: string;
  subtitle: string;
  details: string[];
  // GSAP transform-origin for zoom target
  zoomOrigin: string;
  zoomScale: number;
}

const SLIDES: Slide[] = [
  {
    tag: "01 / Entry",
    title: "Step Inside",
    subtitle: "Open the door. Leave the world behind.",
    details: ["Race-Tex Door Trim", "Carbon Fibre Sill", "Full Bucket Seat", "GT3 RS Logo"],
    zoomOrigin: "50% 50%",
    zoomScale: 1.14,
  },
  {
    tag: "02 / Steering",
    title: "The Helm",
    subtitle: "GT Sport wheel. Every input is the last word.",
    details: ["GT Sport · 360 mm", "12 O'Clock Marker", "Mode Switch", "Carbon Paddles"],
    zoomOrigin: "42% 55%",
    zoomScale: 1.55,
  },
  {
    tag: "03 / Instruments",
    title: "The Gauges",
    subtitle: "Analogue rev counter. 9,000 RPM. One goal.",
    details: ["Central Tachometer", "Sport Chrono", "Carbon Trim", "PCM Console"],
    zoomOrigin: "62% 42%",
    zoomScale: 1.70,
  },
  {
    tag: "04 / Cockpit",
    title: "The Cockpit",
    subtitle: "Every surface has a purpose. Nothing is decorative.",
    details: ["Carbon Bucket Seats", "Alcantara Headliner", "Race-Tex Lining", "6-Point Ready"],
    zoomOrigin: "50% 38%",
    zoomScale: 1.35,
  },
];

const N = SLIDES.length;
const SCROLL_PER_SLIDE = 150;
const TOTAL_SCROLL = N * SCROLL_PER_SLIDE;

export default function InteriorShowcase() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const tagRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs    = useRef<(HTMLParagraphElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Single image starts fully visible
      gsap.set(imgRef.current,    { scale: 1.0, transformOrigin: "50% 50%", opacity: 1 });
      gsap.set(overlayRef.current,{ opacity: 0.42 });

      // All slide content hidden
      SLIDES.forEach((_, i) => {
        gsap.set(tagRefs.current[i],   { opacity: 0, x: -20 });
        gsap.set(titleRefs.current[i], { opacity: 0, y: 50, skewY: 2 });
        gsap.set(subRefs.current[i],   { opacity: 0, y: 22 });
        if (detailRefs.current[i]) {
          gsap.set(detailRefs.current[i]!.querySelectorAll(".di"), { opacity: 0, x: 16 });
        }
      });
      dotRefs.current.forEach((d) => gsap.set(d, { backgroundColor: "rgba(255,255,255,0.2)", scale: 1 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: `+=${TOTAL_SCROLL}%`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const step = 1 / N;

      SLIDES.forEach((slide, i) => {
        const s        = i * step;
        const outStart = s + step * 0.62;
        const imgEnd   = s + step * 0.88;

        // ── Zoom image into this slide's focal zone ─────────────────
        tl.to(imgRef.current, {
          scale: slide.zoomScale,
          transformOrigin: slide.zoomOrigin,
          ease: "power1.inOut",
          duration: step,
        }, s);

        // ── Overlay brightens slightly ───────────────────────────────
        tl.to(overlayRef.current, { opacity: 0.38, ease: "power1.out", duration: step * 0.18 }, s);

        // ── Content enters ───────────────────────────────────────────
        tl.to(tagRefs.current[i],  { opacity: 1, x: 0, ease: "power3.out", duration: step * 0.10 }, s + step * 0.07);
        tl.to(titleRefs.current[i],{ opacity: 1, y: 0, skewY: 0, ease: "power4.out", duration: step * 0.13 }, s + step * 0.14);
        tl.to(subRefs.current[i],  { opacity: 1, y: 0, ease: "power2.out", duration: step * 0.11 }, s + step * 0.22);
        if (detailRefs.current[i]) {
          const items = detailRefs.current[i]!.querySelectorAll(".di");
          tl.to(items, { opacity: 1, x: 0, stagger: step * 0.025, ease: "power2.out", duration: step * 0.10 }, s + step * 0.30);
        }
        if (dotRefs.current[i]) {
          tl.to(dotRefs.current[i], { backgroundColor: "#cc0000", scale: 1.4, ease: "power2.out", duration: step * 0.08 }, s + step * 0.05);
        }

        // ── Content exits (all but last) ─────────────────────────────
        if (i < N - 1) {
          tl.to([detailRefs.current[i], subRefs.current[i], titleRefs.current[i], tagRefs.current[i]],
            { opacity: 0, y: -24, stagger: step * 0.015, ease: "power2.in", duration: step * 0.14 },
            outStart
          );
          if (dotRefs.current[i]) {
            tl.to(dotRefs.current[i], { backgroundColor: "rgba(255,255,255,0.2)", scale: 1, ease: "power1.in", duration: step * 0.08 }, outStart);
          }
        }
      });

      // ── Last slide exit — no black curtain ───────────────────────
      const ls = (N - 1) * step;
      tl.to(
        [detailRefs.current[N-1], subRefs.current[N-1], titleRefs.current[N-1], tagRefs.current[N-1]],
        { opacity: 0, y: -24, stagger: step * 0.015, ease: "power2.in", duration: step * 0.12 },
        ls + step * 0.62
      );
      tl.to(overlayRef.current, { opacity: 0.88, ease: "power2.in", duration: step * 0.12 }, ls + step * 0.76);
      tl.to(imgRef.current,     { opacity: 0,    ease: "power2.in", duration: step * 0.12 }, ls + step * 0.82);
      if (dotRefs.current[N-1]) {
        tl.to(dotRefs.current[N-1], { backgroundColor: "rgba(255,255,255,0.2)", scale: 1 }, ls + step * 0.62);
      }

    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ height: `${TOTAL_SCROLL + 60}vh`, marginBottom: "-60vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        style={{ zIndex: 10 }}
      >
        {/* ── Single real cockpit image ── */}
        <img
          ref={imgRef}
          src={cockpitReal}
          alt="GT3 RS Interior"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ opacity: 1, transformOrigin: "50% 50%" }}
          draggable={false}
        />

        {/* ── Dark overlay ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0.42 }}
        />

        {/* ── Per-slide content ── */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-end justify-start p-10 md:p-16 pointer-events-none"
          >
            <div className="max-w-lg">
              <div
                ref={(el) => { tagRefs.current[i] = el; }}
                className="text-primary font-mono uppercase tracking-[0.4em] text-xs mb-5"
                style={{ opacity: 0 }}
              >
                {slide.tag}
              </div>

              <div
                ref={(el) => { titleRefs.current[i] = el; }}
                className="font-bold uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-none mb-4"
                style={{
                  opacity: 0,
                  color: "#ffffff",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  textRendering: "geometricPrecision",
                }}
              >
                {slide.title}
              </div>

              <p
                ref={(el) => { subRefs.current[i] = el; }}
                className="text-gray-300 font-mono text-sm uppercase tracking-wider mb-8 max-w-sm leading-relaxed"
                style={{ opacity: 0 }}
              >
                {slide.subtitle}
              </p>

              <div
                ref={(el) => { detailRefs.current[i] = el; }}
                className="grid grid-cols-2 gap-x-8 gap-y-3"
              >
                {slide.details.map((d) => (
                  <div key={d} className="di flex items-center gap-2.5" style={{ opacity: 0 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-[11px] md:text-xs font-mono uppercase tracking-wide text-gray-300">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ── Section label ── */}
        <div className="absolute top-10 left-10 font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 pointer-events-none z-10">
          Interior
        </div>

        {/* ── Progress dots ── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 pointer-events-none">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
