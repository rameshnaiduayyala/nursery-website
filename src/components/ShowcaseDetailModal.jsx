import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Award, Sparkles, ShoppingBag, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ShowcaseDetailModal({ isOpen, onClose, item, type, onInquire }) {
  if (!isOpen || !item) return null;

  const isPlant = type === 'plant';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-forest-black/90 backdrop-blur-md"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl bg-forest-black text-warm-ivory rounded-3xl overflow-hidden shadow-2xl border border-luxury-gold/15 z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-forest-black/60 hover:bg-forest-black text-warm-ivory/80 hover:text-luxury-gold border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5.5 h-5.5" />
          </button>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[85vh] lg:max-h-[90vh] overflow-y-auto">
            
            {/* Visual Column */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-[600px] bg-stone-gray/10 overflow-hidden">
              <img
                src={item.image}
                alt={item.title || item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-forest-black/90 via-transparent to-transparent z-10" />
              
              {/* Floating indicators */}
              <div className="absolute top-6 left-6 z-20">
                <span className="text-luxury-gold text-[10px] font-bold tracking-widest uppercase bg-forest-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-luxury-gold/25">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Details Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-left space-y-8 lg:h-[600px] overflow-y-auto">
              
              <div className="space-y-6">
                
                {/* Header */}
                <div className="space-y-2">
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-warm-ivory uppercase tracking-tight leading-tight">
                    {item.title || item.name}
                  </h3>
                  
                  {isPlant ? (
                    <h4 className="font-display font-medium text-base text-luxury-gold italic">
                      {item.botanical}
                    </h4>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-luxury-gold font-bold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                <div className="w-12 h-[1px] bg-luxury-gold/30" />

                {/* Structured Metadata Grid */}
                {isPlant ? (
                  <div className="grid grid-cols-2 gap-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-warm-ivory/50">Specimen Height</span>
                      <div className="text-sm font-extrabold text-luxury-gold">{item.height}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-warm-ivory/50">Container Size</span>
                      <div className="text-sm font-extrabold text-stone-gray">{item.container}</div>
                    </div>
                    <div className="space-y-1 col-span-2 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-warm-ivory/50">Supply Availability</span>
                      <div className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-green/10 text-emerald-green">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.availability}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-warm-ivory/50">Completion Year</span>
                      <div className="text-sm font-extrabold text-luxury-gold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-warm-ivory/50">Specimens Count</span>
                      <div className="text-sm font-extrabold text-stone-gray flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.plantsCount}</span>
                      </div>
                    </div>
                    <div className="space-y-1 col-span-2 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-warm-ivory/50 block mb-1">Execution Scope</span>
                      <div className="text-xs font-semibold text-stone-gray/90 flex items-start gap-1.5">
                        <Award className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                        <span>{item.scope}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description Narrative */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-warm-ivory/40 block">
                    Botanical Overview & Details
                  </span>
                  <p className="text-sm font-sans leading-relaxed text-stone-gray/80">
                    {item.description || "Premium specimens cultivated under strict horticultural supervision. Hand-selected for root stability, structural foliage health, and seamless transit packaging."}
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3.5 w-full">
                <button
                  type="button"
                  onClick={() => {
                    onInquire(item, type);
                  }}
                  className="flex-1 py-4 rounded-xl bg-luxury-gold hover:bg-[#B29555] text-forest-black font-extrabold uppercase text-xs tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-luxury-gold/10"
                >
                  {isPlant ? (
                    <>
                      <ShoppingBag className="w-4 h-4 text-forest-black" />
                      <span>Enquire Bulk Supply</span>
                    </>
                  ) : (
                    <>
                      <span>Inquire Landscaping Supply</span>
                      <ArrowUpRight className="w-4 h-4 text-forest-black" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 rounded-xl border border-white/15 hover:border-white/30 text-warm-ivory/80 hover:text-warm-ivory font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer"
                >
                  Close Showcase
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
