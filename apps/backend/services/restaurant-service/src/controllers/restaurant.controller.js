import Restaurant from '../models/restaurant.model.js';
import MenuItem from '../models/menu.model.js';

/**
 * POST /restaurants
 * Only RESTAURANT role
 */
export const createRestaurant = async (req, res) => {
  const { name, description } = req.body;

  const restaurant = await Restaurant.create({
    name,
    description,
    ownerId: req.user.id
  });

  res.status(201).json(restaurant);
};

/**
 * GET /restaurants
 * Public
 */
export const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

/**
 * POST /restaurants/:id/menu
 * Only RESTAURANT role
 */
export const addMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  const restaurant = await Restaurant.findById(id);

  if (!restaurant)
    return res.status(404).json({ message: 'Restaurant not found' });

  if (restaurant.ownerId !== req.user.id)
    return res.status(403).json({ message: 'Not your restaurant' });

  const item = await MenuItem.create({
    restaurantId: id,
    name,
    price,
    category
  });

  res.status(201).json(item);
};

/**
 * GET /restaurants/:id/menu
 * Public
 */
export const getMenu = async (req, res) => {
  const { id } = req.params;

  const menu = await MenuItem.find({ restaurantId: id });
  res.json(menu);
};
