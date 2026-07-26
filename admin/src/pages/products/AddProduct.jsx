import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

function AddProduct() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    price: "",
    description: "",
    status: "Active",
    image: null
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {

    try {

      const res = await api.get("/categories");

      setCategories(res.data);

    } catch (error) {

      console.log(error);

    }

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("category_id", formData.category_id);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("status", formData.status);
      data.append("image", formData.image);

      await api.post("/products", data);

      alert("Product Added Successfully");

      navigate("/products");

    } catch (error) {

      console.log(error);

      alert("Failed");

    }

  }
  return (

    <div className="bg-white p-6 rounded shadow">

      <h1 className="text-2xl font-bold mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          className="w-full border p-3 rounded"
          value={formData.category_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              category_id: e.target.value
            })
          }
        >
          <option value="">
            Select Category
          </option>

          {categories.map(category => (

            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>

          ))}

        </select>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded"
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value
            })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0]
            })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value
            })
          }
        />

        <select
          className="w-full border p-3 rounded"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value
            })
          }
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          className="bg-red-600 text-white px-5 py-3 rounded"
        >
          Save Product
        </button>

      </form>

    </div>

  );

}

export default AddProduct;