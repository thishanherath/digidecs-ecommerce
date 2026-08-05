import Product from '../models/product.js';

//Create a new product
export const createProduct = async (req, res) => {
  try{
    const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json({
        message: "Product added successfully",
        product: newProduct
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

//Get All Products
export const getProducts = async (req, res) => {
  try{
    const products = await Product.find({
      isActive: true
    }).populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}

//Get Product By ID
export const getProductById = async(req, res) => {
  try{
    const product = await Product.findById(req.params.id).populate("category");
    if(!product){
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
}

//Update Product
export const updateProduct = async(req, res) => {
  try{
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidators: true
    });
    if(!product){
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({message: "Product updated successfully", product});
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
}

//Delete Product
export const deleteProduct = async(req, res) => {
  try{
    const product = await Product. findByIdAndDelete(req.params.productId);
    if(!product){
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({message: "Product deleted successfully", product});
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
}