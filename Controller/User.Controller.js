const { UserModel } = require("../Models/UserSchema");
const { HashString } = require("../utils/HashString");
const { isValidObjectId } = require("mongoose");
const path = require("path");

async function CreateUser(req, res, next) {
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
}

async function GetUsers(req, res, next) {
  const users = await UserModel.find(
    {},
    { password: 0, updatedAt: 0, createdAt: 0, __v: 0 }
  ).sort({
    _id: -1,
  });
  res.json({ users });
}
async function GetUserData(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw { status: 404, message: "Id isnot Valid" };
    const user = await UserModel.findOne({ _id: id });
    if (!user) throw {status:404,message:"User with this is NotFound"}
    user.UserImage_Url = `${req.protocol}://${req.get(
      "host"
    )}${user.UserImage_Url.replace(/[\\\\.]gm/, "/")}`;
    return res.json(user);
  } catch (error) {
    next(error);
  }
}
async function DeleteUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      throw { status: 400, message: "ObjectId is notvalid" };
    const user = await UserModel.findById(id);
    if (!user) throw { status: 404, message: "User Not Found" };
    const result = await UserModel.deleteOne({ _id: id });
    if (result.deletedCount > 0)
      return res.json({ status: 200, success: true, message: "User Deleted " });
    throw { status: 400, message: "User deleted have an error" };
  } catch (error) {
    next(error);
  }
}

async function UpdateUser(req, res, next) {
  UserModel;
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    let data = { ...req.body };
    let UserFindResult;
    const userNameRegexp = /^[a-zA-Z\-]+$/;
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (username && !userNameRegexp.test(username)) {
      throw { status: 400, message: "username is not true" };
    }
    if (email && !emailRegexp.test(email)) {
      throw { status: 400, message: "email is not true" };
    }

    if (username) UserFindResult = await UserModel.findOne({ username });
    if (UserFindResult) throw { status: 400, message: "Username In use" };
    if (email) UserFindResult = await UserModel.findOne({ email });
    if (UserFindResult) throw { status: 400, message: "email In use" };

    if (!isValidObjectId(id))
      throw { status: 400, message: "ObjectId is notvalid" };
    const user = await UserModel.findById(id);
    if (!user) throw { status: 404, message: "User Not Found" };

    const result = await UserModel.updateOne(
      { _id: id },
      {
        username,
        email,
      }
    );
    if (result.modifiedCount > 0)
      return res.json({
        status: 200,
        success: true,
        message: "user is updated",
      });
    throw { status: 400, message: "User isnt Updated" };
  } catch (error) {
    next(error);
  }
}
async function UpdateProfileImage(req, res, next) {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      throw { status: 404, message: "ObjectId is notValid" };
    const prefixPath = path.join(__dirname, ".."); // get the image adress
    let image;
    if (req.file) {
      image = req.file.path.substring(prefixPath.length);
    } else throw { status: 400, message: "Please Select One file" };
    const result = await UserModel.updateOne(
      { _id: id },
      { $set: { UserImage_Url: image } }
    );
    if (result.matchedCount <= 0)
      throw { status: 400, message: "User Updated have an Error" };
    return res.json({
      file: JSON.stringify(req.file),
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  CreateUser,
  GetUsers,
  GetUserData,
  DeleteUser,
  UpdateUser,
  UpdateProfileImage,
};
