import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        className="relative w-48 h-16 flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "circInOut" }}
          className="absolute left-0 top-0 bottom-0 overflow-hidden whitespace-nowrap flex items-center"
        >
          <span className="text-white text-5xl font-bold italic tracking-tighter w-48 text-left">
            GT3 RS
          </span>
        </motion.div>
        {/* Outline or placeholder */}
        <span className="text-[#333] text-5xl font-bold italic tracking-tighter w-full text-left absolute opacity-50">
          GT3 RS
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 text-primary uppercase text-sm tracking-[0.3em] font-semibold"
      >
        Engine starting...
      </motion.div>
    </motion.div>
  );
}
