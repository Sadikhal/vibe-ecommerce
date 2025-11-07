import express from "express";
import { getCart, addToCart, removeFromCart, updateCartItem } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);
router.put("/:id", updateCartItem);

export default router;
