export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 text-center">

        <div className="font-bold text-white text-2xl tracking-[0.15em] uppercase">
          GT3 RS
        </div>

        <div className="flex gap-6 text-xs uppercase font-mono text-gray-600 tracking-widest">
          <a href="#" className="hover:text-primary transition-colors">Legal</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Cookies</a>
        </div>

        <div className="w-16 h-[1px] bg-white/10" />

        <p className="text-gray-600 text-xs font-mono tracking-wide max-w-xl leading-relaxed uppercase">
          Diese Website ist ein privates Fan-Projekt und steht in keiner Verbindung zur
          Dr. Ing. h.c. F. Porsche AG oder deren Tochtergesellschaften.
          Alle Markenzeichen, Logos und Produktbezeichnungen sind Eigentum ihrer
          jeweiligen Inhaber. &nbsp;·&nbsp; This is an independent fan project — not affiliated with Porsche AG.
        </p>

        <div className="text-gray-700 text-xs font-mono tracking-widest uppercase">
          &copy; {new Date().getFullYear()} &nbsp;&nbsp;·&nbsp;
          <a
            href="https://github.com/offical-atsch16"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-primary transition-colors"
          >
            Built by Arien
          </a>
        </div>
      </div>
    </footer>
  );
}
