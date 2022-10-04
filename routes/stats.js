import express from 'express';
import { getCreatedProjectsCount, getCreditsCount, getSignedUpProjectsCount, getUsersCount } from '../controllers/stats.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/created-projects-count', verifyToken, getCreatedProjectsCount)

router.get('/signed-up-projects-count', verifyToken, getSignedUpProjectsCount)

router.get('/users-count', verifyToken, getUsersCount)

router.get('/credits-count', verifyToken, getCreditsCount)

export default router