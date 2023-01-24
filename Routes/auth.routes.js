const Router = require("express").Router();
const { CreateUser, login } = require("../Controller/Auth.Controller");
Router.post("/Rigester", CreateUser);
Router.post("/login", login);
Router.put("/reset-password", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
module.exports = Router;
