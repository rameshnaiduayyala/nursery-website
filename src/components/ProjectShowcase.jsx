import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Calendar, Award, ArrowUpRight } from 'lucide-react';
import { projectMilestones } from '../data/nurseryData';
import landscapeBefore from '../assets/landscape_before.png';
import landscapeAfter from '../assets/landscape_after.png';

export default function ProjectShowcase({ onSelectProject = () => {} }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeFilter, setActiveFilter] = useState('All');
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

  const categories = ['All', 'Resorts & Hotels', 'Farmhouses', 'Highways & Infrastructure', 'Corporate Parks'];
  const projects = projectMilestones;

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
        <div className="mb-28 text-left">
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight uppercase">
              Completed Landscaping Milestones
            </h3>
            
            {/* Elegant Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-luxury-gold border-luxury-gold text-forest-black shadow-lg shadow-luxury-gold/10'
                      : 'bg-forest-black/50 border-luxury-gold/15 text-stone-gray hover:border-luxury-gold/40 hover:text-luxury-gold'
                  }`}
                >
                  {cat === 'All' ? 'All Projects' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filterable Project Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => onSelectProject(project.title)}
                  className="relative group rounded-3xl overflow-hidden shadow-xl border border-white/5 cursor-pointer h-[420px] w-full"
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-forest-black overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-black via-forest-black/35 to-transparent z-10" />
                  </div>

                  {/* Editorial Inner Gold Border */}
                  <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/25 rounded-3xl m-3.5 transition-all duration-500 z-15 pointer-events-none" />

                  {/* Content */}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-left">
                    {/* Static Content (Always visible) */}
                    <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                      <span className="text-luxury-gold text-[10px] font-bold tracking-widest uppercase bg-luxury-gold/15 px-3 py-1 rounded-full border border-luxury-gold/25">
                        {project.category}
                      </span>
                      <h4 className="font-display font-bold text-xl sm:text-2xl mt-3 text-warm-ivory leading-tight uppercase">
                        {project.title}
                      </h4>
                    </div>

                    {/* Expandable Details on Hover */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                      {/* Metadata grid */}
                      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-xs text-stone-gray/80">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                          <span className="truncate" title={project.location}>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Award className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                          <span className="truncate" title={project.plantsCount}>{project.plantsCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Sparkles className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                          <span className="truncate text-stone-gray/70" title={project.scope}>{project.scope}</span>
                        </div>
                      </div>

                      {/* Quick Inquiry CTA */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project.title);
                        }}
                        className="mt-5 w-full py-3 rounded-xl bg-luxury-gold hover:bg-[#B29555] text-forest-black text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer animate-fade-in"
                      >
                        <span>Inquire Project Supply</span>
                        <ArrowUpRight className="w-4 h-4 text-forest-black" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
