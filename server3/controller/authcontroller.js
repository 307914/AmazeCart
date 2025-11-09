const { errorcreator } = require('../creators/responsecreators');
const usermodel = require('../model/usermodel');
const { verifyToken } = require('../utils/token');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {*} next
 */
const authController = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    const { username } = verifyToken(authToken);

    const {
      password: newpassword,
      secret: newsecret,
      ...userdata
    } = await usermodel.findUser(username);

    if (userdata) {
      res.locals.userdata = userdata;
      next();
    } else {
      errorcreator('user does not exist');
    }
  } catch (err) {
    next(err);
  }
};
module.exports = authController;
