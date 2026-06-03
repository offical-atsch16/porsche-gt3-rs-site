import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import engineImg from "@/assets/engine.png";

const corners = [
  "top-3 left-3 border-t-2 border-l-2",
  "top-3 right-3 border-t-2 border-r-2",
  "bottom-3 left-3 border-b-2 border-l-2",
  "bottom-3 right-3 border-b-2 border-r-2",
];

export default function Engine() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Text block ── */}
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
                  No turbos. No hybrid assistance. Just 4.0 liters of pure,
                  naturally aspirated flat-six brilliance. Throttle response is
                  instantaneous. The soundtrack at 9,000 RPM is deafening,
                  mechanical perfection.
                </p>
                <p>
                  Paired with a lightning-fast 7-speed PDK with shorter gear
                  ratios, every upshift feels like a rifle bolt snapping home.
                  This is an engine that demands to be wrung out.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8">
                <div className="border-t border-white/20 pt-4">
                  <div className="text-3xl font-bold text-white">465 Nm</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                    Max Torque
                  </div>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-3xl font-bold text-white">6</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                    Individual Throttle Valves
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Image block ── */}
          <div className="relative h-[600px] overflow-hidden rounded-sm group">
            {/* Parallax image */}
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

            {/* Animated corner targeting brackets */}
            {corners.map((cls, i) => (
              <motion.div
                key={i}
                className={`absolute w-7 h-7 border-primary/70 ${cls} z-10`}
                initial={{ opacity: 0, scale: 1.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.45, ease: "easeOut" }}
              />
            ))}

            {/* Subtle centre reticle */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.div
                className="w-6 h-6 rounded-full border border-primary/40"
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Label: bottom-left */}
            <motion.div
              className="absolute bottom-4 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-primary/60"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              4.0L Flat-Six · 525 PS
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
