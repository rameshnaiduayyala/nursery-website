import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { horticulturalSteps } from '../data/nurseryData';
import nurseryAerial from '../assets/nursery_aerial.png';

export default function NurseryExperience() {
  const containerRef = useRef(null);

  // Parallax Scroll values for background image scale & translate
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const steps = horticulturalSteps;

  return (
    <section ref={containerRef} id="experience" className="relative bg-warm-ivory overflow-hidden text-forest-black">
      
      {/* Cinematic Banner Container with Parallax background */}
      <div className="relative h-[480px] sm:h-[600px] w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Image */}
        <motion.div
          style={{ scale, y: yTranslate }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        >
          <img
            src={nurseryAerial}
            alt="Nursery Aerial drone grids"
            className="w-full h-full object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-[#08120B]/75 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2] via-transparent to-[#FAF8F2] z-20" />
        </motion.div>

        {/* Parallax Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-6 text-center text-warm-ivory">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase">
              The Journey of Growth
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6.5xl tracking-tight leading-none text-warm-ivory uppercase">
              From Seedlings to Landmarks.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-stone-gray/80 max-w-2xl mx-auto leading-relaxed">
              Witness the scale and attention to detail that sets Gangadhara Nursery apart. Over 50 acres of botanical propagation supplying large-scale greening ventures across the globe.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Operational Step Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-30">
        <div className="text-left mb-16 space-y-3">
          <span className="text-luxury-gold font-display font-semibold tracking-[0.15em] text-xs uppercase">Workflow</span>
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight uppercase">
            Our Horticultural Process Flow
          </h3>
          <div className="w-12 h-[1px] bg-luxury-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-white p-8 rounded-3xl border border-luxury-gold/15 shadow-glass-light hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-3xl md:text-4xl text-forest-black/10 group-hover:text-luxury-gold/25 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-forest-black/5 text-forest-black group-hover:bg-luxury-gold group-hover:text-forest-black flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-lg text-forest-black tracking-tight uppercase">
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-sans text-luxury-gold font-bold uppercase tracking-wider block mt-1.5">
                    {step.subtitle}
                  </span>
                  
                  <p className="text-xs sm:text-sm text-forest-black/75 font-sans leading-relaxed mt-4">
                    {step.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-40 text-luxury-gold/40 group-hover:text-luxury-gold transition-colors">
                    <ArrowRight className="w-5 h-5 translate-x-0 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
