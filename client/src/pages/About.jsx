import React from "react";
import { 
  FaCheckCircle, 
  FaTruck, 
  FaShieldAlt, 
  FaAward, 
  FaWhatsapp, 
  FaStar 
} from "react-icons/fa";

function About() {
  const phoneNumber = "60168050930";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hello! I would like to inquire about your fresh products."
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ================= HERO SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <span className="inline-flex items-center gap-1.5 text-red-600 font-bold uppercase tracking-wider text-xs sm:text-sm bg-red-100/80 px-4 py-1.5 rounded-full border border-red-200/80 shadow-sm">
            <FaStar className="text-xs" /> About SMR Chicken
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Delivering Fresh, Premium & <span className="text-red-600">Hygienic</span> Meat
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            At SMR Chicken, we are committed to providing top-quality poultry and seafood products directly to your doorstep with guaranteed freshness, hygienic processing, and reliable service.
          </p>
        </div>

        {/* ================= STORY / COMMITMENT SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Uncompromising Commitment to Quality
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We understand that good health starts with good food. That is why every product from SMR Chicken is ethically sourced, handled under strict temperature control, and freshly prepared to ensure maximum taste and nutrition.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "100% Fresh & Hygienic",
                "Cold Chain Cold Storage",
                "Direct WhatsApp Ordering",
                "Zero Preservatives",
                "Strict Temperature Controls",
                "Ethically Sourced Cuts"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-800 font-medium text-sm">
                  <FaCheckCircle className="text-red-600 flex-shrink-0 text-base" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 bg-slate-100/70 p-4 sm:p-6 rounded-2xl border border-slate-200/60">
            <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm text-center transform transition-transform duration-200 hover:-translate-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-red-600">100%</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1">Fresh Guarantee</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm text-center transform transition-transform duration-200 hover:-translate-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-red-600">Fast</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1">Doorstep Delivery</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm text-center transform transition-transform duration-200 hover:-translate-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-red-600">Hygiene</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1">Clean Packaging</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm text-center transform transition-transform duration-200 hover:-translate-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-red-600">Daily</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1">Fresh Stock</p>
            </div>
          </div>

        </div>

        {/* ================= WHY CHOOSE US GRID ================= */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Why Choose Us?</h2>
            <p className="text-slate-500 text-sm sm:text-base">We make purchasing fresh poultry simple, fast, and trustworthy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <FaShieldAlt />
              </div>
              <h3 className="font-bold text-slate-800 text-xl">Safe & Clean</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Processed in clean environments adhering strictly to high standards of personal hygiene, sanitation, and safety protocols.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <FaTruck />
              </div>
              <h3 className="font-bold text-slate-800 text-xl">Quick Delivery</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Fast order processing and dispatching directly after your order confirmation via WhatsApp.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <FaAward />
              </div>
              <h3 className="font-bold text-slate-800 text-xl">Uncompromising Quality</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every single item is thoroughly inspected before packaging to ensure you receive only the finest cuts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;