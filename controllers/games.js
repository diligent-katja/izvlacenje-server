import Game from "../models/game.js";
import {asyncHandler} from "../middleware/aync.js";
import User from "../models/user.js";


// Get users
export const getGames = asyncHandler(async (req, res, next) => {
  const games = await Game.find({});
  if (games)
    res.status(200).json(games);
  else return res.status(404).json({msg: 'There is no games yet!'});
});

// Get users
export const getGameById = asyncHandler(async (req, res, next) => {
  const game = await Game.findOne({game_id: req.params.game_id});
  const user = await User.findOne({user_id: req.params.user_id});
  if(!user) return res.status(404).json({msg: 'Check your user id!'});
  if (game) {
    const records = await User.find().where('user_id').in(game.user_ids).exec();
    if (!records) return res.status(404).json({msg: 'There is no users!'});
    game.users = records;
  } else return res.status(404).json({msg: 'Check your game id!'});

  res.status(200).json(game);
});
