import CartItem from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { createError } from "../lib/createError.js";

const getUserId = (req) => {
  return req.headers["x-user-id"] || req.body?.userId || "demoUser";
};

export const checkout = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { name, email } = req.body;

    if (!name || !email) {
      return next(createError(400, "Name and email are required"));
    }

    const cartItems = await CartItem.find({ userId }).populate("product");
    if (cartItems.length === 0) {
      return next(createError(400, "Cart is empty"));
    }

   // cart items
    const orderItems = cartItems.map((item) => ({
      product: item.product._id,
      qty: item.qty,
      price: item.product.price, 
    }));

    const total = orderItems.reduce((sum, item) => sum + item.qty * item.price, 0);

    // Create order and save to DB
    const newOrder = new Order({
      userId,
      items: orderItems,
      total,
      customer: { name, email }
    });

    await newOrder.save();

    await CartItem.deleteMany({ userId });

    // Send mock receipt 
    res.status(200).json({
      message: "Checkout successful",
      receipt: {
        orderId: newOrder._id,
        total,
        timestamp: newOrder.createdAt,
        customer: { name, email },
        items: orderItems,
      }
    });

  } catch (error) {
    next(error);
  }
};
