import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";


function Home() {

    return (

        <>
            <Helmet>
                <title>SMR Chicken | Fresh Chicken & Frozen Seafood Supplier in Shah Alam</title>

                <meta
                    name="description"
                    content="SMR Chicken supplies fresh chicken, poultry parts and frozen seafood in Shah Alam and Selangor. Halal certified with retail and wholesale delivery."
                />

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
            </Helmet>

            <Hero />
            <CategoryCard />
            <ProductCard />

        </>

    )

}


export default Home;