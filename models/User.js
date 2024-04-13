import {  Schema, model } from "mongoose";
import * as hooks from './hooks.js'
import { emailRegepxp } from "../constants/userConstants.js";


const userShema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegepxp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default:false,
    },
    verificationToken: {
      type: String,
      // required: [true, 'Verify token is required'],
    }

  },{versionKey: false, timestamps:true})

  userShema.post("save", hooks.handleSaveError);
userShema.pre("findOneAndUpdate", hooks.setUpdateSetting );
userShema.post('findOneAndUpdate', hooks.handleSaveError);

  const User = model("user", userShema)
  export default User