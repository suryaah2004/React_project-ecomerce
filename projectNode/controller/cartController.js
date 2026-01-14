import Cart from "../model/cartSchema.js"
import Products from "../model/productSchemaa.js"
import Product from "../model/productSchemaa.js"

//create cart

export const addCart = async (req, res) => {
  try {
    const userId = req.session.User.Users_id
    const { productId, quantity } = req.body
    const product = await Products.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })
    let userCart = await Cart.findOne({ userId })
    if (userCart) {
      const itemExists = userCart.items.find(
        (item) => item.productId.toString() === productId
      )
      if (itemExists) {
        await Cart.updateOne(
          { userId, "items.productId": productId },
          { $inc: { "items.$.quantity": quantity } }
        )
      } else {
        userCart.items.push({ productId, quantity })
      }
      userCart.totalPrice = await calculateTotal(userCart.items)
      await userCart.save()
      res.json({ message: "Cart updated successfully", cart: userCart })
    } else {
      const totalPrice = product.price * quantity
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
        totalPrice,
      })
      res.json({ message: "Cart created", cart: newCart })
    }
    console.log(userCart);

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//update cart

export const editCart = async (req, res) => {
  try {
    const userId = req.session.User.Users_id
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required." })
    }

    const userCart = await Cart.findOne({ userId })
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const itemIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    )

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" })
    }

    userCart.items[itemIndex].quantity = quantity

    userCart.totalPrice = await calculateTotal(userCart.items)
    await userCart.save()

    res.status(200).json({
      message: "Cart updated successfully",
      cart: userCart,
    })
  } catch (error) {
    console.error("Edit cart error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

//delete cart


export const deleteProductCart = async (req, res) => {
  try {
    const userId = req.session.User.Users_id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    userCart.items = userCart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    userCart.totalPrice = await calculateTotal(userCart.items);
    await userCart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart: userCart,
    });

  } catch (error) {
    console.error("Delete cart item error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



//get All cart

export const getCart = async (req, res) => {
  try {
    const userId = req.session.User.Users_id
    console.log(userId)
    const userCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      model: "Products",
      select: "name price image description brand color size category",
    })
    console.log(userCart);


    if (!userCart || userCart.items.length === 0) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [], totalPrice: 0 },
      });
    }

    const totalPrice = await calculateTotal(userCart.items);

    res.status(200).json({
      message: "Cart fetched successfully",
      cart: {
        ...userCart.toObject(),
        totalPrice,
      },
    });
  } catch (error) {
    console.error("Get Cart Error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}


const calculateTotal = async (items) => {
  let total = 0;

  for (let item of items) {
    const product = await Products.findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }

  return total;
};
