import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Layers, 
  Users, 
  Clock, 
  Shuffle, 
  Award, 
  Tag, 
  MapPin, 
  ArrowRight,
  ShieldCheck
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
    <section id="why-us" className="relative py-24 md:py-32 bg-forest-black text-warm-ivory overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-emerald-green/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4 text-left">
          <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
            Nursery Standards
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase">
            WHY GANGADHARA
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold" />
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* List of items (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {points.map((point, index) => {
              const IconComp = point.icon;
              const isActive = index === activeIndex;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer text-left p-6 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 mb-3">
                    <div className={`p-2.5 rounded-xl ${
                      isActive ? 'bg-luxury-gold text-forest-black' : 'bg-white/5 text-luxury-gold'
                    } transition-colors duration-300`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg tracking-tight">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-gray/75 leading-relaxed font-sans">
                    {point.short}
                  </p>

                  {/* Mobile-only inline expanding accordion details */}
                  <div className="lg:hidden overflow-hidden">
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-white/10 text-xs text-stone-gray/80 leading-relaxed font-sans"
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

          {/* Interactive details showcase card (Right 5 Cols - Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-dark p-8 rounded-3xl border border-luxury-gold/15 text-left shadow-2xl relative overflow-hidden"
              >
                {/* Glow Spot */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-luxury-gold/10 text-luxury-gold">
                    {React.createElement(points[activeIndex].icon, { className: 'w-7 h-7' })}
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-luxury-gold font-bold uppercase tracking-wider bg-luxury-gold/10 px-3 py-1 rounded-full border border-luxury-gold/25">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl tracking-tight text-warm-ivory mb-4 uppercase">
                  {points[activeIndex].title}
                </h3>
                
                <p className="text-sm sm:text-base text-stone-gray/80 leading-relaxed font-sans mb-8">
                  {points[activeIndex].details}
                </p>

                <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-luxury-gold hover:text-warm-ivory cursor-pointer group transition-colors">
                  <span>Botanical Protocol</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
