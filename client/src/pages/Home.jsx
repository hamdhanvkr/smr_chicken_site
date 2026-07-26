import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";


function Home(){

return (

<>

<Hero />


<section className="py-10">

<h2 className="text-3xl font-bold text-center">
Shop By Category
</h2>


<CategoryCard />


</section>



<section className="py-10">

<h2 className="text-3xl font-bold text-center">
Featured Products
</h2>


<ProductCard />


</section>


</>

)

}


export default Home;