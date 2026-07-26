import React from "react";
import { Link } from "react-router-dom";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaExternalLinkAlt,
    FaChevronRight,
} from "react-icons/fa";

function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <footer className="bg-slate-950 text-slate-300 pt-14 pb-6 border-t border-slate-800/80">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">

                {/* MAIN FOOTER CONTENT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">

                    {/* COLUMN 1: BRAND & LOGO (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white tracking-tight leading-none">
                                SMR <span className="text-red-500">CHICKEN</span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                                Salsabeel Maju Resources
                            </span>
                        </div>

                        <p className="text-slate-400 text-md leading-relaxed max-w-sm">
                            Your trusted supplier of fresh poultry and frozen seafood in Shah Alam. Quality, hygiene, and fast delivery guaranteed every day.
                        </p>
                    </div>

                    {/* COLUMN 2: QUICK LINKS */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-white font-bold text-base tracking-wide border-l-4 border-red-600 pl-2.5">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-md">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() => window.scrollTo(0, 0)} // Forces scroll to top even on the same route
                                        className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors duration-200 group"
                                    >
                                        <FaChevronRight className="text-[10px] text-slate-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: CONTACT INFO (4 cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <h3 className="text-white font-bold text-base tracking-wide border-l-4 border-red-600 pl-2.5">
                            Contact Info
                        </h3>
                        <ul className="space-y-3 text-md text-slate-400">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-red-500 text-base flex-shrink-0 mt-0.5" />
                                <span>Jalan Titir 33/25 Technology Park, 40400 Shah Alam, Selangor</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-red-500 text-sm flex-shrink-0" />
                                <div className="space-x-2">
                                    <a href="tel:+60168050930" className="hover:text-white transition-colors">+6016-805 0930</a>
                                    <span>/</span>
                                    <a href="tel:+60123623786" className="hover:text-white transition-colors">+6012-362 3786</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-red-500 text-sm flex-shrink-0" />
                                <a href="mailto:salsabeelmaju786@gmail.com" className="hover:text-white transition-colors">
                                    salsabeelmaju786@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM COPYRIGHT & DEVELOPER CREDIT */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p className="text-center sm:text-left text-lg">
                        © {currentYear} <span className="text-slate-300 font-semibold">SMR Chicken</span>. All Rights Reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-center sm:text-right text-lg">
                        <span>Developed by</span>
                        <a
                            href="https://hamdhan--portfolio.web.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition-colors underline underline-offset-4 decoration-red-500/40 hover:decoration-red-400"
                        >
                            Mohamed Hamdhan
                            <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;