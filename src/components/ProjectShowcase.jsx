import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Calendar, Award, ArrowUpRight } from 'lucide-react';
import { projectMilestones } from '../data/nurseryData';
import landscapeBefore from '../assets/landscape_before.png';
import landscapeAfter from '../assets/landscape_after.png';

export default function ProjectShowcase({ onSelectProject = () => {}, onViewDetails = () => {} }) {
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

  const handleMouseMove = (e) => handleSliderMove(e.clientX);
  const handleTouchMove = (e) => { if (e.touches[0]) handleSliderMove(e.touches[0].clientX); };

  const categories = ['All', 'Resorts & Hotels', 'Farmhouses', 'Highways & Infrastructure', 'Corporate Parks'];
  const projects = projectMilestones;
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="showcase" className="relative py-24 md:py-36 bg-[#08120B] text-[#FAF8F2] overflow-hidden">
      {/* Background lights */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-[#0E9F6E]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30vw] h-[30vw] bg-[#C6A969]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
              Landscaping Portfolios
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase">
              Project Showcase
            </h2>
            <div className="section-divider" />
          </div>
          <p className="text-sm sm:text-base text-[#E8E6DF]/65 font-sans max-w-sm text-left leading-relaxed">
            Explore our architectural implementations across luxury properties, massive commercial orchards, and national highways.
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="mb-28 text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="badge-gold">
              <Sparkles className="w-3 h-3" />
              <span>Botanical Transformation</span>
            </div>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-8 uppercase">
            Before & After Botanical Planning
          </h3>

          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ '--slider-pos': `${sliderPos}%` }}
            className="slider-container relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(8,18,11,0.6)] border border-[#C6A969]/15 select-none touch-none"
          >
            {/* Before (base) */}
            <div className="absolute inset-0 z-0">
              <img src={landscapeBefore} alt="Bare Land Before" className="w-full h-full object-cover" />
              <div className="absolute top-5 left-5 z-30 glass-dark-heavy px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#C6A969] border border-[#C6A969]/15">
                BEFORE: Raw Land Plot
              </div>
            </div>

            {/* After (clipped) */}
            <div className="absolute inset-0 clip-before z-10">
              <img src={landscapeAfter} alt="Landscaped After" className="w-full h-full object-cover" />
              <div className="absolute top-5 right-5 z-30 bg-gradient-to-r from-[#C6A969] to-[#B29555] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#08120B] shadow-lg">
                AFTER: Gangadhara Execution
              </div>
            </div>

            {/* Drag Handle */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C6A969]/0 via-[#C6A969] to-[#C6A969]/0 z-20 cursor-ew-resize -translate-x-1/2"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-[#C6A969] to-[#B29555] text-[#08120B] flex items-center justify-center shadow-[0_4px_24px_rgba(198,169,105,0.4)] border-2 border-[#FAF8F2]/80 hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight uppercase">
              Completed Landscaping Milestones
            </h3>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all duration-250 cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-gradient-to-r from-[#C6A969] to-[#B29555] border-transparent text-[#08120B] shadow-[0_4px_16px_rgba(198,169,105,0.25)]'
                      : 'bg-transparent border-[#C6A969]/15 text-[#E8E6DF]/70 hover:border-[#C6A969]/40 hover:text-[#C6A969]'
                  }`}
                >
                  {cat === 'All' ? 'All Projects' : cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onViewDetails(project)}
                  className="relative group rounded-3xl overflow-hidden shadow-xl border border-white/5 cursor-pointer h-[400px] md:h-[420px] w-full card-lift hover:shadow-[0_24px_64px_rgba(8,18,11,0.5)]"
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-[#08120B] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08120B] via-[#08120B]/30 to-transparent z-10" />
                  </div>

                  {/* Hover inner border */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#C6A969]/25 rounded-3xl m-3.5 transition-all duration-500 z-[15] pointer-events-none" />

                  {/* Content */}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-left">
                    <div className="transform group-hover:-translate-y-2 transition-transform duration-400">
                      <span className="text-[#C6A969] text-[10px] font-bold tracking-widest uppercase bg-[#C6A969]/12 px-3 py-1 rounded-full border border-[#C6A969]/22">
                        {project.category}
                      </span>
                      <h4 className="font-display font-bold text-xl sm:text-2xl mt-3 text-[#FAF8F2] leading-tight uppercase">
                        {project.title}
                      </h4>
                    </div>

                    {/* Hover details */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-400 ease-in-out overflow-hidden">
                      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-xs text-[#E8E6DF]/75">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C6A969] flex-shrink-0" />
                          <span className="truncate" title={project.location}>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C6A969] flex-shrink-0" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Award className="w-3.5 h-3.5 text-[#C6A969] flex-shrink-0" />
                          <span className="truncate">{project.plantsCount}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onSelectProject(project.title); }}
                        className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#C6A969] to-[#B29555] hover:shadow-[0_6px_24px_rgba(198,169,105,0.35)] text-[#08120B] text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer btn-press"
                      >
                        <span>Inquire Project Supply</span>
                        <ArrowUpRight className="w-4 h-4" />
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
