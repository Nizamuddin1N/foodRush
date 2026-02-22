import express from 'express';
import { processPayment } from '../controllers/payment.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, processPayment);
router.get('/', (req, res)=>{
    res.send("payments working")
})

export default router;