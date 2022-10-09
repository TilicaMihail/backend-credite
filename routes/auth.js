import express from 'express';
import { changePassword, login, logout, register } from '../controllers/auth.js';
import { verifyAdmin, verifyMaster, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/register', verifyMaster, register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/change-password', verifyToken, changePassword)

export default router