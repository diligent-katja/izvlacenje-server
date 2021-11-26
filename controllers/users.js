import User from '../models/user.js';
import {asyncHandler} from "../middleware/aync.js";

// Get users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// Update user
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({id: req.params.id});
  const { name, cantBuy, isBuying, selectedBy } = req.body;

  user.name = name;
  user.cantBuy = cantBuy;
  user.isBuying = isBuying;
  user.selectedBy = selectedBy

  await user.save();

  res.status(200).json(user);
});
