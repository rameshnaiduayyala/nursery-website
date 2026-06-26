import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Send, Sparkles, MessageSquare } from 'lucide-react';
import { companyDetails } from '../data/nurseryData';

export default function BulkQuoteModal({ isOpen, onClose, preselectedPlant, preselectedCategory, preselectedProject, preselectedLogistics }) {
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
    type: 'quote',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => {
        let msg = prev.message || '';
        let cat = preselectedCategory || prev.category || '';
        let r = prev.role || '';
        let qty = prev.quantity || '';

        if (preselectedLogistics) {
          msg = `Logistics shipping inquiry.\n\nCargo: ${preselectedLogistics.cargoSummary}\nTotal Weight: ${preselectedLogistics.totalWeight}\nTotal Volume: ${preselectedLogistics.totalVolume}\nRecommended Configuration: ${preselectedLogistics.recommendedTruck}`;
          cat = 'General Mixed Landscape';
          r = 'exporter';
          qty = '10000+';
        } else if (preselectedProject) {
          msg = `Landscaping supply inquiry for project: ${preselectedProject}`;
          cat = 'General Mixed Landscape';
          r = 'landscaper';
        } else if (preselectedPlant) {
          msg = `Bulk order inquiry for: ${preselectedPlant} (${preselectedCategory || ''})`;
        }

        return { ...prev, category: cat, role: r, quantity: qty, message: msg };
      });
    }
  }, [isOpen, preselectedPlant, preselectedCategory, preselectedProject, preselectedLogistics]);

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
    'Avenue Trees', 'Flowering Plants', 'Fruit Plants (Bulk Agro)',
    'Palm Trees', 'Ornamental Plants', 'Indoor & Office Plants',
    'Medicinal / Herby Plants', 'General Mixed Landscape',
  ];

  const quantities = [
    { label: 'Under 100 plants', value: '<100' },
    { label: '100 – 500 plants', value: '100-500' },
    { label: '500 – 2,000 plants', value: '500-2000' },
    { label: '2,000 – 10,000 plants', value: '2000-10000' },
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

  const handlePrevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }
    setStep(4);
  };

  const resetForm = () => {
    setFormData({ role: '', category: '', quantity: '', name: '', email: '', phone: '', location: '', message: '', type: 'quote' });
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const totalSteps = 3;
  const currentDisplayStep = step === 4 ? 3 : step;
  const progressPercent = (currentDisplayStep / totalSteps) * 100;

  if (!isOpen) return null;

  const inputClass = "w-full p-4 rounded-xl border border-luxury-gold/18 bg-forest-black-secondary/40 text-sm text-warm-ivory focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_0_3px_var(--border-color)] transition-all duration-200 placeholder:text-warm-ivory/30 font-medium";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-forest-black/92 backdrop-blur-lg"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-2xl bg-forest-black text-warm-ivory rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(8,18,11,0.4)] border border-luxury-gold/12 z-10 text-left"
        >
          {/* Subtle gradient header strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-gold/0 via-luxury-gold to-luxury-gold/0" />

          {/* Header */}
          <div className="flex justify-between items-start px-7 md:px-8 pt-7 pb-5 border-b border-luxury-gold/12">
            <div className="space-y-3 flex-1 mr-4">
              <div>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-warm-ivory tracking-tight uppercase">
                  {formData.type === 'quote' ? 'Request Bulk Quote' : 'Schedule Nursery Visit'}
                </h3>
                <p className="text-[11px] text-stone-gray/50 font-sans mt-1 tracking-wide">
                  Step {currentDisplayStep} of {totalSteps} · Gangadhara VIP Desk
                </p>
              </div>
              {/* Step progress bar */}
              <div className="step-line">
                <div className="step-line-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2.5 rounded-full hover:bg-warm-ivory/10 text-stone-gray hover:text-warm-ivory transition-all duration-200 cursor-pointer flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form steps container */}
          <div className="px-7 md:px-8 pb-8 max-h-[72vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 pt-6"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-lg uppercase tracking-wide">Which best describes your role?</h4>
                    <p className="text-sm text-stone-gray/60 font-sans">Select a category to customize your inquiry.</p>
                  </div>

                  {/* Inquiry Type toggle */}
                  <div className="flex gap-2 p-1.5 bg-forest-black-secondary rounded-2xl border border-luxury-gold/15">
                    {['quote', 'visit'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: t })}
                        className={`flex-1 py-2.5 text-center rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          formData.type === t
                            ? 'bg-luxury-gold text-bg-opposite shadow-md'
                            : 'text-stone-gray/60 hover:text-warm-ivory hover:bg-warm-ivory/10'
                        }`}
                      >
                        {t === 'quote' ? 'Request Pricing Catalog' : 'Schedule Guided Tour'}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {roles.map((r) => (
                      <button
                        type="button"
                        key={r.value}
                        onClick={() => handleSelectRole(r.value)}
                        className={`text-left px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                          formData.role === r.value
                            ? 'bg-luxury-gold/12 border-luxury-gold text-luxury-gold shadow-[0_0_0_3px_var(--border-color)]'
                            : 'bg-forest-black-secondary border-luxury-gold/15 hover:border-luxury-gold/50 hover:bg-luxury-gold/5 text-warm-ivory/85'
                        }`}
                      >
                        <span>{r.label}</span>
                        <ChevronRight className={`w-4 h-4 transition-all duration-200 ${
                          formData.role === r.value ? 'text-luxury-gold' : 'text-stone-gray/25 group-hover:text-luxury-gold/60'
                        }`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 pt-6"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-lg uppercase tracking-wide">What are you looking to supply?</h4>
                    <p className="text-sm text-stone-gray/60 font-sans">Select primary variety and expected quantities.</p>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-gray/55">Primary Plant Category</label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`${inputClass} appearance-none pr-10 bg-forest-black-secondary`}
                      >
                        <option value="">Select category...</option>
                        {plantCategories.map((c) => (
                          <option key={c.id || c} value={c.name || c}>{c.name || c}</option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-gray/35 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-gray/55">Required Plant Quantity</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {quantities.map((q) => (
                        <button
                          key={q.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: q.value })}
                          className={`text-left px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            formData.quantity === q.value
                              ? 'bg-luxury-gold/12 border-luxury-gold text-luxury-gold shadow-[0_0_0_3px_var(--border-color)]'
                              : 'bg-forest-black-secondary border-luxury-gold/15 hover:border-luxury-gold/50 hover:bg-luxury-gold/5 text-warm-ivory/80'
                          }`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-5 border-t border-luxury-gold/12 mt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full hover:bg-warm-ivory/5 font-bold uppercase text-xs tracking-wider transition-all duration-200 cursor-pointer text-stone-gray/70"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-deep hover:shadow-glass text-bg-opposite font-bold uppercase text-xs tracking-wider transition-all duration-200 cursor-pointer btn-press"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 pt-6"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-lg uppercase tracking-wide">Contact Information</h4>
                    <p className="text-sm text-stone-gray/60 font-sans">Our cargo desk responds within 4 business hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', key: 'name', type: 'text', placeholder: 'e.g. Ramesh Patel', required: true },
                        { label: 'Email Address', key: 'email', type: 'email', placeholder: 'e.g. ramesh@farm.com', required: true },
                        { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: 'e.g. +91 98765 43210', required: true },
                        { label: 'Site Location', key: 'location', type: 'text', placeholder: 'e.g. Bangalore, KA', required: false },
                      ].map(({ label, key, type, placeholder, required }) => (
                        <div key={key} className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-gray/50">
                            {label}{required && <span className="text-luxury-gold ml-0.5">*</span>}
                          </label>
                          <input
                            type={type}
                            required={required}
                            value={formData[key]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            placeholder={placeholder}
                            className={inputClass}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-gray/50">Additional Message / Blueprint Specs</label>
                      <textarea
                        rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Mention custom height specifications, site drawings, or specific botanical hybrids."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <div className="flex justify-between items-center pt-5 border-t border-luxury-gold/12">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full hover:bg-warm-ivory/5 font-bold uppercase text-xs tracking-wider transition-all duration-200 cursor-pointer text-stone-gray/70"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-deep hover:shadow-glass text-bg-opposite font-bold uppercase text-xs tracking-wider transition-all duration-200 cursor-pointer btn-press"
                      >
                        <span>Submit Details</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-14 flex flex-col items-center text-center space-y-6"
                >
                  {/* Success icon */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-gold/15 to-luxury-gold-deep/10 border border-luxury-gold/30 text-luxury-gold flex items-center justify-center shadow-[0_0_40px_var(--border-color)] animate-gold-pulse">
                      <Check className="w-9 h-9" strokeWidth={2.5} />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-luxury-gold to-luxury-gold-deep text-bg-opposite p-1.5 rounded-full shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="font-display font-black text-2xl tracking-tight uppercase">Request Logged!</h4>
                    <p className="text-sm text-stone-gray/65 font-sans max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong className="text-warm-ivory">{formData.name}</strong>. Our botanical accounts desk will compile your details and connect within 4 hours.
                    </p>
                  </div>

                  <div className="pt-5 border-t border-luxury-gold/15 w-full max-w-xs flex flex-col gap-3">
                    <a
                      href={`https://wa.me/${companyDetails.whatsappNumber}?text=Hi%20${encodeURIComponent(companyDetails.name)},%20I%20have%20submitted%20a%20pricing%20request%20for%20${formData.quantity}%20plants%20under%20the%20${formData.category}%20category.%20My%20name%20is%20${formData.name}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 text-center rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#20ba56] hover:shadow-[0_6px_20px_rgba(37,211,102,0.25)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer btn-press"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      WhatsApp Connect
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full py-3.5 text-center rounded-xl bg-bg-opposite text-text-opposite font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all duration-200 cursor-pointer btn-press"
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
