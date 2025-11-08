// controllers/cart.controller.js
import CartItem from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { createError } from "../lib/createError.js";
import { getUserId } from "../lib/utils.js";

export const getCart = async (req, res, next) => {
  try {
    const userId = getUserId();
    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.qty, 0);

    return res.status(200).json({
      message: "Cart fetched",
      items,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { productId, qty = 1 } = req.body;

    if (!productId) return next(createError(400, "productId is required"));

    const product = await Product.findById(productId);
    if (!product) return next(createError(404, "Product not found"));

    //check if item exists for this user & product increment qty
    const existing = await CartItem.findOne({ userId, product: productId });
    if (existing) {
      existing.qty = existing.qty + qty;
      await existing.save();
    } else {
      const newItem = new CartItem({ userId, product: productId, qty: Number(qty) });
      await newItem.save();
    }

    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce((sum, it) => sum + (it.product?.price || 0) * it.qty, 0);

    return res.status(201).json({
      message: "Added to cart",
      items,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const id = req.params.id;

    const deleted = await CartItem.findOneAndDelete({ _id: id, userId });
    if (!deleted) return next(createError(404, "Cart item not found"));

    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.qty, 0);

    return res.status(200).json({
      message: "Item removed from cart",
      items,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const id = req.params.id;
    const { qty } = req.body;

    const item = await CartItem.findOne({ _id: id, userId });
    if (!item) return next(createError(404, "item not found"));

    item.qty = qty > 0 ? qty : 1;
    await item.save();

    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.qty, 0);

    return res.status(200).json({
      message: "item updated",
      items,
      total,
    });
  } catch (error) {
    next(error);
  }
};
