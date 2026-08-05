import Product from '../models/productModel.js';

//Create a new product
export const createProduct = async (req, res) => {
  try{
    const newProduct = new Product(req.body) => {
      await newProduct.save();
      res.status(201).json({
        message: "Product addded successfully"
      })
    }
  }
}