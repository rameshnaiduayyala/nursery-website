import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
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
    const endValue = parseInt(end, 10);
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
    <span ref={elementRef} className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#C6A969]">
      {count}{suffix}
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
    { value: '50', label: 'Acres Nursery', suffix: '+' },
    { value: '500', label: 'Plant Varieties', suffix: '+' },
    { value: '1000', label: 'Projects Delivered', suffix: '+' },
    { value: '10', label: 'Years Experience', suffix: '+' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between bg-[#08120B] text-[#FAF8F2] pt-24 overflow-hidden"
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
        <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#C6A969]/6 blur-[130px] pointer-events-none" />
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <Leaf className="absolute top-[18%] right-[18%] w-8 h-8 text-[#C6A969] animate-float-slow opacity-20 rotate-12" />
        <Leaf className="absolute bottom-[32%] left-[9%] w-10 h-10 text-[#0E9F6E] animate-float-medium opacity-12 -rotate-45" />
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center z-20 py-20 relative text-left w-full">

        {/* Navigation arrows */}
        <div className="absolute right-6 md:right-12 bottom-1/3 flex flex-col space-y-2.5 z-30">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-[#FAF8F2]/10 hover:border-[#C6A969]/60 bg-[#08120B]/40 hover:bg-[#C6A969] text-[#FAF8F2] hover:text-[#08120B] hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-[#FAF8F2]/10 hover:border-[#C6A969]/60 bg-[#08120B]/40 hover:bg-[#C6A969] text-[#FAF8F2] hover:text-[#08120B] hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Text content */}
        <div className="max-w-4xl space-y-7">

          {/* Slide Badge */}
          <div className="badge-gold">
            <Sparkles className="w-3 h-3" />
            <span>{slides[currentSlide].label}</span>
          </div>

          {/* Luxury Staggered Headline */}
          <div className="space-y-1">
            {slides[currentSlide].lines.map((line, idx) => (
              <div key={idx} className="overflow-hidden py-0.5 sm:py-1 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentSlide + '-' + idx}
                    initial={{ y: '105%', opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-105%', opacity: 0 }}
                    transition={{ duration: 1.0, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] text-[#FAF8F2] uppercase"
                  >
                    {idx === 2 ? (
                      <span className="text-shimmer">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </motion.h1>
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Subheadline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-sm sm:text-base md:text-lg text-[#E8E6DF]/75 leading-relaxed font-sans max-w-lg text-left"
            >
              {slides[currentSlide].subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              onClick={onOpenQuote}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C6A969] to-[#B29555] hover:shadow-[0_12px_32px_rgba(198,169,105,0.3)] text-[#08120B] font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group hover:scale-[1.03] btn-press"
            >
              Request Bulk Quote
              <ArrowRight className="w-4 h-4 text-[#08120B] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <a
              href="#categories"
              className="px-8 py-4 rounded-full bg-[#08120B]/50 hover:bg-[#FAF8F2]/6 border border-[#FAF8F2]/15 hover:border-[#C6A969]/50 text-[#FAF8F2] transition-all duration-300 font-bold text-xs uppercase tracking-wider text-center backdrop-blur-sm"
            >
              Explore Plant Collection
            </a>
          </div>
        </div>
      </div>

      {/* Slide Navigation Progress Bars */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-3 gap-5 md:gap-8 mb-8 text-left w-full">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="flex flex-col space-y-2 group cursor-pointer focus:outline-none"
            >
              <div className="step-line">
                <div
                  className="step-line-fill"
                  style={{ width: isActive ? `${progress}%` : '0%' }}
                />
              </div>
              <span className={`text-[9.5px] tracking-[0.14em] uppercase font-bold transition-colors duration-300 ${
                isActive ? 'text-[#C6A969]' : 'text-[#E8E6DF]/35 group-hover:text-[#E8E6DF]/60'
              }`}>
                0{idx + 1}. {slide.lines[0].split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Statistics Section in Hero Footer */}
      <div className="relative z-20 border-t border-[#C6A969]/12 bg-[#08120B]/92 backdrop-blur-md py-10 md:py-12 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col space-y-1.5 border-l border-[#C6A969]/25 pl-4 md:pl-6 text-left group"
            >
              <div className="flex items-baseline">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <span className="text-[10px] font-sans tracking-[0.2em] text-[#FAF8F2]/55 font-bold uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
