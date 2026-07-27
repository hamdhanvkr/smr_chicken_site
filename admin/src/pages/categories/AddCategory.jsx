import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaFolderPlus,
  FaCloudUploadAlt,
  FaSpinner,
  FaImage,
} from "react-icons/fa";
import api from "../../services/axios";

function AddCategory() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a category name.");
    if (!image) return alert("Please upload a category image.");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", status);
      formData.append("image", image);

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
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 min-h-screen text-slate-200">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER & BACK BUTTON */}
        <div className="flex items-center justify-between">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
          >
            <FaArrowLeft /> Back to Categories
          </Link>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-700/60">
            <div className="p-3 bg-red-600/10 border border-red-500/20 text-red-500 rounded-xl text-xl">
              <FaFolderPlus />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Add New Category
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Create a new classification for your poultry or seafood items
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* CATEGORY NAME */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Whole Leg, Frozen Seafood"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                required
              />
            </div>

            {/* IMAGE UPLOAD & PREVIEW */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Category Image <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* File Dropzone */}
                <label className="sm:col-span-2 border-2 border-dashed border-slate-700 hover:border-red-500/60 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all group">
                  <FaCloudUploadAlt className="text-3xl text-slate-500 group-hover:text-red-500 mb-2 transition-colors" />
                  <span className="text-xs font-semibold text-slate-300">
                    Click to upload image
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">
                    PNG, JPG or WEBP (Max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>

                {/* Live Image Preview */}
                <div className="flex flex-col items-center justify-center p-3 bg-slate-900/80 border border-slate-700 rounded-xl h-36">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-500 text-xs gap-1">
                      <FaImage className="text-2xl" />
                      <span>No preview</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* STATUS SELECT */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-slate-700/60 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/categories")}
                className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-700/50 text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Category</span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default AddCategory;