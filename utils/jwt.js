const jwt = require("jsonwebtoken");
const { JWT_EXPIRES_IN, JWT_SECRET_KEY } = require("../Constant/Constants");

function jwtTokenGenerator(payload) {
  const { username } = payload;
  console.log({ username });
  return jwt.sign(
    { username },
    "$2y$10$plxSNjwjE8Q8MkL.CKyq..jotbtB58ySb8RYgR6PhlsFExwRa10da",
    { expiresIn: "3d" }
  );
}

module.exports = {
  jwtTokenGenerator,
};
