const router = require("express").Router();
const { default: axios } = require("axios");
const { UserModel } = require("../Models/UserSchema");
const { HashString } = require("../utils/HashString");
const { isValidObjectId, ObjectId } = require("mongoose");
router.post("/create", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user;
    const userNameRegexp = /^[a-zA-Z\-]+$/;
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!userNameRegexp.test(username)) {
      throw { status: 400, message: "username is not true" };
    }
    if (!emailRegexp.test(email)) {
      throw { status: 400, message: "email is not true" };
    }
    if (password.lenght < 6 || password.lenght > 16)
      throw {
        status: 400,
        message: "password cannot be lenght little than 6 and longer than 16",
      };
    user = await UserModel.findOne({ username });
    if (user) throw { status: 400, message: "Username In use" };
    user = await UserModel.findOne({ email });
    if (user) throw { status: 400, message: "email In use" };
    const hadshedPassword = HashString(password);
    const userCreateResult = await UserModel.create({
      username,
      email,
      password: hadshedPassword,
    });
    if (userCreateResult) return res.json(userCreateResult);
    throw { status: 500, message: "user Creation is not finished" };
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  const users = await UserModel.find(
    {},
    { password: 0, updatedAt: 0, createdAt: 0, __v: 0 }
  ).sort({
    _id: -1,
  });
  res.json({ users });
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw { status: 404, message: "Id isnot Valid" };
    const user = await UserModel.findOne({ _id: id });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
