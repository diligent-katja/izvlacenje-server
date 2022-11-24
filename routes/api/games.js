import {Router} from 'express';
import {getGameById, getGames} from '../../controllers/games.js';

const router = Router();


// @desc      Get all games
// @route     GET /api/games
router.get('/', getGames);

// @desc      Get game by game_id
// @route     GET /api/games/:game_id/:user_id
router.get('/:game_id/:user_id', getGameById);

export default router;
