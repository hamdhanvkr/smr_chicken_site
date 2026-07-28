import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { IMAGE_URL } from "../../config/config";
import {
  FaArrowLeft,
  FaEdit,
  FaCloudUploadAlt,
  FaSpinner,
  FaImage,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes
} from "react-icons/fa";
import api from "../../services/axios";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [preview, setPreview] = useState(null);

  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  async function fetchCategory() {
    setFetching(true);
    try {
      const res = await api.get(`/categories/${id}`);
      setName(res.data.name || "");
      setStatus(res.data.status || "Active");
      setOldImage(res.data.image || "");
    } catch (error) {
      console.error("Failed to fetch category:", error);
      alert("Could not load category details.");
      navigate("/categories");
    } finally {
      setFetching(false);
    }
  }

  // Handle file selection & preview generation
  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    // Clean up previous blob URL to prevent memory leaks
    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleClearNewImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
  };

  async function handleSubmit(e) {
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

      await api.put(`/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/categories");
    } catch (error) {
      console.error("Failed to update category:", error);
      alert("Failed to update category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER & BACK NAVIGATION */}
        <div className="flex items-center justify-between">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2.5 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-semibold bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm transition-all hover:bg-slate-100"
          >
            <FaArrowLeft className="text-xs text-slate-500" />
            <span>Back to Categories</span>
          </Link>
        </div>

        {/* LOADING STATE */}
        {fetching ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
            <FaSpinner className="animate-spin text-3xl text-red-600 mx-auto mb-3" />
            <p className="text-sm font-medium">Loading category details...</p>
          </div>
        ) : (
          /* MAIN FORM CARD */
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">

            {/* Card Header */}
            <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-slate-100">
              <div className="p-3.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl text-xl sm:text-2xl shrink-0">
                <FaEdit />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Edit Category <span className="text-slate-400 text-sm font-medium">#{id}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                  Update category details, preview image, and publication status
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* CATEGORY NAME */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Category Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl px-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="e.g. Whole Leg, Frozen Seafood, Fresh Cuts"
                  required
                />
              </div>

              {/* IMAGE UPLOAD & PREVIEW */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Category Image
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">

                  {/* Dropzone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`sm:col-span-2 relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 hover:border-red-400 bg-slate-50/50 hover:bg-slate-100/50"
                      }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 mb-3 shadow-sm">
                      <FaCloudUploadAlt className="text-2xl sm:text-3xl text-red-600" />
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-800 text-center">
                      Click or drag new image to replace
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 text-center font-medium">
                      Leave empty to keep existing image
                    </p>
                  </div>

                  {/* Existing or New Preview Box */}
                  <div className="relative bg-slate-50/50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[160px] overflow-hidden">
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="New File Preview"
                          className="w-full h-32 object-cover rounded-xl border border-slate-200 bg-white"
                        />
                        <div className="w-full flex items-center justify-between mt-2 px-1">
                          <span className="bg-red-50 border border-red-200/80 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            New Upload
                          </span>
                          <button
                            type="button"
                            onClick={handleClearNewImage}
                            className="p-1.5 bg-slate-200/70 hover:bg-red-600 text-slate-600 hover:text-white rounded-lg transition-colors"
                            title="Revert to current image"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      </>
                    ) : oldImage ? (
                      <>
                        <img
                          src={`${IMAGE_URL}/${oldImage}`}
                          alt="Current Category"
                          className="w-full h-32 object-cover rounded-xl border border-slate-200 bg-white"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/no-image.png";
                          }}
                        />
                        <div className="w-full flex items-center justify-center mt-2">
                          <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                            Current Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                        <FaImage className="text-3xl text-slate-300" />
                        <span className="text-xs font-semibold text-slate-400">
                          No Image Uploaded
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* STATUS SELECTION */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("Active")}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${status === "Active"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700 ring-2 ring-emerald-500/20"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    <FaCheckCircle className={status === "Active" ? "text-emerald-600" : "text-slate-400"} />
                    <span>Active</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus("Inactive")}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${status === "Inactive"
                      ? "bg-slate-100 border-slate-300 text-slate-800 ring-2 ring-slate-400/20"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    <FaExclamationCircle className={status === "Inactive" ? "text-slate-700" : "text-slate-400"} />
                    <span>Inactive</span>
                  </button>
                </div>
              </div>

              {/* FORM FOOTER ACTIONS */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/categories")}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs sm:text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 disabled:opacity-50 transition-all duration-200 active:scale-95"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin text-xs" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Category</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default EditCategory;