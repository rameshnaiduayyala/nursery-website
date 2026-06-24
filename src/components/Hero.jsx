import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import landscapeAfter from '../assets/landscape_after.png';
import nurseryAerial from '../assets/nursery_aerial.png';

// Custom CountUp helper for stats
function CountUp({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
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
    <span ref={elementRef} className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-luxury-gold">
      {count}{suffix}
    </span>
  );
}

export default function Hero({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const slides = [
    {
      label: 'India’s Premium Landscaping Partner',
      lines: ['GROWING NATURE.', 'SHAPING LANDSCAPES.', 'EXPORTING EXCELLENCE.'],
      subheadline: 'Premium nursery plants for farmers, landscapers, resorts, developers, infrastructure projects, and export markets.',
      image: landscapeAfter,
    },
    {
      label: 'Propagation Fields & Automated Glasshouses',
      lines: ['MASSIVE CAPACITY.', 'UNCOMPROMISING CARE.', 'BOTANICAL SCALE.'],
      subheadline: 'Over 50 acres of dedicated botanical cultivation zones and automated greenhouse tunnels for infrastructure project supply.',
      image: nurseryAerial,
    },
    {
      label: 'Global Phytosanitary Certified Exports',
      lines: ['SIGNATURE FLORA.', 'EXCLUSIVE PALMS.', 'GLOBAL LOGISTICS.'],
      subheadline: 'Phytosanitary certified soil-less plants packaged professionally in double-net coco wraps and shipped worldwide.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    },
  ];

  const SLIDE_DURATION = 6500; // 6.5 seconds per slide

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

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const stats = [
    { value: '50', label: 'Acres Nursery', suffix: '+' },
    { value: '500', label: 'Plant Varieties', suffix: '+' },
    { value: '1000', label: 'Projects Delivered', suffix: '+' },
    { value: '10', label: 'Years Experience', suffix: '+' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between bg-forest-black text-warm-ivory pt-24 overflow-hidden"
    >
      {/* Cinematic Background Image Carousel (with Ken Burns slow zoom) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={slides[currentSlide].image}
                alt="Luxury botanical showcase"
                className="w-full h-full object-cover origin-center scale-100 animate-kenburns"
              />
            </div>
            {/* Dark Forest Black overlays for high contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-forest-black/95 via-forest-black/70 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-black via-transparent to-forest-black/40 z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Ambient glows */}
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-emerald-green/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <Leaf className="absolute top-[18%] right-[18%] w-8 h-8 text-luxury-gold animate-float-slow opacity-25 rotate-12" />
        <Leaf className="absolute bottom-[28%] left-[10%] w-10 h-10 text-emerald-green animate-float-medium opacity-15 -rotate-45" />
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center z-20 py-20 relative text-left w-full">
        
        {/* Navigation arrows (minimal modern design) */}
        <div className="absolute right-6 md:right-12 bottom-1/3 flex flex-col space-y-3 z-30">
          <button
            onClick={handlePrev}
            className="p-3.5 rounded-full border border-warm-ivory/10 hover:border-luxury-gold bg-forest-black/40 hover:bg-luxury-gold text-warm-ivory hover:text-forest-black hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3.5 rounded-full border border-warm-ivory/10 hover:border-luxury-gold bg-forest-black/40 hover:bg-luxury-gold text-warm-ivory hover:text-forest-black hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Text transition frame */}
        <div className="max-w-4xl space-y-8">
          
          {/* Slide Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span>{slides[currentSlide].label}</span>
          </div>

          {/* Luxury Staggered Headline */}
          <div className="space-y-2">
            {slides[currentSlide].lines.map((line, idx) => (
              <div key={idx} className="overflow-hidden py-1 sm:py-2 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentSlide + '-' + idx}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 1.1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7.5xl xl:text-8xl tracking-tight leading-none text-warm-ivory uppercase"
                  >
                    {idx === 2 ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-warm-ivory to-[#B29555]">
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-stone-gray/80 leading-relaxed font-sans max-w-xl text-left"
            >
              {slides[currentSlide].subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onOpenQuote}
              className="px-8 py-4 rounded-full bg-luxury-gold hover:bg-[#B29555] text-forest-black hover:shadow-lg hover:shadow-luxury-gold/10 font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Request Bulk Quote
              <ArrowRight className="w-4 h-4 text-forest-black group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#categories"
              className="px-8 py-4 rounded-full bg-[#08120B]/60 hover:bg-warm-ivory/5 border border-warm-ivory/15 hover:border-luxury-gold text-warm-ivory transition-all duration-300 font-bold text-xs uppercase tracking-wider text-center backdrop-blur-sm"
            >
              Explore Plant Collection
            </a>
          </div>
        </div>

      </div>

      {/* Slide Navigation Progress Bars */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-3 gap-4 md:gap-6 mb-8 text-left w-full">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="flex flex-col space-y-2 group cursor-pointer focus:outline-none"
            >
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-luxury-gold transition-all duration-100 ease-linear"
                  style={{
                    width: isActive ? `${progress}%` : '0%',
                  }}
                />
              </div>
              <span className={`text-[10px] tracking-wider uppercase font-bold transition-colors duration-300 ${
                isActive ? 'text-luxury-gold' : 'text-stone-gray/40 group-hover:text-stone-gray/70'
              }`}>
                0{idx + 1}. {slide.lines[0].split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Statistics Section in Hero Footer */}
      <div className="relative z-20 border-t border-luxury-gold/15 bg-forest-black/90 backdrop-blur-md py-10 md:py-14 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col space-y-1.5 border-l border-luxury-gold/30 pl-4 md:pl-6 text-left"
            >
              <div className="flex items-baseline">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <span className="text-[11px] font-sans tracking-widest text-[#FAF8F2]/60 font-bold uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
