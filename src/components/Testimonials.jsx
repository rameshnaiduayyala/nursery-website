import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Ramesh Patel',
      role: 'Commercial Agro Farmer',
      location: 'Andhra Pradesh, India',
      quote: 'We ordered over 15,000 hybrid mango and guava tissue culture plants. The survival rate exceeded 98%, far better than our local nurseries. The soil advice from their horticultural team was invaluable.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Sarah Al-Mansoori',
      role: 'VP Development, Oasis Resorts',
      location: 'Dubai, UAE',
      quote: 'Importing palm trees and ornamental plants to the UAE requires complex quarantine filings and soil-less roots. Gangadhara Nursery managed the entire phytosanitary process and delivered pristine specimens.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Vikram Malhotra',
      role: 'Chief Landscape Architect',
      location: 'Horizon Greens, Bengaluru',
      quote: 'Their project supply capability is unmatched. They delivered uniform, healthy avenue trees and landscape hedges for our township projects exactly on our tight scheduling slots.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Priya Nair',
      role: 'Owner, Bloom Garden Retailers',
      location: 'Mumbai, India',
      quote: 'Direct nursery pricing and robust wooden crate packaging have made Gangadhara our sole wholesale supplier. Our retail garden center customers love the lush condition of the indoor and flowering plants.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-warm-ivory text-forest-black overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-stone-gray/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30vw] h-[30vw] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4 text-left">
          <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
            Endorsements
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase text-forest-black">
            CLIENT TESTIMONIALS
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-luxury-gold/20 shadow-glass-light hover:shadow-xl hover:border-luxury-gold transition-all duration-300 flex flex-col justify-between relative text-left"
            >
              {/* Quote icon watermark */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-luxury-gold/15 pointer-events-none" />

              <div>
                {/* Rating stars in Gold */}
                <div className="flex items-center space-x-1.5 mb-6">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-display text-sm sm:text-base md:text-lg text-forest-black/80 leading-relaxed italic mb-8">
                  "{r.quote}"
                </p>
              </div>

              {/* Profile card */}
              <div className="flex items-center space-x-4 pt-6 border-t border-forest-black/10">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-luxury-gold"
                />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-base text-forest-black leading-none uppercase tracking-wide">
                    {r.name}
                  </span>
                  <span className="text-[10px] font-sans font-bold text-luxury-gold uppercase tracking-widest mt-2 leading-none">
                    {r.role}
                  </span>
                  <span className="text-[10px] text-forest-black/50 font-sans leading-none mt-1">
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
