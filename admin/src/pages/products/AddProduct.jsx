import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaSave,
  FaSpinner,
  FaBoxOpen,
} from "react-icons/fa";
import api from "../../services/axios";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setFetching(true);
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setFetching(false);
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

      await api.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); navigate("/products");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Creation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (fetching) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center justify-center text-slate-400">
        <FaSpinner className="animate-spin text-3xl text-red-600 mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading form requirements...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800">
      <div className="mx-auto space-y-6">

        {/* HEADER SECTION */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/products")}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
              title="Back to Products"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FaBoxOpen className="text-red-600" />
                Add <span className="text-red-600">New Product</span>
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Create a new item in your inventory catalog
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PRODUCT NAME */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Product Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fresh Whole Leg Chicken"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* CATEGORY SELECT */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                required
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
              >
                <option value="" disabled className="text-slate-400">
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
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Price (RM) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Status
              </label>
              <select
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter product details, specs, or notes..."
              className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* IMAGE UPLOAD & PREVIEW */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Product Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
              {previewImage ? (
                <div className="relative shrink-0">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-xl border border-slate-200 bg-white shadow-sm"
                  />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    Selected
                  </span>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-400 shrink-0 shadow-sm">
                  <FaCloudUploadAlt className="text-3xl mb-1 text-slate-400" />
                  <span className="text-[10px] font-medium text-slate-500">No Image</span>
                </div>
              )}

              <div className="flex-1 w-full text-center sm:text-left">
                <input
                  type="file"
                  accept="image/*"
                  id="add-image-upload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="add-image-upload"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all border border-slate-300 shadow-sm"
                >
                  <FaCloudUploadAlt className="text-base text-red-600" />
                  <span>{previewImage ? "Change Image" : "Upload Image"}</span>
                </label>
                <p className="text-slate-400 text-xs mt-2">
                  Recommended size: square aspect ratio, JPG or PNG format.
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-5 py-3 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-red-600/20 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin text-base" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Save Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;