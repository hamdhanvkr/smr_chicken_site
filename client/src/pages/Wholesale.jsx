import React from "react";
import { FaTruck, FaShieldAlt, FaBoxes, FaTags, FaCheckCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
        "Boneless Chicken Meat & Mince",
        "Marinated & Seasoned Cuts",
        "Bulk Frozen Duck & Specialty Poultry",
    ];

    const wholesaleMessage = encodeURIComponent(
        "Hello SMR Chicken! I am interested in placing a Wholesale/Bulk order. Please share your wholesale price list."
    );

    return (
        <section className="relative w-full bg-slate-50 min-h-screen pt-14 pb-10 md:pb-16 overflow-hidden">
            
            <Helmet>
                <title>Wholesale Chicken Supplier in Shah Alam | SMR Chicken</title>

                <meta
                    name="description"
                    content="SMR Chicken supplies fresh Halal chicken, poultry cuts, and frozen seafood in bulk for restaurants, hotels, caterers, supermarkets, and food businesses across Shah Alam and Selangor."
                />

                <meta
                    name="keywords"
                    content="wholesale chicken supplier Shah Alam, bulk poultry supplier Selangor, Halal chicken wholesale Malaysia, frozen seafood wholesale, restaurant chicken supplier, hotel poultry supplier, SMR Chicken"
                />

                <link
                    rel="canonical"
                    href="https://smrchicken.com/wholesale"
                />

                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Wholesale Fresh Chicken Supplier | SMR Chicken"
                />
                <meta
                    property="og:description"
                    content="Bulk supply of fresh Halal chicken and frozen seafood for restaurants, hotels, caterers, supermarkets, and food businesses."
                />
            </Helmet>
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
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                Bulk Products <span className="text-red-600">Available</span>
                            </h2>
                            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
                                We cater to custom weight requirements and bulk packaging sizes for all commercial operations across Selangor.
                            </p>
                        </div>

                        {/* Responsive Grid: 1 column on mobile, 2 on small tablets, 3 on desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-2">
                            {productsSupplied.map((product, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 text-slate-700 font-semibold text-xs sm:text-sm bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-100/80 transition-colors hover:bg-slate-100/60"
                                >
                                    <FaCheckCircle className="text-emerald-500 text-base sm:text-lg flex-shrink-0" />
                                    <span className="leading-tight">{product}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Wholesale;