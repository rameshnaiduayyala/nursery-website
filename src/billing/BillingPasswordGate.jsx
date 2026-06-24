import { useState } from "react";
import { companyDetails } from "../data/nurseryData";
import { Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, Leaf } from "lucide-react";

export default function BillingPasswordGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === companyDetails.billingPassword) {
      setError("");
      sessionStorage.setItem("billing_auth", "true");
      onSuccess();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#08120B] text-[#FAF8F2] font-sans antialiased flex flex-col justify-center items-center p-6 select-none relative overflow-hidden">

      {/* Decorative background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C6A969]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0E9F6E]/5 blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="max-w-md w-full bg-[#FAF8F2]/5 border border-[#C6A969]/20 p-8 rounded-3xl backdrop-blur-xl shadow-[0_24px_64px_rgba(8,18,11,0.6)] space-y-8 relative z-10 text-center">

        {/* Brand/Leaf Icon */}
        <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C6A969] to-[#B29555] flex items-center justify-center shadow-lg shadow-[#C6A969]/10">
          <Leaf className="w-6 h-6 text-forest-black" />
        </div>

        {/* Titles */}
        <div className="space-y-2">
          <h2 className="text-xl font-display font-black tracking-tight uppercase">
            Billing Security Gate
          </h2>
          <p className="text-[10px] text-[#E8E6DF]/60 tracking-widest uppercase">
            Authorized administrative access only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-[#E8E6DF]/50 uppercase tracking-wider">
              Enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#08120B] border border-[#C6A969]/25 rounded-xl pl-10 pr-10 py-3.5 text-sm text-[#FAF8F2] focus:outline-none focus:border-[#C6A969] transition-colors"
                autoFocus
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C6A969]/60">
                <Lock className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E8E6DF]/40 hover:text-[#C6A969] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold leading-relaxed">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form buttons */}
          <button
            type="submit"
            className="w-full py-4 text-center rounded-xl bg-[#C6A969] hover:bg-[#B29555] text-forest-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#C6A969]/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Unlock Portal
            <ChevronRight className="w-4 h-4 text-forest-black" />
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#E8E6DF]/60 hover:text-[#C6A969] transition-colors font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Website
          </a>
        </div>

      </div>
    </div>
  );
}

// Small inline helper arrow icon
function ChevronRight(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
