import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        qty: { type: Number, default: 1 },
        price: { type: Number, required: true }, 
      }
    ],
    total: { type: Number, required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
