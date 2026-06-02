import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-black border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Take Command</h2>
          <p className="text-gray-500 font-mono">Connect with an authorized Porsche Center to begin the process.</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-mono mb-2">First Name</label>
              <input 
                type="text" 
                className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-mono focus:border-primary focus:outline-none transition-colors"
                placeholder="YOUR NAME"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-mono mb-2">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-mono focus:border-primary focus:outline-none transition-colors"
                placeholder="YOUR LAST NAME"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-mono mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-mono focus:border-primary focus:outline-none transition-colors"
              placeholder="EMAIL ADDRESS"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-mono mb-2">Country</label>
            <select className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-mono focus:border-primary focus:outline-none transition-colors appearance-none">
              <option>GERMANY</option>
              <option>UNITED STATES</option>
              <option>UNITED KINGDOM</option>
              <option>JAPAN</option>
              <option>OTHER</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-mono mb-2">Message (Optional)</label>
            <textarea 
              rows={4}
              className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-mono focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="INQUIRY DETAILS"
            />
          </div>

          <div className="pt-8 flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary))", color: "#000" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black px-12 py-4 uppercase tracking-widest font-bold w-full md:w-auto transition-colors"
            >
              Find a Porsche Center
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
