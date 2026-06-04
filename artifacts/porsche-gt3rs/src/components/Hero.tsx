import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/gallery_side_profile.jpeg";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={heroImg} 
          alt="Porsche 911 GT3 RS on track" 
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-primary tracking-[0.4em] uppercase text-sm md:text-base font-semibold mb-6">
            911 GT3 RS
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter mb-8 leading-none">
            The Circuit <br/>
            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "1px white" }}>Is Your Language</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-mono mb-12">
            Motorsport DNA, engineered for the absolute limit. A machine built obsessively around the Nürburgring lap record.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary))", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-primary text-primary px-8 py-4 uppercase tracking-[0.2em] font-bold text-sm transition-colors duration-300"
          >
            Discover the Machine
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Scroll to ignite</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-primary/50"
        />
      </motion.div>
    </section>
  );
}
