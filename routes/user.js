import express from 'express';
import { getAllUsers } from '../controllers/user.js';

const router = express.Router();


// get users
router.get('/all-users', getAllUsers);


// get user by id

export default router;