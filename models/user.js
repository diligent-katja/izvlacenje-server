import mongoose from "mongoose";
import {UserTypeOfSchema} from "./UserType.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  UserTypeOfSchema
);

const User = mongoose.model('User', UserSchema);

export default User;
