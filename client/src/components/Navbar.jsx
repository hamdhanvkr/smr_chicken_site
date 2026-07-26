import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate("/products");
        }
    };

    const getLinkClass = ({ isActive }) =>
        `relative py-2 text-lg font-medium transition-colors duration-200 ${
            isActive
                ? "text-red-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                : "text-gray-700 hover:text-red-600"
        }`;

    const getMobileLinkClass = ({ isActive }) =>
        `block py-2.5 px-4 text-base font-medium rounded-lg transition-colors ${
            isActive
                ? "bg-red-50 text-red-600 font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
        }`;

    return (
        <nav className="bg-gray-50 border-b border-gray-200 shadow-sm sticky top-0 z-40">
            <div className="w-full mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between h-14 gap-4">
                    
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/" className={getLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/products" className={getLinkClass}>
                            Products
                        </NavLink>
                        <NavLink to="/about" className={getLinkClass}>
                            About
                        </NavLink>
                        <NavLink to="/contact" className={getLinkClass}>
                            Contact
                        </NavLink>
                    </div>

                    {/* Search Bar in Navbar */}
                    <form 
                        onSubmit={handleSearch}
                        className="flex items-center flex-1 md:max-w-xs lg:max-w-sm relative"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-white border border-gray-300 rounded-full py-1.5 pl-4 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
                        />
                        <button 
                            type="submit" 
                            aria-label="Search"
                            className="absolute right-1 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full transition-colors duration-200"
                        >
                            <FaSearch size={12} />
                        </button>
                    </form>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-600 hover:text-red-600 focus:outline-none rounded-lg hover:bg-gray-100"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>

                </div>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="md:hidden py-3 border-t border-gray-200 space-y-1">
                        <NavLink
                            to="/"
                            className={getMobileLinkClass}
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={getMobileLinkClass}
                            onClick={closeMenu}
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={getMobileLinkClass}
                            onClick={closeMenu}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={getMobileLinkClass}
                            onClick={closeMenu}
                        >
                            Contact
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;