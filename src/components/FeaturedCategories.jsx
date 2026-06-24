import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedCategories() {
  const [filter, setFilter] = useState('all');

  const categories = [
    {
      id: 1,
      name: 'Avenue Trees',
      description: 'Stately roadside shade trees and boundary boundary species.',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop',
      group: 'outdoor',
      count: '45 Varieties',
    },
    {
      id: 2,
      name: 'Flowering Plants',
      description: 'Vibrant perennial and seasonal blooms for landscape color.',
      image: 'https://images.unsplash.com/photo-1469251189132-cf14b8c567ed?q=80&w=600&auto=format&fit=crop',
      group: 'outdoor',
      count: '120 Varieties',
    },
    {
      id: 3,
      name: 'Fruit Plants',
      description: 'High-yielding commercial agricultural and hybrid fruit trees.',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop',
      group: 'commercial',
      count: '80 Varieties',
    },
    {
      id: 4,
      name: 'Palm Trees',
      description: 'Luxury exotic palms for resorts, villas, and avenues.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
      group: 'outdoor',
      count: '35 Varieties',
    },
    {
      id: 5,
      name: 'Ornamental Plants',
      description: 'Decorative foliage and structural plants for manicured designs.',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop',
      group: 'indoor',
      count: '95 Varieties',
    },
    {
      id: 6,
      name: 'Indoor Plants',
      description: 'Air-purifying shade-loving greens for offices and residential lobbies.',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop',
      group: 'indoor',
      count: '60 Varieties',
    },
    {
      id: 7,
      name: 'Landscape Shrubs',
      description: 'Hardy dwarf hedges and privacy screening borders.',
      image: 'https://images.unsplash.com/photo-1558905619-17154973372c?q=80&w=600&auto=format&fit=crop',
      group: 'outdoor',
      count: '70 Varieties',
    },
    {
      id: 8,
      name: 'Medicinal Plants',
      description: 'Traditional herbs and wellness species for botanical gardens.',
      image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=600&auto=format&fit=crop',
      group: 'commercial',
      count: '50 Varieties',
    },
  ];

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
