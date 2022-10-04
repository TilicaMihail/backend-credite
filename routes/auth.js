import express from 'express';
import { login, logout, register } from '../controllers/auth.js';
import { verifyAdmin, verifyMaster } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/register', verifyMaster, register)

router.post('/login', login)

router.post('/logout', logout)

export default router