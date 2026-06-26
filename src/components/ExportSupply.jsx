import React, { useState } from 'react';
import { Globe, Shield, Archive, Compass, Anchor } from 'lucide-react';

export default function ExportSupply() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'india', name: 'Nursery Hub (India)', x: 380, y: 165, type: 'source' },
    { id: 'dubai', name: 'Gulf Region (Dubai, UAE)', x: 300, y: 145, type: 'destination' },
    { id: 'rotterdam', name: 'Europe (Rotterdam, NL)', x: 190, y: 80, type: 'destination' },
    { id: 'singapore', name: 'SE Asia (Singapore)', x: 440, y: 200, type: 'destination' },
    { id: 'maldives', name: 'Maldives (Male)', x: 385, y: 205, type: 'destination' },
    { id: 'tokyo', name: 'East Asia (Tokyo, JP)', x: 520, y: 110, type: 'destination' },
  ];

  const paths = [
    { from: 'india', to: 'dubai', d: 'M 380 165 Q 340 150 300 145' },
    { from: 'india', to: 'rotterdam', d: 'M 380 165 C 310 130, 240 100, 190 80' },
    { from: 'india', to: 'singapore', d: 'M 380 165 Q 410 185 440 200' },
    { from: 'india', to: 'maldives', d: 'M 380 165 Q 382 185 385 205' },
    { from: 'india', to: 'tokyo', d: 'M 380 165 Q 450 130 520 110' },
  ];

  const features = [
    {
      title: 'India Wide Delivery',
      desc: 'Optimized overland routes reaching agricultural land plots, highway project sites, and luxury developments across all Indian states.',
      icon: Compass,
    },
    {
      title: 'Export Ready Substrates',
      desc: 'Soil-less culture substrates including sterilized coco-peat and sphagnum moss strictly aligned with international quarantine regulations.',
      icon: Globe,
    },
    {
      title: 'Professional Packaging',
      desc: 'Secured packing in specialized double-net coco root wraps, custom wooden pallets, and steel-frame containers protecting foliage integrity.',
      icon: Archive,
    },
    {
      title: 'Phytosanitary Clearance',
      desc: 'Complete cargo coordination including quarantine checks, customs broker filings, and official phytosanitary certifications.',
      icon: Shield,
    },
  ];

  return (
    <section id="export" className="relative py-24 md:py-36 bg-forest-black text-warm-ivory overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#0E9F6E]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#C6A969]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-[#C6A969] font-display font-semibold tracking-[0.22em] text-xs md:text-sm uppercase block">
              International Cargo
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase">
              Exporting Excellence
            </h2>
            <div className="section-divider" />
          </div>
          <p className="text-sm sm:text-base text-stone-gray/65 font-sans max-w-sm text-left leading-relaxed">
            Seamless botanical logistics serving regional developers across India and exporting containerized flora to international destinations.
          </p>
        </div>

        {/* Map and Info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Map display */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[600/300] bg-forest-black-secondary/60 border border-luxury-gold/12 rounded-3xl p-4 md:p-6 backdrop-blur-sm overflow-hidden shadow-[0_24px_80px_rgba(8,18,11,0.5)]">

              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl pointer-events-none" />

              <svg viewBox="0 0 600 300" className="w-full h-full select-none">
                {/* Abstracted continent */}
                <path
                  d="M 50,70 Q 70,50 110,60 T 150,70 T 170,90 T 210,80 T 250,90 T 320,110 T 360,100 T 400,120 T 450,140 T 520,120 T 550,150 T 500,200 T 450,220 T 380,240 T 310,210 T 250,240 T 220,180 Z"
                  fill="rgba(198, 169, 105, 0.025)"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />

                {/* Animated cargo routes */}
                {paths.map((p, idx) => (
                  <g key={idx}>
                    <path d={p.d} fill="none" stroke="rgba(198, 169, 105, 0.2)" strokeWidth="1.5" strokeDasharray="4 5" />
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#C6A969"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="20 200"
                      style={{
                        animation: `dash 4s linear infinite`,
                        animationDelay: `${idx * 0.7}s`,
                        strokeDashoffset: 220,
                      }}
                    />
                  </g>
                ))}

                {/* Node points */}
                {nodes.map((node) => {
                  const isSource = node.type === 'source';
                  const isHovered = hoveredNode === node.id;
                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {isSource && (
                        <circle
                          cx={node.x} cy={node.y} r={14}
                          className="animate-ping"
                          fill="rgba(198,169,105,0.15)"
                          style={{ animationDuration: '3s' }}
                        />
                      )}
                      <circle
                        cx={node.x} cy={node.y}
                        r={isSource ? 7 : isHovered ? 5.5 : 4}
                        fill={isSource ? '#C6A969' : isHovered ? 'var(--text-primary)' : 'var(--text-secondary)'}
                        style={{ transition: 'r 0.2s ease, fill 0.2s ease' }}
                      />
                      {isSource && (
                        <circle cx={node.x} cy={node.y} r={4} fill="var(--bg-primary)" />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Node Tooltip */}
              <div className="absolute bottom-4 left-4 right-4 glass-dark-heavy px-4 py-3 rounded-xl border border-luxury-gold/15 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-[#C6A969] flex-shrink-0" />
                  <span className="font-sans text-warm-ivory/80 font-semibold">
                    {hoveredNode
                      ? nodes.find(n => n.id === hoveredNode)?.name
                      : 'Hover route nodes to verify export cargo targets'}
                  </span>
                </div>
                {hoveredNode && (
                  <span className="text-[10px] bg-[#C6A969]/12 px-2.5 py-1 rounded-lg text-[#C6A969] uppercase font-bold tracking-wide border border-[#C6A969]/20 flex-shrink-0">
                    {nodes.find(n => n.id === hoveredNode)?.type === 'source' ? 'Export Origin' : 'Active Port'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 text-left">
            {features.map((f, i) => {
              const FeatureIcon = f.icon;
              return (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-[#C6A969]/35 hover:bg-[#C6A969]/5 transition-all duration-300 flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C6A969]/10 text-[#C6A969] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C6A969] group-hover:text-[#08120B] transition-all duration-300">
                    <FeatureIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display font-semibold text-sm sm:text-base tracking-tight uppercase text-warm-ivory">
                      {f.title}
                    </h4>
                    <p className="text-xs text-stone-gray/65 leading-relaxed font-sans">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
