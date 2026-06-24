import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { horticulturalSteps } from '../data/nurseryData';
import nurseryAerial from '../assets/nursery_aerial.png';

export default function NurseryExperience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const steps = horticulturalSteps;

  return (
    <section ref={containerRef} id="experience" className="relative bg-[#FAF8F2] overflow-hidden text-[#08120B]">

      {/* Cinematic Parallax Banner */}
      <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale, y: yTranslate }}
          className="absolute inset-0 w-full h-[125%] -top-[12.5%] z-0"
        >
          <img
            src={nurseryAerial}
            alt="Nursery Aerial drone grids"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#08120B]/72 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2] via-transparent to-[#FAF8F2] z-20" />
        </motion.div>

        {/* Parallax Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-6 text-center text-[#FAF8F2]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs sm:text-sm uppercase">
              The Journey of Growth
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#FAF8F2] uppercase">
              From Seedlings<br />to Landmarks.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#E8E6DF]/75 max-w-xl mx-auto leading-relaxed">
              Witness the scale and attention to detail that sets Gangadhara Nursery apart. Over 50 acres of botanical propagation supplying large-scale greening ventures across the globe.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Operational Step Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 relative z-30">
        <div className="text-left mb-14 space-y-3">
          <span className="text-[#C6A969] font-display font-semibold tracking-[0.2em] text-xs uppercase">Workflow</span>
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight uppercase">
            Our Horticultural Process Flow
          </h3>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-white p-7 rounded-3xl border border-[#C6A969]/10 shadow-[0_2px_16px_rgba(8,18,11,0.06)] hover:shadow-[0_12px_40px_rgba(8,18,11,0.1)] hover:border-[#C6A969]/30 transition-all duration-350 text-left flex flex-col justify-between card-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-4xl text-[#08120B]/8 group-hover:text-[#C6A969]/20 transition-colors duration-300">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#08120B]/5 text-[#08120B] group-hover:bg-gradient-to-br group-hover:from-[#C6A969] group-hover:to-[#B29555] group-hover:text-[#08120B] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_16px_rgba(198,169,105,0.3)]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-base sm:text-lg text-[#08120B] tracking-tight uppercase mb-1">
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-sans text-[#C6A969] font-bold uppercase tracking-wider block mb-4">
                    {step.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-[#08120B]/60 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Connecting arrow between cards */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-40 text-[#C6A969]/30 group-hover:text-[#C6A969]/60 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
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
