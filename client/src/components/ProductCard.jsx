import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import api from "../services/axios";

function ProductCard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Business WhatsApp contact number
    const phoneNumber = "60168050930";

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await api.get("/products");
                setProducts(res.data.slice(0, 10));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 my-8">
            {loading ? (
                /* Skeleton Loader */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm animate-pulse space-y-4">
                            <div className="w-full h-48 bg-slate-200 rounded-xl" />
                            <div className="h-4 bg-slate-200 rounded w-3/4" />
                            <div className="h-3 bg-slate-200 rounded w-1/2" />
                            <div className="h-6 bg-slate-200 rounded w-1/3" />
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                /* Empty Fallback State */
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80">
                    <p className="text-slate-500 font-medium">No fresh products available right now.</p>
                </div>
            ) : (
                /* Products Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {products.map((product) => {
                        // Custom WhatsApp message formatted with product details
                        const whatsappMessage = encodeURIComponent(
                            `Hello SMR Chicken! I would like to order:\n\n*Product:* ${product.name}\n*Price:* Rs ${product.price}\n\nPlease share availability and delivery details.`
                        );
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

                        return (
                            <div
                                key={product.id || product._id}
                                className="group bg-white border border-slate-200/80 hover:border-emerald-400 shadow-sm hover:shadow-xl rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5"
                            >
                                <div>
                                    <div className="relative w-full h-52 overflow-hidden rounded-xl bg-slate-50">
                                        {/* <img
                                            src={product.image ? `http://localhost:5000/uploads/${product.image}` : "https://via.placeholder.com/300x200?text=Fresh+Product"}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/300x200?text=Fresh+Product";
                                            }}
                                            className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-500 ease-out"
                                        /> */}
                                        <img
                                            src={product.image ? `/uploads/${product.image}` : "https://via.placeholder.com/300x200?text=Fresh+Product"}
                                            alt={product.name}
                                            onError={(e) => {
                                                console.log("Image failed:", e.target.src);
                                                e.target.src = "/no-image.png";
                                            }}
                                            className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        {product.category_name && (
                                            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100">
                                                {product.category_name}
                                            </span>
                                        )}

                                        <h3 className="font-bold text-slate-800 text-lg mt-2 group-hover:text-red-600 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <span className="text-xs text-slate-400 block font-medium">Price</span>
                                        <p className="text-xl font-extrabold text-slate-900">
                                            <span className="text-lg text-emerald-600 font-bold mr-1">Rs</span>
                                            {product.price}
                                        </p>
                                    </div>

                                    {/* WHATSAPP DIRECT ORDER BUTTON */}
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 active:scale-95"
                                    >
                                        <FaWhatsapp size={16} />
                                        <span>Order</span>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ProductCard;