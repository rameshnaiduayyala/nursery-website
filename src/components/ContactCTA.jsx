import React from 'react';
import { Leaf, Calendar, ArrowRight } from 'lucide-react';

export default function ContactCTA({ onOpenQuote, onOpenVisit }) {
  return (
    <section className="relative py-28 md:py-40 bg-forest-black text-warm-ivory overflow-hidden text-center flex flex-col justify-center min-h-[75vh]">
      {/* Background soft glowing blur elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-emerald-green/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <Leaf className="absolute top-[20%] left-[10%] w-8 h-8 text-luxury-gold animate-float-slow opacity-25 rotate-12" />
        <Leaf className="absolute bottom-[20%] right-[15%] w-10 h-10 text-luxury-gold animate-float-medium opacity-15 -rotate-45" />
        <Leaf className="absolute top-[60%] right-[8%] w-6 h-6 text-emerald-green animate-float-fast opacity-20 rotate-90" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-20 space-y-8">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
          <span>Let's Collaborating</span>
        </div>

        {/* Heading */}
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7.5xl tracking-tight leading-none max-w-3xl mx-auto uppercase">
          LET'S GROW SOMETHING
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-warm-ivory to-luxury-gold font-serif italic not-uppercase font-light lowercase">extraordinary.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-stone-gray/80 max-w-xl mx-auto leading-relaxed font-sans">
          Partner with one of India's most trusted nursery and landscaping suppliers. We offer tailored pricing catalogs, site feasibility reports, and synchronized freight deliveries.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-luxury-gold hover:bg-[#B29555] text-forest-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-luxury-gold/10 flex items-center justify-center gap-2 cursor-pointer group"
          >
            Request Bulk Order
            <ArrowRight className="w-4 h-4 text-forest-black group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onOpenVisit}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-white/5 border border-white/20 transition-all duration-300 font-bold text-xs uppercase tracking-wider text-warm-ivory flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-luxury-gold" />
            Schedule Nursery Visit
          </button>
        </div>

      </div>
    </section>
  );
}
