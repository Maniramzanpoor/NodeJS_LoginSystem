const Router = require("express").Router();
const { default: axios } = require("axios");
const {
  GetUsers,
  CreateUser,
  GetUserData,
  DeleteUser,
  UpdateUser,
  UpdateProfileImage,
} = require("../Controller/User.Controller");
const { UploadImage } = require("../utils/UploadImage");

Router.post("/create", CreateUser);
Router.get("/", GetUsers);
Router.get("/:id", GetUserData);
Router.delete("/:id", DeleteUser);
Router.put("/:id", UpdateUser);
Router.put("/profile/:id", UploadImage.single("images"), UpdateProfileImage);
module.exports = Router;
