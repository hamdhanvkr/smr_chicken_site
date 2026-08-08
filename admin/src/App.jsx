import { Routes, Route } from "react-router-dom";

// Layout
import AdminLayout from "./layouts/AdminLayout";

// Protection
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import AddCategory from "./pages/categories/AddCategory";
import EditCategory from "./pages/categories/EditCategory";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";

function App() {
    return (
        <Routes>

            {/* =========================
                PUBLIC LOGIN
            ========================= */}
            <Route
                path="/"
                element={<Login />}
            />


            {/* =========================
                ALL ADMIN ROUTES PROTECTED
            ========================= */}
            <Route element={<ProtectedRoute />}>

                <Route element={<AdminLayout />}>

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    {/* Products */}
                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    <Route
                        path="/products/add"
                        element={<AddProduct />}
                    />

                    <Route
                        path="/products/edit/:id"
                        element={<EditProduct />}
                    />

                    {/* Categories */}
                    <Route
                        path="/categories"
                        element={<Categories />}
                    />

                    <Route
                        path="/categories/add"
                        element={<AddCategory />}
                    />

                    <Route
                        path="/categories/edit/:id"
                        element={<EditCategory />}
                    />

                </Route>

            </Route>

        </Routes>
    );
}

export default App;




// import { Routes, Route } from "react-router-dom";

// // Layout
// import AdminLayout from "./layouts/AdminLayout";

// // Pages
// import Login from "./pages/auth/Login";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Products from "./pages/products/Products";
// import Categories from "./pages/categories/Categories";
// import AddCategory from "./pages/categories/AddCategory";
// import EditCategory from "./pages/categories/EditCategory";
// import AddProduct from "./pages/products/AddProduct";
// import EditProduct from "./pages/products/EditProduct";
// // import Orders from "./pages/orders/Orders";
// // import Users from "./pages/users/Users";

// function App() {
//   return (
//     <Routes>

//       {/* Public Route */}
//       <Route path="/" element={<Login />} />

//       {/* Admin Routes */}
//       <Route element={<AdminLayout />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/categories/add" element={<AddCategory />} />
//         <Route path="/categories/edit/:id" element={<EditCategory />} />
//         <Route path="/products/add" element={<AddProduct />} />
//         <Route path="/products/edit/:id" element={<EditProduct />} />
//         {/* <Route path="/orders" element={<Orders />} />
//         <Route path="/users" element={<Users />} /> */}
//       </Route>

//     </Routes>
//   );
// }

// export default App;