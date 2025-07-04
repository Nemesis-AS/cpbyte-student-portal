import express from 'express';
import isAuthenticated from '../middlewares/auth/isAuthenticated.js';
import { getProfile, getProjects, userAttendance } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/attendance',isAuthenticated, userAttendance);
router.get('/getProfile', isAuthenticated, getProfile);
router.get('/getProjects',isAuthenticated, getProjects)

export default router;