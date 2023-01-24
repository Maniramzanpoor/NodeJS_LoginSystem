const { UserModel } = require("../Models/UserSchema");
const { CompareHashedPassord } = require("../utils/CompareHashPass");
const { HashString } = require("../utils/HashString");
const { jwtTokenGenerator } = require("../utils/jwt");
async function CreateUser(req, res, next) {
  try {
    const { username, email, password, password_confirm } = req.body;
    let user;
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegexp.test(email)) {
      throw { status: 400, message: "email is not true" };
    }
    if (password.lenght < 6 || password.lenght > 16)
      throw {
        status: 400,
        message: "password cannot be lenght little than 6 and longer than 16",
      };
    if (password !== password_confirm)
      throw { status: 400, message: "Password Most be one" };
    user = await UserModel.findOne({ username });
    if (user) throw { status: 400, message: "Username In use" };
    user = await UserModel.findOne({ email });
    if (user) throw { status: 400, message: "email In use" };
    await UserModel.create({
      username,
      email,
      password: HashString(password),
    }).catch((error) =>
      res.status(500).json({ status: 500, meessage: "User dont created" })
    );
    return res.status(201).json({ status: 201, message: "user Created !" });
  } catch (error) {
    next(error);
  }
}
async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    let user;
    user = await UserModel.findOne({ username });
    if (!user)
      throw { status: 401, message: "username or password is not true" };

    if (!CompareHashedPassord(password, user.password))
      throw { status: 401, message: "username or password is not true" };
    let token = jwtTokenGenerator(user);
    console.log(token);
    user.Token = token;
    user.save();
    return res.status(200).json({
      status: 200,
      succes: true,
      message: "welcome to your account",
      token,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  CreateUser,
  login,
};
