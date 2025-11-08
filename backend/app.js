import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import checkoutRoutes from "./routes/order.route.js";
import { connect } from './lib/db.js';

dotenv.config();
const app = express(); 

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

// Routes
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}!`);
});
