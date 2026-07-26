import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

function Products() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  }

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  }

  return (

    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() => navigate("/products/add")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Product
        </button>

      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">ID</th>

              <th className="p-3 text-left">Product</th>

              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Image</th>

              <th className="p-3 text-left">Price</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center p-6"
                >
                  No Products Found
                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr
                  key={product.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {product.id}
                  </td>

                  <td className="p-3">
                    {product.name}
                  </td>

                  <td className="p-3">
                    {product.category_name}
                  </td>

                  <td className="p-3">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">
                    ₹ {product.price}
                  </td>

                  <td className="p-3">
                    {product.status}
                  </td>

                  <td className="p-3 text-center">

                <button
    onClick={() => navigate(`/products/edit/${product.id}`)}
    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
>
    Edit
</button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Products;