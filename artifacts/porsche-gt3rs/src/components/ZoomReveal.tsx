import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ZoomRevealProps {
  image: string;
  badge: string;
  headline: string;
  subline: string;
  stats?: { value: string; label: string }[];
}

export default function ZoomReveal({
  image,
  badge,
  headline,
  subline,
  stats,
}: ZoomRevealProps) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0–25%): image fades in + begins zooming
      tl.fromTo(
        imgRef.current,
        { scale: 1.0, opacity: 0 },
        { scale: 1.25, opacity: 0.75, ease: "none", duration: 0.25 },
        0
      );

      // Phase 2 (15–45%): badge slides in, then headline
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.15 },
        0.15
      );
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "power2.out", duration: 0.2 },
        0.2
      );
      tl.fromTo(
        headRef.current,
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, ease: "power3.out", duration: 0.25 },
        0.25
      );
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 },
        0.38
      );

      // Phase 3 (40–60%): optional stats stagger in
      if (stats && statsRef.current) {
        const items = statsRef.current.querySelectorAll(".stat-item");
        tl.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: "power2.out",
            duration: 0.15,
          },
          0.44
        );
      }

      // Phase 4 (continue): image keeps zooming to 1.65
      tl.to(
        imgRef.current,
        { scale: 1.65, ease: "none", duration: 0.55 },
        0.25
      );

      // Phase 5 (65–80%): overlay deepens slightly
      tl.to(overlayRef.current, { opacity: 0.82, duration: 0.15 }, 0.62);

      // Phase 6 (68–80%): content fades out upward
      tl.to(
        [badgeRef.current, lineRef.current, headRef.current, subRef.current, statsRef.current],
        { opacity: 0, y: -30, ease: "power2.in", duration: 0.15, stagger: 0.03 },
        0.68
      );

      // Phase 7 (82–100%): black curtain rises from bottom to reveal next section
      tl.fromTo(
        curtainRef.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "power3.inOut", duration: 0.18 },
        0.82
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ height: "260vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Background image — zooms via GSAP */}
        <img
          ref={imgRef}
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform"
          draggable={false}
        />

        {/* Dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-50 pointer-events-none"
        />

        {/* Content layer */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full select-none">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="text-primary font-mono uppercase tracking-[0.4em] text-xs md:text-sm mb-5 opacity-0"
          >
            {badge}
          </div>

          {/* Accent line */}
          <div
            ref={lineRef}
            className="w-20 md:w-32 h-[2px] bg-primary mb-6 origin-left opacity-100 scale-x-0"
          />

          {/* Headline */}
          <div
            ref={headRef}
            className="text-white font-bold uppercase leading-none tracking-tighter text-5xl md:text-8xl lg:text-[9rem] opacity-0 mb-6"
          >
            {headline}
          </div>

          {/* Subline */}
          <div
            ref={subRef}
            className="text-gray-400 font-mono text-base md:text-lg uppercase tracking-widest opacity-0 max-w-xl"
          >
            {subline}
          </div>

          {/* Optional stats row */}
          {stats && (
            <div
              ref={statsRef}
              className="flex gap-8 md:gap-16 mt-10"
            >
              {stats.map((s) => (
                <div key={s.label} className="stat-item opacity-0 text-center">
                  <div className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
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

        {/* Black curtain — slides up from bottom via GSAP */}
        <div
          ref={curtainRef}
          className="absolute inset-0 bg-black z-30 pointer-events-none translate-y-full"
        />
      </div>
    </div>
  );
}
