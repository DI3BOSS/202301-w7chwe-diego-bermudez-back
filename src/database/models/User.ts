import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  avatar: {
    type: Object,
  },
  email: {
    type: String,
  },
  aboutme: {
    type: String,
  },
  relationships: {
    type: Object,
    friends: { type: Array },
    foes: { type: Array },
  },
});

const User = model("User", userSchema, "users");

export default User;
