import express from 'express';
import userCart from '../controllers/userController.js';

const router = express.Router();

router.post('/cart', userCart);

export default router;
