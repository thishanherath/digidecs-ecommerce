import express from 'express';
import {
  createOrder,
  getOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  cancelOrder
} from '../controllers/orderController.js';
import { protect } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/admin.js';

const orderRouter = express.Router();

// User specific routes (Must be protected)
orderRouter.post('/', protect, createOrder);
orderRouter.get('/my-orders', protect, getMyOrders);

// Admin specific routes
orderRouter.get('/', protect, isAdmin, getOrder);
orderRouter.put('/:orderId/status', protect, isAdmin, updateOrderStatus);

// Shared / Order specific routes
orderRouter.get('/:orderId', protect, getOrderById);
orderRouter.put('/:orderId/cancel', protect, cancelOrder);

export default orderRouter;
