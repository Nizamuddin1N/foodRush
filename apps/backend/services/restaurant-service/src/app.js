import express from "express";
import restaurantRoutes from "./routes/restaurant.controller.js";

const app = express();
app.use(express.json());
app.use('/', restaurantRoutes);
app.get('/health', (req,res)=>{
  res.json({service:"auth service working"})
})
export default app;