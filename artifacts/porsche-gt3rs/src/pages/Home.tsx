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

          {/*
            Transition 1: Hero → PerformanceStats
            You just saw the car. Now the raw numbers arrive.
            The headline "THE NUMBERS" primes you for the stats section below.
          */}
          <ZoomReveal
            image={heroImg}
            badge="Performance"
            headline="THE NUMBERS"
            subline="Every metric obsessively optimised for one purpose: the lap."
            stats={[
              { value: "525 PS", label: "Horsepower" },
              { value: "9000", label: "RPM Redline" },
              { value: "3.2s", label: "0–100 km/h" },
              { value: "296", label: "km/h Top Speed" },
            ]}
          />

          <PerformanceStats />
          <Engine />

          {/*
            Transition 2: Engine → Aerodynamics
            525 PS from the engine section is still in your mind.
            This transition bridges: all that power is useless without grip.
            Sets up the aerodynamics section logically.
          */}
          <ZoomReveal
            image={engineImg}
            badge="From Power to Grip"
            headline="525 PS NEED GROUND"
            subline="Pure power means nothing without the aerodynamics to keep it planted."
          />

          <Aerodynamics />

          {/*
            Transition 3: Aerodynamics → LapTimes
            You've learned about 860 kg of downforce.
            Now see the only number that matters: what it achieves on track.
            The lap time is the payoff for everything above.
          */}
          <ZoomReveal
            image={aeroImg}
            badge="Nürburgring Nordschleife"
            headline="6:49.328"
            subline="20.8 km · 73 corners · The Green Hell doesn't lie."
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
