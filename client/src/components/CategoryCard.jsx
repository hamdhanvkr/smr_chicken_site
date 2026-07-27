import { useEffect, useState } from "react";
import api from "../services/axios";
import { IMAGE_URL } from "../config/config";

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
        <section className="relative w-full bg-gradient-to-b from-slate-50 via-red-50/20 to-amber-50/20 text-slate-900 overflow-hidden pt-12 pb-16">
            {/* TOP WAVE SEPARATOR (Inverted) */}
            <h2 className="text-3xl font-bold text-center"> Featured Categories </h2>
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
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-200/20 blur-3xl pointer-events-none rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-amber-200/20 blur-3xl pointer-events-none rounded-full animate-pulse delay-700" />

            {/* MAIN CONTAINER */}
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 my-6 pt-4">
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm animate-pulse flex flex-col items-center">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-200 rounded-full mb-3" />
                                <div className="h-4 bg-slate-200 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
                        {categories.map((category) => (
                            <div
                                key={category.id || category._id}
                                className="group relative cursor-pointer bg-white/90 backdrop-blur-sm hover:bg-red-50/40 border border-slate-200/80 hover:border-red-300 shadow-sm hover:shadow-lg rounded-2xl p-4 text-center transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center justify-between"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-600 rounded-b-full group-hover:w-12 transition-all duration-300" />

                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-50 mb-3 border-2 border-slate-100 group-hover:border-red-200 transition-colors shadow-inner flex items-center justify-center p-1">
                                    <img
                                        src={
                                            category.image
                                                ? `${IMAGE_URL}/${category.image}`
                                                : "/no-image.png"
                                        }
                                        alt={category.name}
                                        onError={(e) => {
                                            console.log("Image failed:", e.target.src);
                                            e.target.src = "/no-image.png";
                                        }}
                                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500 ease-out"
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

export default CategoryCard;