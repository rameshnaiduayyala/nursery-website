import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Send, Sparkles, MessageSquare } from 'lucide-react';

export default function BulkQuoteModal({ isOpen, onClose, preselectedPlant, preselectedCategory }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    category: '',
    quantity: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    type: 'quote', // 'quote' or 'visit'
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        category: preselectedCategory || prev.category || '',
        message: preselectedPlant ? `Bulk order inquiry for: ${preselectedPlant} (${preselectedCategory || ''})` : prev.message || '',
      }));
    }
  }, [isOpen, preselectedPlant, preselectedCategory]);

  const roles = [
    { label: 'Farmer / Agro Planter', value: 'farmer' },
    { label: 'Landscape Designer / Architect', value: 'landscaper' },
    { label: 'Real Estate Developer', value: 'developer' },
    { label: 'Resort / Hotel Manager', value: 'resort' },
    { label: 'Plant Retailer / Reseller', value: 'retailer' },
    { label: 'Export Buyer', value: 'exporter' },
    { label: 'Govt / Institutional Project', value: 'government' },
  ];

  const plantCategories = [
    'Avenue Trees',
    'Flowering Plants',
    'Fruit Plants (Bulk Agro)',
    'Palm Trees',
    'Ornamental Plants',
    'Indoor & Office Plants',
    'Medicinal / Herby Plants',
    'General Mixed Landscape',
  ];

  const quantities = [
    { label: 'Under 100 plants', value: '<100' },
    { label: '100 - 500 plants', value: '100-500' },
    { label: '500 - 2,000 plants', value: '500-2000' },
    { label: '2,000 - 10,000 plants', value: '2000-10000' },
    { label: '10,000+ plants (Bulk Cargo)', value: '10000+' },
  ];

  const handleSelectRole = (val) => {
    setFormData({ ...formData, role: val });
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 2 && (!formData.category || !formData.quantity)) {
      alert('Please select both a category and quantity range.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }
    setStep(4);
  };

  const resetForm = () => {
    setFormData({
      role: '',
      category: '',
      quantity: '',
      name: '',
      email: '',
      phone: '',
      location: '',
      message: '',
      type: 'quote',
    });
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-forest-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-warm-ivory rounded-3xl overflow-hidden shadow-2xl border border-luxury-gold/15 z-10 text-left text-forest-black"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-luxury-gold/15">
            <div>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-forest-black tracking-tight uppercase">
                {formData.type === 'quote' ? 'Request Bulk Quote' : 'Schedule Nursery Visit'}
              </h3>
              <p className="text-xs text-forest-black/65 font-sans mt-1">
                Step {step === 4 ? 3 : step} of 3 • Gangadhara VIP Desk
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-forest-black/5 text-forest-black/70 hover:text-forest-black transition-colors cursor-pointer"
            >
              <X className="w-5.5 h-5.5" />
            </button>
          </div>

          {/* Form steps container */}
          <div className="p-8 max-h-[75vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-lg uppercase tracking-wide">Which best describes your role?</h4>
                    <p className="text-sm text-forest-black/70 font-sans">Select a category to customize our logistics matching.</p>
                  </div>
                  
                  {/* Inquiry Type toggle */}
                  <div className="flex gap-4 p-1 bg-stone-gray/30 rounded-xl border border-stone-gray/50">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'quote' })}
                      className={`flex-1 py-3 text-center rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        formData.type === 'quote' ? 'bg-forest-black text-warm-ivory' : 'text-forest-black/75 hover:text-forest-black'
                      }`}
                    >
                      Request Pricing Catalog
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'visit' })}
                      className={`flex-1 py-3 text-center rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        formData.type === 'visit' ? 'bg-forest-black text-warm-ivory' : 'text-forest-black/75 hover:text-forest-black'
                      }`}
                    >
                      Schedule Guided Tour
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {roles.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => handleSelectRole(r.value)}
                        className={`text-left p-4 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          formData.role === r.value
                            ? 'bg-luxury-gold/15 border-luxury-gold text-forest-black'
                            : 'bg-white border-luxury-gold/15 hover:border-luxury-gold/45'
                        }`}
                      >
                        <span>{r.label}</span>
                        <ChevronRight className="w-4 h-4 text-luxury-gold" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg uppercase tracking-wide">What are you looking to supply?</h4>
                    <p className="text-sm text-forest-black/70 font-sans font-medium">Select primary variety and expected quantities.</p>
                  </div>

                  {/* Categories Dropdown */}
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-forest-black/70">Primary Plant Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-4 rounded-xl border border-luxury-gold/20 bg-white text-sm font-semibold focus:outline-none focus:border-luxury-gold transition-colors cursor-pointer"
                    >
                      <option value="">Select category...</option>
                      {plantCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity options */}
                  <div className="space-y-3.5 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-forest-black/70">Required Plant Quantity</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quantities.map((q) => (
                        <button
                          key={q.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: q.value })}
                          className={`text-left p-4 rounded-xl border text-sm font-bold transition-all duration-200 cursor-pointer ${
                            formData.quantity === q.value
                              ? 'bg-luxury-gold/15 border-luxury-gold'
                              : 'bg-white border-luxury-gold/15 hover:border-luxury-gold/45'
                          }`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-luxury-gold/15">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center gap-1.5 px-5 py-3 rounded-full hover:bg-forest-black/5 font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center gap-1.5 px-6 py-3 rounded-full bg-luxury-gold hover:bg-[#B29555] text-forest-black font-bold uppercase text-xs tracking-wider transition-all cursor-pointer"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 text-forest-black" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg uppercase tracking-wide">Contact Information</h4>
                    <p className="text-sm text-forest-black/70 font-sans">Our cargo desk will reach back to coordinate within 4 working hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-forest-black/60">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full p-4 rounded-xl border border-luxury-gold/20 bg-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-forest-black/60">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. ramesh@farm.com"
                          className="w-full p-4 rounded-xl border border-luxury-gold/20 bg-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-forest-black/60">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full p-4 rounded-xl border border-luxury-gold/20 bg-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-forest-black/60">Site Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Bangalore, KA"
                          className="w-full p-4 rounded-xl border border-luxury-gold/20 bg-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-forest-black/60">Additional Message / Blueprint Specs</label>
                      <textarea
                        rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Mention custom height specifications, site drawings, or specific botanical hybrids."
                        className="w-full p-4 rounded-xl border border-luxury-gold/20 bg-white text-sm focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                      />
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-6 border-t border-luxury-gold/15">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center gap-1.5 px-5 py-3 rounded-full hover:bg-forest-black/5 font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-luxury-gold hover:bg-[#B29555] text-forest-black font-bold uppercase text-xs tracking-wider transition-all shadow-lg shadow-luxury-gold/10 cursor-pointer"
                      >
                        <span>Submit Details</span>
                        <Send className="w-4 h-4 text-forest-black" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-luxury-gold/10 border-2 border-luxury-gold text-luxury-gold flex items-center justify-center shadow-lg relative">
                    <Check className="w-10 h-10" />
                    <div className="absolute -top-1 -right-1 bg-luxury-gold text-forest-black p-1 rounded-full animate-bounce">
                      <Sparkles className="w-4 h-4 text-forest-black" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-display font-black text-2xl tracking-tight uppercase">Request Logged!</h4>
                    <p className="text-sm text-forest-black/70 font-sans max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-forest-black">{formData.name}</strong>. Our botanical accounts desk will compile your details and connect shortly.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-luxury-gold/15 w-full max-w-sm flex flex-col gap-3">
                    <a
                      href={`https://wa.me/919876543210?text=Hi%20Gangadhara%20Nursery,%20I%2520have%20submitted%20a%20pricing%20request%20for%20${formData.quantity}%20plants%20under%20the%2520${formData.category}%20category.%20My%20name%20is%20${formData.name}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 text-center rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#20ba56] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5 fill-white" />
                      WhatsApp Connect
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full py-4 text-center rounded-xl bg-forest-black text-warm-ivory font-bold text-xs uppercase tracking-wider hover:bg-forest-black/95 transition-colors cursor-pointer"
                    >
                      Close Dialog
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
