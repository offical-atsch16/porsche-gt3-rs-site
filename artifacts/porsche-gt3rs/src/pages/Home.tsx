import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import PerformanceStats from "@/components/PerformanceStats";
import Engine from "@/components/Engine";
import Aerodynamics from "@/components/Aerodynamics";
import LapTimes from "@/components/LapTimes";
import Configurator from "@/components/Configurator";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ZoomReveal from "@/components/ZoomReveal";

import heroImg from "@/assets/hero.png";
import engineImg from "@/assets/engine.png";
import aeroImg from "@/assets/aero.png";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main>
          <Hero />

          <ZoomReveal
            image={heroImg}
            label="525 PS"
            subtitle="Raw Metrics"
          />

          <PerformanceStats />
          <Engine />

          <ZoomReveal
            image={engineImg}
            label="9000 RPM"
            subtitle="The Redline"
          />

          <Aerodynamics />

          <ZoomReveal
            image={aeroImg}
            label="860 KG"
            subtitle="Downforce at 285 km/h"
          />

          <LapTimes />
          <Configurator />
          <Gallery />
          <About />
          <Footer />
        </main>
      )}
    </div>
  );
}
