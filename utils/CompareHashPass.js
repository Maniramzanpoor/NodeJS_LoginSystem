const bcrypt = require("bcrypt");
function CompareHashedPassord(data, HashedPassword) {
  return bcrypt.compareSync(data, HashedPassword);
}
module.exports = {
  CompareHashedPassord,
};
