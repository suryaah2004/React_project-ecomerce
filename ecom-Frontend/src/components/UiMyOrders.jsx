import { useNavigate } from "react-router-dom";
import { cancelOrder, getMyOrders } from "../service/All-API";
import { useEffect, useState } from "react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
const navigate=useNavigate()
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await getMyOrders();
        setOrders(res.data.orders);
    };

    const handleCancel = async (orderId) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this order?");

        if (confirmCancel) {
            await cancelOrder(orderId);
            alert("Order cancelled successfully");
            fetchOrders();
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button onClick={()=>navigate('/')} className="mb-4 text-sm bg-gray-200 px-3 py-1 rounded">
                ← Home Page
            </button>

            <h2 className="text-2xl font-bold mb-6">My Orders</h2>

            {orders.map((order,i) => (
                <div key={i} className="border rounded-lg p-4 mb-6 shadow">

                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Order #{order._id}</h3>
                        <span className="bg-yellow-100 text-yellow-600 px-2 py-1 text-sm rounded">
                            {order.status}
                        </span>
                    </div>

                    <p className="text-sm">Placed by: {order.Name}</p>
                    <p className="text-sm">Address: {order.address}</p>
                    <p className="text-sm">PhoneNo: {order.PhoneNo}</p>

                    <hr className="my-3" />

                    {order.items.map((item,i) => (
                        <div key={i} className="flex items-center gap-3 border p-2 rounded mb-2">
                            <img
                                src={`http://65.2.132.121:5000/api/uploads/${item.image}`}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-sm"> Qty: {item.quantity}</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 text-xs rounded">
                                {order.status}
                            </span>
                        </div>
                    ))}

                    <div className="mt-3 font-semibold">Total Amount: ₹{order.total}</div>

                    <button className="mt-3 bg-black text-white px-4 py-2 rounded" onClick={()=>handleCancel(order._id)} >
                        Cancel Order
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;

