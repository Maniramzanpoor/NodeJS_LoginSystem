const Router = require("express").Router();
const authRoutes = require("./auth.routes");
const usersRoutes = require("./user.routes");

Router.use("/users", usersRoutes);
Router.use("/auth", authRoutes);

module.exports = Router;
