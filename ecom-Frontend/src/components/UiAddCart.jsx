import { useEffect, useState } from "react";
import { createOrder, deleteCart, getAllCart, updateCart } from "../service/All-API";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await getAllCart();
            setCart(res.data.cart);


        } catch (error) {
            console.log("Fetch cart error:", error);
        }
    };


    const increaseQty = async (productId, currentQty, stock) => {
        if (currentQty >= stock) {
            alert("Stock limit reached!");
            return;
        }

        try {
           
            await updateCart(productId, currentQty + 1);
            fetchCart();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const decreaseQty = async (productId, currentQty) => {
        if (currentQty <= 1) return;
        await updateCart(productId, currentQty - 1);
        fetchCart();
    };


    const removeItem = async (productId) => {
        await deleteCart(productId);
        fetchCart();
    };

    if (!cart || cart.items.length === 0) {
        return (
            <p className="text-center mt-10 text-lg font-semibold">
                Your cart is empty
            </p>
        );
    }


    const createOrders = async () => {
        try {
            const res = await createOrder()
            navigate(`/order/${res.data.orderId}`)

        }
        catch (error) {
            console.log('server error', error)
        }
    }


    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Cart</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-600 underline"
                >
                    Continue shopping
                </button>
            </div>

            <div className="grid grid-cols-5 font-semibold border-b pb-3 mb-4">
                <p className="col-span-2">PRODUCT</p>
                <p>PRICE</p>
                <p className="text-center">QTY</p>
                <p className="text-right">TOTAL</p>
            </div>


            {cart.items.map((item) => (
                <div
                    key={item.productId._id}
                    className="grid grid-cols-5 items-center border-b py-4"
                >

                    <div className="col-span-2 flex gap-4">
                        <img
                            src={`http://65.2.132.121:5000/api/uploads/${item.productId.image}`}
                            alt={item.productId.name}
                            className="w-24 h-20 object-cover rounded"
                        />

                        <div>
                            <h3 className="font-semibold">
                                {item.productId.name}
                            </h3>

                            <button
                                onClick={() => removeItem(item.productId._id)}
                                className="text-red-500 text-sm mt-1"
                            >
                                Remove
                            </button>
                        </div>
                    </div>

                    <p>₹{item.productId.price}</p>


                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() =>
                                decreaseQty(item.productId._id, item.quantity)
                            }
                            className="px-3 py-1 border rounded"
                        >
                            −
                        </button>

                        <span className="font-semibold">{item.quantity}</span>

                        <button
                            onClick={() =>
                                
                                increaseQty(item.productId._id, item.quantity, item.productId.stock)
                            }
                            className="px-3 py-1 border rounded"
                        >
                            +
                        </button>

                    </div>
                    <p className="text-right font-semibold">
                        ₹{item.productId.price * item.quantity}
                    </p>
                </div>
            ))}


            <div className="flex justify-between items-center mt-6">
                <h3 className="text-xl font-bold">
                    Total: ₹{cart.totalPrice}
                </h3>

                <button className="bg-black text-white px-6 py-3 rounded"
                    onClick={createOrders}>
                    Proceed to Checkout
                </button>
            </div>

        </div>
    );
};

export default Cart;


