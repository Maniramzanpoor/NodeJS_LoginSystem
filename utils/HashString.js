const bcrypt = require("bcrypt");
function HashString(data) {
  const salt = bcrypt.genSaltSync(13);
  const Hashed = bcrypt.hashSync(data, salt);
  return Hashed;
}

module.exports = {
  HashString,
};
