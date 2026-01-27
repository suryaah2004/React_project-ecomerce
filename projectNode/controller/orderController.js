import Order from "../model/orderSchema.js"
import Cart from "../model/cartSchema.js"
import Products from "../model/productSchemaa.js"

//Create Order 


export const createOrder = async (req, res) => {
    try {
        const userId = req.session.User.Users_id;

        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let total = 0;
        const orderItems = [];

        for (const item of cart.items) {
            const product = item.productId;

            const itemTotal = product.price * item.quantity;
            total =total+itemTotal;

            orderItems.push({
                productId: product._id,
                productName: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
                itemTotal
            });
        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            total,
            status: "Pending"
        });

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ orderId: order._id });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};



// get User orders

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.session.User.Users_id
        console.log('userss', userId)
        const orders = await Order.find({ user: userId, status:{ $ne: "Cancelled" }})
            .populate("items.productId")
            .sort({ createdAt: -1 });

        console.log('orderrr', orders)
        res.status(200).json({ message: "my orders fetched", orders })
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}

//conform order

export const confirmOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, PhoneNo, address } = req.body;

        if (!Name || !PhoneNo || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        for (let item of order.items) {
            const product = await Products.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }

            product.stock = product.stock - item.quantity;
            await product.save();
        }
        order.Name = Name;  
        order.PhoneNo = PhoneNo;
        order.address = address;
        order.status = "Confirmed";

        await order.save();

        res.status(200).json({ message: "Order confirmed and stock updated" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};



// get single order


export const getsingleorder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: 'successfully order get', order });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


//  Admin Get All Orders


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json({message: "All orders fetched",orders,});
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

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status === "Cancelled") {
            return res.status(400).json({ success: false, message: "Order already cancelled" });
        }

        
        for (let item of order.items) {
            const product = await Products.findById(item.productId);

            if (!product) continue;

            product.stock = product.stock + item.quantity;
            await product.save();
        }

        order.status = "Cancelled";
        await order.save();

        res.json({ success: true, message: "Order cancelled and stock restored" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Cancel failed" });
    }
};



