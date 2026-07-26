import { useEffect, useState } from "react";
import api from "../../services/axios";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {

        try {

            const res = await api.get("/orders");

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Orders
            </h1>

            <table className="w-full bg-white shadow rounded">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {orders.map(order => (

                        <tr key={order.id}>

                            <td>{order.id}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.phone}</td>
                            <td>₹{order.total}</td>
                            <td>{order.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Orders;