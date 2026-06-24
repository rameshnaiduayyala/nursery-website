import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Categories', href: '#categories' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Export', href: '#export' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-[#08120B]/95 backdrop-blur-md border-b border-luxury-gold/15 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center space-x-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-luxury-gold to-[#B29555] shadow-md shadow-luxury-gold/10 group-hover:scale-105 transition-transform duration-300">
            <Leaf className="w-5.5 h-5.5 text-forest-black" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-lg md:text-xl tracking-tight text-warm-ivory group-hover:text-luxury-gold transition-colors duration-300 leading-none">
              GANGADHARA
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-luxury-gold font-semibold uppercase leading-none mt-1.5">
              Nursery & Exports
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-xs tracking-[0.1em] text-warm-ivory/80 hover:text-luxury-gold uppercase transition-colors duration-300 font-semibold py-2 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={onOpenQuote}
            className="relative px-6 py-2.5 rounded-full overflow-hidden text-xs uppercase tracking-wider font-bold text-forest-black bg-luxury-gold hover:bg-[#B29555] transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/15 hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
          >
            Request Bulk Quote
            <ChevronRight className="w-4 h-4 text-forest-black" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-warm-ivory focus:outline-none hover:text-luxury-gold transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[72px] bg-[#08120B]/98 backdrop-blur-lg lg:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6 px-8 py-10 border-t border-luxury-gold/10 text-left">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-display font-medium text-warm-ivory/90 hover:text-luxury-gold transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-6 border-t border-white/5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-4 text-center rounded-xl bg-luxury-gold text-forest-black font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#B29555] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Request Bulk Quote
              <ChevronRight className="w-4 h-4 text-forest-black" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
