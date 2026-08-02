import React from "react";
import {
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaAward,
  FaWhatsapp,
  FaStar
} from "react-icons/fa";

import { Helmet } from "react-helmet-async";


function About() {
  const phoneNumber = "60168050930";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hello! I would like to inquire about your fresh products."
  )}`;

  return (


    <section className="relative w-full bg-gradient-to-b from-slate-50 via-red-50/20 to-amber-50/20 text-slate-900 overflow-hidden pt-14 pb-20">

      <Helmet>
        <title>About Us | Salsabeel Maju Resources (M) Sdn. Bhd.</title>

        <meta
          name="description"
          content="Learn about Salsabeel Maju Resources, the company behind SMR Chicken Malaysia and our commitment to supplying quality Halal poultry and frozen seafood."
        />

        <meta
          name="keywords"
          content="About SMR Chicken, Salsabeel Maju Resources, poultry supplier Malaysia, Halal chicken Shah Alam, frozen seafood supplier Selangor"
        />

        <link rel="canonical" href="https://smrchicken.com/about" />


        <meta property="og:title" content="SMR Chicken" />
        <meta
          property="og:description"
          content="Fresh chicken and frozen seafood delivered daily."
        />
        <meta
          property="og:image"
          content="https://smrchicken.com/logo.png"
        />
      </Helmet>

      {/* Page */}
      {/* TOP WAVE SEPARATOR (Inverted) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-[30px] sm:h-[45px] rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.64,11.39,98.66,28.69,147.8,36.27c66.5,10.23,135,11.69,202.8,2.37Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* SUBTLE BACKGROUND GRID PATTERN */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* SOFT AMBIENT LIGHT GLOWS */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-200/20 blur-3xl pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-200/20 blur-3xl pointer-events-none rounded-full animate-pulse delay-700" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 my-4 pt-4">

        {/* ================= HERO SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <span className="inline-flex items-center gap-1.5 text-red-600 font-bold uppercase tracking-widest text-xs sm:text-sm bg-red-100/80 px-4 py-1.5 rounded-full border border-red-200/80 shadow-sm">
            <FaStar className="text-xs" /> About SMR Chicken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Delivering Fresh, Premium & <span className="text-red-600">Hygienic</span> Meat
          </h1>
          <div className="w-16 h-1 bg-red-600 rounded-full mx-auto" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            At SMR Chicken, we are committed to providing top-quality poultry and seafood products directly to your doorstep with guaranteed freshness, hygienic processing, and reliable service.
          </p>
        </div>

        {/* ================= STORY / COMMITMENT SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/90 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
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
                <li key={idx} className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-slate-800 font-semibold text-sm shadow-2xs">
                  <FaCheckCircle className="text-red-600 flex-shrink-0 text-base" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Quick Action Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 active:scale-95"
              >
                <FaWhatsapp size={18} />
                <span>Inquire via WhatsApp</span>
              </a>
            </div>
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
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-100/80 px-3 py-1 rounded-full inline-block mb-1 border border-red-200">
              Why SMR Chicken
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Why Choose Us?</h2>
            <div className="w-16 h-1 bg-red-600 rounded-full mx-auto" />
            <p className="text-slate-500 text-sm sm:text-base pt-1">We make purchasing fresh poultry simple, fast, and trustworthy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 transform hover:-translate-y-1.5 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <FaShieldAlt />
              </div>
              <h3 className="font-bold text-slate-800 text-xl">Safe & Clean</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Processed in clean environments adhering strictly to high standards of personal hygiene, sanitation, and safety protocols.
              </p>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 transform hover:-translate-y-1.5 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <FaTruck />
              </div>
              <h3 className="font-bold text-slate-800 text-xl">Quick Delivery</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Fast order processing and dispatching directly after your order confirmation via WhatsApp.
              </p>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 transform hover:-translate-y-1.5 text-center space-y-4">
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

      {/* BOTTOM WAVE SEPARATOR */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-[30px] sm:h-[45px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.64,11.39,98.66,28.69,147.8,36.27c66.5,10.23,135,11.69,202.8,2.37Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default About;