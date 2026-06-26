import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { plantCategories } from '../data/nurseryData';

export default function FeaturedCategories() {
  const [filter, setFilter] = useState('all');
  const categories = plantCategories;
  const filteredCategories = filter === 'all' ? categories : categories.filter(c => c.group === filter);
  const filters = ['all', 'outdoor', 'indoor', 'commercial'];

  return (
    <section id="categories" className="py-24 md:py-36 bg-bg-opposite text-text-opposite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
              Specimen Catalogues
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase">
              Plant Categories
            </h2>
            <div className="section-divider" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 bg-forest-black-secondary/40 p-1.5 rounded-2xl self-start border border-forest-black-secondary/80">
            {filters.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                  filter === t
                    ? 'bg-forest-black text-warm-ivory shadow-md'
                    : 'text-text-opposite/60 hover:text-text-opposite hover:bg-forest-black-secondary/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                key={cat.id}
                className="group relative h-[360px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-forest-black-secondary/15 cursor-pointer card-lift hover:shadow-[0_20px_60px_rgba(8,18,11,0.15)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-forest-black overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  {/* Premium dark gradient overlay (remains dark for photo contrast) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-10" />
                </div>

                {/* Hover inner border */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#C6A969]/30 rounded-3xl m-3.5 transition-all duration-500 z-[15] pointer-events-none" />

                {/* Card Content */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-left text-white">
                  <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">

                    {/* Count badge */}
                    <div className="inline-flex items-center gap-1.5 bg-[#C6A969]/18 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#C6A969] border border-[#C6A969]/25 uppercase tracking-widest">
                      <span>{cat.count}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl leading-tight tracking-tight uppercase">
                      {cat.name}
                    </h3>

                    {/* Description — appears on hover */}
                    <p className="text-xs sm:text-sm text-white/75 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Action arrow */}
                    <div className="flex items-center gap-2 pt-1 text-[#C6A969] font-bold text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span>Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
