import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Calendar } from 'lucide-react';

export default function ContactCTA({ onOpenQuote, onOpenVisit }) {
  return (
    <section className="relative py-28 md:py-44 bg-[#08120B] text-[#FAF8F2] overflow-hidden text-center flex flex-col justify-center min-h-[75vh]">
      {/* Layered glowing background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[#0E9F6E]/5 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#C6A969]/6 rounded-full blur-[140px]" />
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <Leaf className="absolute top-[18%] left-[8%] w-8 h-8 text-[#C6A969] animate-float-slow opacity-20 rotate-12" />
        <Leaf className="absolute bottom-[18%] right-[12%] w-10 h-10 text-[#C6A969] animate-float-medium opacity-15 -rotate-45" />
        <Leaf className="absolute top-[60%] right-[6%] w-6 h-6 text-[#0E9F6E] animate-float-fast opacity-18 rotate-90" />
        <Leaf className="absolute top-[35%] left-[4%] w-5 h-5 text-[#0E9F6E] animate-float-reverse opacity-12 -rotate-15" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-20 space-y-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="badge-gold">
            <span>Let's Collaborate</span>
          </div>
        </motion.div>

        {/* Heading — staggered reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] uppercase"
        >
          LET'S GROW<br />SOMETHING{' '}
          <span className="text-shimmer font-serif italic not-uppercase font-light lowercase">
            extraordinary.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-[#E8E6DF]/70 max-w-lg mx-auto leading-relaxed font-sans"
        >
          Partner with one of India's most trusted nursery and landscaping suppliers. We offer tailored pricing catalogs, site feasibility reports, and synchronized freight deliveries.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#C6A969] to-[#B29555] hover:shadow-[0_12px_40px_rgba(198,169,105,0.35)] text-[#08120B] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group hover:scale-[1.04] btn-press"
          >
            Request Bulk Order
            <ArrowRight className="w-4 h-4 text-[#08120B] group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={onOpenVisit}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-transparent hover:bg-[#FAF8F2]/6 border border-[#FAF8F2]/18 hover:border-[#C6A969]/45 transition-all duration-300 font-bold text-xs uppercase tracking-wider text-[#FAF8F2] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C6A969]" />
            Schedule Nursery Visit
          </button>
        </motion.div>

      </div>
    </section>
  );
}
