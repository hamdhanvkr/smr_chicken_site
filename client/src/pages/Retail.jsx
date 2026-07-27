import React from "react";
import { FaWhatsapp, FaStore, FaClock, FaShoppingBag, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

function Retail() {
  const phoneNumber = "60168050930";

  const features = [
    {
      icon: <FaStore className="text-red-500 text-2xl" />,
      title: "Fresh Daily Counter",
      description: "Clean, hygienic, and fresh chicken dressed daily for household cooking.",
    },
    {
      icon: <FaShoppingBag className="text-red-500 text-2xl" />,
      title: "Flexible Quantities",
      description: "Buy exact quantities, whether it's a single chicken, 1kg of cut legs, or fresh seafood.",
    },
    {
      icon: <FaClock className="text-red-500 text-2xl" />,
      title: "Quick Walk-in & Pick-up",
      description: "Visit our outlet in Shah Alam for fast service and friendly staff support.",
    },
  ];

  const retailMessage = encodeURIComponent(
    "Hello SMR Chicken! I would like to make a retail order for home delivery / self pick-up."
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO BANNER SECTION */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden mb-12">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-red-200 bg-red-900/60 px-3 py-1 rounded-full border border-red-400/30 inline-block mb-4">
              Fresh For Your Home
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Farm-Fresh Poultry for <span className="text-amber-300">Your Family</span>
            </h1>
            <p className="mt-4 text-slate-100 text-base md:text-lg leading-relaxed">
              Enjoy fresh Halal chicken, prime cuts, and clean seafood prepared daily for your kitchen.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${phoneNumber}?text=${retailMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all duration-200 active:scale-95"
              >
                <FaWhatsapp className="text-xl" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* RETAIL ADVANTAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* LOCATION & PICKUP INFO */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Store Outlet</span>
            <h3 className="text-2xl font-extrabold text-slate-900">Visit Our Store in Shah Alam</h3>
            <p className="text-slate-600 text-sm flex items-start gap-2 pt-1">
              <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
              <span>Jalan Titir 33/25 Technology Park, 40400 Shah Alam, Selangor</span>
            </p>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex-shrink-0"
          >
            <FaMapMarkerAlt className="text-red-400" />
            <span>Open in Maps</span>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Retail;