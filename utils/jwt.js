const jwt = require("jsonwebtoken");
const { JWT_EXPIRES_IN, JWT_SECRET_KEY } = require("../Constant/Constants");
function jwtTokenGenerator(payload) {
  const { username } = payload;
  jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
}

module.exports = {
  jwtTokenGenerator,
};
