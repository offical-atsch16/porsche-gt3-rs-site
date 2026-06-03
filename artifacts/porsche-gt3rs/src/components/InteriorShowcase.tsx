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
  title: string;
  subtitle: string;
  tag: string;
  details: string[];
}

const slides: Slide[] = [
  {
    img: doorImg,
    title: "Step Inside",
    subtitle: "Open the door. Leave the world behind.",
    tag: "Entry",
    details: ["Race-Tex Door Trim", "Carbon Fibre Sill", "Full Bucket Seat Visible", "Illuminated GT3 RS Logo"],
  },
  {
    img: cockpitImg,
    title: "The Cockpit",
    subtitle: "Every surface has a purpose. Nothing is decorative.",
    tag: "Interior",
    details: ["Carbon Fibre Full Bucket Seats", "Alcantara Headliner", "Race-Tex Roof Lining", "6-Point Harness Ready"],
  },
  {
    img: wheelImg,
    title: "The Helm",
    subtitle: "GT Sport steering wheel. Every input is the last word.",
    tag: "Steering",
    details: ["GT Sport Wheel · 360mm", "Yellow 12 O'Clock Marker", "Mode Switch (Sport Chrono)", "Carbon Paddle Shifters"],
  },
  {
    img: dashImg,
    title: "The Instruments",
    subtitle: "Analogue rev counter. 9,000 RPM maximum. One goal.",
    tag: "Dashboard",
    details: ["Central Tachometer · 9000 RPM", "Sport Chrono Display", "Carbon Dashboard Trim", "PCM Centre Console"],
  },
];

export default function InteriorShowcase() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Per-slide refs
  const imgRefs     = useRef<(HTMLImageElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const detailRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const curtainRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const totalSlides = slides.length;
      // Each slide occupies 1 scroll-length unit, total pinned = totalSlides * 120%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: `+=${totalSlides * 160}%`,
          pin: true,
          scrub: 1.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const step = 1 / totalSlides; // fraction of total timeline per slide

      slides.forEach((_, i) => {
        const s  = i * step;         // slide start
        const e  = s + step;         // slide end
        const mid = s + step * 0.5;  // midpoint (content hold)
        const in1 = s + step * 0.05;
        const in2 = s + step * 0.18;
        const in3 = s + step * 0.28;
        const in4 = s + step * 0.38;
        const out1 = s + step * 0.65;
        const out2 = s + step * 0.78;

        const img     = imgRefs.current[i];
        const overlay = overlayRefs.current[i];
        const title   = titleRefs.current[i];
        const sub     = subRefs.current[i];
        const tag     = tagRefs.current[i];
        const detail  = detailRefs.current[i];

        // ── Image fades in and zooms ──────────────────────────────
        tl.fromTo(img,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: i === 0 ? 1.18 : 1.12, ease: "none", duration: step },
          s
        );

        // For slide 0 (door), we add a "push in" scale punch at start
        if (i === 0) {
          tl.fromTo(img,
            { scale: 1.0, opacity: 0 },
            { scale: 1.18, opacity: 1, ease: "power2.inOut", duration: step * 0.3 },
            s
          );
        }

        // ── Overlay darkens slightly for readability ──────────────
        tl.fromTo(overlay,
          { opacity: 0.35 },
          { opacity: 0.55, ease: "none", duration: step * 0.6 },
          s
        );

        // ── Tag slides in from left ───────────────────────────────
        tl.fromTo(tag,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, ease: "power3.out", duration: step * 0.12 },
          in1
        );

        // ── Title sweeps up ───────────────────────────────────────
        tl.fromTo(title,
          { opacity: 0, y: 48, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, ease: "power4.out", duration: step * 0.14 },
          in2
        );

        // ── Subtitle fades up ─────────────────────────────────────
        tl.fromTo(sub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: "power2.out", duration: step * 0.12 },
          in3
        );

        // ── Detail list staggers in ───────────────────────────────
        if (detail) {
          const items = detail.querySelectorAll(".dl");
          tl.fromTo(items,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, stagger: step * 0.04, ease: "power2.out", duration: step * 0.10 },
            in4
          );
        }

        // ── Exit: content fades up ────────────────────────────────
        if (i < totalSlides - 1) {
          tl.to([detail, sub, title, tag],
            { opacity: 0, y: -20, stagger: step * 0.025, ease: "power2.in", duration: step * 0.12 },
            out1
          );
          // Outgoing image fades, but incoming replaces it
          tl.to(overlay, { opacity: 0.88, ease: "power2.in", duration: step * 0.10 }, out2);
          tl.to(img,     { opacity: 0,    ease: "power2.in", duration: step * 0.08 }, out2 + step * 0.06);
        }
      });

      // ── Final curtain ─────────────────────────────────────────────
      const lastSlideExit = 1 - step * 0.22;
      const lastSlide = slides.length - 1;
      tl.to(
        [detailRefs.current[lastSlide], subRefs.current[lastSlide], titleRefs.current[lastSlide], tagRefs.current[lastSlide]],
        { opacity: 0, y: -20, stagger: step * 0.02, ease: "power2.in", duration: step * 0.1 },
        lastSlideExit
      );
      tl.to(overlayRefs.current[lastSlide], { opacity: 0.95, ease: "power2.in", duration: step * 0.08 }, lastSlideExit + step * 0.06);
      tl.fromTo(curtainRef.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "power4.inOut", duration: step * 0.20 },
        0.85
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ height: `${slides.length * 200 + 60}vh` }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ── Slide images (stacked, shown/hidden via GSAP) ── */}
        {slides.map((slide, i) => (
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
              style={{ opacity: 0.35 }}
            />
          </div>
        ))}

        {/* ── Content layers (stacked) ── */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-end justify-start p-10 md:p-16 pointer-events-none"
          >
            <div className="max-w-xl">
              {/* Tag */}
              <div
                ref={(el) => { tagRefs.current[i] = el; }}
                className="text-primary font-mono uppercase tracking-[0.4em] text-xs mb-4"
                style={{ opacity: 0 }}
              >
                {slide.tag}
              </div>

              {/* Title */}
              <div
                ref={(el) => { titleRefs.current[i] = el; }}
                className="text-white font-bold uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-none mb-4"
                style={{ opacity: 0 }}
              >
                {slide.title}
              </div>

              {/* Subtitle */}
              <p
                ref={(el) => { subRefs.current[i] = el; }}
                className="text-gray-400 font-mono text-sm uppercase tracking-wider mb-7 max-w-sm leading-relaxed"
                style={{ opacity: 0 }}
              >
                {slide.subtitle}
              </p>

              {/* Detail items */}
              <div
                ref={(el) => { detailRefs.current[i] = el; }}
                className="grid grid-cols-2 gap-x-6 gap-y-2"
              >
                {slide.details.map((d) => (
                  <div key={d} className="dl flex items-center gap-2" style={{ opacity: 0 }}>
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wide text-gray-400">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide indicator dots (top-right) */}
            <div className="absolute top-10 right-10 flex flex-col gap-2">
              {slides.map((_, j) => (
                <div
                  key={j}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === j ? "bg-primary" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Section label (top-left) */}
        <div className="absolute top-10 left-10 font-mono text-xs uppercase tracking-[0.4em] text-gray-600 pointer-events-none">
          Interior
        </div>

        {/* Curtain */}
        <div
          ref={curtainRef}
          className="absolute inset-0 bg-black z-30 pointer-events-none"
          style={{ transform: "translateY(100%)" }}
        />
      </div>
    </div>
  );
}
