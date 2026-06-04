import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import galInterior    from "@/assets/gallery_interior.jpeg";
import galRearTrack   from "@/assets/gallery_rear_track.jpeg";
import galDriver      from "@/assets/gallery_driver.jpeg";
import galWing        from "@/assets/gallery_wing.jpeg";
import galSideProfile from "@/assets/gallery_side_profile.jpeg";

const PHOTOS = [
  { img: galSideProfile, label: "Side Profile",  sub: "GT3 RS · Track Edition" },
  { img: galRearTrack,   label: "Rear Three-Quarter", sub: "GT3 RS · On The Limit" },
  { img: galWing        ,label: "Swan-Neck Wing", sub: "860 kg Downforce" },
  { img: galDriver,      label: "Ready To Race",  sub: "Porsche Motorsport" },
  { img: galInterior,    label: "The Cockpit",    sub: "Driver-Focused Interior" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-0 bg-black" style={{ position: "relative", zIndex: 10 }}>

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
        <div className="text-primary font-mono uppercase tracking-[0.4em] text-xs mb-4">Photography</div>
        <div className="w-16 h-[2px] bg-primary mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">The Real Thing</h2>
      </div>

      {/* ── Asymmetric masonry grid ── */}
      <div className="max-w-[1600px] mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">

          {/* Photo 0 — wide hero (2 cols) */}
          <GalleryCell photo={PHOTOS[0]} index={0} colSpan="lg:col-span-2" aspect="aspect-[16/9]" onClick={setActive} />

          {/* Photo 1 — portrait */}
          <GalleryCell photo={PHOTOS[1]} index={1} colSpan="" aspect="aspect-[3/4] lg:aspect-auto lg:row-span-2" onClick={setActive} />

          {/* Photo 2 — square */}
          <GalleryCell photo={PHOTOS[2]} index={2} colSpan="" aspect="aspect-square" onClick={setActive} />

          {/* Photo 3 — square */}
          <GalleryCell photo={PHOTOS[3]} index={3} colSpan="" aspect="aspect-square" onClick={setActive} />

          {/* Photo 4 — wide (2 cols) */}
          <GalleryCell photo={PHOTOS[4]} index={4} colSpan="col-span-2 lg:col-span-2" aspect="aspect-[16/7]" onClick={setActive} />

        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setActive(null)}
          >
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              src={PHOTOS[active].img}
              alt={PHOTOS[active].label}
              className="max-w-full max-h-[88vh] object-contain border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none">
              <div className="text-white font-bold uppercase tracking-widest text-sm">{PHOTOS[active].label}</div>
              <div className="text-gray-500 font-mono text-xs uppercase tracking-widest">{PHOTOS[active].sub}</div>
            </div>

            {/* Counter */}
            <div className="absolute top-8 left-8 text-white/30 font-mono text-xs tracking-widest">
              {String(active + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
            </div>

            {/* Close */}
            <button
              className="absolute top-7 right-8 text-white/50 hover:text-primary font-mono text-sm uppercase tracking-widest transition-colors"
              onClick={() => setActive(null)}
            >
              [ ESC ]
            </button>

            {/* Prev / Next */}
            {active > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl font-thin transition-colors px-4 py-6"
                onClick={(e) => { e.stopPropagation(); setActive(active - 1); }}
              >
                ‹
              </button>
            )}
            {active < PHOTOS.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl font-thin transition-colors px-4 py-6"
                onClick={(e) => { e.stopPropagation(); setActive(active + 1); }}
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Single grid cell ── */
function GalleryCell({
  photo, index, colSpan, aspect, onClick,
}: {
  photo: { img: string; label: string; sub: string };
  index: number;
  colSpan: string;
  aspect: string;
  onClick: (i: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      className={`relative overflow-hidden cursor-zoom-in group rounded-sm bg-[#111] ${colSpan} ${aspect}`}
      onClick={() => onClick(index)}
    >
      <img
        src={photo.img}
        alt={photo.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />

      {/* Label — appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <div className="text-white font-bold uppercase tracking-widest text-xs">{photo.label}</div>
        <div className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mt-0.5">{photo.sub}</div>
      </div>
    </motion.div>
  );
}
