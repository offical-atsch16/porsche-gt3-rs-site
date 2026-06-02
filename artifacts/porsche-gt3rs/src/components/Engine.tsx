import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import engineImg from "@/assets/engine.png";

export default function Engine() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-primary tracking-[0.3em] uppercase text-sm font-semibold mb-4">
                The Heartbeat
              </h2>
              <h3 className="text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-8">
                4.0L Naturally Aspirated
              </h3>
              
              <div className="space-y-6 text-gray-400 font-mono text-lg">
                <p>
                  No turbos. No hybrid assistance. Just 4.0 liters of pure, naturally aspirated flat-six brilliance. Throttle response is instantaneous. The soundtrack at 9,000 RPM is deafening, mechanical perfection.
                </p>
                <p>
                  Paired with a lightning-fast 7-speed Porsche Doppelkupplung (PDK) with shorter gear ratios, every upshift feels like a rifle bolt snapping home. This is an engine that demands to be wrung out.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8">
                <div className="border-t border-white/20 pt-4">
                  <div className="text-3xl font-bold text-white">465 Nm</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">Max Torque</div>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-3xl font-bold text-white">6</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">Individual Throttle Valves</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[600px] overflow-hidden rounded-sm group">
            <motion.div 
              style={{ y }}
              className="absolute inset-[-10%] w-[120%] h-[120%]"
            >
              <img 
                src={engineImg} 
                alt="GT3 RS Engine" 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </motion.div>
            
            {/* Tech scanner effect line */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              className="absolute left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(204,0,0,0.8)] z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
