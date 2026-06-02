import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { label: "Horsepower", value: 525, suffix: " PS", prefix: "" },
  { label: "Redline", value: 9000, suffix: " RPM", prefix: "" },
  { label: "0-100 km/h", value: 3.2, suffix: "s", prefix: "", decimals: 1 },
  { label: "Top Speed", value: 296, suffix: " km/h", prefix: "" },
  { label: "Weight", value: 1111, suffix: " kg", prefix: "" },
];

export default function PerformanceStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-[2px] bg-primary" />
          <h2 className="text-2xl uppercase tracking-[0.2em] font-bold">Raw Metrics</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-l border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="pl-6 border-l border-white/10 relative group"
            >
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-300 ease-out" />
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 flex items-baseline gap-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} duration={2 + i * 0.2} />
              </div>
              <div className="text-sm uppercase tracking-widest text-gray-500 font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
