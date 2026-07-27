import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaFolderOpen,
  FaSpinner,
  FaImage,
} from "react-icons/fa";
import api from "../../services/axios";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Error deleting category. Please try again.");
    }
  }

  // Filter categories by search term
  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 shadow-lg">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <FaFolderOpen className="text-red-500" />
              Category <span className="text-red-500"> Management</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Organize poultry and seafood product classifications
            </p>
          </div>

          <button
            onClick={() => navigate("/categories/add")}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95"
          >
            <FaPlus />
            <span>Add New Category</span>
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
          />
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <FaSpinner className="animate-spin text-3xl text-red-500 mb-3" />
            <p className="text-sm font-medium">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-12 text-center text-slate-400">
            <FaFolderOpen className="text-5xl mx-auto mb-3 text-slate-600" />
            <p className="text-base font-semibold text-slate-300">No Categories Found</p>
            <p className="text-xs mt-1 text-slate-500">
              {searchQuery ? "Try searching for another term." : "Get started by adding a new category."}
            </p>
          </div>
        ) : (
          /* TABLE CONTAINER (Desktop & Tablet) */
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-700/60">
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">Category Name</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-sm">
                  {filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      {/* ID */}
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                        #{category.id}
                      </td>

                      {/* IMAGE */}
                      <td className="py-4 px-6">
                        {category.image ? (
                          <img
                            src={`/uploads/${category.image}`}
                            alt={category.name}
                            className="w-12 h-12 object-cover rounded-xl border border-slate-700 bg-slate-900"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/48?text=No+Img";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-500">
                            <FaImage />
                          </div>
                        )}
                      </td>

                      {/* NAME */}
                      <td className="py-4 px-6 font-semibold text-white">
                        {category.name}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            category.status === "Inactive"
                              ? "bg-slate-700 text-slate-400 border border-slate-600"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {category.status || "Active"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/categories/edit/${category.id}`)}
                          className="inline-flex items-center gap-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                          title="Edit Category"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="inline-flex items-center gap-1.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                          title="Delete Category"
                        >
                          <FaTrashAlt />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Categories;