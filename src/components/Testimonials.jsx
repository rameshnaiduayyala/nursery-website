import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/nurseryData';

export default function Testimonials() {
  const reviews = testimonialsData;

  return (
    <section className="relative py-24 md:py-36 bg-bg-opposite text-text-opposite overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[15%] left-[8%] w-[35vw] h-[35vw] bg-forest-black-secondary/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-8%] w-[30vw] h-[30vw] bg-luxury-gold/6 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16 md:mb-20 space-y-4 text-left"
        >
          <span className="text-luxury-gold font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
            Endorsements
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase text-text-opposite">
            Client Testimonials
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative p-7 sm:p-8 rounded-3xl bg-bg-opposite-secondary/35 border border-luxury-gold/12 shadow-card hover:shadow-glass hover:border-luxury-gold/35 transition-all duration-400 flex flex-col justify-between card-lift text-left"
            >
              {/* Decorative quote watermark */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-luxury-gold/15 pointer-events-none group-hover:text-luxury-gold/25 transition-colors duration-300" />

              {/* Top accent line that appears on hover */}
              <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-luxury-gold/0 via-luxury-gold to-luxury-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-display text-sm sm:text-base md:text-[17px] text-text-opposite-secondary/80 leading-relaxed italic mb-7">
                  "{r.quote}"
                </p>
              </div>

              {/* Profile card */}
              <div className="flex items-center space-x-4 pt-5 border-t border-text-opposite/8">
                <div className="relative flex-shrink-0">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-luxury-gold/30"
                  />
                  {/* Small verified dot */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-luxury-gold border-2 border-bg-opposite flex items-center justify-center">
                    <svg className="w-2 h-2 text-bg-opposite" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-text-opposite leading-none uppercase tracking-wide block">
                    {r.name}
                  </span>
                  <span className="text-[10px] font-sans font-bold text-luxury-gold uppercase tracking-widest mt-1.5 leading-none block">
                    {r.role}
                  </span>
                  <span className="text-[10px] text-text-opposite-secondary/45 font-sans leading-none mt-0.5 block">
                    {r.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
