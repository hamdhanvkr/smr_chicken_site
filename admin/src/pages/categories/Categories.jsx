import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../config/config";
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
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <FaFolderOpen className="text-red-600" />
              Category <span className="text-red-600">Management</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              Organize poultry and seafood product classifications
            </p>
          </div>

          <button
            onClick={() => navigate("/categories/add")}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-red-600/20 transition-all duration-200 active:scale-95"
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
            className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all shadow-sm"
          />
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <FaSpinner className="animate-spin text-3xl text-red-600 mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-400 shadow-sm">
            <FaFolderOpen className="text-5xl mx-auto mb-3 text-slate-300" />
            <p className="text-base font-bold text-slate-700">No Categories Found</p>
            <p className="text-xs mt-1 text-slate-500">
              {searchQuery ? "Try searching for another term." : "Get started by adding a new category."}
            </p>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW (Card Grid for screens smaller than 'sm') */}
            <div className="grid grid-cols-1 gap-4 sm:hidden">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    {/* Category Image */}
                    {category.image ? (
                      <img
                        src={`${IMAGE_URL}/${category.image}`}
                        alt={category.name}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 bg-slate-100 shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <FaImage className="text-lg" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          #{category.id}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${category.status === "Inactive"
                            ? "bg-slate-100 text-slate-600 border border-slate-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                        >
                          {category.status || "Active"}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base truncate mt-0.5">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => navigate(`/categories/edit/${category.id}`)}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 px-3 py-2 rounded-lg text-xs font-bold transition-all"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200/80 px-3 py-2 rounded-lg text-xs font-bold transition-all"
                    >
                      <FaTrashAlt />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP & TABLET TABLE VIEW (Hidden on mobile) */}
            <div className="hidden sm:block bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                      <th className="py-4 px-6">ID</th>
                      <th className="py-4 px-6">Image</th>
                      <th className="py-4 px-6">Category Name</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredCategories.map((category) => (
                      <tr
                        key={category.id}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        {/* ID */}
                        <td className="py-4 px-6 text-slate-400 font-mono text-xs font-semibold">
                          #{category.id}
                        </td>

                        {/* IMAGE */}
                        <td className="py-4 px-6">
                          {category.image ? (
                            <img
                              src={`${IMAGE_URL}/${category.image}`}
                              alt={category.name}
                              className="w-12 h-12 object-cover rounded-xl border border-slate-200 bg-slate-50"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "";
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                              <FaImage />
                            </div>
                          )}
                        </td>

                        {/* NAME */}
                        <td className="py-4 px-6 font-bold text-slate-900">
                          {category.name}
                        </td>

                        {/* STATUS */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${category.status === "Inactive"
                              ? "bg-slate-100 text-slate-600 border border-slate-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              }`}
                          >
                            {category.status || "Active"}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/categories/edit/${category.id}`)}
                            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                            title="Edit Category"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200/80 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
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
          </>
        )}

      </div>
    </div>
  );
}

export default Categories;