import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaMoneyBillWave,
  FaSpinner,
  FaArrowUp,
  FaChartLine,
} from "react-icons/fa";
import api from "../../services/axios";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      // Fetching real metrics from your backend endpoints concurrently
      const [productsRes, categoriesRes, ordersRes] = await Promise.allSettled([
        api.get("/products"),
        api.get("/categories"),
        api.get("/orders"),
      ]);

      const products =
        productsRes.status === "fulfilled" ? productsRes.value.data || [] : [];
      const categories =
        categoriesRes.status === "fulfilled" ? categoriesRes.value.data || [] : [];
      const orders =
        ordersRes.status === "fulfilled" ? ordersRes.value.data || [] : [];

      // Calculate total revenue from orders (adjust property name if needed, e.g. order.total_price)
      const revenue = orders.reduce((sum, order) => {
        const orderTotal = Number(order.total_amount || order.total_price || order.total || 0);
        return sum + orderTotal;
      }, 0);

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
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
      accent: "from-red-500/20 to-red-600/10",
      iconBg: "bg-red-500/10 text-red-500 border-red-500/20",
    },
    {
      title: "Total Categories",
      value: stats.totalCategories,
      icon: FaTags,
      accent: "from-blue-500/20 to-blue-600/10",
      iconBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FaShoppingCart,
      accent: "from-amber-500/20 to-amber-600/10",
      iconBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
    {
      title: "Total Revenue",
      value: `RM ${stats.totalRevenue.toLocaleString("en-MY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: FaMoneyBillWave,
      accent: "from-emerald-500/20 to-emerald-600/10",
      iconBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 shadow-lg backdrop-blur-md">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <FaChartLine className="text-red-500" />
              Admin <span className="text-red-500">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Real-time store overview and metrics summary
            </p>
          </div>

          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="self-start sm:self-auto inline-flex items-center gap-2 bg-slate-700/80 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-600 transition-all disabled:opacity-50"
          >
            <FaSpinner className={`${loading ? "animate-spin" : ""} text-red-500`} />
            <span>Refresh Stats</span>
          </button>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 group"
              >
                {/* Subtle Background Accent Gradient */}
                <div
                  className={`absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br ${card.accent} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`}
                />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {card.title}
                    </p>
                    {loading ? (
                      <div className="h-9 w-24 bg-slate-700/50 animate-pulse rounded-lg my-1" />
                    ) : (
                      <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {card.value}
                      </p>
                    )}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border ${card.iconBg} shadow-inner shrink-0`}
                  >
                    <Icon className="text-xl sm:text-2xl" />
                  </div>
                </div>

                <div className="relative z-10 mt-4 pt-4 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <FaArrowUp className="text-[9px]" /> Active
                  </span>
                  <span>Updated live</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;