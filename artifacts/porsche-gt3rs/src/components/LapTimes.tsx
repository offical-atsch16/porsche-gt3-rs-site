import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function LapTimes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const timeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const digitVariants = {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section ref={ref} className="py-32 bg-black relative border-y border-white/10">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] overflow-hidden pointer-events-none">
        <h2 className="text-[30vw] font-bold whitespace-nowrap uppercase tracking-tighter">NORDSCHLEIFE</h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary tracking-[0.4em] uppercase text-sm font-semibold mb-8">
            The Ultimate Metric
          </h2>
          <p className="text-gray-400 font-mono mb-12 max-w-2xl mx-auto">
            20.8 kilometers. 73 corners. The Green Hell is the uncompromising arbiter of truth for any sports car.
          </p>
        </motion.div>

        {/* Timing Board Style Display */}
        <motion.div 
          variants={timeVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[#0a0a0a] border border-white/10 p-8 md:p-16 rounded-sm shadow-2xl inline-block relative overflow-hidden"
        >
          {/* LED grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
          
          <div className="flex items-center justify-center text-6xl md:text-9xl font-mono font-bold tracking-tight text-white gap-2 relative z-0">
            <motion.span variants={digitVariants} className="text-primary">6</motion.span>
            <motion.span variants={digitVariants} className="animate-pulse opacity-50">:</motion.span>
            <motion.span variants={digitVariants}>4</motion.span>
            <motion.span variants={digitVariants}>9</motion.span>
            <motion.span variants={digitVariants} className="text-primary">.</motion.span>
            <motion.span variants={digitVariants}>3</motion.span>
            <motion.span variants={digitVariants}>2</motion.span>
            <motion.span variants={digitVariants}>8</motion.span>
          </div>
          
          <div className="mt-8 flex justify-between items-center text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500 border-t border-white/10 pt-4">
            <span>Sector: Nürburgring Nordschleife</span>
            <span className="text-primary">Status: Valid</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
