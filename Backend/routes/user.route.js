import express from 'express';
import { signup,login,logout, allUsers } from '../controller/User.Controller.js'; // Import the signup controller
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();
console.log("passing route");

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/allusers', secureRoute, allUsers);

export default router; // <-- Add this default export
