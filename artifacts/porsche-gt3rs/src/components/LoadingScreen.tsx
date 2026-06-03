import { useEffect } from "react";
import { motion } from "framer-motion";
import porscheLogo from "@/assets/porsche_logo.png";

const TOTAL_MS = 4600;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, TOTAL_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black gap-0"
      exit={{ opacity: 0, transition: { duration: 0.75, ease: "easeInOut" } }}
    >
      {/* ── Radial glow behind logo ──────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,140,40,0.22) 0%, rgba(204,0,0,0.06) 50%, transparent 72%)",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.9, 0.6, 1.0, 0.7],
          scale:   [0.6, 1.1, 1.0, 1.15, 1.0],
        }}
        transition={{
          duration: 3.8,
          delay: 0.4,
          times: [0, 0.3, 0.5, 0.75, 1],
          ease: "easeInOut",
        }}
      />

      {/* ── Porsche logo ──────────────────────────────────────────── */}
      <motion.img
        src={porscheLogo}
        alt="Porsche"
        className="relative z-10 select-none pointer-events-none"
        style={{ width: 200, height: "auto" }}
        initial={{ opacity: 0, scale: 0.78, filter: "blur(14px)" }}
        animate={{
          opacity: [0,    0,    1,    1,    1   ],
          scale:   [0.78, 0.88, 1.0,  1.03, 1.0 ],
          filter:  [
            "blur(14px) brightness(0.4)",
            "blur(7px)  brightness(0.7)",
            "blur(0px)  brightness(1.0)",
            "blur(0px)  brightness(1.1)",
            "blur(0px)  brightness(1.0)",
          ],
        }}
        transition={{
          duration: 2.6,
          delay: 0.35,
          times: [0, 0.22, 0.55, 0.78, 1],
          ease: "easeOut",
        }}
        draggable={false}
      />

      {/* ── GT3 RS wipe text ─────────────────────────────────────── */}
      <motion.div
        className="relative mt-7 overflow-hidden"
        style={{ height: 44 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
      >
        {/* Ghost outline */}
        <span className="absolute inset-0 flex items-center justify-center text-[#1f1f1f] text-4xl font-bold italic tracking-tight whitespace-nowrap select-none">
          GT3&nbsp;RS
        </span>
        {/* Wipe fill */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 overflow-hidden flex items-center"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.9, delay: 1.7, ease: "circInOut" }}
        >
          <span className="text-white text-4xl font-bold italic tracking-tight whitespace-nowrap select-none">
            GT3&nbsp;RS
          </span>
        </motion.div>
      </motion.div>

      {/* ── Status label + progress bar ──────────────────────────── */}
      <motion.div
        className="flex flex-col items-center gap-3 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-primary font-mono uppercase text-[11px] tracking-[0.45em]">
          Engine Starting
        </span>
        <div className="relative w-44 h-[1px] bg-white/8 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.1, delay: 2.2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
