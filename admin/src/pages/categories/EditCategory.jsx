import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaCloudUploadAlt,
  FaSpinner,
  FaImage,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
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

        {/* LOADING STATE */}
        {fetching ? (
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-12 text-center text-slate-400">
            <FaSpinner className="animate-spin text-3xl text-red-500 mx-auto mb-3" />
            <p className="text-sm font-medium">Loading category data...</p>
          </div>
        ) : (
          /* FORM CONTAINER */
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-700/60">
              <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl text-xl">
                <FaEdit />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Edit Category <span className="text-slate-400 text-base font-normal">#{id}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Update category details and status
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  required
                />
              </div>

              {/* IMAGE UPLOAD & PREVIEW */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Category Image
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  {/* Dropzone */}
                  <label className="sm:col-span-2 border-2 border-dashed border-slate-700 hover:border-red-500/60 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all group">
                    <FaCloudUploadAlt className="text-3xl text-slate-500 group-hover:text-red-500 mb-2 transition-colors" />
                    <span className="text-xs font-semibold text-slate-300">
                      Upload replacement image
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      Leave blank to keep existing image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {/* Existing or New Preview */}
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-900/80 border border-slate-700 rounded-xl h-36 relative">
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="New Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute bottom-1 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          New File
                        </span>
                      </>
                    ) : oldImage ? (
                      <>
                        <img
                          src={`/uploads/${oldImage}`}
                          alt="Current Category"
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150?text=No+Img";
                          }}
                        />
                        <span className="absolute bottom-1 bg-slate-800/90 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
                          Current
                        </span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-slate-500 text-xs gap-1">
                        <FaImage className="text-2xl" />
                        <span>No Image</span>
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