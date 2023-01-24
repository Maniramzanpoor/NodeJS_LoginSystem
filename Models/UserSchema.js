const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    age: { type: Number },
    UserImage_Url: { type: String, default: "default.jpg" },
    role: { type: String, default: "USER", required: true },
    token: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
const UserModel = model("user", UserSchema);
module.exports = {
  UserModel,
};
