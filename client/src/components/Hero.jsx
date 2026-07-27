import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/axios";
import { IMAGE_URL } from "../config/config";

import {
    FaArrowRight,
    FaWhatsapp,
    FaShieldAlt,
    FaTruck,
    FaMedal,
    FaShoppingBag,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

function Hero() {
    const [animate, setAnimate] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // Business WhatsApp Configuration
    const phoneNumber = "60168050930";

    // Fetch Products from API and limit to the latest 4 products
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await api.get("/products");

                if (Array.isArray(res.data)) {
                    setProducts(res.data.slice(0, 4));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Entrance Animation Trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Auto-slide image every 4 seconds
    useEffect(() => {
        if (products.length === 0) return;
        const interval = setInterval(() => {
            setCurrentImgIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [products.length]);

    const nextImage = () => {
        if (products.length === 0) return;
        setCurrentImgIndex((prev) => (prev + 1) % products.length);
    };

    const prevImage = () => {
        if (products.length === 0) return;
        setCurrentImgIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    // Active product selection for the slider
    const activeProduct = products[currentImgIndex] || null;

    // Helper for generating custom WhatsApp order URL for an individual product
    const getProductWhatsappUrl = (product) => {
        const message = encodeURIComponent(
            `Hello! I would like to order:\n\n*Product:* ${product.name}\n*Price:* RM ${product.price}\n\nPlease share payment and delivery details.`
        );
        return `https://wa.me/${phoneNumber}?text=${message}`;
    };

    // Staggered CSS Animation classes
    const baseTransition = "transition-all duration-1000 ease-out transform";
    const hiddenState = "opacity-0 translate-y-8 scale-95";
    const visibleState = "opacity-100 translate-y-0 scale-100";

    return (
        <section className="relative w-full bg-gradient-to-b from-slate-50 via-red-50/20 to-amber-50/20 text-slate-900 overflow-hidden pt-6 pb-12 lg:pt-12 lg:pb-16">
            {/* SUBTLE BACKGROUND GRID PATTERN */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* SOFT AMBIENT LIGHT GLOWS */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-red-200/30 blur-3xl pointer-events-none rounded-full animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/30 blur-3xl pointer-events-none rounded-full animate-pulse delay-700" />

            {/* MAIN CONTENT CONTAINER */}
            <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* LEFT COLUMN: HERO TEXT & CTAs (ORDER 2 ON MOBILE, ORDER 1 ON DESKTOP) */}
                    <div className={`order-2 lg:order-1 text-center lg:text-left space-y-6`}>

                        {/* Eyebrow Badge */}
                        <div className={`${baseTransition} delay-100 ${animate ? visibleState : hiddenState}`}>
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-amber-100 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide border border-red-200 shadow-sm">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                                </span>
                                100% Fresh & Farm-Sourced Daily
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className={`${baseTransition} delay-300 text-3xl sm:text-4xl lg:text-4xl xl:text-4xl font-black leading-tight tracking-tight text-slate-900 ${animate ? visibleState : hiddenState}`}>
                            Unmatched{" "}
                            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                                Freshness
                            </span>
                            ,<br />
                            Quality You Can Taste.
                        </h1>

                        {/* Subtext */}
                        <p className={`${baseTransition} delay-500 text-slate-600 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 ${animate ? visibleState : hiddenState}`}>
                            Supplying premium tender cuts directly to your doorstep or business. SMR guarantees top-tier hygienic stock maintained through strict cold-chain standards.
                        </p>

                        {/* Action Buttons */}
                        <div className={`${baseTransition} delay-700 pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center ${animate ? visibleState : hiddenState}`}>
                            <Link
                                to="/products"
                                className="group w-60 sm:w-60 inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-extrabold text-base shadow-lg shadow-red-600/25 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                            >
                                <span>Browse Products</span>
                                <FaArrowRight className="text-white/80 group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className={`${baseTransition} delay-1000 pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-700 font-bold ${animate ? visibleState : hiddenState}`}>
                            <div className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <FaShieldAlt className="text-red-600 text-base flex-shrink-0" />
                                <span>Strict Hygiene</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <FaTruck className="text-red-600 text-base flex-shrink-0" />
                                <span>On-Time Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <FaMedal className="text-red-600 text-base flex-shrink-0" />
                                <span>100% Halal</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: DYNAMIC API SLIDER (ORDER 1 ON MOBILE, ORDER 2 ON DESKTOP) */}
                    <div className={`order-1 lg:order-2 w-full ${baseTransition} delay-500 ${animate ? visibleState : hiddenState}`}>
                        <div className="w-full">

                            {/* Main Display Card */}
                            <div className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xl space-y-4">

                                {/* Card Header */}
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2">
                                        <FaShoppingBag className="text-red-600 text-base" />
                                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                                            Latest Arrivals & Rates
                                        </h3>
                                    </div>
                                    <span className="text-[10px] uppercase font-extrabold tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                        Top 4
                                    </span>
                                </div>

                                {/* Loading Skeleton */}
                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center animate-pulse">
                                        <div className="md:col-span-5 h-64 bg-slate-200 rounded-xl" />
                                        <div className="md:col-span-7 space-y-3">
                                            <div className="h-7 bg-slate-200 rounded w-full" />
                                            <div className="h-7 bg-slate-200 rounded w-full" />
                                            <div className="h-7 bg-slate-200 rounded w-full" />
                                            <div className="h-7 bg-slate-200 rounded w-full" />
                                        </div>
                                    </div>
                                ) : products.length === 0 ? (
                                    <div className="text-center py-10 text-slate-500 text-sm">
                                        No products found in backend stock list.
                                    </div>
                                ) : (
                                    /* Main Interactive Grid */
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">

                                        {/* PRODUCT IMAGE DISPLAY */}
                                        <div className="md:col-span-5 relative w-full h-60 sm:h-64 bg-slate-50 rounded-xl overflow-hidden group shadow-inner border border-slate-200 flex items-center justify-center p-2">
                                            <img
                                                src={`${IMAGE_URL}/${activeProduct?.image}`}
                                                alt={activeProduct?.name || "Fresh Product"}
                                                onError={(e) => {
                                                   e.target.src = "/no-image.png";
                                                }}
                                                className="w-full h-full object-contain transition-all duration-500 ease-out transform group-hover:scale-105"
                                            />

                                            {/* Slider Navigation Controls */}
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                                aria-label="Previous Product"
                                            >
                                                <FaChevronLeft size={12} />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                                aria-label="Next Product"
                                            >
                                                <FaChevronRight size={12} />
                                            </button>

                                            {/* Indicator Dots */}
                                            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full max-w-[85%] overflow-x-auto">
                                                {products.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentImgIndex(idx)}
                                                        className={`h-1.5 rounded-full transition-all flex-shrink-0 ${currentImgIndex === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* PRODUCTS TABLE */}
                                        <div className="md:col-span-7 overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                                        <th className="py-2 px-2">Item</th>
                                                        <th className="py-2 px-2">Price</th>
                                                        <th className="py-2 px-2 text-right">Order</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                                                    {products.map((product, idx) => {
                                                        const isSelected = currentImgIndex === idx;
                                                        return (
                                                            <tr
                                                                key={product.id || idx}
                                                                onClick={() => setCurrentImgIndex(idx)}
                                                                className={`cursor-pointer transition-colors ${isSelected
                                                                        ? "bg-red-50/90 font-bold"
                                                                        : "hover:bg-slate-50"
                                                                    }`}
                                                            >
                                                                <td className="py-2.5 px-2">
                                                                    <div className="flex items-center gap-1.5">
                                                                        {isSelected && (
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping flex-shrink-0" />
                                                                        )}
                                                                        <span
                                                                            className={`line-clamp-1 ${isSelected ? "text-red-700" : "text-slate-800"
                                                                                }`}
                                                                        >
                                                                            {product.name}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-2.5 px-2 font-extrabold text-red-600 whitespace-nowrap">
                                                                    RM {product.price}
                                                                </td>
                                                                <td className="py-2.5 px-2 text-right">
                                                                    <a
                                                                        href={getProductWhatsappUrl(product)}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white px-2.5 py-1 rounded-md text-xs font-bold transition-all border border-emerald-200"
                                                                    >
                                                                        <FaWhatsapp size={12} />
                                                                        <span>Order</span>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                )}

                                {/* Footer Link */}
                                <div className="pt-1 flex items-center justify-end bg-gradient-to-r from-red-50 to-amber-50 p-2.5 rounded-xl border border-red-100">
                                    <Link
                                        to="/products"
                                        className="text-xs font-extrabold text-red-600 hover:text-red-700 hover:underline whitespace-nowrap"
                                    >
                                        Full Menu &rarr;
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM WAVE SEPARATOR */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
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

export default Hero;