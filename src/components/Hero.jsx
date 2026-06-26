import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, ChevronRight, ChevronLeft } from 'lucide-react';
import { heroSlides } from '../data/nurseryData';

// Custom CountUp helper for stats
function CountUp({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    // strip commas so '10,000' parses correctly
    const endValue = parseInt(String(end).replace(/,/g, ''), 10);
    if (start === endValue) return;
    let totalMiliseconds = duration;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / endValue), 15);
    let timer = setInterval(() => {
      start += Math.ceil(endValue / (duration / incrementTime));
      if (start >= endValue) {
        clearInterval(timer);
        setCount(endValue);
      } else {
        setCount(start);
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Hero({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const slides = heroSlides;
  const SLIDE_DURATION = 6500;

  useEffect(() => {
    setProgress(0);
    
    // Clear existing intervals
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (SLIDE_DURATION / 100)), 100));
    }, 100);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };
  
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const stats = [
    { value: '10000', label: 'Happy Customers', suffix: '+', accent: 'var(--accent-color)' },
    { value: '500', label: 'Plant Varieties', suffix: '+', accent: 'var(--accent-deep)' },
    { value: '1000', label: 'Projects Delivered', suffix: '+', accent: 'var(--accent-color)' },
    { value: '10', label: 'Years Experience', suffix: '+', accent: 'var(--accent-deep)' },
  ];

  // Helper for context-based slide badge information
  const getFloatingBadgeText = (index) => {
    switch (index) {
      case 0:
        return 'ESTD. 2012 • 100+ ACRE NURSERY';
      case 1:
        return '10,000+ READY FOR DISPATCH';
      case 2:
        return 'PHYTOSANITARY CERTIFIED';
      default:
        return 'BOTANICAL EXCELLENCE';
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen lg:h-screen lg:min-h-[750px] flex flex-col justify-between bg-forest-black text-warm-ivory pt-24 sm:pt-28 pb-0 overflow-hidden noise-overlay"
    >
      {/* Ambient glows — organic depth */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-luxury-gold/5 blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-luxury-gold-deep/5 blur-[130px] pointer-events-none z-0" />



      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <Leaf className="absolute top-[18%] right-[18%] w-8 h-8 text-luxury-gold animate-float-slow opacity-20 rotate-12" />
        <Leaf className="absolute bottom-[32%] left-[9%] w-10 h-10 text-luxury-gold-deep animate-float-medium opacity-12 -rotate-45" />
      </div>

      {/* Main Grid Content Area */}
      <div className="flex-grow max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col justify-center z-20 py-6 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold flex-shrink-0 animate-pulse" style={{ boxShadow: '0 0 6px var(--accent-color)' }} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSlide}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.35 }}
                    className="text-[10px] tracking-[0.2em] uppercase font-semibold text-luxury-gold"
                  >
                    {slides[currentSlide].label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-1">
              {slides[currentSlide].lines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={currentSlide + '-' + idx}
                      initial={{ y: '105%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '-105%', opacity: 0 }}
                      transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display block leading-[1.05] uppercase font-black tracking-tight"
                      style={{
                        fontSize: 'clamp(32px, 5vw, 60px)',
                        color: idx === slides[currentSlide].lines.length - 1
                          ? 'var(--accent-color)'
                          : 'var(--text-primary)',
                        textShadow: idx === slides[currentSlide].lines.length - 1
                          ? '0 0 35px var(--shadow-gold-glow)'
                          : 'none',
                      }}
                    >
                      {line}
                    </motion.h1>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Subheadline */}
            <div className="min-h-[60px] sm:min-h-[50px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="font-sans font-light leading-relaxed max-w-lg text-sm sm:text-base text-stone-gray"
                  style={{ color: 'var(--text-secondary)', opacity: 0.9, letterSpacing: '0.01em' }}
                >
                  {slides[currentSlide].subheadline}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                onClick={onOpenQuote}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-bg-opposite font-semibold text-[10px] uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.03] cursor-pointer btn-press"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-deep), var(--accent-color))',
                  boxShadow: '0 8px 24px var(--border-color)',
                }}
              >
                Request Bulk Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <a
                href="#categories"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[10px] uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-primary)',
                  opacity: 0.9
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.opacity = '0.9'; }}
              >
                Explore Plants
              </a>
            </motion.div>

            {/* Slide Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border-color mt-6">
              {slides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSlide(idx);
                      setProgress(0);
                    }}
                    className="group flex items-center gap-2.5 cursor-pointer focus:outline-none transition-all duration-300"
                  >
                    {/* Number Circle with Progress Ring */}
                    <div
                      className="relative flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold transition-all duration-300"
                      style={{
                        background: isActive ? 'var(--card-bg)' : 'transparent',
                        border: isActive ? '1px solid var(--accent-color)' : '1px solid var(--card-border)',
                        color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                      {isActive && (
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="14" fill="none" stroke="var(--card-border)" strokeWidth="1.5" />
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            fill="none"
                            stroke="var(--accent-color)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 14}`}
                            strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                          />
                        </svg>
                      )}
                    </div>
                    {/* Label */}
                    <span
                      className="text-[9px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hidden sm:block"
                      style={{ color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)' }}
                    >
                      {slide.lines[0].replace('+', '')}
                    </span>
                    {idx < slides.length - 1 && (
                      <span className="w-px h-3 bg-luxury-gold/20 ml-2 hidden sm:block" />
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Framed Image Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center w-full order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[1/1] xl:aspect-[4/3] rounded-3xl overflow-hidden shadow-glass border border-card-border bg-forest-black-secondary group/frame">
              
              {/* Cinematic Background Image Carousel */}
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].label}
                      className="w-full h-full object-cover origin-center scale-100 animate-kenburns"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Edge Gradient / Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-10" />

              {/* Floating Contextual Glass Badge */}
              <div className="absolute top-4 left-4 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-dark-heavy px-4 py-2 rounded-xl text-[9px] tracking-[0.18em] font-bold text-luxury-gold uppercase border border-border-color shadow-lg flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                    {getFloatingBadgeText(currentSlide)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Arrow Navigation */}
              <div className="absolute bottom-4 right-4 z-20 flex gap-2 opacity-90 sm:opacity-0 sm:group-hover/frame:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-white/10 hover:border-luxury-gold bg-black/40 hover:bg-luxury-gold text-white hover:text-bg-opposite transition-all duration-300 cursor-pointer backdrop-blur-md hover:scale-105"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-white/10 hover:border-luxury-gold bg-black/40 hover:bg-luxury-gold text-white hover:text-bg-opposite transition-all duration-300 cursor-pointer backdrop-blur-md hover:scale-105"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Statistics Section in Hero Footer */}
      <div
        className="relative z-20 w-full flex-shrink-0 mt-8 lg:mt-0"
        style={{
          background: 'var(--glass-bg-scrolled)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06] py-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 sm:px-4 md:px-6 first:pl-0 last:pr-0 group"
              >
                <div
                  className="w-0.5 h-6 rounded-full flex-shrink-0 opacity-70"
                  style={{ background: stat.accent }}
                />
                <div className="flex flex-col">
                  <span
                    className="font-display font-semibold text-lg sm:text-xl md:text-2xl leading-none tracking-wide"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span
                    className="text-[8px] sm:text-[9px] font-sans tracking-[0.18em] uppercase font-semibold mt-0.5"
                    style={{ color: stat.accent, opacity: 0.85 }}
                  >
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
