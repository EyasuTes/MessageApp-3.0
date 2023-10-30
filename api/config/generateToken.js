const JWT = require("jsonwebtoken");

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.jwtKey, {
    expiresIn: "1h",
  });
};
module.exports = generateToken;
