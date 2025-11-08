import axios from "axios";
import Product from "../models/product.model.js";

export const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;

    // If DB is empty, seed it from FakeStore API first
    const count = await Product.countDocuments();
    if (count === 0) {
      const apiRes = await axios.get("https://fakestoreapi.com/products?limit=10");
      const fakeProducts = apiRes.data || [];
      const formattedProducts = fakeProducts.map((item) => ({
        title: item.title,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category,
      }));
      if (formattedProducts.length) {
        await Product.insertMany(formattedProducts);
      }
    }

    // Build query for filtering
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Products fetched",
      products,
    });
  } catch (error) {
    next(error);
  }
};
