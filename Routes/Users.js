const router = require("express").Router();
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

router.post("/create", CreateUser);
router.get("/", GetUsers);
router.get("/:id", GetUserData);
router.delete("/:id", DeleteUser);
router.put("/:id", UpdateUser);
router.put("/profile/:id", UploadImage.single("images"), UpdateProfileImage);
module.exports = router;
