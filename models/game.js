import mongoose from "mongoose";
import {UserTypeOfSchema} from "./UserType.js";

const Schema = mongoose.Schema;


const UserSchema = new Schema(UserTypeOfSchema);

const GameSchema = new Schema(
  {
    game_id: {
      type: String,
      unique: true,
      required: true,
    },
    user_ids: {
      type: [String],
    },
    users: {
      type: [UserSchema],
      default: undefined
    }
  }
);

const Game = mongoose.model('Game', GameSchema);

export default Game;
