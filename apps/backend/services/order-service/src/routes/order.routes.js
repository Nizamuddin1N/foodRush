import express from 'express';
import {createOrder, getOrderById,getMyOrders, updateOrderStatus} from '../controllers/order.controller.js';

import { authenticate, authorizeRestaurant } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/',authenticate, createOrder);
router.get('/user', authenticate, getMyOrders);
router.get('/:id', authenticate, getOrderById);
router.patch('/:id/status', authenticate,authorizeRestaurant, updateOrderStatus);

export default router;
