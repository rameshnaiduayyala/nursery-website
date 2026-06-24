import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 bg-warm-ivory text-forest-black overflow-hidden">
      
      {/* Light decorative patterns */}
      <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-stone-gray/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#E8E6DF]/60 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
              Our Heritage & Vision
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6.5xl tracking-tight leading-[1.05] uppercase">
              FROM
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-[#B29555] font-serif italic not-uppercase font-light lowercase">seedlings</span>
              <br />
              TO LANDMARKS.
            </h2>
            <div className="w-16 h-[2px] bg-luxury-gold" />
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 text-left space-y-8">
            <p className="font-display text-xl sm:text-2xl text-forest-black/80 font-normal leading-relaxed">
              At Gangadhara Nursery, we believe that landscaping is the architecture of nature. Over the past decade, we have grown from a local propagation plot into one of India’s premier plant suppliers and exporters.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 font-sans text-sm sm:text-base text-forest-black/70 leading-relaxed">
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-forest-black uppercase tracking-wider">
                  Botanical Precision
                </h4>
                <p>
                  Every seedling is raised in sterile, nutrient-controlled environments. Our horticulturists employ advanced root training systems that prevent coiling and ensure plants adapt instantly to new soil chemistry.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-forest-black uppercase tracking-wider">
                  Large-Scale Delivery
                </h4>
                <p>
                  With over 50 acres of automated nurseries, we possess the unique capability to deliver uniform plant batches for massive infrastructure projects, highways, and township master plans.
                </p>
              </div>
            </div>

            {/* Accreditations Row */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-forest-black/10">
              <div className="flex flex-col space-y-2">
                <div className="w-8 h-8 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-black">Phyto Certified</span>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="w-8 h-8 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-black">Pan-India Cargo</span>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="w-8 h-8 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-black">Direct Nursery</span>
              </div>
            </div>

          </div>

        </div>

        {/* Feature inline botanical image banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 md:mt-28 rounded-3xl overflow-hidden shadow-2xl border border-forest-black/5 aspect-[16/9] md:aspect-[21/9]"
        >
          <img
            src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1400&auto=format&fit=crop"
            alt="Propagation grids"
            className="w-full h-full object-cover filter contrast-105 saturate-95"
            loading="lazy"
          />
        </motion.div>

      </div>
    </section>
  );
}
