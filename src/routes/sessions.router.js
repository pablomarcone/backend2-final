import express from 'express';
import passport from 'passport';
import { currentAuth } from '../middlewares/auth.js';
const router = express.Router();

import { register, login, current, logout, register_error, login_error, current_error, updateUser, deleteUser } from '../controllers/user.controller.js';

router.post('/register', passport.authenticate('register', { session: false, failureRedirect: '/api/sessions/register_error' }), register);
router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/api/sessions/login_error' }), login);
router.put('/update', currentAuth, updateUser);
router.delete('/delete', currentAuth, deleteUser);
router.get('/current', currentAuth, current);
router.get('/logout', currentAuth, logout);
router.get('/register_error', register_error);
router.get('/login_error', login_error);
router.get('/current_error', current_error);

export default router;