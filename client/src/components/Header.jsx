import { Link } from "react-router-dom";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/smr_logo1.png";

function Header() {
    return (
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="w-full mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between h-20 sm:h-24 gap-4">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center py-2 transition-opacity hover:opacity-90">
                        <img
                            src={logo}
                            alt="SMR Chicken"
                            className="h-16 sm:h-20 w-auto object-contain max-w-[220px] sm:max-w-[280px]"
                        />
                    </Link>

                    {/* Right Actions */}
                    {/* <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="https://wa.me/919999999999"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                        >
                            <FaWhatsapp size={18} />
                            <span className="hidden sm:inline">WhatsApp Order</span>
                        </a>

                        <Link
                            to="/cart"
                            className="relative p-2 text-gray-700 hover:text-red-600 rounded-full hover:bg-gray-50 transition-colors"
                            aria-label="View Shopping Cart"
                        >
                            <FaShoppingCart size={24} />
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                0
                            </span>
                        </Link>
                    </div> */}

                </div>
            </div>
        </header>
    );
}

export default Header;