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
import InteriorShowcase from "@/components/InteriorShowcase";
import Footer from "@/components/Footer";
import ZoomReveal from "@/components/ZoomReveal";
import SplitReveal from "@/components/SplitReveal";

import heroImg     from "@/assets/gallery_rear_track.jpeg";
import engineImg   from "@/assets/gallery_driver.jpeg";
import aeroImg     from "@/assets/gallery_wing.jpeg";
import cockpitImg  from "@/assets/gallery_interior.jpeg";
import colorRedImg from "@/assets/gallery_side_profile.jpeg";

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

          {/* ── T1 ZOOM — Hero → PerformanceStats ──────────────────────
              Weight obsession: reveal the 1,111 kg headline             */}
          <ZoomReveal
            image={heroImg}
            badge="Weight Obsession"
            headline="1,111 KG"
            subline="Carbon hood. Magnesium roof. CFRP doors. Lithium battery. Every gram earns its place."
            stats={[
              { value: "CFRP",  label: "Carbon Hood" },
              { value: "Mg",    label: "Magnesium Roof" },
              { value: "Li",    label: "Lithium Battery" },
              { value: "472",   label: "PS per Tonne" },
            ]}
          />

          <PerformanceStats />

          {/* ── T2 SPLIT — PerformanceStats → Engine ────────────────────
              Panels open to reveal the engine beneath                   */}
          <SplitReveal
            badge="Naturally Aspirated"
            headline="9,000"
            subline="RPM. No forced induction. No hybrid assist. Pure flat-six. The redline is not a warning — it is a destination."
            revealImage={engineImg}
            stats={[
              { value: "4.0L",  label: "Displacement" },
              { value: "525",   label: "Horsepower" },
              { value: "9,000", label: "Redline RPM" },
              { value: "PDK",   label: "7-Speed" },
            ]}
          />

          <Engine />

          {/* ── T3 ZOOM — Engine → Aerodynamics ─────────────────────────
              Chassis & tyres: the grip that puts power to the road      */}
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

          {/* ── T4 SPLIT — Aerodynamics → LapTimes ─────────────────────
              Panels open to reveal the aero image, then braking stats   */}
          <SplitReveal
            badge="Stopping Power"
            headline="2.7 SEC"
            subline="Carbon-ceramic PCCB composite. 408 mm front discs. Six-piston monoblock calipers. 100 to zero."
            revealImage={aeroImg}
            stats={[
              { value: "408mm", label: "Front Disc" },
              { value: "6",     label: "Piston Caliper" },
              { value: "PCCB",  label: "Ceramic" },
              { value: "2.7s",  label: "100–0 km/h" },
            ]}
          />

          <LapTimes />

          {/* ── T5 ZOOM — LapTimes → Configurator ───────────────────────
              Invite viewer to make it their own                         */}
          <ZoomReveal
            image={colorRedImg}
            badge="Make It Yours"
            headline="YOUR RS"
            subline="286 colour combinations. Weissach package. Sport Chrono. PCCB. Build the GT3 RS that belongs to you."
            stats={[
              { value: "286",  label: "Colour Options" },
              { value: "WP",   label: "Weissach Package" },
              { value: "PCCB", label: "Ceramic Brakes" },
              { value: "PDK",  label: "7-Speed" },
            ]}
          />

          <Configurator />
          <Gallery />

          {/* ── T6 SPLIT — Gallery → InteriorShowcase ───────────────────
              Panels open revealing the cockpit — you step inside        */}
          <SplitReveal
            badge="Race Bred Interior"
            headline="ZERO EXCESS"
            subline="Race-Tex alcantara. Carbon weave. GT sport seats. Every material chosen for feel, weight, and function."
            revealImage={cockpitImg}
            stats={[
              { value: "RT",    label: "Race-Tex" },
              { value: "CFRP",  label: "Carbon Seats" },
              { value: "360°",  label: "Driver Focus" },
              { value: "0 kg",  label: "Excess Mass" },
            ]}
          />

          <InteriorShowcase />
          <About />

          {/* ── T7 ZOOM — About → Summary ───────────────────────────────
              Close the journey before the full spec table               */}
          <ZoomReveal
            image={heroImg}
            badge="Racing Legacy"
            headline="911 GT3 RS"
            subline="Derived from the GT3 Cup race car. Homologated for the road. One of the most capable Porsches ever built."
            stats={[
              { value: "992",  label: "Generation" },
              { value: "2023", label: "Model Year" },
              { value: "GT",   label: "Motorsport DNA" },
              { value: "RS",   label: "Rennsport" },
            ]}
          />

          <Summary />
          <Footer />
        </main>
      )}
    </div>
  );
}
