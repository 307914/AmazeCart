const { hash, compare, genSalt } = require('bcrypt');

const genPassword = async (password) => {
  const salt = await genSalt();

  const passHashed = await hash(password, salt);

  return passHashed;
};

const verifyPassword = (password, hashpassword) => {
  return compare(password, hashpassword);
};
module.exports = { genPassword, verifyPassword };
