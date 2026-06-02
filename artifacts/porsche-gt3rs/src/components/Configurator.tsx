import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import configBaseImg from "@/assets/config_base.png";

const colors = [
  { name: "Guards Red", hex: "#cc0000", class: "bg-[#cc0000]" },
  { name: "Racing Yellow", hex: "#ffd700", class: "bg-[#ffd700]" },
  { name: "GT Silver Metallic", hex: "#c0c0c0", class: "bg-[#c0c0c0]" },
  { name: "Miami Blue", hex: "#007acc", class: "bg-[#007acc]" },
  { name: "Shark Blue", hex: "#1e3d59", class: "bg-[#1e3d59]" },
  { name: "Python Green", hex: "#228b22", class: "bg-[#228b22]" },
];

export default function Configurator() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [package_type, setPackage] = useState("standard");

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold uppercase tracking-widest mb-4">Build Your Weapon</h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Car Display */}
          <div className="lg:col-span-2 relative h-[400px] lg:h-[600px] flex items-center justify-center bg-black/50 rounded-lg border border-white/10 overflow-hidden">
            {/* Color tint overlay effect. In a real app, this would be a 3D model or proper masked image */}
            <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
              <img 
                src={configBaseImg} 
                alt="GT3 RS Configurator" 
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.hex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 mix-blend-color z-20 pointer-events-none"
                  style={{ backgroundColor: selectedColor.hex }}
                />
              </AnimatePresence>
            </div>
            
            {/* Package specific visual indicator */}
            {package_type === "weissach" && (
              <div className="absolute top-4 right-4 z-30 border border-primary text-primary px-3 py-1 text-xs font-mono uppercase">
                Weissach Package Active
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-6">Paint Color</h3>
              <div className="grid grid-cols-3 gap-4">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div 
                      className={`w-12 h-12 rounded-full ${c.class} ring-2 ring-offset-4 ring-offset-black transition-all duration-200 ${selectedColor.name === c.name ? 'ring-white' : 'ring-transparent group-hover:ring-white/50'}`}
                    />
                    <span className="text-[10px] font-mono text-gray-500 text-center uppercase h-6">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-6">Performance Package</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setPackage("standard")}
                  className={`w-full p-4 border text-left transition-all ${package_type === "standard" ? 'border-primary bg-primary/10' : 'border-white/20 hover:border-white/50'}`}
                >
                  <div className="font-bold uppercase tracking-wider mb-1">Standard Package</div>
                  <div className="text-xs text-gray-500 font-mono">Uncompromising track performance.</div>
                </button>
                <button 
                  onClick={() => setPackage("weissach")}
                  className={`w-full p-4 border text-left transition-all ${package_type === "weissach" ? 'border-primary bg-primary/10' : 'border-white/20 hover:border-white/50'}`}
                >
                  <div className="font-bold uppercase tracking-wider mb-1">Weissach Package</div>
                  <div className="text-xs text-gray-500 font-mono">Carbon fiber components, magnesium wheels (-15kg).</div>
                </button>
              </div>
            </div>

            <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-primary transition-colors">
              Summary & Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
