import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ChevronRight, Compass } from 'lucide-react';
import { companyDetails } from '../data/nurseryData';

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

  const isHome = window.location.pathname === '/' || window.location.pathname === '';
  const getHref = (href) => {
    if (href.startsWith('#')) {
      return isHome ? href : `/${href}`;
    }
    return href;
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Categories', href: '#categories' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Export', href: '#export' },
    { name: 'Logistics', href: '/logistics' },
  ];

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 max-w-7xl w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] rounded-2xl ${
        scrolled
          ? 'top-4 py-3 bg-[#08120B]/85 backdrop-blur-xl border border-luxury-gold/20 shadow-[0_16px_40px_0_rgba(8,18,11,0.6)]'
          : 'top-6 py-4 bg-[#08120B]/40 backdrop-blur-md border border-white/5 shadow-lg'
      }`}
    >
      <div className="px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href={isHome ? '#home' : '/'} className="flex items-center space-x-2.5 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-luxury-gold to-[#B29555] shadow-md shadow-luxury-gold/15 group-hover:rotate-6 transition-transform duration-300">
            <Leaf className="w-5 h-5 text-forest-black" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-sm md:text-base tracking-tight text-warm-ivory group-hover:text-luxury-gold transition-colors duration-300 leading-none">
              {companyDetails.name.toUpperCase()}
            </span>
            <span className="font-sans text-[8px] tracking-[0.25em] text-luxury-gold font-bold uppercase leading-none mt-1">
              {companyDetails.subtitle}
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-7 bg-[#FAF8F2]/5 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const activeLink = item.href === '/logistics' 
              ? window.location.pathname === '/logistics'
              : false; // Standard scroll spies handle scroll targets
            return (
              <a
                key={item.name}
                href={getHref(item.href)}
                className={`relative text-[10px] tracking-[0.15em] uppercase transition-all duration-300 font-bold py-1 flex items-center gap-1 group ${
                  activeLink 
                    ? 'text-luxury-gold' 
                    : 'text-warm-ivory/80 hover:text-luxury-gold'
                }`}
              >
                {item.name}
                {item.href === '/logistics' && (
                  <Compass className="w-3.5 h-3.5 opacity-60 group-hover:rotate-12 transition-transform" />
                )}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-luxury-gold opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300" />
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onOpenQuote}
            className="relative px-5 py-2.5 rounded-full overflow-hidden text-[10px] uppercase tracking-wider font-extrabold text-forest-black bg-luxury-gold hover:bg-[#B29555] transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/15 hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
          >
            Request Bulk Quote
            <ChevronRight className="w-3.5 h-3.5 text-forest-black" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-warm-ivory focus:outline-none hover:text-luxury-gold transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`absolute left-0 w-full bg-[#08120B]/98 border border-luxury-gold/25 rounded-2xl mt-3 backdrop-blur-xl lg:hidden transition-all duration-500 ease-in-out origin-top overflow-y-auto max-h-[75vh] ${
          mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-5 px-6 py-8 text-left">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={getHref(item.href)}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-display font-medium text-warm-ivory/95 hover:text-luxury-gold transition-colors flex items-center justify-between"
            >
              <span>{item.name}</span>
              <ChevronRight className="w-4 h-4 text-luxury-gold/40" />
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3.5 text-center rounded-xl bg-luxury-gold text-forest-black font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#B29555] transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
