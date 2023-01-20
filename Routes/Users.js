const router = require("express").Router();
const { default: axios } = require("axios");
const {
  GetUsers,
  CreateUser,
  GetUserData,
  DeleteUser,
  UpdateUser,
} = require("../Controller/User.Controller");

router.post("/create", CreateUser);

router.get("/", GetUsers);

router.get("/:id", GetUserData);
router.delete("/:id", DeleteUser);
router.put("/:id", UpdateUser);
module.exports = router;
