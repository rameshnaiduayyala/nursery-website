import { useState } from "react";
import { companyDetails } from "../data/nurseryData";
import { Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, Leaf } from "lucide-react";
import { motion } from "framer-motion";

function ChevronRight(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      style={{ width: "14px", height: "14px" }}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function BillingPasswordGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Short delay for UX feedback
    await new Promise(r => setTimeout(r, 500));
    if (password === companyDetails.billingPassword) {
      setError("");
      sessionStorage.setItem("billing_auth", "true");
      onSuccess();
    } else {
      setError("Incorrect password. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-forest-black text-warm-ivory font-sans antialiased flex flex-col justify-center items-center p-6 select-none relative overflow-hidden">

      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-luxury-gold/4 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-luxury-gold-deep/4 blur-[140px] pointer-events-none" />

      {/* Noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.025] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full relative z-10"
      >
        {/* Gradient border card */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-luxury-gold/30 via-luxury-gold/8 to-luxury-gold/20">
          <div className="bg-forest-black-secondary rounded-3xl p-8 sm:p-10 space-y-8 text-center backdrop-blur-xl">

            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent rounded-full" />

            {/* Brand Icon */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-luxury-gold to-luxury-gold-deep flex items-center justify-center shadow-[0_8px_32px_var(--border-color)]"
            >
              <Leaf className="w-7 h-7 text-bg-opposite" />
            </motion.div>

            {/* Titles */}
            <div className="space-y-2">
              <h2 className="text-xl font-display font-black tracking-tight uppercase text-warm-ivory">
                Billing Security Gate
              </h2>
              <p className="text-[10px] text-stone-gray/45 tracking-[0.25em] uppercase font-bold">
                Authorized administrative access only
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-stone-gray/45 uppercase tracking-[0.2em]">
                  Enter Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-forest-black/60 border border-luxury-gold/20 rounded-xl pl-11 pr-11 py-3.5 text-sm text-warm-ivory focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] transition-all duration-200 placeholder:text-warm-ivory/25"
                    autoFocus
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-gold/50">
                    <Lock className="w-4 h-4" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-gray/35 hover:text-luxury-gold transition-colors duration-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/25 text-red-400 text-xs font-semibold leading-relaxed"
                >
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-deep hover:shadow-glass text-bg-opposite font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer btn-press disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-bg-opposite/30 border-t-bg-opposite animate-spin" />
                ) : (
                  <>
                    Unlock Portal
                    <ChevronRight className="text-bg-opposite" />
                  </>
                )}
              </button>
            </form>

            {/* Back Link */}
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] text-stone-gray/40 hover:text-luxury-gold transition-colors duration-200 font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Website
            </a>

          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-[10px] text-stone-gray/20 mt-6 tracking-widest uppercase font-bold">
          {companyDetails.name} · Secure Access System
        </p>
      </motion.div>
    </div>
  );
}
