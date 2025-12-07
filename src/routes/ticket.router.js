import express from 'express';  
const router = express.Router();
import { currentAuth, roleAuth } from '../middlewares/auth.js';
import { createTicket } from '../controllers/ticket.controller.js';

router.post('/:cid', currentAuth, roleAuth(['user']), createTicket);

export default router;