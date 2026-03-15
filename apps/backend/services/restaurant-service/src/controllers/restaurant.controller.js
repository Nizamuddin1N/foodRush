import Restaurant from '../models/restaurant.model.js'
import MenuItem from '../models/menu.model.js'
import { redis } from '../redis/client.js'

export const createRestaurant = async (req, res) => {
  const { name, description } = req.body

  const restaurant = await Restaurant.create({
    name,
    description,
    ownerId: req.user.userId
  })

  res.status(201).json(restaurant)
}

export const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find()
  res.json(restaurants)
}

export const addMenuItem = async (req, res) => {
  const { id } = req.params
  const { name, price, category } = req.body

  const restaurant = await Restaurant.findById(id)

  if (!restaurant)
    return res.status(404).json({ message: 'Restaurant not found' })

  if (restaurant.ownerId !== req.user.userId)
    return res.status(403).json({ message: 'Not your restaurant' })

  const item = await MenuItem.create({
    restaurantId: id,
    name,
    price,
    category
  })

  const cacheKey = `menu:${id}`
  await redis.del(cacheKey)

  res.status(201).json(item)
}

export const getMenu = async (req, res) => {
  const { id } = req.params
  const cacheKey = `menu:${id}`

  const cached = await redis.get(cacheKey)

  if (cached) {
    return res.json(JSON.parse(cached))
  }

  const menu = await MenuItem.find({ restaurantId: id })

  await redis.set(cacheKey, JSON.stringify(menu), 'EX', 60)

  res.json(menu)
}

export const getMenuItemById = async (req, res) => {
  const { menuItemId } = req.params

  const item = await MenuItem.findById(menuItemId)

  if (!item)
    return res.status(404).json({ message: 'Menu item not found' })

  res.json(item)
}