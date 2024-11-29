import express from 'express';
import profileData from '../controller/profileDataController';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

router.post('/profile',authenticateToken ,profileData);

export default router;