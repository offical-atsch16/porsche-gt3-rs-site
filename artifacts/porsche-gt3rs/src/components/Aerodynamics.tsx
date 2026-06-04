import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aeroImg from "@/assets/gallery_wing.jpeg";

export default function Aerodynamics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-[#050505] border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-2 lg:order-1 h-[500px] lg:h-[700px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
            >
              <img 
                src={aeroImg} 
                alt="Aerodynamics" 
                className="w-full h-full object-cover rounded-sm border border-white/10"
              />
              
              {/* SVG Airflow lines */}
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path 
                  d="M0,50 Q40,40 60,30 T100,20" 
                  fill="none" 
                  stroke="var(--color-primary)" 
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M0,60 Q50,60 70,40 T100,25" 
                  fill="none" 
                  stroke="var(--color-primary)" 
                  strokeWidth="0.3"
                  strokeDasharray="1 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                />
              </svg>

              {/* Data points overlay */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.5 }}
                className="absolute top-1/4 right-8 bg-black/80 backdrop-blur-md border border-white/20 p-4 font-mono text-xs uppercase"
              >
                <div className="text-primary mb-1">DRS System</div>
                <div className="text-white">Active</div>
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-primary tracking-[0.3em] uppercase text-sm font-semibold mb-4">
                Air is a Tool
              </h2>
              <h3 className="text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-8">
                860kg of Downforce
              </h3>
              
              <div className="space-y-6 text-gray-400 font-mono text-lg mb-10">
                <p>
                  The swan-neck rear wing isn't just large; it's intelligent. Featuring Formula 1 derived Drag Reduction System (DRS), it can flatten out on straights to reduce drag, or act as an airbrake during heavy deceleration.
                </p>
                <p>
                  At 285 km/h, the combined aerodynamic elements generate 860 kg of total downforce—twice that of its predecessor. You don't just drive on the track; you are crushed into it.
                </p>
              </div>

              <motion.button 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-white uppercase tracking-widest font-bold border-b border-primary pb-1 group"
              >
                Explore DRS Mechanics
                <span className="text-primary group-hover:translate-x-2 transition-transform">→</span>
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
