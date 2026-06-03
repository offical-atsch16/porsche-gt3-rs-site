import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import porscheLogo from "@/assets/porsche_logo.png";

const TOTAL_MS = 3800;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / TOTAL_MS) * 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const t = setTimeout(onComplete, TOTAL_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Golden glow — visible immediately */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,140,40,0.25) 0%, rgba(180,50,0,0.08) 55%, transparent 75%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1, 0.8] }}
        transition={{ duration: 3.5, times: [0, 0.2, 0.5, 0.75, 1] }}
      />

      {/* Logo — visible within first 300ms */}
      <motion.img
        src={porscheLogo}
        alt="Porsche"
        className="relative z-10 select-none pointer-events-none"
        style={{ width: 210, height: "auto" }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        draggable={false}
      />

      {/* GT3 RS wipe text — appears at 0.5s */}
      <div className="relative mt-6 overflow-hidden" style={{ height: 44 }}>
        <span className="absolute inset-0 flex items-center justify-center text-[#1a1a1a] text-4xl font-bold italic tracking-tight whitespace-nowrap select-none">
          GT3&nbsp;RS
        </span>
        <motion.div
          className="absolute top-0 left-0 bottom-0 overflow-hidden flex items-center"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
        >
          <span className="text-white text-4xl font-bold italic tracking-tight whitespace-nowrap select-none">
            GT3&nbsp;RS
          </span>
        </motion.div>
      </div>

      {/* Label + live progress bar — visible at 0.5s */}
      <motion.div
        className="flex flex-col items-center gap-3 mt-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <span className="text-primary font-mono uppercase text-[11px] tracking-[0.45em]">
          Engine Starting
        </span>
        <div className="relative w-44 h-[1px] bg-white/10 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-none"
            style={{ width: `${progress}%`, transition: "width 50ms linear" }}
          />
        </div>
        <span className="text-white/30 font-mono text-[10px] tracking-widest">
          {Math.round(progress)}%
        </span>
      </motion.div>
    </motion.div>
  );
}
