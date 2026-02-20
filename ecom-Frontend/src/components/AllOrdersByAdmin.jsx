import React, { useEffect, useState } from "react";
import { getAllOrder, updateOrder, } from "../service/All-API";

const AllOrdersByAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    allOrders();
  }, []);

  const allOrders = async () => {
    try {
      const result = await getAllOrder();
      if (result.status === 200) {
        setOrders(result.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);

      const result = await updateOrder(orderId, newStatus);

      if (result.status === 200) {

        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Items</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((items, index) => (

            <tr key={items._id || index} className="text-center">

              <td className="border px-4 py-2">
                {items.Name ?? "No Name"}

              </td>

              <td className="border px-4  py-2 ">
                {items.items?.map((item, idx) => (
                  <div key={idx}>
                    {item?.productName ?? "name"} - {item.quantity} - ₹ {item.price}

                  </div>

                ))}
              </td>

              <td className="border px-4 py-2 font-semibold">
                ₹ {items.total}
              </td>

              <td className="border px-4 py-2">
                <select
                  value={items.status}
                  disabled={updatingId === items._id}
                  onChange={(e) =>                    
handleStatusChange(items._id, e.target.value)
                  }
                  className={`border rounded px-2 py-1 font-medium
                    ${items.status === "Pending"
                      ? "text-yellow-600"
                      : items.status === "Shipped"
                        ? "text-blue-600"
                        : items.status === "Delivered"
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              <td className="border px-4 py-2">
                {items.address ?? "No Address"}
              </td>

              <td className="border px-4 py-2">
                {new Date(items.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrdersByAdmin;







