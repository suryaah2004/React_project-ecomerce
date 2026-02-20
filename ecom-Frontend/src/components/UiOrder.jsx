import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { confirmOrder, getSingleOrder } from "../service/All-API";

const PlaceOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [Name, setName] = useState("");
    const [PhoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        const res = await getSingleOrder(id);
        console.log('response of datassss', res.data)
        setOrder(res.data.order);
    };

    const placeOrder = async () => {
        const ok = window.confirm("Are you sure you want to place this order?");
        if (!ok) return;
        try {

            await confirmOrder(id, { Name, PhoneNo, address });
           alert("Order Confirmed!");
            navigate("/order/myOrder");
        }

        catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            }
            console.log('place order', error)
        }
         
    };

    if (!order) return <p>Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 grid grid-cols-2 gap-6">

          
            <div>
                <h2 className="text-xl font-bold mb-3">Personal Information</h2>

                <input className="border p-2 w-full mb-2" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} />
                <input className="border p-2 w-full mb-2" placeholder="Phone" value={PhoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                <textarea className="border p-2 w-full mb-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

                <button onClick={placeOrder} className="bg-black text-white px-6 py-2 rounded">
                    Place Order
                </button>
            </div>

          
            <div>
                {order?.items?.map(item => (
                    <div key={item.productId} className="flex gap-4 mb-4 border-b pb-3">
                        <img src={`http://65.2.132.121:5000/api/uploads/${item.image}`} className="w-20 h-20 object-cover" />
                        <div>
                            <h4 className="font-semibold">{item.productName}</h4>
                            <p>Qty: {item.quantity}</p>
                            <p>₹{item.itemTotal}</p>
                        </div>
                    </div>
                ))}

                <h3 className="font-bold text-lg mt-4">Total: ₹{order.total}</h3>
            </div>
        </div>
    );
};

export default PlaceOrder;



