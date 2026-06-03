import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatItem { value: string; label: string; }
interface ZoomRevealProps {
  image: string;
  badge: string;
  headline: string;
  subline: string;
  stats?: StatItem[];
}

export default function ZoomReveal({ image, badge, headline, subline, stats }: ZoomRevealProps) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imgRef.current,     { scale: 1.0, opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0.55 });
      gsap.set(badgeRef.current,   { opacity: 0, y: 24 });
      gsap.set(lineRef.current,    { scaleX: 0, transformOrigin: "left center" });
      gsap.set(headRef.current,    { opacity: 0, y: 56, skewY: 3 });
      gsap.set(subRef.current,     { opacity: 0, y: 28 });
      if (statsRef.current) {
        gsap.set(statsRef.current.querySelectorAll(".si"), { opacity: 0, y: 22 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 0–20%: Image breathes in
      tl.to(imgRef.current, { scale: 1.08, opacity: 0.85, ease: "power1.out", duration: 0.20 }, 0);
      // Continuous zoom throughout
      tl.to(imgRef.current, { scale: 1.55, ease: "none", duration: 0.75 }, 0);

      // 10–45%: Content enters
      tl.to(badgeRef.current, { opacity: 1, y: 0, ease: "power3.out", duration: 0.10 }, 0.10);
      tl.to(lineRef.current,  { scaleX: 1, ease: "power2.out", duration: 0.12 }, 0.17);
      tl.to(headRef.current,  { opacity: 1, y: 0, skewY: 0, ease: "power4.out", duration: 0.16 }, 0.22);
      tl.to(subRef.current,   { opacity: 1, y: 0, ease: "power2.out", duration: 0.13 }, 0.33);
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".si");
        tl.to(items, { opacity: 1, y: 0, stagger: 0.04, ease: "power2.out", duration: 0.12 }, 0.41);
      }

      // 62–80%: Content exits
      const exitTargets = [
        statsRef.current, subRef.current,
        headRef.current, lineRef.current, badgeRef.current,
      ].filter(Boolean);
      tl.to(exitTargets, { opacity: 0, y: -30, stagger: 0.02, ease: "power2.in", duration: 0.16 }, 0.62);

      // 75–100%: Image fades — no black curtain
      tl.to(overlayRef.current, { opacity: 0.75, ease: "power1.inOut", duration: 0.12 }, 0.75);
      tl.to(imgRef.current,     { opacity: 0, ease: "power2.in", duration: 0.22 }, 0.78);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "260vh", marginBottom: "-100vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <img
          ref={imgRef}
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none select-none"
          style={{ opacity: 0 }}
          draggable={false}
        />

        <div ref={overlayRef} className="absolute inset-0 bg-black pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full pointer-events-none select-none">
          <div
            ref={badgeRef}
            className="text-primary font-mono uppercase tracking-[0.45em] text-xs md:text-sm mb-5"
            style={{ opacity: 0 }}
          >
            {badge}
          </div>
          <div
            ref={lineRef}
            className="w-20 md:w-36 h-[2px] bg-primary mb-7"
            style={{ transform: "scaleX(0)" }}
          />
          <h2
            ref={headRef}
            className="font-bold uppercase leading-none tracking-tighter text-5xl md:text-8xl lg:text-[9.5rem] mb-7"
            style={{
              opacity: 0,
              color: "#ffffff",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "geometricPrecision",
            }}
          >
            {headline}
          </h2>
          <p
            ref={subRef}
            className="text-gray-400 font-mono text-sm md:text-base uppercase tracking-widest max-w-xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            {subline}
          </p>
          {stats && stats.length > 0 && (
            <div ref={statsRef} className="flex flex-wrap justify-center gap-8 md:gap-14 mt-10">
              {stats.map((s) => (
                <div key={s.label} className="si text-center" style={{ opacity: 0 }}>
                  <div
                    className="text-xl md:text-3xl font-bold tracking-tighter"
                    style={{
                      color: "#ffffff",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mt-1 font-mono">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
