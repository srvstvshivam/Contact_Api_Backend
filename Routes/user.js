import express from 'express'
import { register,login } from '../controllers/user.js';

const router = express.Router();

//User Routes
// @api description ;- user register
// @api url/endpoint :- /api/user/register
// @api method :- post
router.post('/register',register)


//Login Routes
// @api description ;- user login
// @api url/endpoint :- /api/user/login
// @api method :- post
router.post('/login',login)


export default router;