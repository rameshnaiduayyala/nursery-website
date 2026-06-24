import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, SlidersHorizontal, ShoppingBag, Info } from 'lucide-react';
import { plantsCollection } from '../data/nurseryData';

export default function PlantCatalog({ onSelectPlant, onViewDetails = () => {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Avenue Trees',
    'Flowering Plants',
    'Fruit Plants',
    'Palm Trees',
    'Indoor Plants',
  ];

  // Filter logic
  const filteredPlants = plantsCollection.filter((plant) => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.botanical.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'All' || plant.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="catalog" className="relative py-24 md:py-32 bg-warm-ivory text-forest-black overflow-hidden">
      
      {/* Visual background lights */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-stone-gray/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30vw] h-[30vw] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
              Live Stock Directory
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase">
              OUR NURSERY PLANTS
            </h2>
            <div className="w-12 h-[1px] bg-luxury-gold" />
          </div>
          <p className="text-sm sm:text-base text-forest-black/70 font-sans max-w-sm text-left">
            Directly browse the specific species cultivated in our 50-acre grounds. Check sizes, heights, and stock levels instantly.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-12 bg-white/40 p-4 rounded-3xl border border-luxury-gold/15 backdrop-blur-sm">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-black/45" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by common name or scientific genus..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-stone-gray/50 text-sm focus:outline-none focus:border-luxury-gold text-forest-black transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-forest-black text-warm-ivory shadow-md'
                    : 'text-forest-black/70 hover:text-forest-black hover:bg-stone-gray/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plants Catalog Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlants.map((plant) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={plant.id}
                onClick={() => onViewDetails(plant)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-luxury-gold/15 shadow-glass-light hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-gray/20">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Status Tag */}
                  <div className={`absolute top-4 left-4 z-10 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                    plant.availability === 'In Stock'
                      ? 'bg-[#E1F7EC] text-[#0E9F6E] border-[#BEE3F8]/0'
                      : 'bg-luxury-gold/10 text-luxury-gold border-luxury-gold/25'
                  }`}>
                    {plant.availability}
                  </div>
                </div>

                {/* Plant details */}
                <div className="p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans text-luxury-gold font-bold uppercase tracking-wider block">
                      {plant.category}
                    </span>
                    <h3 className="font-display font-black text-lg text-forest-black leading-tight uppercase">
                      {plant.name}
                    </h3>
                    <h4 className="font-display font-medium text-xs text-forest-black/50 italic leading-none pt-1">
                      {plant.botanical}
                    </h4>
                  </div>

                  {/* Species specs */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-forest-black/5 text-xs text-forest-black/70 font-sans">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-forest-black/40">Specimen Height</span>
                      <div className="font-bold">{plant.height}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-forest-black/40">Container Size</span>
                      <div className="font-bold">{plant.container}</div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlant(plant.name, plant.category);
                    }}
                    className="w-full py-3 rounded-xl bg-forest-black text-warm-ivory text-xs font-bold uppercase tracking-wider shadow hover:bg-forest-black/90 transition-all flex items-center justify-center gap-2 cursor-pointer border border-forest-black/10 group-hover:border-luxury-gold"
                  >
                    <ShoppingBag className="w-4 h-4 text-luxury-gold" />
                    Enquire Bulk Supply
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Fallback */}
        {filteredPlants.length === 0 && (
          <div className="py-20 text-center space-y-3 bg-white/20 rounded-3xl border border-dashed border-stone-gray/50">
            <Info className="w-10 h-10 text-luxury-gold mx-auto" />
            <h4 className="font-display font-bold text-lg">No plants found matching your search</h4>
            <p className="text-sm text-forest-black/60 max-w-sm mx-auto font-sans">
              Try adjusting your spelling or filters, or contact our VIP desk directly to check current field inventory batches.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
