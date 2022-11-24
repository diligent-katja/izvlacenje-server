import {Router} from 'express';
import {getUserByGameId, getUserById, getUsers, postUsers, updateUser} from "../../controllers/users.js";
import {check} from 'express-validator';

const router = Router();

// @desc      Update user
// @route     POST /api/users
router.post('/',
  [check('name', 'Name is required').not().isEmpty()],
  postUsers);

// @desc      Get all users
// @route     GET /api/users
router.get('/', getUsers);

// @desc      Get user by id
// @route     GET /api/user/id
router.get('/:id', getUserById);

// @desc      Get user by id
// @route     GET /api/user/game/game_id
router.get('/game/:game_id', getUserByGameId);

// @desc      Update user
// @route     PUT /api/users/:id
router.put('/:id', updateUser);


export default router;
