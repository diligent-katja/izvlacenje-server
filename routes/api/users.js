import { Router } from 'express';
import {getUsers, updateUser} from "../../controllers/users.js";

const router = Router();

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin
router.get('/', getUsers);

// @desc      Update user
// @route     PUT /api/users/:id
// @access    Private/Admin
router.put('/:id', updateUser);


export default router;
