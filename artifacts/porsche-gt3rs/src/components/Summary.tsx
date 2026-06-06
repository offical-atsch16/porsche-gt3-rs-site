import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  {
    category: "Engine",
    rows: [
      { label: "Type",             value: "4.0L Flat-Six · Naturally Aspirated" },
      { label: "Output",           value: "525 PS (386 kW)" },
      { label: "Torque",           value: "465 Nm" },
      { label: "Redline",          value: "9,000 RPM" },
      { label: "Throttle Bodies",  value: "6 Individual · ITB" },
      { label: "Transmission",     value: "7-Speed PDK · Shorter Ratios" },
    ],
  },
  {
    category: "Performance",
    rows: [
      { label: "0–100 km/h",       value: "3.2 s" },
      { label: "0–200 km/h",       value: "10.9 s" },
      { label: "Top Speed",        value: "296 km/h" },
      { label: "Nürburgring",      value: "6:49.328" },
      { label: "Drive",            value: "Rear-Wheel Drive" },
    ],
  },
  {
    category: "Aerodynamics",
    rows: [
      { label: "Total Downforce",  value: "860 kg at 285 km/h" },
      { label: "Rear Wing",        value: "Swan-Neck · DRS Active" },
      { label: "Front Splitter",   value: "Carbon · Adjustable" },
      { label: "Diffuser",         value: "Rear · Full Carbon" },
      { label: "vs Predecessor",   value: "2× More Downforce" },
    ],
  },
  {
    category: "Chassis",
    rows: [
      { label: "Front Suspension", value: "Double Wishbone" },
      { label: "Rear Suspension",  value: "Multi-Link" },
      { label: "Tyres (Front)",    value: "275/35 ZR 20" },
      { label: "Tyres (Rear)",     value: "335/30 ZR 21 · Michelin Cup 2 R" },
      { label: "Stabilisers",      value: "PDCC Sport · Active" },
    ],
  },
  {
    category: "Brakes",
    rows: [
      { label: "Front Discs",      value: "408 mm · PCCB Ceramic Composite" },
      { label: "Rear Discs",       value: "380 mm · PCCB Ceramic Composite" },
      { label: "Front Calipers",   value: "6-Piston · Fixed Monoblock" },
      { label: "100–0 km/h",       value: "2.7 s" },
      { label: "System",           value: "PASM Sport · ABS" },
    ],
  },
  {
    category: "Weight & Materials",
    rows: [
      { label: "Kerb Weight",      value: "1,111 kg (DIN)" },
      { label: "Hood",             value: "Carbon Fibre (CFRP)" },
      { label: "Roof",             value: "Magnesium" },
      { label: "Doors",            value: "CFRP · Full Carbon" },
      { label: "Battery",          value: "Lithium-Ion · Weight Optimised" },
      { label: "Power-to-Weight",  value: "472 PS / tonne" },
    ],
  },
];

export default function Summary() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const heroLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          ease: "power3.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Accent line expands
      gsap.fromTo(
        heroLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "power2.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: heroLineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Each spec block staggers in
      if (gridRef.current) {
        const blocks = gridRef.current.querySelectorAll(".spec-block");
        gsap.fromTo(
          blocks,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            stagger: 0.08,
            ease: "power3.out",
            duration: 0.7,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        // Individual rows within each block stagger
        blocks.forEach((block) => {
          const rows = block.querySelectorAll(".spec-row");
          gsap.fromTo(
            rows,
            { opacity: 0, x: -16 },
            {
              opacity: 1, x: 0,
              stagger: 0.05,
              ease: "power2.out",
              duration: 0.5,
              scrollTrigger: {
                trigger: block,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#050505] border-t border-white/10 overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="text-[22vw] font-black uppercase tracking-tighter text-white/[0.025] whitespace-nowrap">
          GT3&nbsp;RS
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="mb-20 opacity-0">
          <div className="text-primary font-mono tracking-[0.45em] uppercase text-xs md:text-sm mb-5">
            Complete Specifications
          </div>
          <div
            ref={heroLineRef}
            className="w-24 h-[2px] bg-primary mb-8 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-white leading-none">
            The Full Picture
          </h2>
          <p className="text-gray-500 font-mono text-sm md:text-base uppercase tracking-widest mt-6 max-w-2xl">
            Every number. Every material. Every decision that makes the 911 GT3 RS the fastest road-legal 911 ever built.
          </p>
        </div>

        {/* Spec grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5">
          {specs.map((block) => (
            <div
              key={block.category}
              className="spec-block bg-[#050505] p-8 opacity-0"
            >
              <div className="text-primary font-mono uppercase tracking-[0.3em] text-xs mb-6 flex items-center gap-3">
                <span className="block w-4 h-[1px] bg-primary" />
                {block.category}
              </div>
              <div className="space-y-0">
                {block.rows.map((row) => (
                  <div
                    key={row.label}
                    className="spec-row flex justify-between items-baseline gap-4 py-3 border-b border-white/5 last:border-0 opacity-0"
                  >
                    <span className="text-gray-600 font-mono text-xs uppercase tracking-wider shrink-0">
                      {row.label}
                    </span>
                    <span className="text-white font-semibold text-sm text-right tracking-tight">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final punch line */}
        <div className="mt-24 text-center">
          <div className="text-gray-700 font-mono uppercase tracking-[0.4em] text-xs mb-6">
            The Verdict
          </div>
          <div className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-4">
            6:49.328
          </div>
          <div className="text-primary font-mono uppercase tracking-widest text-xs md:text-sm">
            Nürburgring Nordschleife
          </div>
          <div className="mt-8 text-gray-600 font-mono uppercase tracking-[0.3em] text-xs">
            Born in Flacht. Built for one purpose.
          </div>
        </div>

      </div>
    </section>
  );
}
