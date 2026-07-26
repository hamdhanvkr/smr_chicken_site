function Dashboard() {
    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded shadow">
                    <h2>Total Products</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2>Total Categories</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2>Total Orders</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2>Revenue</h2>
                    <p className="text-3xl font-bold">₹0</p>
                </div>

            </div>

        </div>

    );
}

export default Dashboard;