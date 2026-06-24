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
    <section id="export" className="relative py-24 md:py-32 bg-forest-black text-warm-ivory overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-luxury-gold/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="flex flex-col space-y-4 max-w-xl text-left">
            <span className="text-luxury-gold font-display font-semibold tracking-[0.2em] text-xs md:text-sm uppercase block">
              International Cargo
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase">
              EXPORTING EXCELLENCE
            </h2>
            <div className="w-12 h-[1px] bg-luxury-gold" />
          </div>
          <p className="text-sm sm:text-base text-stone-gray/80 font-sans max-w-sm text-left">
            Seamless botanical logistics serving regional developers across India and exporting containerized flora to international destinations.
          </p>
        </div>

        {/* Map and Info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Map display (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* SVG Interactive Map Container */}
            <div className="relative w-full aspect-[600/300] bg-forest-black/40 border border-luxury-gold/15 rounded-3xl p-4 md:p-6 backdrop-blur-sm overflow-hidden shadow-2xl">
              
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <svg 
                viewBox="0 0 600 300" 
                className="w-full h-full select-none"
              >
                {/* Simulated World Continent Outlines (Abstracted) */}
                <path 
                  d="M 50,70 Q 70,50 110,60 T 150,70 T 170,90 T 210,80 T 250,90 T 320,110 T 360,100 T 400,120 T 450,140 T 520,120 T 550,150 T 500,200 T 450,220 T 380,240 T 310,210 T 250,240 T 220,180 Z" 
                  fill="rgba(198, 169, 105, 0.02)" 
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1.5"
                />

                {/* Animated Routes */}
                {paths.map((p, idx) => (
                  <g key={idx}>
                    <path
                      d={p.d}
                      fill="none"
                      stroke="rgba(198, 169, 105, 0.25)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    {/* Pulsing route glow path in Luxury Gold */}
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#C6A969"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="20 180"
                      className="origin-center"
                      style={{
                        animation: `dash 4s linear infinite`,
                        animationDelay: `${idx * 0.7}s`,
                        strokeDashoffset: 200
                      }}
                    />
                  </g>
                ))}

                {/* Node Points */}
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
                      {/* Outer pulse circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSource ? 12 : 8}
                        className={isSource ? 'animate-ping' : ''}
                        fill={isSource ? 'rgba(198,169,105,0.3)' : 'rgba(232,230,223,0.08)'}
                        style={{ animationDuration: '3s' }}
                      />
                      {/* Inner dot */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSource ? 6 : 4}
                        fill={isSource ? '#C6A969' : '#E8E6DF'}
                        className="transition-transform duration-300 transform"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Node Tooltip Info overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#08120B]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-luxury-gold/15 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Anchor className="w-4 h-4 text-luxury-gold shrink-0" />
                  <span className="font-sans text-stone-gray font-semibold">
                    {hoveredNode 
                      ? nodes.find(n => n.id === hoveredNode)?.name 
                      : 'Hover route nodes to verify export cargo targets'
                    }
                  </span>
                </div>
                {hoveredNode && (
                  <span className="text-[10px] bg-luxury-gold/10 px-2 py-0.5 rounded text-luxury-gold uppercase font-bold tracking-wide">
                    {nodes.find(n => n.id === hoveredNode)?.type === 'source' ? 'Export Origin' : 'Active Port'}
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Logistics highlights cards (Right 5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 text-left">
            {features.map((f, i) => {
              const FeatureIcon = f.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-luxury-gold/30 transition-all duration-300 flex space-x-4 items-start"
                >
                  <div className="p-3 rounded-xl bg-luxury-gold/10 text-luxury-gold shrink-0">
                    <FeatureIcon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-base sm:text-lg tracking-tight uppercase text-warm-ivory">
                      {f.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-gray/75 leading-relaxed font-sans">
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
