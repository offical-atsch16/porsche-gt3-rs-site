import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gal1 from "@/assets/gallery1.png";
import gal2 from "@/assets/gallery2.png";
import gal3 from "@/assets/gallery3.png";
import gal4 from "@/assets/gallery4.png";

const images = [gal1, gal2, gal3, gal4];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98, opacity: 0.8 }}
              className="relative aspect-video lg:aspect-square overflow-hidden cursor-pointer rounded-sm"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={img} 
                alt={`GT3 RS Detail ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg} 
              className="max-w-full max-h-[90vh] object-contain border border-white/10"
              alt="Expanded view"
            />
            <div className="absolute top-8 right-8 text-white uppercase font-mono tracking-widest text-sm hover:text-primary transition-colors">
              [ Close ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
