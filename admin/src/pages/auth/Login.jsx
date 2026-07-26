import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await api.post("/admin/login", {
                email,
                password
            });

            if (response.data.success) {

                alert("Login Successful");

                navigate("/dashboard");

            }

        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-lg w-96">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700"
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;