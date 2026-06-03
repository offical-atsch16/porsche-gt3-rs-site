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

import heroImg     from "@/assets/hero.png";
import engineImg   from "@/assets/engine.png";
import aeroImg     from "@/assets/aero.png";
import cockpitImg  from "@/assets/interior_cockpit.png";
import wheelImg    from "@/assets/interior_wheel.png";
import colorRedImg from "@/assets/color_red.png";

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

          {/* ── TRANSITION 1 — Hero → PerformanceStats ─────────────────
              WEIGHT OBSESSION: 1,111 kg — before the raw numbers land,
              reveal the engineering story behind that figure.             */}
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

          {/* ── TRANSITION 2 — PerformanceStats → Engine ────────────────
              HIGH REVS: The stats showed numbers — now explain the
              machine behind them. 9,000 RPM, no turbo, pure mechanical. */}
          <ZoomReveal
            image={engineImg}
            badge="Naturally Aspirated"
            headline="9,000"
            subline="RPM. No forced induction. No hybrid assist. Pure flat-six. The redline is not a warning — it is a destination."
            stats={[
              { value: "4.0L",   label: "Displacement" },
              { value: "525",    label: "Horsepower" },
              { value: "9,000",  label: "Redline RPM" },
              { value: "PDK",    label: "7-Speed" },
            ]}
          />

          <Engine />

          {/* ── TRANSITION 3 — Engine → Aerodynamics ────────────────────
              CHASSIS & TYRES: Engine → grip that uses the power.
              Michelin Cup 2 R, double-wishbone, PDCC Sport.             */}
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

          {/* ── TRANSITION 4 — Aerodynamics → LapTimes ─────────────────
              STOPPING POWER: 860 kg downforce means nothing if you can't
              stop. PCCB ceramic, 408 mm, 100–0 in 2.7 s.               */}
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

          {/* ── TRANSITION 5 — LapTimes → Configurator ──────────────────
              BUILD YOURS: After seeing what it does on track,
              invite the viewer to make it their own.                    */}
          <ZoomReveal
            image={colorRedImg}
            badge="Make It Yours"
            headline="YOUR RS"
            subline="286 colour combinations. Weissach package. Sport Chrono. PCCB. Lift system. Build the GT3 RS that belongs to you."
            stats={[
              { value: "286",    label: "Colour Options" },
              { value: "WP",     label: "Weissach Package" },
              { value: "PCCB",   label: "Ceramic Brakes" },
              { value: "PDK",    label: "7-Speed" },
            ]}
          />

          <Configurator />
          <Gallery />

          {/* ── TRANSITION 6 — Gallery → InteriorShowcase ───────────────
              THE COCKPIT: Gallery shows the exterior. Before stepping
              inside, tease the precision of the interior.               */}
          <ZoomReveal
            image={cockpitImg}
            badge="Race Bred Interior"
            headline="ZERO EXCESS"
            subline="Race-Tex alcantara. Carbon weave. GT sport seats. Every material chosen for feel, weight, and function."
            stats={[
              { value: "RT",    label: "Race-Tex Surfaces" },
              { value: "CFRP",  label: "Carbon Shell Seats" },
              { value: "360°",  label: "Driver Focus" },
              { value: "0 kg",  label: "Unnecessary Mass" },
            ]}
          />

          <InteriorShowcase />
          <About />

          {/* ── TRANSITION 7 — About → Summary ──────────────────────────
              LEGACY: Close the journey. One final fact before the
              complete specification table.                              */}
          <ZoomReveal
            image={heroImg}
            badge="Racing Legacy"
            headline="911 GT3 RS"
            subline="Derived from the GT3 Cup race car. Homologated for the road. One of the most capable production Porsches ever built."
            stats={[
              { value: "992",   label: "Generation" },
              { value: "2023",  label: "Model Year" },
              { value: "GT",    label: "Motorsport DNA" },
              { value: "RS",    label: "Rennsport" },
            ]}
          />

          <Summary />
          <Footer />
        </main>
      )}
    </div>
  );
}
