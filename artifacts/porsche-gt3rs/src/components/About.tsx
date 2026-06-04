import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import driverImg from "@/assets/gallery_driver.jpeg";

export default function About() {
  const ref    = useRef(null);
  const bgRef  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: bgRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const lineage = [
    "964 RS", "993 RS", "996 GT3 RS", "997 GT3 RS", "991 GT3 RS", "992 GT3 RS",
  ];

  return (
    <section
      ref={bgRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      {/* ── Full-bleed driver photo ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-8%] w-[116%] h-[116%] pointer-events-none"
      >
        <img
          src={driverImg}
          alt="Porsche Motorsport Driver"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.18, filter: "grayscale(60%)" }}
          draggable={false}
        />
      </motion.div>

      {/* Deep vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(204,0,0,0.03)_50%,transparent_100%)] pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary tracking-[0.4em] uppercase text-sm font-semibold mb-8 text-center">
            Flacht, Germany
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-12 text-center">
            Born in Flacht
          </h3>

          <div className="space-y-6 text-gray-400 font-mono text-lg leading-relaxed max-w-3xl mx-auto">
            <p>
              The Porsche GT department in Flacht operates on a different set of rules. Here, under the
              guidance of Andreas Preuninger, lap times dictate design. Comfort is secondary. Compromise
              is non-existent.
            </p>
            <p>
              The RS badge ("Rennsport") is not handed out lightly. It is reserved for machines that blur
              the line between street-legal sports cars and purpose-built racing prototypes. It is a
              promise of visceral, uncompromising performance.
            </p>
          </div>

          {/* Driver caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-3"
          >
            <div className="w-8 h-[1px] bg-primary/40" />
            <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">
              Porsche Motorsport · Factory Driver
            </span>
            <div className="w-8 h-[1px] bg-primary/40" />
          </motion.div>

          <div className="mt-20">
            <h4 className="text-center text-xs uppercase tracking-widest text-gray-500 mb-8 font-mono">
              The Bloodline
            </h4>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center font-bold tracking-tighter">
              {lineage.map((model, i) => (
                <motion.div
                  key={model}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center"
                >
                  <span className={`text-xl md:text-3xl ${i === lineage.length - 1 ? "text-primary" : "text-gray-600"}`}>
                    {model}
                  </span>
                  {i < lineage.length - 1 && (
                    <span className="text-gray-800 mx-4 md:mx-8">→</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
