import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();


router.post('/create-order', authMiddleware.authUser, paymentController.createOrder);

router.post("/checkout", authMiddleware.authUser, paymentController.checkout);

router.post("/verify", authMiddleware.authUser, paymentController.verifyPayment);

export default router;
