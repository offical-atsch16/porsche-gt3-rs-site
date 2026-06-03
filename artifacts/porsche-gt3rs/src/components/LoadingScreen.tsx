import { useEffect } from "react";
import { motion } from "framer-motion";

const DURATION = 4200;

const shield = "M100,18 L152,43 L152,116 C152,150 126,168 100,177 C74,168 48,150 48,116 L48,43 Z";
const outerR = 88;
const innerR = 76;

const stripeColors = ["#CC0000","#111","#CC0000","#111","#CC0000"];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, DURATION);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black gap-8"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
    >
      {/* ── Crest SVG ─────────────────────────────────────────────── */}
      <div className="relative select-none">
        <svg viewBox="0 0 200 200" width="200" height="200" className="overflow-visible">
          <defs>
            {/* Circular text path */}
            <path
              id="arcTop"
              d={`M${100 - outerR + 4},100 a${outerR - 4},${outerR - 4} 0 1,1 ${(outerR - 4) * 2},0`}
            />
            <path
              id="arcBot"
              d={`M${100 - outerR + 4},100 a${outerR - 4},${outerR - 4} 0 0,0 ${(outerR - 4) * 2},0`}
            />
            {/* Clip the stripes to the shield shape */}
            <clipPath id="shieldClipLeft">
              <rect x="48" y="18" width="52" height="159" />
            </clipPath>
            <clipPath id="shieldClipRight">
              <rect x="100" y="18" width="52" height="159" />
            </clipPath>
          </defs>

          {/* Outer ring */}
          <motion.circle
            cx="100" cy="100" r={outerR}
            fill="none" stroke="#CC0000" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.4, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
          />

          {/* Inner ring */}
          <motion.circle
            cx="100" cy="100" r={innerR}
            fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.4, delay: 0.2, ease: "easeInOut" }, opacity: { delay: 0.2, duration: 0.3 } }}
          />

          {/* Shield outline */}
          <motion.path
            d={shield}
            fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
          />

          {/* Red/black stripes — right quadrant (Stuttgart) */}
          {stripeColors.map((color, i) => (
            <motion.rect
              key={`sr${i}`}
              x="100" y={43 + i * 14.6} width="52" height="14.6"
              fill={color}
              clipPath="url(#shieldClipRight)"
              initial={{ scaleX: 0, originX: "100px" }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "100px 50%" }}
              transition={{ duration: 0.25, delay: 1.6 + i * 0.07, ease: "easeOut" }}
            />
          ))}

          {/* Inverted stripes — left quadrant */}
          {stripeColors.map((color, i) => (
            <motion.rect
              key={`sl${i}`}
              x="48" y={43 + (4 - i) * 14.6} width="52" height="14.6"
              fill={color}
              clipPath="url(#shieldClipLeft)"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "100px 50%" }}
              transition={{ duration: 0.25, delay: 1.6 + i * 0.07, ease: "easeOut" }}
            />
          ))}

          {/* Shield overlay border (re-draw on top of stripes) */}
          <motion.path
            d={shield}
            fill="none" stroke="white" strokeWidth="1.2" strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.3 }}
          />

          {/* Horizontal divider */}
          <motion.line
            x1="48" y1="97" x2="152" y2="97"
            stroke="white" strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 2.1, ease: "easeOut" }}
          />

          {/* Vertical divider */}
          <motion.line
            x1="100" y1="18" x2="100" y2="177"
            stroke="white" strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 2.2, ease: "easeOut" }}
          />

          {/* Center: stylized horse area — abstract rearing silhouette */}
          <motion.path
            d="M100,55 C97,51 94,48 95,44 C96,40 100,38 104,40 C108,42 108,47 106,51 C109,49 112,49 113,52 C115,55 113,59 110,61 C108,63 105,64 103,62 C103,66 102,70 100,72 C98,70 97,66 97,62 C95,64 92,63 90,61 C87,59 87,55 89,52 C90,49 93,49 96,51 Z"
            fill="white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: "100px 56px" }}
            transition={{ duration: 0.5, delay: 2.3, ease: "backOut" }}
          />

          {/* PORSCHE arc text (top) */}
          <motion.text
            fill="white"
            fontSize="9.5"
            fontFamily="'Rajdhani', sans-serif"
            letterSpacing="3.5"
            fontWeight="700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <textPath href="#arcTop" startOffset="20%">PORSCHE</textPath>
          </motion.text>

          {/* 911 GT3 RS arc text (bottom) */}
          <motion.text
            fill="#CC0000"
            fontSize="9"
            fontFamily="'Rajdhani', sans-serif"
            letterSpacing="2.5"
            fontWeight="700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.5 }}
          >
            <textPath href="#arcBot" startOffset="18%">911 GT3 RS</textPath>
          </motion.text>
        </svg>

        {/* Glow pulse behind crest */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: "0 0 60px 10px rgba(204,0,0,0.15)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── GT3 RS text reveal ─────────────────────────────────────── */}
      <div className="relative h-12 flex items-center justify-center overflow-hidden w-48">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.0, delay: 0.8, ease: "circInOut" }}
          className="absolute left-0 top-0 bottom-0 overflow-hidden whitespace-nowrap flex items-center"
        >
          <span className="text-white text-4xl font-bold italic tracking-tighter w-48 text-center">
            GT3 RS
          </span>
        </motion.div>
        <span className="text-[#282828] text-4xl font-bold italic tracking-tighter w-full text-center">
          GT3 RS
        </span>
      </div>

      {/* ── Status line ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="text-primary uppercase text-xs tracking-[0.4em] font-mono font-semibold">
          Engine Starting
        </div>
        {/* Progress bar */}
        <div className="w-40 h-[1px] bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, delay: 1.0, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
