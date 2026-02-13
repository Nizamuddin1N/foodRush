import express from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes.js';

dotenv.config();

const app = express();

setupRoutes(app);
app.listen(process.env.PORT, ()=>{
    console.log(`API Gateway running on port ${process.env.PORT}`);
});