import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ZoomRevealProps {
  image: string;
  label: string;
  subtitle: string;
}

export default function ZoomReveal({ image, label, subtitle }: ZoomRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale       = useTransform(scrollYProgress, [0, 1],           [1.0, 1.7]);
  const imgOpacity  = useTransform(scrollYProgress, [0, 0.1, 0.88, 1],[0,   0.7,  0.7,  0]);
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.72, 0.88], [0, 1, 1, 0]);
  const textY       = useTransform(scrollYProgress, [0.25, 0.45],     [50, 0]);
  const overlayOp   = useTransform(scrollYProgress, [0, 0.15, 0.72, 0.95], [0.55, 0.35, 0.55, 0.95]);
  const curtainY    = useTransform(scrollYProgress, [0.8, 1],         ["100%", "0%"]);

  return (
    <div ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        <motion.div
          style={{ scale, opacity: imgOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <img src={image} alt="" className="w-full h-full object-cover" draggable={false} />
        </motion.div>

        <motion.div
          style={{ opacity: overlayOp }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 text-center px-4 select-none"
        >
          <div className="text-primary tracking-[0.45em] uppercase text-xs md:text-sm font-semibold mb-5 font-mono">
            {subtitle}
          </div>
          <div className="text-6xl md:text-[10rem] font-bold uppercase tracking-tighter leading-none text-white drop-shadow-2xl">
            {label}
          </div>
          <motion.div
            style={{ scaleX: textOpacity }}
            className="mt-6 h-[2px] w-24 md:w-40 bg-primary mx-auto origin-left"
          />
        </motion.div>

        <motion.div
          style={{ y: curtainY }}
          className="absolute inset-0 bg-black z-20 pointer-events-none"
        />
      </div>
    </div>
  );
}
