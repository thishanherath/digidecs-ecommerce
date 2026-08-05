import express from 'express';
import { protect } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/admin.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/', protect, isAdmin, createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', protect, isAdmin, getProductById);
productRouter.put('/:productId', protect, isAdmin, updateProduct);
productRouter.delete('/:productId', protect, isAdmin, deleteProduct);

export default productRouter;
