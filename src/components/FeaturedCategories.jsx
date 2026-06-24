import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { plantCategories } from '../data/nurseryData';

export default function FeaturedCategories() {
  const [filter, setFilter] = useState('all');

  const categories = plantCategories;

  const filteredCategories = filter === 'all' 
    ? categories 
    : categories.filter(c => c.group === filter);

  return (
    <section id="categories" className="py-24 md:py-32 bg-warm-ivory text-forest-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
              Specimen Catalogues
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase">
              PLANT CATEGORIES
            </h2>
            <div className="w-12 h-[1px] bg-luxury-gold" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 bg-stone-gray/30 p-1.5 rounded-full self-start border border-stone-gray/50">
            {['all', 'outdoor', 'indoor', 'commercial'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  filter === t
                    ? 'bg-forest-black text-warm-ivory shadow-md'
                    : 'text-forest-black/70 hover:text-forest-black hover:bg-stone-gray/40'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={cat.id}
                className="group relative h-[360px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-forest-black/5 cursor-pointer"
              >
                {/* Background Image with Zoom */}
                <div className="absolute inset-0 bg-forest-black overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-black/95 via-forest-black/40 to-transparent z-10" />
                </div>

                {/* Editorial Inner Gold Border */}
                <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/25 rounded-3xl m-3.5 transition-all duration-500 z-15 pointer-events-none" />

                {/* Card Content */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-left text-warm-ivory">
                  <div className="space-y-3.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-1.5 bg-luxury-gold/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-luxury-gold border border-luxury-gold/30 uppercase tracking-widest">
                      <span>{cat.count}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl leading-none tracking-tight uppercase">
                      {cat.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-gray/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Action Arrow */}
                    <div className="flex items-center space-x-2 pt-2 text-luxury-gold font-bold text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span>Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-luxury-gold" />
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
