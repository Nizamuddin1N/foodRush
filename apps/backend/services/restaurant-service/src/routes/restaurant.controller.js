import express from 'express';
import {createRestaurant, getAllRestaurants, addMenuItem, getMenu, getMenuItemById} from '../controllers/restaurant.controller.js';
import {authenticate, authorizeRestaurantOwner} from '../middleware/auth.middleware.js';

const router=express.Router();
router.post('/', authenticate, authorizeRestaurantOwner, createRestaurant);
router.get('/', getAllRestaurants);
router.post('/:id/menu', authenticate, authorizeRestaurantOwner, addMenuItem);
router.get('/:id/menu', getMenu);
router.get('/menu/:menuItemId', getMenuItemById);

export default router;


