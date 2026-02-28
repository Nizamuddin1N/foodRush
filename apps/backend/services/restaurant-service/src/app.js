import express from "express";
import restaurantRoutes from "./routes/restaurant.controller.js";

const app = express();
app.use(express.json());
app.use('/restaurants', restaurantRoutes);

export default app;