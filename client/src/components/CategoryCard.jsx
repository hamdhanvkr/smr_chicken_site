import { useEffect, useState } from "react";
import api from "../services/axios";

function CategoryCard() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await api.get("/categories");
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return (
        /* WRAPPER DIV ADDED HERE TO CONTROL MARGIN & SIDE PADDING */
        <div className="mx-auto px-4 sm:px-6 lg:px-8 my-8">

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm animate-pulse flex flex-col items-center">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-200 rounded-full mb-3" />
                            <div className="h-4 bg-slate-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative cursor-pointer bg-white hover:bg-red-50/30 border border-slate-200/80 hover:border-red-300 shadow-sm hover:shadow-md rounded-2xl p-4 text-center transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center justify-between"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-600 rounded-b-full group-hover:w-12 transition-all duration-300" />

                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-100 mb-3 border-2 border-slate-100 group-hover:border-red-200 transition-colors shadow-inner">
                                {/* <img
                                    src={
                                        category.image
                                            ? `http://localhost:5000/uploads/${category.image}`
                                            : ""
                                    }
                                    alt={category.name}
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/150?text=Category";
                                    }}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                /> */}
                                <img
                                    src={
                                        category.image
                                            ? `/uploads/${category.image}`
                                            : ""
                                    }
                                    alt={category.name}
                                    onError={(e) => {
                                        console.log("Image failed:", e.target.src);
                                        e.target.src = "/no-image.png";
                                    }}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                />
                            </div>

                            <h3 className="font-semibold text-slate-800 group-hover:text-red-600 text-sm sm:text-base tracking-wide transition-colors line-clamp-1">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryCard;