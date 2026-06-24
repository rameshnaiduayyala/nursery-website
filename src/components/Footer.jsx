import React from 'react';
import { Leaf, Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { companyDetails } from '../data/nurseryData';

export default function Footer({ onOpenQuote }) {
  const currentYear = new Date().getFullYear();

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your quick inquiry has been logged. Our representative will contact you shortly.');
    e.target.reset();
  };

  return (
    <footer className="relative bg-forest-black text-warm-ivory/80 border-t border-luxury-gold/15 overflow-hidden text-left">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        
        {/* Brand details (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#home" className="flex items-center space-x-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-luxury-gold to-[#B29555] shadow-md shadow-luxury-gold/10">
              <Leaf className="w-5.5 h-5.5 text-forest-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-warm-ivory leading-none">
                {companyDetails.name.toUpperCase()}
              </span>
              <span className="font-sans text-[9px] tracking-[0.25em] text-luxury-gold font-semibold uppercase leading-none mt-1.5">
                {companyDetails.subtitle}
              </span>
            </div>
          </a>

          <p className="text-xs sm:text-sm text-stone-gray/75 leading-relaxed font-sans">
            {companyDetails.name} is a premier botanical hub specializing in pan-India transit and global export of premium agricultural, avenue, palm, and landscaping plant varieties.
          </p>

          {/* Social icons */}
          <div className="flex items-center space-x-3">
            <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-forest-black text-luxury-gold transition-all" aria-label="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-forest-black text-luxury-gold transition-all" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-forest-black text-luxury-gold transition-all" aria-label="Twitter">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-forest-black text-luxury-gold transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Directory links (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-display font-bold text-xs sm:text-sm tracking-widest text-warm-ivory uppercase">
            Plant Catalog
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-stone-gray/80">
            <li><a href="#categories" className="hover:text-luxury-gold transition-colors">Avenue Trees</a></li>
            <li><a href="#categories" className="hover:text-emerald-green transition-colors">Fruit Plants</a></li>
            <li><a href="#categories" className="hover:text-emerald-green transition-colors">Palm Trees</a></li>
            <li><a href="#categories" className="hover:text-emerald-green transition-colors">Ornamental Shrubs</a></li>
            <li><a href="#categories" className="hover:text-emerald-green transition-colors">Indoor Greens</a></li>
          </ul>
        </div>

        {/* Info & Services (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-display font-bold text-xs sm:text-sm tracking-widest text-warm-ivory uppercase">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-stone-gray/80">
            <li><a href="#services" className="hover:text-luxury-gold transition-colors">Project Supply</a></li>
            <li><a href="#services" className="hover:text-luxury-gold transition-colors">Agro Bulk Orders</a></li>
            <li><a href="#export" className="hover:text-luxury-gold transition-colors">Export Logistics</a></li>
            <li><a href="#about" className="hover:text-luxury-gold transition-colors">Botanical Care</a></li>
            <li>
              <button onClick={onOpenQuote} className="hover:text-luxury-gold transition-colors text-left cursor-pointer">
                Get a Quote
              </button>
            </li>
            <li className="pt-1.5 border-t border-white/5">
              <a href="/billing" className="hover:text-luxury-gold transition-colors text-[11px] font-bold uppercase tracking-wider text-luxury-gold/90">
                Invoice System
              </a>
            </li>
          </ul>
        </div>

        {/* Location & Map box (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="font-display font-bold text-xs sm:text-sm tracking-widest text-warm-ivory uppercase">
            Quick Inquiry
          </h4>
          
          {/* Quick Inquiry Form */}
          <form onSubmit={handleInquirySubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold focus:outline-none focus:border-luxury-gold text-warm-ivory transition-colors"
            />
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ask about species availability..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold focus:outline-none focus:border-luxury-gold text-warm-ivory transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-warm-ivory transition-colors cursor-pointer"
                aria-label="Submit inquiry"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Contact Details info */}
          <div className="space-y-2.5 text-xs sm:text-sm font-sans text-stone-gray/70 pt-2">
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>{companyDetails.address}, {companyDetails.city}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>{companyDetails.phone}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>{companyDetails.email}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/5 py-8 bg-[#040a06] relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-gray/50">
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <p>&copy; {currentYear} {companyDetails.name}. All rights reserved.</p>
            <a href="#" className="hover:text-warm-ivory">Privacy Policy</a>
            <a href="#" className="hover:text-warm-ivory">Terms of Cargo</a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/25 text-[#25D366] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-[#25D366]" />
              WhatsApp VIP Desk
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
