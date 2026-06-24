import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
import landscapeBefore from '../assets/landscape_before.png';
import landscapeAfter from '../assets/landscape_after.png';

export default function ProjectShowcase() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const projects = [
    {
      title: 'Grand Orchid Resort',
      category: 'Resorts & Hotels',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
      size: 'col-span-1 lg:col-span-2 h-[320px]',
    },
    {
      title: 'Vedic Farms & Orchards',
      category: 'Farmhouses',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
      size: 'col-span-1 h-[320px]',
    },
    {
      title: 'Palm Boulevard Highway',
      category: 'Highways & Infrastructure',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=600&auto=format&fit=crop',
      size: 'col-span-1 h-[320px]',
    },
    {
      title: 'TechHub Green Plaza',
      category: 'Corporate Parks',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
      size: 'col-span-1 lg:col-span-2 h-[320px]',
    },
  ];

  return (
    <section id="showcase" className="relative py-24 md:py-32 bg-forest-black text-warm-ivory overflow-hidden">
      {/* Background lights */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-emerald-green/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30vw] h-[30vw] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
              Landscaping Portfolios
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase">
              PROJECT SHOWCASE
            </h2>
            <div className="w-12 h-[1px] bg-luxury-gold" />
          </div>
          <p className="text-sm sm:text-base text-stone-gray/80 font-sans max-w-sm text-left">
            Explore our architectural implementations across luxury properties, massive commercial orchards, and national highways.
          </p>
        </div>

        {/* Before/After Section (Interactive Slider) */}
        <div className="mb-24 text-left">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Botanical Transformation</span>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-8 uppercase">
            BEFORE & AFTER BOTANICAL PLANNING
          </h3>

          {/* Slider Frame */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ '--slider-pos': `${sliderPos}%` }}
            className="slider-container relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-luxury-gold/15 select-none touch-none"
          >
            {/* Before state (Base Image) */}
            <div className="absolute inset-0 z-0">
              <img 
                src={landscapeBefore} 
                alt="Bare Land Before" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 z-30 bg-[#08120B]/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-luxury-gold border border-luxury-gold/10">
                BEFORE: Raw Land Plot
              </div>
            </div>

            {/* After state (Clipped Image) */}
            <div className="absolute inset-0 clip-before z-10">
              <img 
                src={landscapeAfter} 
                alt="Landscaped After" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 z-30 bg-luxury-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-forest-black border border-luxury-gold/20">
                AFTER: Gangadhara Execution
              </div>
            </div>

            {/* Drag Handle Bar (Luxury Gold Accent) */}
            <div 
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 w-[2px] bg-luxury-gold z-20 cursor-ew-resize -translate-x-1/2"
            >
              {/* Central gold knob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-luxury-gold text-forest-black flex items-center justify-center shadow-lg border-2 border-warm-ivory transition-transform hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Projects Showcase */}
        <div>
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-left mb-8 uppercase">
            Completed Landscaping Milestones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative group rounded-3xl overflow-hidden shadow-xl border border-white/5 cursor-pointer ${project.size}`}
              >
                {/* Image */}
                <div className="absolute inset-0 bg-forest-black overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-black/95 via-forest-black/30 to-transparent z-10" />
                </div>

                {/* Editorial Inner Gold Border */}
                <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/25 rounded-3xl m-3.5 transition-all duration-500 z-15 pointer-events-none" />

                {/* Content */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-left">
                  <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-luxury-gold text-[10px] font-bold tracking-widest uppercase bg-luxury-gold/15 px-3 py-1 rounded-full border border-luxury-gold/25">
                      {project.category}
                    </span>
                    <h4 className="font-display font-bold text-xl sm:text-2xl mt-3 text-warm-ivory leading-none uppercase">
                      {project.title}
                    </h4>
                    <div className="flex items-center space-x-1.5 text-xs text-stone-gray/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span>View Gallery</span>
                      <Eye className="w-3.5 h-3.5 text-luxury-gold" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
