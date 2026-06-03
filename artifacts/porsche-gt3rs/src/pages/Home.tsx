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
import Summary from "@/components/Summary";
import Footer from "@/components/Footer";
import ZoomReveal from "@/components/ZoomReveal";

import heroImg    from "@/assets/hero.png";
import engineImg  from "@/assets/engine.png";
import aeroImg    from "@/assets/aero.png";

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
            TRANSITION 1 — Hero → PerformanceStats
            Info revealed: WEIGHT REDUCTION
            Why here: The Hero shows the car. Before the raw numbers arrive,
            this reveals HOW the GT3 RS is so fast — obsessive weight reduction.
            Carbon hood, magnesium roof, CFRP doors. 1,111 kg is the result.
            The PerformanceStats section below then shows what that weight enables.
          */}
          <ZoomReveal
            image={heroImg}
            badge="Weight Obsession"
            headline="1,111 KG"
            subline="Carbon hood. Magnesium roof. CFRP doors. Lithium battery. Every gram earns its place."
            stats={[
              { value: "CFRP", label: "Carbon Hood" },
              { value: "Mg",   label: "Magnesium Roof" },
              { value: "Li",   label: "Lithium Battery" },
              { value: "472",  label: "PS per Tonne" },
            ]}
          />

          <PerformanceStats />
          <Engine />

          {/*
            TRANSITION 2 — Engine → Aerodynamics
            Info revealed: CHASSIS & TYRES
            Why here: The Engine section covers power delivery.
            This transition bridges to Aerodynamics by revealing what puts that
            power onto the ground — Michelin Cup 2 R tyres, PDCC Sport,
            double-wishbone suspension. Physics in motion before downforce arrives.
          */}
          <ZoomReveal
            image={engineImg}
            badge="Chassis & Tyres"
            headline="CUP 2 R"
            subline="Michelin Pilot Sport Cup 2 R. 275 front. 335 rear. Semi-slick tread. Track-spec grip from the factory."
            stats={[
              { value: "275/35", label: "Front Tyre" },
              { value: "335/30", label: "Rear Tyre · 21\"" },
              { value: "PDCC",   label: "Sport Stabiliser" },
              { value: "DWB",    label: "Double Wishbone" },
            ]}
          />

          <Aerodynamics />

          {/*
            TRANSITION 3 — Aerodynamics → LapTimes
            Info revealed: BRAKING SYSTEM
            Why here: 860 kg of downforce keeps you on the road.
            But stopping matters as much as cornering — PCCB ceramic-composite
            brakes, 408mm discs, 6-piston calipers. 100–0 in 2.7 seconds.
            This completes the triangle: power → grip → stopping.
            Then the lap time section shows the result of all three combined.
          */}
          <ZoomReveal
            image={aeroImg}
            badge="Stopping Power"
            headline="2.7 SECONDS"
            subline="Carbon-ceramic PCCB composite. 408 mm front discs. Six-piston monoblock calipers. 100 to zero."
            stats={[
              { value: "408mm",  label: "Front Disc" },
              { value: "6",      label: "Piston Caliper" },
              { value: "PCCB",   label: "Ceramic Composite" },
              { value: "2.7s",   label: "100–0 km/h" },
            ]}
          />

          <LapTimes />
          <Configurator />
          <Gallery />
          <About />

          {/*
            SUMMARY — Everything in one place
            After the journey through each system, this section collects
            all specs into a comprehensive reference table.
          */}
          <Summary />

          <Footer />
        </main>
      )}
    </div>
  );
}
