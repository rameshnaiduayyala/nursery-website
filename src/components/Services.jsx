import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      num: '01',
      title: 'Agricultural Bulk Orders',
      subtitle: 'AGRO PLANTATIONS & FARMERS',
      description: 'Large-scale supply of fruit plants, forestry plants, avenue trees, and plantation crops for farmers and agricultural projects.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
      highlights: [
        'High-survival tissue culture fruit species',
        'Bulk timber, forestry & avenue saplings',
        'Expert crop spacing and layout advisory',
      ],
    },
    {
      num: '02',
      title: 'Project Supply Orders',
      subtitle: 'LANDSCAPING & ESTATE PROJECTS',
      description: 'Complete plant supply solutions for landscaping projects, resorts, villas, townships, highways, institutions, and government developments.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
      highlights: [
        'Architect-aligned plant and tree select',
        'Specimen trees and instant-canopy palms',
        'Pan-India delivery with cargo-shield wrap',
      ],
    },
    {
      num: '03',
      title: 'Retail Reseller Supply',
      subtitle: 'WHOLESALE DISTRIBUTORS & RESELLERS',
      description: 'Reliable wholesale distribution for garden centers, nurseries, and plant retailers.',
      image: 'https://images.unsplash.com/photo-1558905619-17154973372c?q=80&w=800&auto=format&fit=crop',
      highlights: [
        'Regular inventory catalogs and bulk booking',
        'Durable transport-crating to protect foliage',
        'Priority logistics with trackable dispatch',
      ],
    },
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-forest-black text-warm-ivory overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-emerald-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-luxury-gold/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20 md:mb-28 text-left space-y-4">
          <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
            Our Operations
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-warm-ivory tracking-tight leading-tight uppercase">
            HORTICULTURAL SERVICES
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold" />
        </div>

        {/* Large Showcase Panels Stack */}
        <div className="space-y-20 md:space-y-32">
          {servicesList.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Panel (Left/Right) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 flex flex-col space-y-6 text-left"
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-luxury-gold">
                      {service.num}
                    </span>
                    <span className="text-[11px] font-sans tracking-widest text-luxury-gold/60 font-bold uppercase">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-warm-ivory leading-tight uppercase">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-stone-gray/75 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-3 text-xs sm:text-sm text-stone-gray/90 font-sans">
                        <CheckCircle className="w-4 h-4 text-luxury-gold shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-luxury-gold hover:text-warm-ivory transition-colors cursor-pointer group">
                    <span>Enquire About Supply</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

                {/* Image Panel (Right/Left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.9 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-luxury-gold/15 bg-forest-black aspect-[4/3] max-w-xl mx-auto">
                    {/* Background zooming image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Editorial border overlay */}
                    <div className="absolute inset-0 border border-luxury-gold/10 rounded-3xl pointer-events-none z-20 m-4" />
                    {/* Ambient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-black/60 to-transparent pointer-events-none z-10" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
