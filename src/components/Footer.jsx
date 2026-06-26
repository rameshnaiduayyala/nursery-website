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
    <footer className="relative bg-[#08120B] text-[#FAF8F2]/80 border-t border-[#C6A969]/12 overflow-hidden text-left">

      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-[#C6A969]/3 blur-[140px] pointer-events-none" />

      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">

        {/* Brand details */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#home" className="flex items-center space-x-2.5 group w-fit">
            {companyDetails.logo ? (
              <img
                src={companyDetails.logo}
                alt={companyDetails.name}
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <>
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C6A969] to-[#B29555] shadow-md shadow-[#C6A969]/15 group-hover:rotate-6 transition-transform duration-300">
                  <Leaf className="w-5 h-5 text-[#08120B]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-base tracking-tight text-[#FAF8F2] leading-none group-hover:text-[#C6A969] transition-colors duration-300">
                    {companyDetails.name.toUpperCase()}
                  </span>
                  <span className="font-sans text-[8px] tracking-[0.25em] text-[#C6A969] font-semibold uppercase leading-none mt-1.5">
                    {companyDetails.subtitle}
                  </span>
                </div>
              </>
            )}
          </a>

          <p className="text-xs sm:text-sm text-[#E8E6DF]/60 leading-relaxed font-sans max-w-[280px]">
            {companyDetails.name} is a premier botanical hub specializing in pan-India transit and global export of premium agricultural, avenue, palm, and landscaping plant varieties.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {[
              { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'Instagram', paths: ['rect x="2" y="2" width="20" height="20" rx="5" ry="5"', 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', 'line x1="17.5" y1="6.5" x2="17.51" y2="6.5"'] },
              { label: 'Twitter', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
              { label: 'LinkedIn', paths: ['path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"', 'rect x="2" y="9" width="4" height="12"', 'circle cx="4" cy="4" r="2"'] },
            ].map(({ label }) => (
              <a
                key={label}
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#C6A969] hover:text-[#08120B] text-[#C6A969] flex items-center justify-center transition-all duration-300 hover:scale-[1.08]"
                aria-label={label}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {label === 'Facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                  {label === 'Instagram' && (<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>)}
                  {label === 'Twitter' && <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />}
                  {label === 'LinkedIn' && (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>)}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Plant Catalog links */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="font-display font-bold text-xs tracking-widest text-[#FAF8F2] uppercase">
            Plant Catalog
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm font-sans text-[#E8E6DF]/55">
            {['Avenue Trees', 'Fruit Plants', 'Palm Trees', 'Ornamental Shrubs', 'Indoor Greens'].map((item) => (
              <li key={item}>
                <a href="#categories" className="hover:text-[#C6A969] transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="font-display font-bold text-xs tracking-widest text-[#FAF8F2] uppercase">
            Quick Links
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm font-sans text-[#E8E6DF]/55">
            <li><a href="#services" className="hover:text-[#C6A969] transition-colors duration-200">Project Supply</a></li>
            <li><a href="#services" className="hover:text-[#C6A969] transition-colors duration-200">Agro Bulk Orders</a></li>
            <li><a href="#export" className="hover:text-[#C6A969] transition-colors duration-200">Export Logistics</a></li>
            <li><a href="#about" className="hover:text-[#C6A969] transition-colors duration-200">Botanical Care</a></li>
            <li>
              <button onClick={onOpenQuote} className="hover:text-[#C6A969] transition-colors duration-200 text-left cursor-pointer">
                Get a Quote
              </button>
            </li>
            <li className="pt-2 border-t border-white/6 flex flex-col gap-1.5">
              <a href="/billing" className="hover:text-[#C6A969] transition-colors duration-200 text-[11px] font-bold uppercase tracking-wider text-[#C6A969]/80">
                Invoice System
              </a>
              <a href="/logistics" className="hover:text-[#C6A969] transition-colors duration-200 text-[11px] font-bold uppercase tracking-wider text-[#C6A969]/80">
                Logistics Planner
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Inquiry + Contact */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="font-display font-bold text-xs tracking-widest text-[#FAF8F2] uppercase">
            Quick Inquiry
          </h4>

          <form onSubmit={handleInquirySubmit} className="space-y-2.5">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-xs font-medium focus:outline-none focus:border-[#C6A969] focus:shadow-[0_0_0_3px_rgba(198,169,105,0.08)] text-[#FAF8F2] transition-all duration-200 placeholder:text-[#FAF8F2]/30"
            />
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ask about species availability..."
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/5 border border-white/8 text-xs font-medium focus:outline-none focus:border-[#C6A969] focus:shadow-[0_0_0_3px_rgba(198,169,105,0.08)] text-[#FAF8F2] transition-all duration-200 placeholder:text-[#FAF8F2]/30"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-[#C6A969]/15 hover:bg-[#C6A969] text-[#C6A969] hover:text-[#08120B] flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Submit inquiry"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Contact Details */}
          <div className="space-y-3 text-xs sm:text-sm font-sans text-[#E8E6DF]/55">
            {[
              { Icon: MapPin, text: `${companyDetails.address}, ${companyDetails.city}` },
              { Icon: Phone, text: companyDetails.phone },
              { Icon: Mail, text: companyDetails.email },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#C6A969]" />
                </div>
                <span className="leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/5 py-6 bg-[#040a06]/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#E8E6DF]/35">

          <div className="flex flex-wrap items-center justify-center gap-5">
            <p>&copy; {currentYear} {companyDetails.name}. All rights reserved.</p>
            <p className="text-[#E8E6DF]/20">|</p>
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#E8E6DF]/40 font-medium">
                Designed & Developed by
              </span>
              <span className="h-3 w-px bg-[#C6A969]/30"></span>
              <span className="text-[#FAF8F2] font-semibold text-xs tracking-wide bg-gradient-to-r from-[#C6A969] to-[#E8D5A3] bg-clip-text text-transparent">
                Ramesh Ayyala
              </span>
              <span className="h-3 w-px bg-[#C6A969]/30"></span>
              <a
                href="tel:+917989419864"
                className="text-[11px] text-[#C6A969]/70 hover:text-[#FAF8F2] transition-colors duration-300 font-mono tracking-wide"
              >
                +91 79894 19864
              </a>
            </div>
          </div>

          <a
            href={`https://wa.me/${companyDetails.whatsappNumber || '919876543210'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366]/8 hover:bg-[#25D366]/16 border border-[#25D366]/20 text-[#25D366] font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-[1.04]"
          >
            <MessageSquare className="w-4 h-4 fill-[#25D366]" />
            Ramesh Ayyala
          </a>
        </div>
      </div>

    </footer>
  );
}
