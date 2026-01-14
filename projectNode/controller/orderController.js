import Order from "../model/orderSchema.js"
import Cart from "../model/cartSchema.js"
import Products from "../model/productSchemaa.js"

//Create Order 

export const createOrder = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.session.User.Users_id;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.json({ message: "Cart is empty" });
        }

        let total = 0;
        const orderItems = [];

        for (const item of cart.items) {
            const product = await Products.findById(item.productId).select("price");

            if (!product) {
                continue;
            }
            const itemTotal = product.price * item.quantity;
            total = total + itemTotal;

            orderItems.push({
                product: item.productId,
                quantity: item.quantity,
                price: product.price,
            });
        }
        const order = await Order.create({
            user: userId,
            items: orderItems,
            total: total,
            address: address || "",
            status: "Pending",
        });
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        return res.status(200).json({
            message: "Order placed successfully!",
            order,
        });

    } catch (err) {
        console.log("Order Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// get User orders

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.session.User.Users_id;

        const orders = await Order
            .find({ user: userId })

        return res.json({
            message: "User orders fetched",
            orders,
        });
    } catch (err) {
        console.log("Get Orders Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// get single order


export const getsingleorder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
            message: "User order fetched",
            order,
        });
    } catch (err) {
        console.log("Get Order Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};


//  Admin Get All Orders

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order
            .find()

        res.status(200).json({
            message: "All orders fetched",
            orders,
        });
    } catch (err) {
        console.log("Admin Order Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Admin Update Order Status 

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

        const valid = ["Pending", "Shipped", "Delivered", "Cancelled"];

        if (!valid.includes(status)) {
            return res.json({ message: "Invalid status!" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.json({ message: "Order not found!" });
        }

        return res.json({
            message: "Order status updated!",
            order: updatedOrder,
        });

    } catch (err) {
        console.log("Status Update Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Cancel User Order

export const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.session.User.Users_id;
        const order = await Order.findOne({ _id: orderId, user: userId });

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        if (order.status !== "Pending") {
            return res.status(400).json({
                message: "Only pending orders can be cancelled.",
            });
        }

        order.status = "Cancelled";
        await order.save();

        return res.status(200).json({
            message: "Order cancelled successfully!",
            order,
        });

    } catch (err) {
        console.log("Cancel Order Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};