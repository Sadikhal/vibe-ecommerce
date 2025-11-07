import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("CartItem", cartSchema);
