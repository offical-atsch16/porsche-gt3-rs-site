import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealProps {
  badge: string;
  headline: string;
  subline: string;
  revealImage: string;
  stats?: { value: string; label: string }[];
}

export default function SplitReveal({
  badge,
  headline,
  subline,
  revealImage,
  stats,
}: SplitRevealProps) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);
  const divRef    = useRef<HTMLDivElement>(null); // centre seam line
  const textRef   = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLImageElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(leftRef.current,  { xPercent: 0 });
      gsap.set(rightRef.current, { xPercent: 0 });
      gsap.set(divRef.current,   { opacity: 0 });
      gsap.set(textRef.current,  { opacity: 0, y: 36 });
      gsap.set(imgRef.current,   { opacity: 0, scale: 1.08 });
      if (statsRef.current) {
        gsap.set(statsRef.current.querySelectorAll(".ss"), { opacity: 0, y: 18 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: "+=155%",
          pin: true,
          scrub: 1.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 0–5%: image fades in beneath panels (barely visible glow)
      tl.to(imgRef.current, { opacity: 0.15, scale: 1.0, ease: "power1.out", duration: 0.05 }, 0);

      // 2–8%: centre seam appears
      tl.to(divRef.current, { opacity: 1, ease: "power2.out", duration: 0.06 }, 0.02);

      // 5–22%: text sweeps up
      tl.to(textRef.current, { opacity: 1, y: 0, ease: "power4.out", duration: 0.17 }, 0.05);

      // 22–38%: stats appear
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".ss");
        tl.to(items, { opacity: 1, y: 0, stagger: 0.03, ease: "power3.out", duration: 0.12 }, 0.22);
      }

      // 48–60%: text exits
      tl.to(textRef.current, { opacity: 0, y: -28, ease: "power2.in", duration: 0.11 }, 0.48);
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".ss");
        tl.to(items, { opacity: 0, y: -18, stagger: 0.02, ease: "power2.in", duration: 0.10 }, 0.48);
      }

      // 55–58%: seam line fades
      tl.to(divRef.current, { opacity: 0, ease: "power1.in", duration: 0.04 }, 0.55);

      // 57–100%: PANELS SPLIT APART — the "Sesam öffne dich" moment
      tl.to(leftRef.current,
        { xPercent: -100, ease: "power2.inOut", duration: 0.40 }, 0.57);
      tl.to(rightRef.current,
        { xPercent: 100, ease: "power2.inOut", duration: 0.40 }, 0.57);

      // 57–90%: image behind brightens as panels open
      tl.to(imgRef.current,
        { opacity: 0.85, scale: 1.04, ease: "power1.out", duration: 0.35 }, 0.57);

      // 88–100%: image fades — next section takes over
      tl.to(imgRef.current,
        { opacity: 0, ease: "power2.in", duration: 0.12 }, 0.88);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "255vh", marginBottom: "-100vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {/* Background image — revealed when panels open */}
        <img
          ref={imgRef}
          src={revealImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none select-none"
          style={{ opacity: 0 }}
          draggable={false}
        />

        {/* Left panel */}
        <div
          ref={leftRef}
          className="absolute top-0 left-0 h-full w-1/2 bg-[#060606] will-change-transform"
        />

        {/* Right panel */}
        <div
          ref={rightRef}
          className="absolute top-0 right-0 h-full w-1/2 bg-[#060606] will-change-transform"
        />

        {/* Centre seam line */}
        <div
          ref={divRef}
          className="absolute top-0 left-1/2 h-full pointer-events-none z-10"
          style={{ width: 1, marginLeft: -0.5, background: "rgba(255,255,255,0.12)", opacity: 0 }}
        />

        {/* Text content — centred, on top of panels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none px-6">
          <div
            ref={textRef}
            className="flex flex-col items-center text-center"
            style={{ opacity: 0 }}
          >
            <div className="text-primary font-mono uppercase tracking-[0.45em] text-xs md:text-sm mb-5">
              {badge}
            </div>
            <div className="w-16 h-[2px] bg-primary mb-7" />
            <h2
              className="font-bold uppercase leading-none tracking-tighter text-5xl md:text-8xl lg:text-[9rem] mb-6"
              style={{
                color: "#ffffff",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "geometricPrecision",
              }}
            >
              {headline}
            </h2>
            <p className="text-gray-400 font-mono text-xs md:text-sm uppercase tracking-widest max-w-xl leading-relaxed">
              {subline}
            </p>
          </div>

          {stats && stats.length > 0 && (
            <div ref={statsRef} className="flex flex-wrap justify-center gap-8 md:gap-14 mt-10 z-20">
              {stats.map((s) => (
                <div key={s.label} className="ss text-center" style={{ opacity: 0 }}>
                  <div
                    className="text-xl md:text-3xl font-bold tracking-tighter"
                    style={{ color: "#ffffff", WebkitFontSmoothing: "antialiased" }}
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
