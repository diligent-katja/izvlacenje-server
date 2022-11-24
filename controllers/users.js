import User from '../models/user.js';
import Game from '../models/game.js';
import {asyncHandler} from "../middleware/aync.js";
import {validationResult} from 'express-validator';
import * as crypto from "crypto";

// Post users
export const postUsers = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {game_id, user_id, name, cantBuy, isBuying, selectedBy, isCreator} = req.body;
  const user = {
    user_id: user_id ? user_id : crypto.randomBytes(2).toString("hex"),
    game_id: game_id ? game_id : crypto.randomBytes(5).toString("hex"),
    name: name, cantBuy: cantBuy, isBuying: isBuying, selectedBy: selectedBy, isCreator: isCreator
  }

  const gameId = user.game_id;


  let newUserId = await existWithSameId(user.user_id);
  if (newUserId) user.user_id = newUserId;

  let game = await Game.findOne({game_id: user.game_id});
  if (game) {
    //todo:: check if existing with same name, but you need to find first user name
    // const existing = await game.user_ids.some(function (el) {
    //   return el.name === user.name;
    // });
    // if (existing)
    //   return res.status(404).json({msg: 'You already have user with same name!'});
    // else {
    game.user_ids.push(user.user_id)
    await game.save();
    let newUser = new User(user);
    await newUser.save();
    return res.status(200).json({game: game});
    // }
  } else {
    user.isCreator = true;

    let newUser = new User(user);
    await newUser.save()

    delete user.game_id;

    let gameField = {game_id: gameId, user_ids: [user.user_id]}
    let newGame = new Game(gameField);
    await newGame.save()

    return res.status(200).json({user: newUser, game: newGame});
  }
});

async function existWithSameId(userId) {
  let newId = false;
  let user = await User.findOne({user_id: userId})
  if (user) {
    newId = crypto.randomBytes(2).toString("hex")
    await existWithSameId(newId)
  }
  return newId;
}

// Get users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// Get user by id
export const getUserById = asyncHandler(async (req, res, next) => {
  const users = await User.findOne({user_id: req.params.id});
  res.status(200).json(users);
});

// Get user by game id
export const getUserByGameId = asyncHandler(async (req, res, next) => {
  const users = await User.find({game_id: req.params.game_id});
  res.status(200).json(users);
});

// Update user
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({user_id: req.params.id});
  const {name, cantBuy, isBuying, selectedBy} = req.body;

  if (!user) return res.status(404).json({msg: 'Can not find user!'});

  if (cantBuy) {
    const cantBySelected = await User.findOne({cantBuy: cantBuy});
    if (cantBySelected && cantBySelected !== user.user_id)
      return res.status(404).json({sucess: false, msg: 'Already selected by someone!'});
  }
  if (user.cantBuy && cantBuy === "")
    user.cantBuy = ""
  else user.cantBuy = cantBuy ? cantBuy : user.cantBuy;

  if (user.isBuying) {
    const alreadySelected = await User.findOne({isBuying: selectedBy});
    if (alreadySelected)
      return res.status(404).json({sucess: false, msg: 'Already selected by someone!'});
  }

  user.name = name ? name : user.name;

  user.isBuying = isBuying ? isBuying : user.isBuying;
  user.selectedBy = selectedBy ? selectedBy : user.selectedBy

  await user.save();

  res.status(200).json(user);
});
