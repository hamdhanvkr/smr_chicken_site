import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import api from "../services/axios";
import { IMAGE_URL } from "../config/config";
import { Helmet } from "react-helmet-async";


function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    // Read search query from URL parameter
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const phoneNumber = "60168050930";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get("/products"),
                    api.get("/categories"),
                ]);

                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter logic based on Category tab and URL Search Query
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category_name?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <section className="relative w-full bg-slate-50 min-h-screen pt-14 pb-10 md:pb-16 overflow-hidden">

            <Helmet>
                <title>Fresh Chicken Products | SMR Chicken</title>

                <meta
                    name="description"
                    content="Browse fresh whole chicken, chicken breast, wings, drumsticks, boneless chicken and frozen seafood from SMR Chicken."
                />

                <link rel="canonical" href="https://smrchicken.com/products" />
            </Helmet>


            {/* TOP WAVE SEPARATOR */}
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
            <div className="bg-slate-50 min-h-screen py-10">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">

                    {/* PAGE HEADER */}
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Our Fresh <span className="text-red-600">Products</span>
                        </h1>
                        <p className="mt-2 text-slate-600 text-sm sm:text-base">
                            Browse our high-quality, farm-fresh items and place your order directly via WhatsApp.
                        </p>
                    </div>

                    {/* CATEGORY FILTER TABS & SEARCH INDICATOR */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">

                        {/* Category Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${selectedCategory === "All"
                                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                                    }`}
                            >
                                All Products
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${selectedCategory.toLowerCase() === category.name.toLowerCase()
                                        ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Active Search Query Tag */}
                        {searchQuery && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto">
                                <span>Searching for: "{searchQuery}"</span>
                                <button
                                    onClick={() => setSearchParams({})}
                                    className="hover:text-red-900 font-bold ml-1"
                                    title="Clear search"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>

                    {/* PRODUCTS GRID */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm animate-pulse space-y-4">
                                    <div className="w-full h-48 bg-slate-200 rounded-xl" />
                                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                                    <div className="h-6 bg-slate-200 rounded w-1/3" />
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm my-8">
                            <p className="text-slate-500 font-medium">No products found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSearchParams({});
                                }}
                                className="mt-4 text-sm text-red-600 font-semibold hover:underline"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {filteredProducts.map((product) => {
                                const whatsappMessage = encodeURIComponent(
                                    `Hello! I would like to order:\n\n*Product:* ${product.name}\n*Price:* RM ${product.price}\n\nPlease share payment and delivery details.`
                                );
                                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

                                return (
                                    <div
                                        key={product.id}
                                        className="group bg-white border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5"
                                    >
                                        <div>
                                            {/* Image Container */}
                                            <div className="relative w-full h-52 overflow-hidden rounded-xl bg-slate-50">
                                                <img
                                                    src={
                                                        product.image
                                                            ? `${IMAGE_URL}/${product.image}`
                                                            : "/no-image.png"
                                                    }
                                                    alt={product.name}
                                                    onError={(e) => {
                                                        e.target.src = "/no-image.png";
                                                    }}
                                                    className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-500 ease-out"
                                                />

                                                {/* <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-red-700 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100 shadow-sm">
                                                Fresh
                                            </span> */}
                                            </div>

                                            {/* Meta */}
                                            <div className="mt-4">
                                                {product.category_name && (
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                        {product.category_name}
                                                    </span>
                                                )}

                                                <h3 className="font-bold text-slate-800 text-lg mt-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Pricing & WhatsApp Order Button */}
                                        <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-slate-400 block font-medium">Price</span>
                                                <p className="text-xl font-extrabold text-slate-900">
                                                    <span className="text-emerald-600 mr-0.5">RM</span>
                                                    {product.price}
                                                </p>
                                            </div>

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
            </div>
        </section>

    );
}

export default Products;