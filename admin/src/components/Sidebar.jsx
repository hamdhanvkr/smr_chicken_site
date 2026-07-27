import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStore,
} from "react-icons/fa";

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Links Definition
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Categories", path: "/categories", icon: <FaTags /> },
    // { name: "Orders", path: "/orders", icon: <FaClipboardList /> },
    // { name: "Users", path: "/users", icon: <FaUsers /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setMobileOpen(false);
    navigate("/login");
  };

  const handleItemClick = () => {
    // Automatically close sidebar on mobile when a link is clicked
    setMobileOpen(false);
  };

  return (
    <>
      {/* MOBILE TRIGGER BUTTON */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-3 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-colors focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* BACKDROP FOR MOBILE */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800/80 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* TOP SECTION: BRAND LOGO & NAV */}
        <div>
          {/* HEADER / BRANDING */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/dashboard" onClick={handleItemClick} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-lg">
                SMR
              </div>
              <div>
                <h1 className="text-base font-black text-white tracking-wide">
                  ADMIN <span className="text-red-500">PANEL</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Salsabeel Maju
                </p>
              </div>
            </Link>

            {/* CLOSE BUTTON (MOBILE ONLY) */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
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
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          {/* VIEW MAIN STORE */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleItemClick}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <FaStore className="text-sm" />
            <span>View Public Store</span>
          </a>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-600 hover:text-white border border-red-500/20 transition-all duration-200 group"
          >
            <FaSignOutAlt className="text-base group-hover:translate-x-0.5 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;