import React from "react";
import { FaWhatsapp, FaTruck, FaShieldAlt, FaBoxes, FaTags, FaCheckCircle } from "react-icons/fa";

function Wholesale() {
  const phoneNumber = "60168050930";

  const benefits = [
    {
      icon: <FaTags className="text-red-500 text-2xl" />,
      title: "Bulk Pricing Discounts",
      description: "Competitive wholesale pricing tailored for restaurants, hotels, caterers, and supermarkets.",
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      title: "100% Halal & Fresh",
      description: "Hygienically processed daily to ensure strict quality control and full compliance with Halal standards.",
    },
    {
      icon: <FaTruck className="text-red-500 text-2xl" />,
      title: "Reliable Daily Delivery",
      description: "On-time cold-chain supply delivery across Shah Alam and surrounding Selangor areas.",
    },
    {
      icon: <FaBoxes className="text-red-500 text-2xl" />,
      title: "Custom Cut & Portioning",
      description: "We supply whole chickens, specific cuts (legs, breast, wings), and bulk frozen seafood upon request.",
    },
  ];

  const productsSupplied = [
    "Whole Fresh Chicken (Dressed)",
    "Chicken Whole Leg & Thighs",
    "Chicken Breast & Fillet",
    "Chicken Wings & Drumsticks",
    "Chicken Bones & Organs",
    "Frozen Seafood (Fish, Prawns, Squids)",
  ];

  const wholesaleMessage = encodeURIComponent(
    "Hello SMR Chicken! I am interested in placing a Wholesale/Bulk order. Please share your wholesale price list."
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO BANNER SECTION */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/50 inline-block mb-4">
              B2B & Bulk Supply
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Wholesale Poultry & <span className="text-red-500">Seafood Partner</span>
            </h1>
            <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">
              Supply your business with premium, fresh Halal chicken and frozen seafood. Direct from Salsabeel Maju Resources in Shah Alam.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${phoneNumber}?text=${wholesaleMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all duration-200 active:scale-95"
              >
                <FaWhatsapp className="text-xl" />
                <span>Inquire Wholesale Pricing</span>
              </a>
            </div>
          </div>
        </div>

        {/* WHY PARTNER WITH US */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Businesses Choose <span className="text-red-600">SMR Chicken</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Dependable quality and pricing designed to support your food service operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS OFFERED FOR WHOLESALE */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Bulk Products <span className="text-red-600">Available</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We cater to custom weight requirements and bulk packaging sizes for all commercial operations across Selangor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {productsSupplied.map((product, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-700 font-semibold text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <FaCheckCircle className="text-emerald-500 text-base flex-shrink-0" />
                  <span>{product}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-4">
            <h3 className="text-xl font-bold">Ready to place a bulk order?</h3>
            <p className="text-slate-400 text-sm">
              Speak directly with our wholesale desk for custom quotes and regular delivery schedules.
            </p>
            <a
              href={`https://wa.me/${phoneNumber}?text=${wholesaleMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all"
            >
              <FaWhatsapp className="text-lg" />
              <span>Contact Wholesale Manager</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Wholesale;