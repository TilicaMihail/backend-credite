import express from 'express';
import { approveProject, createProject, deleteAllProjects, deleteProject, getAdvancedProjects, getCreatedProjects, getProjectById, getProjects, getSignedUpProjects, getUnapprovedProjects, getVolunteeringProjects, gradeStudent, markStudentPresent, removeStudent, signUpToProject, updateProject } from '../controllers/projects.js';
import { verifyAdmin, verifyToken, verifySignUpToProject, verifyAuthorProjectOrAdmin, verifyUserIsSignedUpToProject, verifyProfesorOrCurrentUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getProjects)

router.get('/unapproved', verifyToken, getUnapprovedProjects)

router.get('/advanced', verifyToken, getAdvancedProjects)

router.get('/volunteering', verifyToken, getVolunteeringProjects)

router.get('/created-projects/:id', verifyProfesorOrCurrentUser, getCreatedProjects)

router.get('/signed-up-projects/:id', verifyProfesorOrCurrentUser, getSignedUpProjects)

router.get('/:id', verifyToken, getProjectById)

router.post('/approve/:id', verifyAdmin, approveProject)

router.post('/sign-up/:id', verifySignUpToProject, signUpToProject)

router.post('/grade/:id', verifyAuthorProjectOrAdmin, verifyUserIsSignedUpToProject, gradeStudent)

router.post('/present/:id', verifyAuthorProjectOrAdmin, verifyUserIsSignedUpToProject, markStudentPresent)

router.post('/', verifyToken, createProject)

router.put('/:id', verifyAuthorProjectOrAdmin, updateProject)

router.put('/remove-student/:id', verifyAuthorProjectOrAdmin, verifyUserIsSignedUpToProject, removeStudent)

router.delete('/:id', verifyAuthorProjectOrAdmin, deleteProject)

router.delete('/', verifyAdmin, deleteAllProjects)

export default router  