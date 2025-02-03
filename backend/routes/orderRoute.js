// routes/orderRoutes.js
import express from 'express';
import { userOrders, placeOrder } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/userorders/:userId', auth, userOrders);
router.post('/place', auth, placeOrder);

export default router;