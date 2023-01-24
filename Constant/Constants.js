const JWT_SECRET_KEY =
  "$2y$10$plxSNjwjE8Q8MkL.CKyq..jotbtB58ySb8RYgR6PhlsFExwRa10da";
const JWT_EXPIRES_IN = Date.now() + 1000 * 60 * 60 * 24 * 3;
module.exports = {
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN,
};
