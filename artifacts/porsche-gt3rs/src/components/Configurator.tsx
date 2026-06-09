import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

import imgRubyStar    from "@/assets/color_ruby_star.png";
import imgPeruRed     from "@/assets/color_peru_red.png";
import imgMexicoBlue  from "@/assets/color_mexico_blue.png";
import imgBahamaYellow from "@/assets/color_bahama_yellow.png";
import imgViolaPurple from "@/assets/color_viola_purple.png";
import imgGulfOrange  from "@/assets/color_gulf_orange.png";

const COLORS = [
  { name: "Ruby Star",           code: "#92", hex: "#8B1A50", img: imgRubyStar    },
  { name: "Peru Red",            code: "#84", hex: "#A03318", img: imgPeruRed     },
  { name: "Mexico Blue",         code: "#67", hex: "#3CA8D8", img: imgMexicoBlue  },
  { name: "Bahama Yellow",       code: "#11", hex: "#E8A020", img: imgBahamaYellow},
  { name: "Viola Purple Met.",   code: "#109",hex: "#8852C0", img: imgViolaPurple },
  { name: "Gulf Orange",         code: "#50", hex: "#E85800", img: imgGulfOrange  },
];

const PACKAGES = [
  {
    id: "standard",
    name: "Standard GT3 RS",
    desc: "Full track-oriented spec. Rear-wing, DRS, front splitter, PASM Sport.",
    badge: null,
    extras: ["PASM Sport Dampers", "PDK 7-Speed", "20\"/21\" Alloy Wheels", "Alcantara Steering Wheel"],
  },
  {
    id: "weissach",
    name: "Weissach Package",
    desc: "Extreme weight reduction. Carbon everywhere. Precsion from Germany.",
    badge: "−35 kg",
    extras: ["Carbon Fibre Bonnet", "Carbon Fibre Roof", "Magnesium Wheels", "Carbon Anti-Roll Bars", "Carbon Interior Trim"],
  },
    id: "clubsport",
    name: "Clubsport Package",
    desc: "Track-day essentials. Roll cage, fire extinguisher, and more.",
    bagde: "Track Weapon,
    extras: ["Full Roll Cage", "Fire Extinguisher", "6-Point Harnesses", "Onboard Air Jack System"],
];

const OPTIONS = [
  { id: "chrono", name: "Sport Chrono Package",   desc: "Lap timer, stopwatch and SPORT RESPONSE button." },
  { id: "lift",   name: "Front Axle Lift System", desc: "Raises the front axle 30 mm. Essential for road use." },
  { id: "pccb",   name: "PCCB Ceramic Brakes",    desc: "408 mm carbon-ceramic discs. 15% lighter than iron." },
  { id: "fire",   name: "Fire Extinguisher",       desc: "OMP 4 kg AFFF racing extinguisher. FIA-compliant." },
];

const INTERIORS = [
  { id: "racetex", name: "Race-Tex",  desc: "Suede-effect Race-Tex upholstery with carbon bucket seats." },
  { id: "porsche-exclusive", name:"Porsche Exclusive Manufaktur" desc: "Bespoke interior trims, custom leather, and personalized details." },
  { id: "leather", name: "Leather",   desc: "Smooth leather with contrast stitching and bucket seats." },
];

export default function Configurator() {
  const [color,   setColor]   = useState(COLORS[0]);
  const [pkg,     setPkg]     = useState("standard");
  const [opts,    setOpts]    = useState<string[]>(["chrono"]);
  const [interior,setInterior]= useState("racetex");

  const toggleOpt = (id: string) =>
    setOpts((prev) => prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]);

  const headerRef = useRef(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 bg-[#090909] border-y border-white/5 overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header — dramatic entrance ── */}
        <div ref={headerRef} className="mb-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-primary font-mono uppercase tracking-[0.4em] text-xs mb-4"
          >
            Configurator
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="w-16 h-[2px] bg-primary mb-6"
          />

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%", skewY: 4 }}
              animate={inView ? { y: "0%", skewY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-bold uppercase tracking-tighter"
              style={{ display: "block" }}
            >
              Build Your Weapon
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="text-gray-500 font-mono text-sm uppercase tracking-widest mt-4 max-w-md"
          >
            Select your paint · Choose your package · Add your options
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── Car Display ── */}
          <div className="lg:col-span-3 relative aspect-video rounded-sm overflow-hidden bg-black border border-white/8">
            <AnimatePresence mode="wait">
              <motion.img
                key={color.name}
                src={color.img}
                alt={`GT3 RS ${color.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Colour badge */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white border border-white/15 flex items-center gap-2">
              <span className="text-primary">{color.code}</span>
              <span>{color.name}</span>
            </div>

            {/* Weissach badge */}
            {pkg === "weissach" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 bg-primary text-black px-3 py-1 text-xs font-mono uppercase font-bold tracking-wider"
              >
                Weissach Package
              </motion.div>
            )}
          </div>

          {/* ── Controls ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Paint */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-5">Paint Colour</h3>
              <div className="grid grid-cols-3 gap-4">
                {COLORS.map((c) => {
                  const active = color.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setColor(c)}
                      className="flex flex-col items-center gap-2 group"
                      type="button"
                    >
                      {/* Swatch ring — pure inline styles, no Tailwind ring utilities */}
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: c.hex,
                          outline: active ? "2px solid #ffffff" : "2px solid transparent",
                          outlineOffset: 3,
                          transition: "outline-color 0.18s ease, transform 0.18s ease",
                          transform: active ? "scale(1.15)" : "scale(1)",
                          boxShadow: active ? `0 0 12px ${c.hex}88` : "none",
                        }}
                      />
                      <div className="flex flex-col items-center gap-0.5">
                        <span
                          className="text-[8px] font-mono text-center leading-tight transition-colors duration-150"
                          style={{ color: active ? "#cc0000" : "#444" }}
                        >
                          {c.code}
                        </span>
                        <span
                          className="text-[8px] font-mono uppercase text-center leading-tight transition-colors duration-150"
                          style={{ color: active ? "#ffffff" : "#555" }}
                        >
                          {c.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Package */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Performance Package</h3>
              <div className="space-y-2">
                {PACKAGES.map((p) => {
                  const active = pkg === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPkg(p.id)}
                      type="button"
                      className="w-full p-4 text-left transition-all duration-200"
                      style={{
                        border: `1px solid ${active ? "#cc0000" : "rgba(255,255,255,0.12)"}`,
                        background: active ? "rgba(204,0,0,0.07)" : "transparent",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase tracking-wider text-sm">{p.name}</span>
                        {p.badge && <span className="text-primary font-mono text-xs font-bold">{p.badge}</span>}
                      </div>
                      <div className="text-xs text-gray-500 font-mono mb-2">{p.desc}</div>
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-wrap gap-1 mt-2 overflow-hidden"
                          >
                            {p.extras.map((e) => (
                              <span key={e} className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-gray-400">
                                {e}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Options</h3>
              <div className="space-y-2">
                {OPTIONS.map((opt) => {
                  const active = opts.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleOpt(opt.id)}
                      type="button"
                      className="w-full p-3 text-left transition-all duration-200 flex gap-3 items-start"
                      style={{
                        border: `1px solid ${active ? "rgba(204,0,0,0.45)" : "rgba(255,255,255,0.08)"}`,
                        background: active ? "rgba(204,0,0,0.05)" : "transparent",
                      }}
                    >
                      {/* Checkbox */}
                      <div
                        className="mt-0.5 w-3.5 h-3.5 shrink-0 flex items-center justify-center transition-colors duration-150"
                        style={{
                          border: `1px solid ${active ? "#cc0000" : "rgba(255,255,255,0.25)"}`,
                          background: active ? "#cc0000" : "transparent",
                        }}
                      >
                        {active && <span className="text-black font-bold text-[8px] leading-none">✓</span>}
                      </div>
                      <div>
                        <div className="font-bold uppercase tracking-wide text-xs mb-0.5">{opt.name}</div>
                        <div className="text-[10px] text-gray-600 font-mono leading-relaxed">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interior */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Interior Trim</h3>
              <div className="grid grid-cols-2 gap-2">
                {INTERIORS.map((int) => {
                  const active = interior === int.id;
                  return (
                    <button
                      key={int.id}
                      onClick={() => setInterior(int.id)}
                      type="button"
                      className="p-3 text-left transition-all duration-200"
                      style={{
                        border: `1px solid ${active ? "#cc0000" : "rgba(255,255,255,0.12)"}`,
                        background: active ? "rgba(204,0,0,0.07)" : "transparent",
                      }}
                    >
                      <div className="font-bold uppercase tracking-wide text-xs mb-1">{int.name}</div>
                      <div className="text-[9px] text-gray-600 font-mono leading-relaxed">{int.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
