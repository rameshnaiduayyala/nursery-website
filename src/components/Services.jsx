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
    <section id="services" className="relative py-24 md:py-36 bg-[#08120B] text-[#FAF8F2] overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#0E9F6E]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#C6A969]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 md:mb-28 text-left space-y-4"
        >
          <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
            Our Operations
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#FAF8F2] tracking-tight leading-[1.02] uppercase">
            Horticultural<br />Services
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Service Panels */}
        <div className="space-y-24 md:space-y-36">
          {servicesList.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 flex flex-col space-y-6 text-left"
                >
                  {/* Service number + subtitle row */}
                  <div className="flex items-baseline gap-4">
                    <span className="font-display font-light text-5xl md:text-6xl text-[#C6A969]/70 tabular-nums leading-none">
                      {service.num}
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C6A969]/30 to-transparent max-w-[80px]" />
                    <span className="text-[10px] font-sans tracking-[0.18em] text-[#C6A969]/55 font-bold uppercase">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#FAF8F2] leading-tight uppercase">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#E8E6DF]/70 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-3 pt-1">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-3 text-xs sm:text-sm text-[#E8E6DF]/85 font-sans group">
                        <div className="w-5 h-5 rounded-full bg-[#C6A969]/12 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-[#C6A969]" />
                        </div>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6A969] hover:text-[#FAF8F2] transition-colors duration-200 cursor-pointer group">
                      <span>Enquire About Supply</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </div>
                </motion.div>

                {/* Image Panel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative group rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(8,18,11,0.5)] border border-[#C6A969]/12 bg-[#08120B] aspect-[4/3] max-w-xl mx-auto">
                    {/* Background zooming image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08120B]/55 to-transparent pointer-events-none z-10" />
                    {/* Hover border inner */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-[#C6A969]/20 rounded-3xl m-4 transition-all duration-500 z-20 pointer-events-none" />
                    {/* Number watermark */}
                    <div className="absolute bottom-5 right-6 z-20 font-display font-black text-6xl text-[#FAF8F2]/8 select-none pointer-events-none">
                      {service.num}
                    </div>
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
