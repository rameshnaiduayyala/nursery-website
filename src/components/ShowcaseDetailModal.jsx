import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Award, Sparkles, ShoppingBag, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ShowcaseDetailModal({ isOpen, onClose, item, type, onInquire }) {
  if (!isOpen || !item) return null;

  const isPlant = type === 'plant';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#08120B]/92 backdrop-blur-xl"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 28 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="relative w-full max-w-5xl bg-[#08120B] text-[#FAF8F2] rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(8,18,11,0.7)] border border-[#C6A969]/15 z-10"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6A969]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-[#FAF8F2]/5 hover:bg-[#FAF8F2]/10 text-[#FAF8F2]/60 hover:text-[#C6A969] border border-white/8 hover:border-[#C6A969]/30 transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[88vh] lg:max-h-[90vh] overflow-y-auto">

            {/* Visual Column */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-[560px] bg-[#E8E6DF]/10 overflow-hidden">
              <img
                src={item.image}
                alt={item.title || item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#08120B]/80 via-transparent to-transparent z-10" />

              {/* Category badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="text-[#C6A969] text-[10px] font-bold tracking-widest uppercase glass-dark-heavy px-4 py-1.5 rounded-full border border-[#C6A969]/22">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between text-left space-y-7 lg:h-[560px] overflow-y-auto">

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-[#FAF8F2] uppercase tracking-tight leading-tight">
                    {item.title || item.name}
                  </h3>
                  {isPlant ? (
                    <h4 className="font-display font-medium text-base text-[#C6A969] italic">
                      {item.botanical}
                    </h4>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-[#C6A969] font-bold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                <div className="section-divider" />

                {/* Metadata Grid */}
                {isPlant ? (
                  <div className="grid grid-cols-2 gap-4 bg-white/5 p-5 rounded-2xl border border-white/6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF8F2]/40">Specimen Height</span>
                      <div className="text-sm font-extrabold text-[#C6A969]">{item.height}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF8F2]/40">Container Size</span>
                      <div className="text-sm font-extrabold text-[#E8E6DF]">{item.container}</div>
                    </div>
                    <div className="space-y-1 col-span-2 pt-3 border-t border-white/6 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF8F2]/40">Supply Availability</span>
                      <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-[#0E9F6E]/10 text-[#0E9F6E] border border-[#0E9F6E]/15">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.availability}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 bg-white/5 p-5 rounded-2xl border border-white/6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF8F2]/40">Completion Year</span>
                      <div className="text-sm font-extrabold text-[#C6A969] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF8F2]/40">Specimens Count</span>
                      <div className="text-sm font-extrabold text-[#E8E6DF] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#C6A969]" />
                        <span>{item.plantsCount}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 col-span-2 pt-3 border-t border-white/6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF8F2]/40 block">Execution Scope</span>
                      <div className="text-xs font-semibold text-[#E8E6DF]/80 flex items-start gap-1.5">
                        <Award className="w-4 h-4 text-[#C6A969] flex-shrink-0 mt-0.5" />
                        <span>{item.scope}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF8F2]/35 block">
                    Botanical Overview & Details
                  </span>
                  <p className="text-sm font-sans leading-relaxed text-[#E8E6DF]/70">
                    {item.description || "Premium specimens cultivated under strict horticultural supervision. Hand-selected for root stability, structural foliage health, and seamless transit packaging."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  type="button"
                  onClick={() => onInquire(item, type)}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#C6A969] to-[#B29555] hover:shadow-[0_8px_28px_rgba(198,169,105,0.3)] text-[#08120B] font-extrabold uppercase text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer btn-press"
                >
                  {isPlant ? (
                    <><ShoppingBag className="w-4 h-4" /><span>Enquire Bulk Supply</span></>
                  ) : (
                    <><span>Inquire Landscaping Supply</span><ArrowUpRight className="w-4 h-4" /></>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 rounded-xl border border-white/12 hover:border-white/25 text-[#FAF8F2]/65 hover:text-[#FAF8F2] font-bold uppercase text-xs tracking-wider transition-all duration-200 cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
