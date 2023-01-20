const router = require("express").Router();
const { default: axios } = require("axios");
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await axios
      .get("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.data);
    const filtredUsers = users.find((item) => item.id == id);
    if (!filtredUsers) throw { status: 404, message: "usrers NotFound" };
    return res.json(filtredUsers);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
