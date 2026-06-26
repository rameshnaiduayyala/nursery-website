import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ChevronRight, Compass, Sun, Moon } from 'lucide-react';
import { companyDetails } from '../data/nurseryData';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Track page scroll progress for the progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = window.location.pathname === '/' || window.location.pathname === '';
  const getHref = (href) => {
    if (href.startsWith('#')) return isHome ? href : `/${href}`;
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
          ? 'top-3 py-3 bg-forest-black/92 backdrop-blur-2xl border border-luxury-gold/18 shadow-glass'
          : 'top-5 py-4 bg-forest-black/35 backdrop-blur-md border border-warm-ivory/5 shadow-lg'
      }`}
    >
      {/* Scroll progress bar — ultra-thin, green */}
      <div className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full overflow-hidden opacity-60">
        <div
          className="h-full bg-gradient-to-r from-luxury-gold via-warm-ivory to-luxury-gold transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href={isHome ? '#home' : '/'} className="flex items-center space-x-2.5 group flex-shrink-0">
          {companyDetails.logo ? (
            <img
              src={companyDetails.logo}
              alt={companyDetails.name}
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <>
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-luxury-gold to-luxury-gold-deep shadow-md shadow-luxury-gold/20 group-hover:rotate-6 group-hover:shadow-luxury-gold/40 transition-all duration-300">
                <Leaf className="w-4 h-4 text-forest-black" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-sm md:text-[15px] tracking-tight text-warm-ivory group-hover:text-luxury-gold transition-colors duration-300 leading-none">
                  {companyDetails.name.toUpperCase()}
                </span>
                <span className="font-sans text-[7px] tracking-[0.28em] text-luxury-gold font-bold uppercase leading-none mt-[3px]">
                  {companyDetails.subtitle}
                </span>
              </div>
            </>
          )}
        </a>

        {/* Desktop Menu — pill pill style */}
        <div className="hidden lg:flex items-center space-x-1 bg-warm-ivory/[0.04] border border-warm-ivory/[0.06] px-5 py-1.5 rounded-full backdrop-blur-sm">
          {navItems.map((item) => {
            const activeLink = item.href === '/logistics'
              ? window.location.pathname === '/logistics'
              : false;
            return (
              <a
                key={item.name}
                href={getHref(item.href)}
                className={`relative text-[9.5px] tracking-[0.14em] uppercase transition-all duration-250 font-bold px-3 py-1.5 rounded-full flex items-center gap-1 group ${
                  activeLink
                    ? 'text-luxury-gold bg-luxury-gold/8'
                    : 'text-warm-ivory/75 hover:text-luxury-gold hover:bg-luxury-gold/5'
                }`}
              >
                {item.name}
                {item.href === '/logistics' && (
                  <Compass className="w-3 h-3 opacity-70 group-hover:rotate-12 transition-transform" />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA Button — desktop */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-warm-ivory/[0.04] hover:bg-warm-ivory/[0.08] text-warm-ivory border border-warm-ivory/[0.08] hover:border-luxury-gold/30 hover:text-luxury-gold hover:scale-105 transition-all duration-350 cursor-pointer"
            aria-label="Toggle theme"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onOpenQuote}
            className="relative px-5 py-2.5 rounded-full overflow-hidden text-[9.5px] uppercase tracking-wider font-extrabold text-forest-black bg-gradient-to-r from-[#0E9F6E] to-[#4ade80] hover:shadow-[0_8px_24px_rgba(74,222,128,0.3)] hover:scale-[1.04] transition-all duration-300 flex items-center gap-1.5 cursor-pointer btn-press"
          >
            {/* Sheen overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 -skew-x-12" />
            <span className="relative">Request Bulk Quote</span>
            <ChevronRight className="w-3.5 h-3.5 text-forest-black relative" />
          </button>
        </div>

        {/* Mobile Menu Toggle & Actions */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-warm-ivory hover:text-luxury-gold transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-warm-ivory focus:outline-none hover:text-luxury-gold transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`absolute left-0 w-full bg-forest-black/98 border border-luxury-gold/20 rounded-2xl mt-3 backdrop-blur-2xl lg:hidden transition-all duration-400 ease-in-out origin-top overflow-y-auto max-h-[78vh] ${
          mobileMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-5 py-6 text-left">
          <div className="space-y-1 mb-5">
            {navItems.map((item, i) => (
              <a
                key={item.name}
                href={getHref(item.href)}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-[13px] font-display font-semibold text-warm-ivory/90 hover:text-luxury-gold hover:bg-luxury-gold/5 transition-all duration-200"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span>{item.name}</span>
                <ChevronRight className="w-4 h-4 text-luxury-gold/30" />
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-warm-ivory/8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-[#0E9F6E] to-[#4ade80] text-forest-black font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer btn-press"
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
