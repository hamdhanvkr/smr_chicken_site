import React from "react";
import {
  FaStore,
  FaShoppingBag,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Retail() {
  const phoneNumber = "60168050930";

  // Retail specific benefits structured like Wholesale
  const benefits = [
    {
      icon: <FaStore className="text-red-500 text-2xl" />,
      title: "Fresh Daily Counter",
      description:
        "Clean, hygienic, and fresh chicken dressed daily for wholesome household cooking.",
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      title: "100% Halal Certified",
      description:
        "Strictly processed under standard Halal protocols ensuring safety and purity for your family.",
    },
    {
      icon: <FaShoppingBag className="text-red-500 text-2xl" />,
      title: "Flexible Portions",
      description:
        "Buy exact quantities needed—whether a single chicken, 1kg of cut legs, or fresh seafood.",
    },
    {
      icon: <FaClock className="text-red-500 text-2xl" />,
      title: "Quick Walk-in & Pick-up",
      description:
        "Visit our outlet in Shah Alam for fast service, friendly staff support, and easy parking.",
    },
  ];

  // Retail product catalog structured in 3x3 layout
  const productsSupplied = [
    "Fresh Whole Chicken (Custom Cut)",
    "Clean Chicken Drumsticks & Legs",
    "Boneless Breast & Tenderloin",
    "Fresh Wings & Thigh Portions",
    "Chicken Soup Bones & Feet",
    "Cleaned Fresh & Frozen Seafood",
    "Marinated Ayam Kunyit / Spice Cuts",
    "Chicken Mince & Patties",
    "Specialty Farm Ducks & Eggs",
  ];

  const retailMessage = encodeURIComponent(
    "Hello SMR Chicken! I would like to make a retail order for home delivery / self pick-up."
  );

  return (
    <section className="relative w-full bg-slate-50 min-h-screen pt-14 pb-10 md:pb-16 overflow-hidden">
      {/* TOP WAVE SEPARATOR */}
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

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* HERO BANNER SECTION (Matches Wholesale dark background style) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/50 inline-block mb-4">
              Fresh For Your Home
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Farm-Fresh Poultry for <span className="text-red-500">Your Family</span>
            </h1>
            <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">
              Enjoy fresh Halal chicken, prime cuts, and clean seafood prepared daily for your household cooking. Direct from Salsabeel Maju Resources in Shah Alam.
            </p>
          </div>
        </div>

        {/* WHY SHOP WITH US (4 Card Grid matching Wholesale) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Families Choose <span className="text-red-600">SMR Chicken</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Hygienic processing, friendly service, and premium quality for your everyday meals.
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

        {/* PRODUCTS OFFERED FOR RETAIL (3x3 Grid matching Wholesale) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-12 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Fresh Retail Cuts <span className="text-red-600">Available</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We offer custom butchery and portion sizes tailored for household cooking and home delivery across Shah Alam.
            </p>

            {/* 3 x 3 Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {productsSupplied.map((product, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-700 font-semibold text-xs sm:text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <FaCheckCircle className="text-emerald-500 text-base flex-shrink-0" />
                  <span>{product}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOCATION & STORE INFO */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Store Outlet</span>
            <h3 className="text-2xl font-extrabold text-slate-900">Visit Our Store in Shah Alam</h3>
            <p className="text-slate-600 text-sm flex items-start gap-2 pt-1">
              <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
              <span>Jalan Titir 33/25 Technology Park, 40400 Shah Alam, Selangor</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Retail;