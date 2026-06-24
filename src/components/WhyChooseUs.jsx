import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Layers, Users, Clock, Shuffle, Award, Tag, MapPin, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const points = [
    {
      title: 'Healthy Nursery-Grown Plants',
      short: 'Scientifically raised in nutrient-rich media under expert supervision.',
      details: 'All plants are raised using controlled root training, premium soil mixes, and strict disease surveillance. This ensures superior shock resistance and immediate growth upon transplantation.',
      icon: Heart,
    },
    {
      title: 'Large Production Capacity',
      short: 'Over 50+ acres of dedicated growth area to fulfill huge orders.',
      details: 'Our massive cultivation footprint ensures that even large-scale government contracts and agricultural expansions are fulfilled entirely from a single batch, maintaining uniformity.',
      icon: Layers,
    },
    {
      title: 'Expert Plant Care Team',
      short: 'Qualified horticulturists monitoring every growth phase.',
      details: 'Our staff consists of experienced horticulturists, arborists, and soil scientists who inspect each seedling. We ensure the plant receives correct micro-nutrients and trimming patterns.',
      icon: Users,
    },
    {
      title: 'On-Time Delivery',
      short: 'Securely scheduled logistics matching landscaping deadlines.',
      details: 'We run synchronized shipping dispatches using specialized nursery transport vehicles. Roots are protected in moisture-retaining materials to keep plants active throughout transit.',
      icon: Clock,
    },
    {
      title: 'Custom Project Supply',
      short: 'Tailored plant selections to match architectural blueprints.',
      details: 'Provide us with your landscaping blueprint, and our specialists will select the best-adapted local or exotic species that meet your design criteria, canopy height, and climate zone.',
      icon: Shuffle,
    },
    {
      title: 'Export Quality Standards',
      short: 'Certified phytosanitary packaging for global export markets.',
      details: 'We strictly follow global customs guidelines. Soil-less substrates (coco peat/sphagnum), sanitization washes, and phytosanitary certificates are fully managed by our export desk.',
      icon: Award,
    },
    {
      title: 'Competitive Pricing',
      short: 'Direct nursery-to-site prices, maximizing project budgets.',
      details: 'By eliminating middle-men and brokers, we offer unmatched prices on bulk orders. Savings are passed directly to developers, farmers, and contracting agencies.',
      icon: Tag,
    },
    {
      title: 'Pan India Supply',
      short: 'State-of-the-art delivery routes reaching any corner of the country.',
      details: 'We have optimized logistics pathways connecting our nursery hub directly to North, South, East, and West India, handling all transit certifications, transit insurance, and toll passes.',
      icon: MapPin,
    },
  ];

  return (
    <section id="why-us" className="relative py-24 md:py-36 bg-[#08120B] text-[#FAF8F2] overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-[#0E9F6E]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#C6A969]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16 md:mb-24 space-y-4 text-left"
        >
          <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
            Nursery Standards
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase">
            Why Gangadhara
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left — Grid of reason cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {points.map((point, index) => {
              const IconComp = point.icon;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.045 }}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C6A969]/10 border-[#C6A969]/50 shadow-[0_0_32px_rgba(198,169,105,0.08)]'
                      : 'bg-white/[0.035] border-white/[0.055] hover:bg-white/[0.06] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#C6A969] text-[#08120B] shadow-[0_4px_16px_rgba(198,169,105,0.3)]'
                        : 'bg-white/5 text-[#C6A969]'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className={`font-display font-bold text-sm sm:text-base tracking-tight transition-colors duration-200 ${
                      isActive ? 'text-[#C6A969]' : 'text-[#FAF8F2]'
                    }`}>
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#E8E6DF]/60 leading-relaxed font-sans pl-[48px]">
                    {point.short}
                  </p>

                  {/* Mobile accordion */}
                  <div className="lg:hidden overflow-hidden pl-[48px]">
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-3 border-t border-white/8 text-xs text-[#E8E6DF]/70 leading-relaxed font-sans"
                        >
                          {point.details}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right — Detail card, sticky on desktop */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 18, y: 4 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -18, y: -4 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-br from-[#C6A969]/30 via-[#C6A969]/5 to-transparent"
              >
                <div className="glass-dark rounded-3xl p-8 text-left shadow-[0_32px_80px_rgba(8,18,11,0.5)] relative overflow-hidden">
                  {/* Glow spot */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#C6A969]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-7">
                    <div className="w-12 h-12 rounded-2xl bg-[#C6A969]/12 text-[#C6A969] flex items-center justify-center">
                      {React.createElement(points[activeIndex].icon, { className: 'w-6 h-6' })}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#C6A969] font-bold uppercase tracking-wider bg-[#C6A969]/10 px-3 py-1.5 rounded-full border border-[#C6A969]/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl tracking-tight text-[#FAF8F2] mb-4 uppercase leading-tight">
                    {points[activeIndex].title}
                  </h3>

                  <p className="text-sm text-[#E8E6DF]/75 leading-relaxed font-sans mb-8">
                    {points[activeIndex].details}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6A969] hover:text-[#FAF8F2] cursor-pointer group transition-colors duration-200">
                    <span>Botanical Protocol</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
