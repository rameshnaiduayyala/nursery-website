import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Info } from 'lucide-react';
import { plantsCollection } from '../data/nurseryData';

export default function PlantCatalog({ onSelectPlant, onViewDetails = () => {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Avenue Trees', 'Flowering Plants', 'Fruit Plants', 'Palm Trees', 'Indoor Plants'];

  const filteredPlants = plantsCollection.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.botanical.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || plant.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="catalog" className="relative py-24 md:py-36 bg-[#FAF8F2] text-[#08120B] overflow-hidden">

      {/* Background lights */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#E8E6DF]/50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30vw] h-[30vw] bg-[#C6A969]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
              Live Stock Directory
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase">
              Our Nursery Plants
            </h2>
            <div className="section-divider" />
          </div>
          <p className="text-sm sm:text-base text-[#08120B]/60 font-sans max-w-sm text-left leading-relaxed">
            Directly browse the specific species cultivated in our 50-acre grounds. Check sizes, heights, and stock levels instantly.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 bg-white/60 p-3 md:p-4 rounded-2xl border border-[#C6A969]/12 backdrop-blur-sm shadow-[0_2px_12px_rgba(8,18,11,0.06)]">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#08120B]/35" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by common name or genus..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E8E6DF]/80 text-sm focus:outline-none focus:border-[#C6A969] focus:shadow-[0_0_0_3px_rgba(198,169,105,0.08)] text-[#08120B] transition-all duration-200 placeholder:text-[#08120B]/35"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#08120B] text-[#FAF8F2] shadow-md'
                    : 'text-[#08120B]/60 hover:text-[#08120B] hover:bg-[#E8E6DF]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plants Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPlants.map((plant) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={plant.id}
                onClick={() => onViewDetails(plant)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#C6A969]/10 shadow-[0_2px_16px_rgba(8,18,11,0.07)] hover:shadow-[0_12px_40px_rgba(8,18,11,0.12)] hover:border-[#C6A969]/30 transition-all duration-350 flex flex-col cursor-pointer card-lift"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8E6DF]/30">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.08]"
                  />
                  {/* Availability badge */}
                  <div className={`absolute top-3.5 left-3.5 z-10 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    plant.availability === 'In Stock'
                      ? 'bg-[#E1F7EC] text-[#0E9F6E]'
                      : 'bg-[#C6A969]/15 text-[#C6A969] border border-[#C6A969]/25'
                  }`}>
                    {plant.availability}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#08120B]/0 group-hover:bg-[#08120B]/10 transition-colors duration-350 pointer-events-none" />
                </div>

                {/* Plant details */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans text-[#C6A969] font-bold uppercase tracking-wider block">
                      {plant.category}
                    </span>
                    <h3 className="font-display font-black text-lg text-[#08120B] leading-tight uppercase">
                      {plant.name}
                    </h3>
                    <h4 className="font-display font-medium text-xs text-[#08120B]/45 italic leading-none">
                      {plant.botanical}
                    </h4>
                  </div>

                  {/* Spec grid */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#08120B]/6 text-xs text-[#08120B]/65 font-sans">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#08120B]/35">Height</span>
                      <div className="font-bold text-[#08120B]">{plant.height}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#08120B]/35">Container</span>
                      <div className="font-bold text-[#08120B]">{plant.container}</div>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlant(plant.name, plant.category);
                    }}
                    className="w-full py-3 rounded-xl bg-[#08120B] text-[#FAF8F2] text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#08120B]/90 hover:shadow-[0_4px_16px_rgba(8,18,11,0.2)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group-hover:bg-[#C6A969] group-hover:text-[#08120B] border border-transparent group-hover:border-[#B29555]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Enquire Bulk Supply
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Fallback */}
        {filteredPlants.length === 0 && (
          <div className="py-20 text-center space-y-4 bg-white/30 rounded-3xl border border-dashed border-[#C6A969]/25 mt-4">
            <Info className="w-10 h-10 text-[#C6A969] mx-auto opacity-60" />
            <h4 className="font-display font-bold text-lg text-[#08120B]">No plants found</h4>
            <p className="text-sm text-[#08120B]/55 max-w-sm mx-auto font-sans leading-relaxed">
              Try adjusting your spelling or filters, or contact our VIP desk directly to check current field inventory batches.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
