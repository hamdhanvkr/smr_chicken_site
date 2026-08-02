import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/axios";
import { IMAGE_URL } from "../../config/config";
import {
    ArrowLeft,
    Package,
    Tag,
    DollarSign,
    FileText,
    Upload,
    Image as ImageIcon,
    CheckCircle,
    Loader2,
    Activity,
    X
} from "lucide-react";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        price: "",
        description: "",
        status: "Active",
        image: null,
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchCategories(), fetchProduct()]);
            setLoading(false);
        };
        loadData();
    }, [id]);

    async function fetchCategories() {
        try {
            const res = await api.get("/categories");
            setCategories(res.data);
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
                setExistingImageUrl(`${IMAGE_URL}/${product.image}`);
            }
        } catch (error) {
            console.error("Failed to load product details:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const clearSelectedImage = () => {
        setFormData((prev) => ({ ...prev, image: null }));
        setPreviewUrl(null);
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

            await api.put(`/products/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Product updated successfully!");
            navigate("/products");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update product. Please check your network or form data.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center space-y-4 max-w-sm w-full">
                    <Loader2 className="w-10 h-10 animate-spin text-red-600 mx-auto" />
                    <p className="text-slate-600 font-medium text-sm">
                        Fetching product information...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-2xl w-full space-y-6">

                {/* Navigation Bar Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate("/products")}
                        className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </button>
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase bg-slate-200/60 px-3 py-1 rounded-full">
                        Product ID: #{id}
                    </span>
                </div>

                {/* Main Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">

                    {/* Header Title */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 text-white">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                            Edit Product
                        </h1>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">
                            Update inventory pricing, details, and visual media below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                        {/* Category Select */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                Category
                            </label>
                            <div className="relative">
                                <Tag className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                                <select
                                    name="category_id"
                                    required
                                    value={formData.category_id}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={String(cat.id)}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Product Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                Product Name
                            </label>
                            <div className="relative">
                                <Package className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Premium Fresh Chicken Cut"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all"
                                />
                            </div>
                        </div>

                        {/* Grid for Price & Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                            {/* Price */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Price
                                </label>
                                <div className="relative">
                                    <DollarSign className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        required
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Status Select */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Status
                                </label>
                                <div className="relative">
                                    <Activity className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all cursor-pointer"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                Description
                            </label>
                            <div className="relative">
                                <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                                <textarea
                                    rows="3"
                                    name="description"
                                    placeholder="Provide product features, weight specs, or packaging details..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Image Upload Area */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                Product Image
                            </label>

                            <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors rounded-2xl p-4 sm:p-6 text-center relative group">
                                {previewUrl || existingImageUrl ? (
                                    <div className="space-y-4">
                                        <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-100 mx-auto shadow-inner border border-slate-200">
                                            <img
                                                src={
                                                    previewUrl
                                                        ? previewUrl
                                                        : existingImageUrl
                                                }
                                                alt="Product Preview"
                                            />
                                            {previewUrl && (
                                                <button
                                                    type="button"
                                                    onClick={clearSelectedImage}
                                                    className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors"
                                                    title="Remove new selection"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <label className="inline-flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-100 cursor-pointer transition-all">
                                            <Upload className="w-3.5 h-3.5 mr-2 text-slate-500" />
                                            Replace Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="space-y-3 py-4">
                                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Upload product image
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                PNG, JPG, or WEBP (Max size 5MB)
                                            </p>
                                        </div>
                                        <label className="inline-flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-100 cursor-pointer transition-all">
                                            <Upload className="w-3.5 h-3.5 mr-2 text-slate-500" />
                                            Select File
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="w-full sm:w-auto px-5 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors text-center"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all space-x-2"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Update Product</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default EditProduct;