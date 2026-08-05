import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { isAdmin } from '../middlewares/admin.js';
import { protect } from '../middlewares/auth.js';

const categoryRouter = express.Router();

categoryRouter.post('/', protect, isAdmin, createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.put('/:id', protect, isAdmin, updateCategory);
categoryRouter.delete('/:id', protect, isAdmin, deleteCategory);

export default categoryRouter;
