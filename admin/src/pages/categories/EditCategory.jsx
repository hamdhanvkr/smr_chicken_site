import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/axios";

function EditCategory() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [status, setStatus] = useState("Active");
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");

    useEffect(() => {

        fetchCategory();

    }, []);

    async function fetchCategory() {

        const res = await api.get(`/categories/${id}`);

        setName(res.data.name);

        setStatus(res.data.status);

        setOldImage(res.data.image);

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const formData = new FormData();


        formData.append("name", name);

        formData.append("status", status);


        if (image) {

            formData.append("image", image);

        }


        await api.put(
            `/categories/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        alert("Category Updated");

        navigate("/categories");

    }

    return (

        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-2xl font-bold mb-5">
                Edit Category
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="w-full border p-3 rounded mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {
                    oldImage && (

                        <img
                            src={`http://localhost:5000/uploads/${oldImage}`}
                            alt="category"
                            className="
            w-32
            h-32
            object-cover
            rounded
            mb-4
            "
                        />

                    )
                }


                <input

                    type="file"

                    accept="image/*"

                    onChange={(e) => setImage(e.target.files[0])}

                    className="
    w-full
    border
    p-3
    rounded
    mb-4
    "

                />

                <select
                    className="w-full border p-3 rounded mb-4"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

                <button className="bg-red-600 text-white px-5 py-3 rounded">
                    Update Category
                </button>

            </form>

        </div>

    );

}

export default EditCategory;