import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ChevronRight, Compass } from 'lucide-react';
import { companyDetails } from '../data/nurseryData';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
          ? 'top-3 py-3 bg-[#08120B]/92 backdrop-blur-2xl border border-[#C6A969]/18 shadow-[0_20px_60px_0_rgba(8,18,11,0.7)]'
          : 'top-5 py-4 bg-[#08120B]/35 backdrop-blur-md border border-white/5 shadow-lg'
      }`}
    >
      {/* Scroll progress bar — ultra-thin, gold */}
      <div className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full overflow-hidden opacity-60">
        <div
          className="h-full bg-gradient-to-r from-[#C6A969] via-[#FAF8F2] to-[#C6A969] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href={isHome ? '#home' : '/'} className="flex items-center space-x-2.5 group flex-shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C6A969] to-[#B29555] shadow-md shadow-[#C6A969]/20 group-hover:rotate-6 group-hover:shadow-[#C6A969]/40 transition-all duration-300">
            <Leaf className="w-4 h-4 text-[#08120B]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-sm md:text-[15px] tracking-tight text-[#FAF8F2] group-hover:text-[#C6A969] transition-colors duration-300 leading-none">
              {companyDetails.name.toUpperCase()}
            </span>
            <span className="font-sans text-[7px] tracking-[0.28em] text-[#C6A969] font-bold uppercase leading-none mt-[3px]">
              {companyDetails.subtitle}
            </span>
          </div>
        </a>

        {/* Desktop Menu — pill pill style */}
        <div className="hidden lg:flex items-center space-x-1 bg-[#FAF8F2]/[0.04] border border-white/[0.06] px-5 py-1.5 rounded-full backdrop-blur-sm">
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
                    ? 'text-[#C6A969] bg-[#C6A969]/10'
                    : 'text-[#FAF8F2]/75 hover:text-[#FAF8F2] hover:bg-[#FAF8F2]/5'
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
        <div className="hidden lg:flex items-center flex-shrink-0">
          <button
            onClick={onOpenQuote}
            className="relative px-5 py-2.5 rounded-full overflow-hidden text-[9.5px] uppercase tracking-wider font-extrabold text-[#08120B] bg-gradient-to-r from-[#C6A969] to-[#B29555] hover:shadow-[0_8px_24px_rgba(198,169,105,0.3)] hover:scale-[1.04] transition-all duration-300 flex items-center gap-1.5 cursor-pointer btn-press"
          >
            {/* Sheen overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 -skew-x-12" />
            <span className="relative">Request Bulk Quote</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#08120B] relative" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#FAF8F2] focus:outline-none hover:text-[#C6A969] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`absolute left-0 w-full bg-[#08120B]/98 border border-[#C6A969]/20 rounded-2xl mt-3 backdrop-blur-2xl lg:hidden transition-all duration-400 ease-in-out origin-top overflow-y-auto max-h-[78vh] ${
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
                className="flex items-center justify-between py-3 px-4 rounded-xl text-[13px] font-display font-semibold text-[#FAF8F2]/90 hover:text-[#C6A969] hover:bg-[#C6A969]/5 transition-all duration-200"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span>{item.name}</span>
                <ChevronRight className="w-4 h-4 text-[#C6A969]/30" />
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-[#C6A969] to-[#B29555] text-[#08120B] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer btn-press"
            >
              Request Bulk Quote
              <ChevronRight className="w-4 h-4 text-[#08120B]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
