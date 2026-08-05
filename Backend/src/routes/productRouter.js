import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/', createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:productId', updateProduct);
productRouter.delete('/:productId', deleteProduct);

export default productRouter;
