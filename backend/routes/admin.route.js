import express from 'express';
import { deleteUser, editUserProfile, getAllUsers , getAllCoordinators , getAllLeads } from '../controllers/admin.controller.js';
import isAdmin from '../middlewares/auth/isAdmin.js';

const router = express.Router();

router.post('/editUserProfile',isAdmin, editUserProfile);

router.delete('/deleteUser',isAdmin, deleteUser);
router.get('/users', getAllUsers);
router.get('/coordinators', getAllCoordinators);
router.get('/leads', getAllLeads);


export default router;