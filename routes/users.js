import express from 'express';
import { updateUser, deleteUser, getUser, getAllUsers, getAllStudents, getAllTeachers, getCurrentUser, getStudentsByClasa } from '../controllers/user.js'
import { verifyAdmin, verifyProfesor, verifyProfesorOrCurrentUser, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get(`/current-user`, verifyToken, getCurrentUser)

router.get(`/teachers`, verifyAdmin, getAllTeachers)

router.get(`/students`, verifyToken, getAllStudents)

router.get('/students/by-clasa', verifyProfesor, getStudentsByClasa)

router.get(`/`, verifyAdmin, getAllUsers)

router.get(`/:id`, verifyToken, getUser)

router.put(`/:id`, verifyAdmin, updateUser)

router.delete(`/:id`, verifyAdmin, deleteUser)


export default router  