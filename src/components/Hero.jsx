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
  const slides = heroSlides;
  const SLIDE_DURATION = 6500;

  useEffect(() => {
    setProgress(0);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (SLIDE_DURATION / 100)), 100));
    }, 100);
    return () => {
      clearInterval(timerRef.current);
      clearInterval(progressInterval);
    };
  }, [currentSlide]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const stats = [
    { value: '10000', label: 'Happy Customers', suffix: '+', accent: '#4ade80' },
    { value: '500', label: 'Plant Varieties', suffix: '+', accent: '#0E9F6E' },
    { value: '1000', label: 'Projects Delivered', suffix: '+', accent: '#4ade80' },
    { value: '10', label: 'Years Experience', suffix: '+', accent: '#0E9F6E' },
  ];

  return (
    <section
      id="home"
      style={{ height: '100svh' }}
      className="relative flex flex-col justify-between bg-[#08120B] text-[#FAF8F2] pt-16 sm:pt-20 overflow-hidden"
    >
      {/* Cinematic Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={slides[currentSlide].image}
                alt="Luxury botanical showcase"
                className="w-full h-full object-cover origin-center scale-100 animate-kenburns"
              />
            </div>
            {/* Multi-layer gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#08120B]/97 via-[#08120B]/75 to-[#08120B]/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08120B] via-transparent to-[#08120B]/50 z-10" />
            {/* Right-side vignette */}
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#08120B]/40 to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Ambient glows — organic depth */}
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#0E9F6E]/6 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#4ade80]/6 blur-[130px] pointer-events-none" />
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <Leaf className="absolute top-[18%] right-[18%] w-8 h-8 text-[#4ade80] animate-float-slow opacity-20 rotate-12" />
        <Leaf className="absolute bottom-[32%] left-[9%] w-10 h-10 text-[#0E9F6E] animate-float-medium opacity-12 -rotate-45" />
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-grow max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col justify-center z-20 py-4 relative text-left w-full">

        {/* Navigation arrows — desktop only */}
        <div className="absolute right-4 md:right-12 bottom-1/3 hidden md:flex flex-col space-y-2.5 z-30">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-[#FAF8F2]/10 hover:border-[#10B981]/60 bg-[#030704]/40 hover:bg-[#10B981] text-[#FAF8F2] hover:text-[#030704] hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-[#FAF8F2]/10 hover:border-[#10B981]/60 bg-[#030704]/40 hover:bg-[#10B981] text-[#FAF8F2] hover:text-[#030704] hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Text content */}
        <div className="max-w-2xl space-y-4">

          {/* Location pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 self-start"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(14,159,110,0.1)',
                border: '1px solid rgba(14,159,110,0.25)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0" style={{ boxShadow: '0 0 6px #4ade80' }} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.35 }}
                  className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#4ade80]/80"
                >
                  {slides[currentSlide].label}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="space-y-0">
            {slides[currentSlide].lines.map((line, idx) => (
              <div key={idx} className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentSlide + '-' + idx}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-105%', opacity: 0 }}
                    transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display block leading-[1.02] uppercase font-black tracking-tight"
                    style={{
                      fontSize: 'clamp(30px, 7vw, 76px)',
                      color: idx === slides[currentSlide].lines.length - 1
                        ? '#4ade80'
                        : 'rgba(250,248,242,0.92)',
                      textShadow: idx === slides[currentSlide].lines.length - 1
                        ? '0 0 40px rgba(74,222,128,0.25)'
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
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="font-sans font-light leading-relaxed max-w-md text-sm sm:text-[15px]"
              style={{ color: 'rgba(232,230,223,0.55)', letterSpacing: '0.02em' }}
            >
              {slides[currentSlide].subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1"
          >
            <button
              onClick={onOpenQuote}
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[#060E08] font-semibold text-[10px] uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.03] cursor-pointer btn-press"
              style={{
                background: 'linear-gradient(135deg, #0E9F6E, #4ade80)',
                boxShadow: '0 8px 28px rgba(14,159,110,0.3)',
              }}
            >
              Request Bulk Quote
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <a
              href="#categories"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-[10px] uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(250,248,242,0.04)',
                border: '1px solid rgba(250,248,242,0.12)',
                color: 'rgba(250,248,242,0.75)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.3)'; e.currentTarget.style.color = '#FAF8F2'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,248,242,0.12)'; e.currentTarget.style.color = 'rgba(250,248,242,0.75)'; }}
            >
              Explore Plants
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation — modern numbered tabs */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 flex items-center gap-3 mb-4 w-full">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="group flex items-center gap-2.5 cursor-pointer focus:outline-none transition-all duration-300"
            >
              {/* Number pill */}
              <div
                className="relative flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold transition-all duration-300"
                style={{
                  background: isActive ? 'rgba(16,185,129,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(16,185,129,0.5)' : '1px solid rgba(250,248,242,0.12)',
                  color: isActive ? '#10B981' : 'rgba(250,248,242,0.3)',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
                {/* Arc progress ring */}
                {isActive && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="12" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1.5" />
                    <circle
                      cx="14" cy="14" r="12"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 12}`}
                      strokeDashoffset={`${2 * Math.PI * 12 * (1 - progress / 100)}`}
                      style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.65,0,0.35,1)' }}
                    />
                  </svg>
                )}
              </div>
              {/* Label */}
              <span
                className="text-[9px] tracking-[0.16em] uppercase font-semibold transition-all duration-300 hidden sm:block"
                style={{ color: isActive ? '#10B981' : 'rgba(250,248,242,0.25)' }}
              >
                {slide.lines[0].split(' ')[0]}
              </span>
              {/* Separator dot */}
              {idx < slides.length - 1 && (
                <span className="w-px h-3 bg-white/8 ml-1 hidden sm:block" />
              )}
            </button>
          );
        })}
      </div>

      {/* Statistics Section in Hero Footer */}
      <div
        className="relative z-20 w-full flex-shrink-0"
        style={{
          background: 'rgba(4,12,6,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(14,159,110,0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06] py-3 md:py-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 sm:px-4 md:px-6 first:pl-0 last:pr-0 group"
              >
                {/* Accent bar */}
                <div
                  className="w-0.5 h-6 rounded-full flex-shrink-0 opacity-70"
                  style={{ background: stat.accent }}
                />
                <div className="flex flex-col">
                  {/* Number */}
                  <span
                    className="font-display font-semibold text-lg sm:text-xl md:text-2xl leading-none tracking-wide text-[#FAF8F2]"
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  {/* Label */}
                  <span
                    className="text-[8px] sm:text-[9px] font-sans tracking-[0.18em] uppercase font-semibold mt-0.5"
                    style={{ color: stat.accent, opacity: 0.65 }}
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
