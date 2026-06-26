import { useState, useMemo } from "react";
import { companyDetails } from "../data/nurseryData";
import { Truck, Scale, Box, Plus, Trash2, ArrowLeft, RefreshCw, Send, Sparkles } from "lucide-react";

// 1. Truck specifications
const TRUCK_TYPES = [
  {
    id: "dcm",
    name: "Medium DCM (6-Wheeler)",
    volumeLimit: 450, // cu ft
    weightLimit: 3500, // kg (3.5 Tons)
    description: "Ideal for small to medium local orders, retail supply, and fruit plant saplings.",
  },
  {
    id: "ten_wheeler",
    name: "Heavy 10-Wheeler",
    volumeLimit: 900, // cu ft
    weightLimit: 10000, // kg (10 Tons)
    description: "Standard heavy transport for large landscaping projects and wholesale avenue trees.",
  },
  {
    id: "twelve_wheeler",
    name: "Multi-Axle (12-Wheeler)",
    volumeLimit: 1300, // cu ft
    weightLimit: 16000, // kg (16 Tons)
    description: "High-capacity transport suited for mature specimen palms and heavy root-balled crates.",
  },
  {
    id: "container_20",
    name: "20ft Export Container",
    volumeLimit: 1100, // cu ft
    weightLimit: 20000, // kg (20 Tons)
    description: "Phytosanitary certified export cargo container for sea-freight logistics.",
  },
  {
    id: "container_40",
    name: "40ft Export Container",
    volumeLimit: 2300, // cu ft
    weightLimit: 26000, // kg (26 Tons)
    description: "Maximum size sea-freight container for global bulk avenue trees and landscaping supply.",
  },
];

// 2. Cargo/Plant container configurations
const CONTAINER_SIZES = [
  {
    id: "small_bag",
    name: "Small Container Bag (e.g. 8*10 Bag)",
    weight: 2.5, // kg
    volume: 0.15, // cu ft
    description: "Foliage shrubs, smaller commercial fruit saplings, and groundcovers.",
  },
  {
    id: "medium_bag",
    name: "Medium Container Bag (e.g. 13*13 Bag)",
    weight: 6.0, // kg
    volume: 0.45, // cu ft
    description: "Flowering shrubs, hedge dividers, and hybrid fruit plants.",
  },
  {
    id: "large_bag",
    name: "Large Container Bag (e.g. 21*21 Bag)",
    weight: 25.0, // kg
    volume: 1.80, // cu ft
    description: "Topiary shrubs, medium ornamental conifers, and young avenue saplings.",
  },
  {
    id: "palm_crate",
    name: "Specimen Palm Crate (Root-Balled)",
    weight: 150.0, // kg
    volume: 12.00, // cu ft
    description: "Exotic palms like Foxtail Palms, Areca Palms, and caryotas for focal points.",
  },
  {
    id: "avenue_tree_crate",
    name: "Mature Avenue Tree Crate",
    weight: 300.0, // kg
    volume: 25.00, // cu ft
    description: "Large, mature shade trees (e.g. Royal Poinciana, Tabebuia) in wooden crates.",
  },
];

// 3. Preset Cargo Loaders
const LOAD_PRESETS = [
  {
    name: "Resort Landscaping Package",
    description: "Standard premium visual greenery bundle for high-end resort development.",
    items: [
      { id: "avenue_tree_crate", qty: 15 },
      { id: "palm_crate", qty: 25 },
      { id: "large_bag", qty: 150 },
      { id: "medium_bag", qty: 300 },
    ],
  },
  {
    name: "1-Acre Fruit Orchard Expansion",
    description: "Bulk fruit plant distribution configuration for commercial agriculture setup.",
    items: [
      { id: "medium_bag", qty: 450 },
      { id: "small_bag", qty: 150 },
    ],
  },
  {
    name: "Highway Boundary Greenbelt",
    description: "Stately shade trees and dense screening shrubs for public infrastructure.",
    items: [
      { id: "avenue_tree_crate", qty: 60 },
      { id: "large_bag", qty: 400 },
    ],
  },
];

export default function LogisticsCalculator({ onOpenQuote }) {
  // State for added cargo items
  const [cargoList, setCargoList] = useState([
    { containerId: "large_bag", qty: 100 },
    { containerId: "palm_crate", qty: 15 },
  ]);

  // Selected active truck for visualization
  const [selectedTruckId, setSelectedTruckId] = useState("ten_wheeler");

  // Add new cargo type
  const handleAddCargoType = (containerId) => {
    setCargoList((prev) => {
      const exists = prev.find((item) => item.containerId === containerId);
      if (exists) {
        return prev.map((item) =>
          item.containerId === containerId ? { ...item, qty: item.qty + 10 } : item
        );
      }
      return [...prev, { containerId, qty: 10 }];
    });
  };

  // Modify quantity of a cargo type
  const handleUpdateQty = (containerId, qty) => {
    const val = Math.max(0, parseInt(qty) || 0);
    setCargoList((prev) =>
      prev.map((item) => (item.containerId === containerId ? { ...item, qty: val } : item)).filter((item) => item.qty > 0)
    );
  };

  // Delete cargo type
  const handleRemoveCargo = (containerId) => {
    setCargoList((prev) => prev.filter((item) => item.containerId !== containerId));
  };

  // Load a preset
  const handleLoadPreset = (preset) => {
    const formatted = preset.items.map((item) => ({
      containerId: item.id,
      qty: item.qty,
    }));
    setCargoList(formatted);
  };

  // Clear all cargo
  const handleClearAll = () => {
    setCargoList([]);
  };

  // Active truck object details
  const selectedTruck = useMemo(() => {
    return TRUCK_TYPES.find((t) => t.id === selectedTruckId) || TRUCK_TYPES[1];
  }, [selectedTruckId]);

  // Calculate totals
  const totals = useMemo(() => {
    let totalWeight = 0;
    let totalVolume = 0;
    let totalItems = 0;

    cargoList.forEach((item) => {
      const config = CONTAINER_SIZES.find((c) => c.id === item.containerId);
      if (config) {
        totalWeight += config.weight * item.qty;
        totalVolume += config.volume * item.qty;
        totalItems += item.qty;
      }
    });

    return { totalWeight, totalVolume, totalItems };
  }, [cargoList]);

  // Visual layout statistics
  const volumePercentage = Math.round((totals.totalVolume / selectedTruck.volumeLimit) * 100);
  const weightPercentage = Math.round((totals.totalWeight / selectedTruck.weightLimit) * 100);

  // Recommendations: automatically calculate the required amount of trucks
  const logisticsRecommendation = useMemo(() => {
    if (totals.totalItems === 0) return { count: 0, text: "No cargo loaded", type: selectedTruck };

    // Calculate how many of the currently selected truck are needed
    const volumeCount = totals.totalVolume / selectedTruck.volumeLimit;
    const weightCount = totals.totalWeight / selectedTruck.weightLimit;
    const count = Math.ceil(Math.max(volumeCount, weightCount));

    let label = `${count} x ${selectedTruck.name}`;
    let sub = `Based on cargo dimensions (${totals.totalVolume.toFixed(0)} cu ft, ${(totals.totalWeight / 1000).toFixed(1)} Tons)`;

    return { count, label, sub };
  }, [totals, selectedTruck]);

  // Format message to pass to the parent quote modal
  const handleRequestQuote = () => {
    if (totals.totalItems === 0) return;

    const cargoStringList = cargoList.map((item) => {
      const config = CONTAINER_SIZES.find((c) => c.id === item.containerId);
      return `${item.qty} x ${config?.name || item.containerId}`;
    });

    const logisticsInquiryDetails = {
      cargoSummary: cargoStringList.join(", "),
      totalWeight: `${(totals.totalWeight / 1000).toFixed(2)} Tons (${totals.totalWeight.toLocaleString()} kg)`,
      totalVolume: `${totals.totalVolume.toFixed(1)} Cubic Feet`,
      recommendedTruck: logisticsRecommendation.label,
    };

    if (onOpenQuote) {
      onOpenQuote(logisticsInquiryDetails);
    }
  };

  return (
    <div className="min-h-screen bg-forest-black text-warm-ivory font-sans antialiased selection:bg-luxury-gold selection:text-forest-black pb-16">
      {/* ── HEADER ── */}
      <header className="border-b border-luxury-gold/15 sticky top-0 bg-forest-black/95 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="p-2 border border-luxury-gold/30 rounded-xl hover:bg-luxury-gold/10 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-luxury-gold group-hover:scale-95 transition-transform" />
          </a>
          <div>
            <h1 className="text-lg font-display font-black tracking-tight uppercase flex items-center gap-1.5">
              <span>{companyDetails.name}</span>
              <span className="text-luxury-gold font-sans font-medium text-xs border border-luxury-gold/30 rounded-full px-2.5 py-0.5">
                Logistics Desk
              </span>
            </h1>
            <p className="text-[10px] text-stone-gray/60 font-sans tracking-wide uppercase">
              Transportation & Load Capacity Calculator
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-xs uppercase font-bold tracking-wider hover:text-luxury-gold transition-colors border-b border-transparent hover:border-luxury-gold pb-0.5"
          >
            Back To Website
          </a>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase max-w-2xl mx-auto">
          Calculate Your Cargo Loading & Truck Requirements
        </h2>
        <p className="text-sm text-stone-gray/70 max-w-xl mx-auto leading-relaxed">
          Input your container and specimen quantities below to calculate cargo weight, volume, and visual truck capacity for bulk B2B landscaping layouts.
        </p>
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CARGO MANAGER (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset templates selector */}
          <div className="bg-warm-ivory/[0.04] border border-luxury-gold/15 rounded-2xl p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-luxury-gold/15 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-gold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Select A Logistics Preset
              </h3>
              <button
                onClick={handleClearAll}
                className="text-[10px] uppercase font-semibold text-stone-gray/60 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Cargo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LOAD_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleLoadPreset(preset)}
                  className="text-left bg-forest-black-secondary border border-luxury-gold/15 hover:border-luxury-gold p-3 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <h4 className="text-xs font-bold text-warm-ivory group-hover:text-luxury-gold transition-colors line-clamp-1">
                    {preset.name}
                  </h4>
                  <p className="text-[9px] text-stone-gray/50 mt-1 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Plant Add options */}
          <div className="bg-warm-ivory/[0.04] border border-luxury-gold/15 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-gold">
              Add Plant Containers to Cargo List
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTAINER_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleAddCargoType(size.id)}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-luxury-gold/12 bg-forest-black-secondary hover:bg-luxury-gold/10 hover:border-luxury-gold/30 transition-all text-left cursor-pointer group"
                >
                  <div className="p-2 rounded-lg bg-luxury-gold/10 text-luxury-gold group-hover:bg-luxury-gold group-hover:text-bg-opposite transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-warm-ivory">{size.name}</h4>
                    <p className="text-[10px] text-stone-gray/50 mt-0.5 line-clamp-1">
                      {size.weight} kg | {size.volume} cu ft
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Loaded Cargo List */}
          <div className="bg-warm-ivory/[0.04] border border-luxury-gold/15 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-gold flex items-center gap-1.5">
              <Box className="w-4 h-4" />
              Active Cargo Stack Configuration
            </h3>
            
            {cargoList.length === 0 ? (
              <div className="py-12 text-center text-stone-gray/40 space-y-2 border border-dashed border-luxury-gold/15 rounded-xl">
                <Box className="w-8 h-8 mx-auto stroke-1" />
                <p className="text-xs font-medium">Cargo stack is empty. Click presets or add containers above.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cargoList.map((item) => {
                  const size = CONTAINER_SIZES.find((c) => c.id === item.containerId);
                  if (!size) return null;
                  return (
                    <div
                      key={item.containerId}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-forest-black-secondary border border-luxury-gold/15"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-warm-ivory truncate">{size.name}</h4>
                        <p className="text-[10px] text-stone-gray/50 mt-0.5">
                          Unit volume: {size.volume} cu ft | Unit weight: {size.weight} kg
                        </p>
                      </div>

                      <div className="flex items-center gap-3.5 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center gap-2">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-stone-gray/40">Qty:</label>
                          <input
                            type="number"
                            min="0"
                            value={item.qty}
                            onChange={(e) => handleUpdateQty(item.containerId, e.target.value)}
                            className="w-20 px-2.5 py-1.5 rounded-lg border border-luxury-gold/20 bg-forest-black text-warm-ivory text-center font-bold text-xs focus:outline-none focus:border-luxury-gold"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveCargo(item.containerId)}
                          className="p-2 border border-red-500/10 hover:border-red-500 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: TRUCK LOAD VISUALIZER (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active stats panel */}
          <div className="bg-warm-ivory/[0.04] border border-luxury-gold/15 rounded-2xl p-5 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-gold flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              Logistics visualizer
            </h3>

            {/* Target Truck Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-gray/50">
                Simulated Truck Class
              </label>
              <select
                value={selectedTruckId}
                onChange={(e) => setSelectedTruckId(e.target.value)}
                className="w-full border border-luxury-gold/20 rounded-xl px-3.5 py-3 text-xs bg-forest-black-secondary text-warm-ivory font-semibold focus:outline-none focus:border-luxury-gold cursor-pointer"
              >
                {TRUCK_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (Max {t.weightLimit / 1000}T)
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-gray/60 italic leading-relaxed pt-1">
                {selectedTruck.description}
              </p>
            </div>

            {/* Visual Stacking Container */}
            <div className="bg-forest-black border border-luxury-gold/15 rounded-xl p-4 space-y-3.5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-stone-gray/40">
                <span>Truck Bed Capacity</span>
                <span className={volumePercentage > 100 ? "text-red-400 font-extrabold" : "text-luxury-gold"}>
                  {volumePercentage}% Stacked
                </span>
              </div>
              
              {/* Actual 3D-like box bar */}
              <div className="relative w-full h-32 bg-forest-black-secondary/50 border border-luxury-gold/20 rounded-xl overflow-hidden flex flex-col justify-end">
                {totals.totalItems === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-stone-gray/30">
                    Empty Load
                  </div>
                ) : (
                  <>
                    <div
                      className="w-full transition-all duration-500 ease-out flex flex-col justify-center items-center text-[10px] font-black tracking-widest"
                      style={{
                        height: `${Math.min(volumePercentage, 100)}%`,
                        background: volumePercentage > 100 
                          ? "linear-gradient(180deg, rgba(239, 68, 68, 0.45) 0%, rgba(239, 68, 68, 0.2) 100%)"
                          : "linear-gradient(180deg, var(--border-color) 0%, var(--card-bg) 100%)",
                        borderTop: `2px solid ${volumePercentage > 100 ? "#ef4444" : "var(--accent-color)"}`
                      }}
                    >
                      <span className="text-warm-ivory select-none">
                        {volumePercentage > 100 ? "OVERLOADED" : `${totals.totalItems.toLocaleString()} PLANTS`}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Status Warning tags */}
              {volumePercentage > 100 && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-semibold text-center leading-relaxed">
                  ⚠️ Cargo volume exceeds simulated truck loading limit. High stacking requires additional trucks.
                </div>
              )}
            </div>

            {/* Metrics parameters */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-forest-black border border-luxury-gold/15 rounded-xl">
                <div className="flex justify-center text-luxury-gold mb-1">
                  <Box className="w-4 h-4" />
                </div>
                <span className="block text-[9px] uppercase font-bold tracking-wider text-stone-gray/40">
                  Total Volume
                </span>
                <span className="block font-display font-extrabold text-sm text-warm-ivory mt-0.5">
                  {totals.totalVolume.toFixed(1)} cu ft
                </span>
                <span className="block text-[9px] text-stone-gray/30 mt-0.5">
                  Limit: {selectedTruck.volumeLimit} cu ft
                </span>
                
                {/* Micro volume bar */}
                <div className="w-full bg-warm-ivory/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(volumePercentage, 100)}%`,
                      backgroundColor: volumePercentage > 100 ? "#ef4444" : "var(--accent-color)",
                    }}
                  />
                </div>
              </div>

              <div className="p-3 bg-forest-black border border-luxury-gold/15 rounded-xl">
                <div className="flex justify-center text-luxury-gold mb-1">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="block text-[9px] uppercase font-bold tracking-wider text-stone-gray/40">
                  Cargo Weight
                </span>
                <span className="block font-display font-extrabold text-sm text-warm-ivory mt-0.5">
                  {(totals.totalWeight / 1000).toFixed(2)} Tons
                </span>
                <span className="block text-[9px] text-stone-gray/30 mt-0.5">
                  Limit: {selectedTruck.weightLimit / 1000} Tons
                </span>
                
                {/* Micro weight bar */}
                <div className="w-full bg-warm-ivory/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(weightPercentage, 100)}%`,
                      backgroundColor: weightPercentage > 100 ? "#ef4444" : "var(--accent-color)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Logistics Recommendation Outcome */}
            {totals.totalItems > 0 && (
              <div className="bg-luxury-gold/5 border border-luxury-gold/20 rounded-xl p-4 space-y-2">
                <span className="block text-[9px] uppercase font-bold tracking-wider text-luxury-gold">
                  Logistical Recommendation
                </span>
                <h4 className="text-sm font-display font-extrabold text-warm-ivory flex items-center gap-2">
                  <Truck className="w-4 h-4 text-luxury-gold" />
                  {logisticsRecommendation.label}
                </h4>
                <p className="text-[10px] text-stone-gray/60 leading-relaxed">
                  {logisticsRecommendation.sub}
                </p>
              </div>
            )}

            {/* Inquire shipping quote lead actions */}
            <button
              onClick={handleRequestQuote}
              disabled={totals.totalItems === 0}
              className="w-full py-4 text-center rounded-xl bg-luxury-gold hover:opacity-90 disabled:opacity-40 text-bg-opposite disabled:text-warm-ivory/30 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 border border-transparent"
            >
              <Send className="w-4 h-4" />
              Inquire Logistics Quote
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}
