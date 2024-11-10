import express from 'express';
import handleContactMessage from '../controller/contactMessageController';

const router = express.Router();

router.post('/contact', handleContactMessage);

export default router;
