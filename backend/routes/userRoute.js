import express from 'express';
import { loginUser, registerUser, logoutUser, resetPassword, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/resetpassword', resetPassword);
userRouter.post('/admin', adminLogin);
export default userRouter;

