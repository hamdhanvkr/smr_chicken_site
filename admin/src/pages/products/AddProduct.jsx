import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaSave,
  FaSpinner,
  FaBoxOpen,
} from "react-icons/fa";
import api from "../../services/axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingImage, setExistingImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    price: "",
    description: "",
    status: "Active",
    image: null,
  });

  useEffect(() => {
    async function loadInitialData() {
      setFetching(true);
      try {
        await Promise.all([fetchCategories(), fetchProduct()]);
      } catch (error) {
        console.error("Error loading component data:", error);
      } finally {
        setFetching(false);
      }
    }
    loadInitialData();
  }, [id]);

  async function fetchCategories() {
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }

  async function fetchProduct() {
    try {
      const res = await api.get(`/products/${id}`);
      const product = res.data;

      setFormData({
        category_id: String(product.category_id || ""),
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        status: product.status || "Active",
        image: null,
      });

      if (product.image) {
        setExistingImage(`/uploads/${product.image}`);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("category_id", formData.category_id);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await api.put(`/products/${id}`, data);
      navigate("/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Update failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (fetching) {
    return (
      <div className="p-8 bg-slate-900 min-h-screen flex flex-col items-center justify-center text-slate-400">
        <FaSpinner className="animate-spin text-4xl text-red-500 mb-3" />
        <p className="text-sm font-medium">Fetching product data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 min-h-screen text-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 shadow-lg">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/products")}
              className="p-2.5 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              title="Back to Products"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <FaBoxOpen className="text-red-500" />
                Edit <span className="text-red-500">Product #{id}</span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Update product information, pricing, or status
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PRODUCT NAME */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl p-3.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* CATEGORY SELECT */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full bg-slate-900/80 border border-slate-700 text-white text-sm rounded-xl p-3.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
              >
                <option value="" disabled className="text-slate-500">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Price (RM) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl p-3.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Status
              </label>
              <select
                className="w-full bg-slate-900/80 border border-slate-700 text-white text-sm rounded-xl p-3.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl p-3.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* IMAGE UPLOAD & PREVIEW */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Product Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-900/50 border border-dashed border-slate-700 rounded-xl">
              {previewImage || existingImage ? (
                <div className="relative shrink-0">
                  <img
                    src={previewImage || existingImage}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-xl border border-slate-700 bg-slate-900"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/96?text=No+Img";
                    }}
                  />
                  {previewImage && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      New
                    </span>
                  )}
                </div>
              ) : (
                <div className="w-24 h-24 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-slate-500 shrink-0">
                  <FaCloudUploadAlt className="text-3xl mb-1" />
                  <span className="text-[10px]">No Image</span>
                </div>
              )}

              <div className="flex-1 w-full text-center sm:text-left">
                <input
                  type="file"
                  accept="image/*"
                  id="edit-image-upload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="edit-image-upload"
                  className="inline-flex items-center gap-2 bg-slate-700/80 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all border border-slate-600"
                >
                  <FaCloudUploadAlt className="text-base text-red-500" />
                  <span>
                    {previewImage || existingImage ? "Replace Image" : "Upload Image"}
                  </span>
                </label>
                <p className="text-slate-500 text-xs mt-2">
                  Leave unchanged if you want to keep the current photo.
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700/50">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-5 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 font-bold text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all duration-200"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin text-base" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Update Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;