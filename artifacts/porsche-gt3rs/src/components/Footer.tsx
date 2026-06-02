export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase font-mono text-gray-600 tracking-widest">
        <div className="font-bold text-white text-xl tracking-tighter">PORSCHE</div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Legal</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Cookies</a>
        </div>

        <div>
          &copy; {new Date().getFullYear()} Porsche. Built for the track.
        </div>
      </div>
    </footer>
  );
}
