import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaBoxOpen,
  FaSpinner,
  FaImage,
} from "react-icons/fa";
import api from "../../services/axios";
import { IMAGE_URL } from "../../config/config";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Error deleting product. Please try again.");
    }
  }

  // Filter products by name or category name
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <FaBoxOpen className="text-red-600" />
              Product <span className="text-red-600">Management</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Manage inventory, pricing, and catalog items
            </p>
          </div>

          <button
            onClick={() => navigate("/products/add")}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-red-600/20 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <FaPlus />
            <span>Add New Product</span>
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all shadow-sm"
          />
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <FaSpinner className="animate-spin text-3xl text-red-600 mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading products catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-400 shadow-sm">
            <FaBoxOpen className="text-5xl mx-auto mb-3 text-slate-300" />
            <p className="text-base font-bold text-slate-700">No Products Found</p>
            <p className="text-xs mt-1 text-slate-500">
              {searchQuery ? "Try searching for another term." : "Get started by adding a new product to your inventory."}
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP & TABLET VIEW (TABLE) */}
            <div className="hidden md:block bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                      <th className="py-4 px-6">ID</th>
                      <th className="py-4 px-6">Image</th>
                      <th className="py-4 px-6">Product Details</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Price</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        {/* ID */}
                        <td className="py-4 px-6 text-slate-400 font-mono text-xs font-medium">
                          #{product.id}
                        </td>

                        {/* IMAGE */}
                        <td className="py-4 px-6">
                          {product.image ? (
                            <img
                              src={`${IMAGE_URL}/${product.image}`}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
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
                        <td className="py-4 px-6 font-bold text-slate-800">
                          {product.name}
                        </td>

                        {/* CATEGORY */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {product.category_name || "Unassigned"}
                          </span>
                        </td>

                        {/* PRICE */}
                        <td className="py-4 px-6 font-extrabold text-red-600">
                          RM {product.price}
                        </td>

                        {/* STATUS */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${product.status === "Inactive" || product.status === "Out of Stock"
                              ? "bg-slate-100 text-slate-500 border border-slate-200"
                              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              }`}
                          >
                            {product.status || "Active"}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/products/edit/${product.id}`)}
                            className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200/80 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm"
                            title="Edit Product"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200/80 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm"
                            title="Delete Product"
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

            {/* MOBILE VIEW (CARD CARDS) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={`${IMAGE_URL}/${product.image}`} alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-slate-50 shrink-0 shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <FaImage className="text-xl" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400 font-mono text-[10px] font-semibold">
                          #{product.id}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${product.status === "Inactive" || product.status === "Out of Stock"
                            ? "bg-slate-100 text-slate-500 border border-slate-200"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            }`}
                        >
                          {product.status || "Active"}
                        </span>
                      </div>
                      <h3 className="text-slate-900 font-extrabold text-base truncate mt-0.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        Category: <span className="font-medium text-slate-700">{product.category_name || "Unassigned"}</span>
                      </p>
                      <p className="text-sm font-black text-red-600 mt-1">
                        RM {product.price}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200/80 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200/80 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      <FaTrashAlt />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Products;