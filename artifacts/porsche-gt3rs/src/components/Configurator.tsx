import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import imgRed      from "@/assets/color_red.png";
import imgYellow   from "@/assets/color_yellow.png";
import imgSilver   from "@/assets/color_silver.png";
import imgBlue     from "@/assets/color_blue.png";
import imgShark    from "@/assets/color_sharkblue.png";
import imgChalk    from "@/assets/color_chalk.png";

const colors = [
  { name: "Guards Red",        hex: "#CC0000", img: imgRed    },
  { name: "Racing Yellow",     hex: "#FFD700", img: imgYellow },
  { name: "GT Silver",         hex: "#C0C0C0", img: imgSilver },
  { name: "Miami Blue",        hex: "#007ACC", img: imgBlue   },
  { name: "Shark Blue",        hex: "#1E3D59", img: imgShark  },
  { name: "Chalk",             hex: "#D8D4C8", img: imgChalk  },
];

const packages = [
  {
    id: "standard",
    name: "Standard GT3 RS",
    desc: "Full track-oriented spec. Rear-wing, DRS, front splitter, PASM Sport.",
    badge: null,
    extras: ["PASM Sport Dampers","PDK 7-Speed", "20\"/21\" Alloy Wheels", "Alcantara Steering Wheel"],
  },
  {
    id: "weissach",
    name: "Weissach Package",
    desc: "Extreme weight reduction. Carbon everywhere. Magnesium wheels.",
    badge: "−35 kg",
    extras: ["Carbon Fibre Bonnet", "Carbon Fibre Roof", "Magnesium Wheels", "Carbon Anti-Roll Bars", "Carbon Interior Trim"],
  },
];

const options = [
  {
    id: "chrono",
    name: "Sport Chrono Package",
    desc: "Lap timer, stopwatch and SPORT RESPONSE button. Mode switch: Normal / Sport / Sport+ / Track.",
  },
  {
    id: "lift",
    name: "Front Axle Lift System",
    desc: "Raises the front axle by 30 mm at the push of a button. Essential for everyday use.",
  },
  {
    id: "pccb",
    name: "PCCB Ceramic Brakes",
    desc: "Porsche Ceramic Composite Brake. 408 mm carbon-ceramic discs. 15% lighter than iron, last 3× longer.",
  },
  {
    id: "fire",
    name: "Fire Extinguisher",
    desc: "OMP 4 kg AFFF racing extinguisher, bracket-mounted. FIA-compliant for track days.",
  },
];

const interiors = [
  {
    id: "racetex",
    name: "Race-Tex",
    desc: "Suede-effect Race-Tex upholstery. Carbon fibre-backed full bucket seats. Race-trim door panels.",
  },
  {
    id: "leather",
    name: "Leather",
    desc: "Smooth leather upholstery on full bucket seats with contrast stitching. Sport Chrono dial at 12 o'clock.",
  },
];

export default function Configurator() {
  const [selectedColor,   setColor]   = useState(colors[0]);
  const [selectedPackage, setPkg]     = useState("standard");
  const [selectedOpts,    setOpts]    = useState<string[]>(["chrono"]);
  const [selectedInt,     setInt]     = useState("racetex");

  const toggleOpt = (id: string) =>
    setOpts((prev) => prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]);

  return (
    <section className="py-24 bg-[#090909] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <div className="text-primary font-mono uppercase tracking-[0.4em] text-xs mb-4">Configure</div>
          <div className="w-16 h-[2px] bg-primary mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Build Your Weapon</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── Car display ──────────────────────────────────────── */}
          <div className="lg:col-span-3 relative aspect-video rounded-sm overflow-hidden bg-black border border-white/8">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColor.name}
                src={selectedColor.img}
                alt={`GT3 RS ${selectedColor.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1,  scale: 1 }}
                exit={{ opacity: 0,    scale: 0.97 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Color name badge */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white border border-white/15">
              {selectedColor.name}
            </div>

            {/* Weissach badge */}
            {selectedPackage === "weissach" && (
              <div className="absolute top-4 right-4 bg-primary/90 text-black px-3 py-1 text-xs font-mono uppercase font-bold tracking-wider">
                Weissach
              </div>
            )}
          </div>

          {/* ── Controls ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Paint */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-5">Paint Colour</h3>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((c) => {
                  const active = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setColor(c)}
                      className={`flex flex-col items-center gap-2 group transition-opacity ${active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                    >
                      <div
                        className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-[#090909] transition-all duration-200"
                        style={{
                          backgroundColor: c.hex,
                          ringColor: active ? "white" : "transparent",
                          boxShadow: active ? `0 0 0 2px white` : `0 0 0 2px transparent`,
                        }}
                      />
                      <span className="text-[9px] font-mono text-gray-500 uppercase text-center leading-tight">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Package */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Performance Package</h3>
              <div className="space-y-2">
                {packages.map((pkg) => {
                  const active = selectedPackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setPkg(pkg.id)}
                      className={`w-full p-4 border text-left transition-all duration-200 ${active ? "border-primary bg-primary/8" : "border-white/15 hover:border-white/35"}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase tracking-wider text-sm">{pkg.name}</span>
                        {pkg.badge && (
                          <span className="text-primary font-mono text-xs font-bold">{pkg.badge}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 font-mono mb-2">{pkg.desc}</div>
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-wrap gap-1 mt-2"
                        >
                          {pkg.extras.map((e) => (
                            <span key={e} className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-gray-400">
                              {e}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Options</h3>
              <div className="space-y-2">
                {options.map((opt) => {
                  const active = selectedOpts.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleOpt(opt.id)}
                      className={`w-full p-3 border text-left transition-all duration-200 flex gap-3 items-start ${active ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-white/25"}`}
                    >
                      <div className={`mt-0.5 w-3.5 h-3.5 shrink-0 border flex items-center justify-center transition-colors ${active ? "border-primary bg-primary" : "border-white/30"}`}>
                        {active && <span className="text-black font-bold text-[8px]">✓</span>}
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
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Interior</h3>
              <div className="grid grid-cols-2 gap-2">
                {interiors.map((int) => {
                  const active = selectedInt === int.id;
                  return (
                    <button
                      key={int.id}
                      onClick={() => setInt(int.id)}
                      className={`p-3 border text-left transition-all duration-200 ${active ? "border-primary bg-primary/8" : "border-white/15 hover:border-white/35"}`}
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
