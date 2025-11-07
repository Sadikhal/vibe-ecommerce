import axios from "axios";
import Product from "../models/product.model.js";
import { createError } from "../lib/createError.js";

export const getProducts = async (req, res, next) => {
  try {
    // Check if products already exist in DB
    const products = await Product.find();
    if (products.length > 0) {
      return res.status(200).json({
        message: "Products fetched from database",
        products,
      });
    }

    // Fetch from Fake Store API 
    const apiRes = await axios.get("https://fakestoreapi.com/products?limit=10");
    const fakeProducts = apiRes.data;

    // ormat API data for  schema
    const formattedProducts = fakeProducts.map((item) => ({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    }));

    const savedProducts = await Product.insertMany(formattedProducts);

    return res.status(200).json({
      message: "Products fetched from FakeStore API and saved to DB",
      products: savedProducts,
    });

  } catch (error) {
    console.log(error);
    next(error); 
  }
};
