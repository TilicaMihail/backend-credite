import express from 'express';
import { createInternship, deleteInternship, getAllInternships, getCreatedInternships, getInternshipById, getSignedUpInternships, signUpToInternship, updateInternship } from '../controllers/internships.js';
import { verifyProfesor, verifyProfesorOrCurrentUser, verifySignUpToInternship, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getAllInternships);

router.get('/:id', verifyToken, getInternshipById);

router.get('/created-internships/:id', verifyProfesor, getCreatedInternships);

router.get('/signed-up-internships/:id', verifyProfesorOrCurrentUser, getSignedUpInternships);

router.post('/', verifyProfesor, createInternship);

router.post('/sign-up/:id', verifySignUpToInternship, signUpToInternship);

router.put('/:id', verifyProfesor, updateInternship);

router.delete('/:id', verifyProfesor, deleteInternship);

export default router  