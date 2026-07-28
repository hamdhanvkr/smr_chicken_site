import { Link } from "react-router-dom";
import logo from "../assets/smr_logo1.png";

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all">
      <div className="w-full mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo Container */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center py-2 group transition-all"
          >
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm group-hover:border-red-200 transition-colors">
              <img
                src={logo}
                alt="SMR Chicken"
                className="h-10 sm:h-12 w-auto object-contain max-w-[180px] sm:max-w-[240px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                }}
              />
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Header;