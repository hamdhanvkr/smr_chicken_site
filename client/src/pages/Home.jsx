import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


function Home() {

    return (

        <>
            <Helmet>

                <title>SMR Chicken Malaysia | Fresh Poultry & Frozen Seafood Supplier in Shah Alam, Selangor</title>
                <meta name="description"
                    content="Salsabeel Maju Resources (SMR Chicken) is a trusted wholesale and retail supplier of fresh chicken, poultry products, and frozen seafood in Shah Alam, Selangor, Malaysia. Halal quality with reliable daily delivery across Malaysia." />


                <meta
                    name="keywords"
                    content="SMR Chicken, chicken supplier Shah Alam, fresh poultry, seafood supplier Selangor"
                />

                <link rel="canonical" href="https://smrchicken.com/" />

                <meta property="og:title" content="SMR Chicken" />
                <meta
                    property="og:description"
                    content="Fresh chicken and frozen seafood delivered daily."
                />
                <meta
                    property="og:image"
                    content="https://smrchicken.com/logo.png"
                />

                <script type="application/ld+json">
                    {`
          {
            "@context":"https://schema.org",
            "@type":"Organization",
            "name":"SMR Chicken Malaysia",
            "url":"https://smrchicken.com",
            "logo":"https://smrchicken.com/logo.png"
          }
          `}
                </script>
            </Helmet>

            <Hero />
            <CategoryCard />
            <ProductCard />

            <section className="relative mx-auto px-8 py-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                    <svg
                        className="relative block w-full h-[40px] rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.64,11.39,98.66,28.69,147.8,36.27c66.5,10.23,135,11.69,202.8,2.37Z"
                            className="fill-white"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    About SMR Chicken
                </h2>

                <p className="text-gray-600 leading-8 mt-4 text-justify">
                    Salsabeel Maju Resources (SMR Chicken) is a trusted wholesale and retail
                    supplier of fresh chicken, premium poultry products, and frozen seafood
                    based in Shah Alam, Selangor. We are committed to delivering high-quality,
                    Halal-certified products with reliable service, hygienic handling, and
                    daily freshness for homes, restaurants, hotels, supermarkets, and businesses
                    across Malaysia. Our mission is to provide premium-quality products at
                    competitive prices while maintaining the highest standards of food safety,
                    freshness, and customer satisfaction. Whether you need fresh poultry or
                    frozen seafood, SMR Chicken is your reliable partner for quality and service.
                </p>

                <Link
                    to="/about"
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    Read More
                </Link>
                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                    <svg
                        className="relative block w-full h-[40px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.64,11.39,98.66,28.69,147.8,36.27c66.5,10.23,135,11.69,202.8,2.37Z"
                            className="fill-white"
                        />
                    </svg>
                </div>
            </section>

        </>



    )

}



export default Home;