import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaSpinner,
  FaChartLine,
  FaSyncAlt,
  FaArrowUp,
  FaShieldAlt,
} from "react-icons/fa";
import api from "../../services/axios";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.allSettled([
        api.get("/products"),
        api.get("/categories"),
      ]);

      const products =
        productsRes.status === "fulfilled" ? productsRes.value.data || [] : [];
      const categories =
        categoriesRes.status === "fulfilled" ? categoriesRes.value.data || [] : [];

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
      });
    } catch (error) {
      console.error("Failed to load dashboard metrics:", error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: FaBoxOpen,
      accent: "from-red-50 to-red-100/50",
      iconBg: "bg-red-50 text-red-600 border-red-100",
      badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Total Categories",
      value: stats.totalCategories,
      icon: FaTags,
      accent: "from-slate-100 to-slate-200/50",
      iconBg: "bg-slate-100 text-slate-700 border-slate-200/80",
      badgeColor: "text-blue-600 bg-blue-50 border-blue-100",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800 selection:bg-red-500 selection:text-white">
      <div className="mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm transition-all">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <FaChartLine className="text-red-600" />
              Admin <span className="text-red-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
              Real-time catalog metrics and store overview
            </p>
          </div>

          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="self-start sm:self-auto inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {loading ? (
              <FaSpinner className="animate-spin text-red-600 text-sm" />
            ) : (
              <FaSyncAlt className="text-slate-500 text-xs" />
            )}
            <span>Refresh Metrics</span>
          </button>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300 group"
              >
                {/* Background Accent Gradient */}
                <div
                  className={`absolute -right-8 -bottom-8 w-36 h-36 bg-gradient-to-br ${card.accent} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`}
                />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {card.title}
                    </p>
                    {loading ? (
                      <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-lg my-1" />
                    ) : (
                      <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {card.value}
                      </p>
                    )}
                  </div>

                  <div
                    className={`p-4 rounded-2xl border ${card.iconBg} shadow-sm shrink-0 transition-transform group-hover:scale-105`}
                  >
                    <Icon className="text-2xl sm:text-3xl" />
                  </div>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${card.badgeColor}`}>
                    <FaArrowUp className="text-[9px]" /> Active Catalog
                  </span>
                  <span className="font-medium text-slate-400">Updated Live</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SYSTEM STATUS FOOTER CARD */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <FaShieldAlt className="text-red-600 text-sm" />
            <span>SMR Store Management System • Connected to Live Database</span>
          </div>
          <span className="hidden sm:inline-block font-semibold text-slate-400">v1.0.0</span>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;