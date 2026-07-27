import { Link } from "react-router-dom";
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
                </div>
            </div>
        </header>
    );
}

export default Header;