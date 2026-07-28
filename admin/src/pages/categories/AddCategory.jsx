import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaFolderPlus,
  FaCloudUploadAlt,
  FaSave,
  FaSpinner,
} from "react-icons/fa";
import api from "../../services/axios";

function AddCategory() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Handle image upload & preview setup
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file (PNG, JPG, WEBP).");
        return;
      }
      if (preview) URL.revokeObjectURL(preview);

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a category name.");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }

      await api.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/categories");
    } catch (error) {
      console.error("Failed to add category:", error);
      alert("Failed to add category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800">
      <div className="mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/categories")}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
              title="Back to Categories"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FaFolderPlus className="text-red-600" />
                Add <span className="text-red-600">New Category</span>
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Create a new classification for your inventory catalog
              </p>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CATEGORY NAME */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Category Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Whole Leg, Frozen Seafood"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* STATUS SELECT */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Status
              </label>
              <select
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* IMAGE UPLOAD & PREVIEW */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Category Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
              {preview ? (
                <div className="relative shrink-0">
                  <img
                    src={preview}
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
                  id="category-image-upload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="category-image-upload"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all border border-slate-300 shadow-sm"
                >
                  <FaCloudUploadAlt className="text-base text-red-600" />
                  <span>{preview ? "Change Image" : "Upload Image"}</span>
                </label>
                <p className="text-slate-400 text-xs mt-2">
                  Recommended size: square aspect ratio, JPG, PNG, or WEBP.
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/categories")}
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
                  <span>Save Category</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;