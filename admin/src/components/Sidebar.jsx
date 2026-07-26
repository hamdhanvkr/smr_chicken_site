import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-red-600 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b border-red-500">
        Admin
      </div>

      <nav className="flex flex-col">

        <Link
          to="/dashboard"
          className="px-6 py-4 hover:bg-red-700"
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          className="px-6 py-4 hover:bg-red-700"
        >
          Products
        </Link>

        <Link
          to="/categories"
          className="px-6 py-4 hover:bg-red-700"
        >
          Categories
        </Link>


        <Link
          to="/orders"
          className="px-6 py-4 hover:bg-red-700"
        >
          Orders
        </Link>

        <Link
          to="/users"
          className="px-6 py-4 hover:bg-red-700"
        >
          Users
        </Link>

      </nav>
    </aside>
  );
}

export default Sidebar;