import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStore,
  FaShieldAlt,
} from "react-icons/fa";
import logo from "../assets/smr_logo1.png";

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Links Definition
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Categories", path: "/categories", icon: <FaTags /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setMobileOpen(false);
    navigate("/");
  };

  const handleItemClick = () => {
    // Automatically close sidebar on mobile when a link is clicked
    setMobileOpen(false);
  };

  return (
    <>
      {/* MOBILE TRIGGER BUTTON (FLOATING BAR) */}
      <div className="md:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-3 bg-white text-slate-700 border border-slate-200/80 rounded-xl shadow-md hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-600/20 active:scale-95"
          aria-label="Toggle Sidebar"
        >
          {mobileOpen ? <FaTimes size={18} className="text-slate-900" /> : <FaBars size={18} className="text-slate-700" />}
        </button>
      </div>

      {/* BACKDROP FOR MOBILE */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200/80 text-slate-600 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xl md:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* TOP SECTION: BRAND LOGO & NAV */}
        <div>
          {/* HEADER / BRANDING */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link to="/dashboard" onClick={handleItemClick} className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <img
                  src={logo}
                  alt="SMR Logo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}
                />
              </div>
              <div>
                <h1 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  Admin <span className="text-red-600">Portal</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Salsabeel Maju
                </p>
              </div>
            </Link>

            {/* CLOSE BUTTON (MOBILE ONLY) */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management
            </div>

            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleItemClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className={`text-base ${active ? "text-white" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION: MAIN SITE LINK & LOGOUT */}
        <div className="p-4 border-t border-slate-100 space-y-2">


          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-100 transition-all duration-200 group cursor-pointer"
          >
            <FaSignOutAlt className="text-base group-hover:-translate-x-0.5 transition-transform" />
            <span>Logout</span>
          </button>

          {/* SECURITY FOOTER */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <FaShieldAlt className="text-[10px]" />
            <span>Protected Admin Area</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;