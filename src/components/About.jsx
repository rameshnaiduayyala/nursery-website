import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, ShieldCheck } from 'lucide-react';

export default function About() {
  const accreditations = [
    { icon: Award, label: 'Phyto Certified' },
    { icon: Compass, label: 'Pan-India Cargo' },
    { icon: ShieldCheck, label: 'Direct Nursery' },
  ];

  return (
    <section id="about" className="relative py-24 md:py-36 bg-[#FAF8F2] text-[#08120B] overflow-hidden">

      {/* Light decorative patterns */}
      <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#E8E6DF]/50 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#E8E6DF]/70 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 text-left space-y-6"
          >
            <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
              Our Heritage & Vision
            </span>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] uppercase">
              FROM
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A969] to-[#B29555] font-serif italic not-uppercase font-light lowercase">
                seedlings
              </span>
              <br />
              TO LANDMARKS.
            </h2>
            <div className="section-divider" />

            {/* Accreditation badges */}
            <div className="flex flex-col gap-3 pt-4">
              {accreditations.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#C6A969]/10 text-[#C6A969] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C6A969] group-hover:text-[#08120B] transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#08120B]/70 group-hover:text-[#08120B] transition-colors duration-200">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 text-left space-y-8"
          >
            <p className="font-display text-xl sm:text-2xl text-[#08120B]/80 font-normal leading-relaxed">
              At Gangadhara Nursery, we believe that landscaping is the architecture of nature. Over the past decade, we have grown from a local propagation plot into one of India's premier plant suppliers and exporters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2 font-sans text-sm sm:text-base text-[#08120B]/65 leading-relaxed">
              {[
                {
                  title: 'Botanical Precision',
                  body: 'Every seedling is raised in sterile, nutrient-controlled environments. Our horticulturists employ advanced root training systems that prevent coiling and ensure plants adapt instantly to new soil chemistry.',
                },
                {
                  title: 'Large-Scale Delivery',
                  body: 'With over 50 acres of automated nurseries, we possess the unique capability to deliver uniform plant batches for massive infrastructure projects, highways, and township master plans.',
                },
              ].map(({ title, body }, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1 h-5 bg-gradient-to-b from-[#C6A969] to-[#B29555] rounded-full flex-shrink-0" />
                    <h4 className="font-display font-bold text-lg text-[#08120B] uppercase tracking-wider">
                      {title}
                    </h4>
                  </div>
                  <p>{body}</p>
                </div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* Feature botanical image banner */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="mt-20 md:mt-28 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(8,18,11,0.12)] border border-[#08120B]/6 aspect-[16/9] md:aspect-[21/9] relative group"
        >
          <img
            src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1400&auto=format&fit=crop"
            alt="Propagation grids"
            className="w-full h-full object-cover filter contrast-105 saturate-95 transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08120B]/20 to-transparent pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
