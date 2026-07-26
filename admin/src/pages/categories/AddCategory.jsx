import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

function AddCategory() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [status, setStatus] = useState("Active");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", name);
            formData.append("status", status);
            formData.append("image", image);


            await api.post(
                "/categories",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Category Added Successfully");

            navigate("/categories");

        } catch (error) {

            console.log(error);

            alert("Failed to add category");

        }

    };

    return (

        <div className="bg-white p-6 rounded shadow">

            <h1 className="text-2xl font-bold mb-6">
                Add Category
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-3 rounded mb-4"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border p-3 rounded mb-4"
                    required
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border p-3 rounded mb-4"
                >
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

                <button
                    type="submit"
                    className="bg-red-600 text-white px-5 py-3 rounded"
                >
                    Save Category
                </button>

            </form>

        </div>

    );

}

export default AddCategory;