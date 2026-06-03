import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import doorImg    from "@/assets/interior_door.png";
import cockpitImg from "@/assets/interior_cockpit.png";
import wheelImg   from "@/assets/interior_wheel.png";
import dashImg    from "@/assets/interior_dash.png";

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  img: string;
  tag: string;
  title: string;
  subtitle: string;
  details: string[];
}

const SLIDES: Slide[] = [
  {
    img: doorImg,
    tag: "01 / Entry",
    title: "Step Inside",
    subtitle: "Open the door. Leave the world behind.",
    details: ["Race-Tex Door Trim", "Carbon Fibre Sill", "Full Bucket Seat", "GT3 RS Logo"],
  },
  {
    img: cockpitImg,
    tag: "02 / Interior",
    title: "The Cockpit",
    subtitle: "Every surface has a purpose. Nothing is decorative.",
    details: ["Carbon Bucket Seats", "Alcantara Headliner", "Race-Tex Lining", "6-Point Ready"],
  },
  {
    img: wheelImg,
    tag: "03 / Steering",
    title: "The Helm",
    subtitle: "GT Sport wheel. Every input is the last word.",
    details: ["GT Sport · 360 mm", "12 O'Clock Marker", "Mode Switch", "Carbon Paddles"],
  },
  {
    img: dashImg,
    tag: "04 / Dashboard",
    title: "The Instruments",
    subtitle: "Analogue rev counter. 9,000 RPM. One goal.",
    details: ["Central Tachometer", "Sport Chrono", "Carbon Trim", "PCM Console"],
  },
];

const N = SLIDES.length;
// Each slide gets 140vh of scroll travel. Total = N * 140
const SCROLL_PER_SLIDE = 140;
const TOTAL_SCROLL = N * SCROLL_PER_SLIDE;

export default function InteriorShowcase() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const imgRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const overlayRefs= useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs    = useRef<(HTMLParagraphElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef= useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hard-set everything invisible
      SLIDES.forEach((_, i) => {
        gsap.set(imgRefs.current[i],    { opacity: 0, scale: 1.06 });
        gsap.set(overlayRefs.current[i],{ opacity: 0.5 });
        gsap.set(tagRefs.current[i],    { opacity: 0, x: -20 });
        gsap.set(titleRefs.current[i],  { opacity: 0, y: 50, skewY: 2 });
        gsap.set(subRefs.current[i],    { opacity: 0, y: 22 });
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
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const step = 1 / N; // fractional share per slide

      SLIDES.forEach((_, i) => {
        const s = i * step;         // slide start (fractional)
        const e = s + step;         // slide end
        const inEnd   = s + step * 0.38; // content fully in
        const outStart= s + step * 0.62; // content starts leaving
        const outEnd  = s + step * 0.80; // content gone
        const xEnd    = s + step * 0.88; // image gone

        const img     = imgRefs.current[i];
        const overlay = overlayRefs.current[i];
        const tag     = tagRefs.current[i];
        const title   = titleRefs.current[i];
        const sub     = subRefs.current[i];
        const detail  = detailRefs.current[i];
        const dot     = dotRefs.current[i];

        // ── Slide in ────────────────────────────────────────────────
        // Image fades + zooms
        tl.to(img,    { opacity: 1, scale: 1.0, ease: "power2.out", duration: step * 0.20 }, s);
        tl.to(img,    { scale: 1.18, ease: "none", duration: step * 0.80 }, s); // slow continuous zoom

        // Overlay lightens slightly when content shows
        tl.to(overlay, { opacity: 0.45, ease: "power1.out", duration: step * 0.20 }, s);

        // Content enters — staggered
        tl.to(tag,   { opacity: 1, x: 0, ease: "power3.out", duration: step * 0.10 }, s + step * 0.08);
        tl.to(title, { opacity: 1, y: 0, skewY: 0, ease: "power4.out", duration: step * 0.13 }, s + step * 0.14);
        tl.to(sub,   { opacity: 1, y: 0, ease: "power2.out", duration: step * 0.11 }, s + step * 0.22);
        if (detail) {
          const items = detail.querySelectorAll(".di");
          tl.to(items, { opacity: 1, x: 0, stagger: step * 0.025, ease: "power2.out", duration: step * 0.10 }, s + step * 0.30);
        }

        // Dot activates
        if (dot) {
          tl.to(dot, { backgroundColor: "#cc0000", scale: 1.4, ease: "power2.out", duration: step * 0.08 }, s + step * 0.05);
        }

        // ── Slide out (not the last slide) ──────────────────────────
        if (i < N - 1) {
          // Content exits up
          tl.to([detail, sub, title, tag],
            { opacity: 0, y: -24, stagger: step * 0.015, ease: "power2.in", duration: step * 0.14 },
            outStart
          );
          // Overlay deepens
          tl.to(overlay, { opacity: 0.82, ease: "power1.in", duration: step * 0.12 }, outStart);
          // Image fades
          tl.to(img,     { opacity: 0, ease: "power2.in", duration: step * 0.10 }, xEnd - step * 0.06);
          // Dot deactivates
          if (dot) {
            tl.to(dot, { backgroundColor: "rgba(255,255,255,0.2)", scale: 1, ease: "power1.in", duration: step * 0.08 }, outStart);
          }
        }
      });

      // ── Last slide exits without curtain ─────────────────────────
      const ls = (N - 1) * step;
      tl.to(
        [detailRefs.current[N-1], subRefs.current[N-1], titleRefs.current[N-1], tagRefs.current[N-1]],
        { opacity: 0, y: -24, stagger: step * 0.015, ease: "power2.in", duration: step * 0.12 },
        ls + step * 0.62
      );
      tl.to(overlayRefs.current[N-1], { opacity: 0.9, ease: "power2.in", duration: step * 0.10 }, ls + step * 0.74);
      tl.to(imgRefs.current[N-1],     { opacity: 0,   ease: "power2.in", duration: step * 0.12 }, ls + step * 0.82);
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
      >
        {/* ── Images + overlays ── */}
        {SLIDES.map((slide, i) => (
          <div key={i} className="absolute inset-0">
            <img
              ref={(el) => { imgRefs.current[i] = el; }}
              src={slide.img}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ opacity: 0 }}
              draggable={false}
            />
            <div
              ref={(el) => { overlayRefs.current[i] = el; }}
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: 0.5 }}
            />
          </div>
        ))}

        {/* ── Content layers ── */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-end justify-start p-10 md:p-16 pointer-events-none"
          >
            <div className="max-w-lg">
              {/* Tag */}
              <div
                ref={(el) => { tagRefs.current[i] = el; }}
                className="text-primary font-mono uppercase tracking-[0.4em] text-xs mb-5"
                style={{ opacity: 0 }}
              >
                {slide.tag}
              </div>

              {/* Title */}
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

              {/* Subtitle */}
              <p
                ref={(el) => { subRefs.current[i] = el; }}
                className="text-gray-300 font-mono text-sm uppercase tracking-wider mb-8 max-w-sm leading-relaxed"
                style={{ opacity: 0 }}
              >
                {slide.subtitle}
              </p>

              {/* Details grid */}
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

        {/* ── Slide counter (top-left) ── */}
        <div className="absolute top-10 left-10 font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 pointer-events-none z-10">
          Interior
        </div>

        {/* ── Progress dots (right-centre) ── */}
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
