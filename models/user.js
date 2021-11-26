import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    cantBuy: {
      type: Number,
    },
    isBuying: {
      type: Number,
    },
    selectedBy: {
      type: Number,
    }
  }
);

const User = mongoose.model('User', UserSchema);

export default User;
