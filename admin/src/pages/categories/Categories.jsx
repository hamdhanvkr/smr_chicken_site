import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

function Categories() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

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

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete this category?"
        );

        if (!confirmDelete) return;

        await api.delete(`/categories/${id}`);

        fetchCategories();

    }

    return (

        <div>

            <div className="flex justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Categories
                </h1>
                <button
                    onClick={() => navigate("/categories/add")}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Add Category
                </button>

            </div>

            <table className="w-full bg-white shadow rounded">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-3">ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {categories.map(category => (

                        <tr key={category.id}>

                            <td className="p-3">
                                {category.id}
                            </td>


                            <td>

                                {
                                    category.image ? (

                                        <img

                                            src={`http://localhost:5000/uploads/${category.image}`}

                                            alt={category.name}

                                            className="
            w-16
            h-16
            object-cover
            rounded-lg
            "
                                        />

                                    ) : (

                                        <span>No Image</span>

                                    )
                                }

                            </td>


                            <td>
                                {category.name}
                            </td>

                            <td>

                                <button
                                    onClick={() => navigate(`/categories/edit/${category.id}`)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Categories;