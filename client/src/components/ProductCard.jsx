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
        <section className="relative w-full bg-gradient-to-b from-slate-50 via-red-50/20 to-amber-50/20 text-slate-900 overflow-hidden pt-12 pb-16">
            {/* TOP WAVE SEPARATOR (Inverted) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
                <svg
                    className="relative block w-full h-[30px] sm:h-[45px] rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.64,11.39,98.66,28.69,147.8,36.27c66.5,10.23,135,11.69,202.8,2.37Z"
                        className="fill-white"
                    ></path>
                </svg>
            </div>

            {/* SUBTLE BACKGROUND GRID PATTERN */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* SOFT AMBIENT LIGHT GLOWS */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-200/20 blur-3xl pointer-events-none rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-200/20 blur-3xl pointer-events-none rounded-full animate-pulse delay-700" />

            {/* MAIN CONTAINER */}
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 my-4 pt-4">
              
            <h2 className="text-3xl font-bold text-center mb-5"> Our Products </h2>

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
                    <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-sm">
                        <p className="text-slate-500 font-medium">No fresh products available right now.</p>
                    </div>
                ) : (
                    /* Products Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((product) => {
                            // Custom WhatsApp message formatted with product details
                            const whatsappMessage = encodeURIComponent(
                                `Hello SMR Chicken! I would like to order:\n\n*Product:* ${product.name}\n*Price:* RM ${product.price}\n\nPlease share availability and delivery details.`
                            );
                            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

                            return (
                                <div
                                    key={product.id || product._id}
                                    className="group bg-white/90 backdrop-blur-sm border border-slate-200/80 hover:border-red-400 shadow-sm hover:shadow-xl rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5"
                                >
                                    <div>
                                        <div className="relative w-full h-52 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                                            <img
                                                src={product.image ? `/uploads/${product.image}` : "/no-image.png"}
                                                alt={product.name}
                                                onError={(e) => {
                                                    e.target.src = "/no-image.png";
                                                }}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
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
                                                <span className="text-lg text-red-600 font-bold mr-1">RM</span>
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

            {/* BOTTOM WAVE SEPARATOR */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
                <svg
                    className="relative block w-full h-[30px] sm:h-[45px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.64,11.39,98.66,28.69,147.8,36.27c66.5,10.23,135,11.69,202.8,2.37Z"
                        className="fill-white"
                    ></path>
                </svg>
            </div>
        </section>
    );
}

export default ProductCard;