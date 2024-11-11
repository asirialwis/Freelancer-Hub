import express from 'express';
import handleContactMessage from '../controller/contactMessageController';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

router.post('/contact',authenticateToken, handleContactMessage);

export default router;
