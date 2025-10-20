const {
  responseCreator,
  errorcreator,
} = require('../creators/responsecreators');
const usermodel = require('../model/usermodel');
const { genOtp, verifyOtp } = require('../utils/otp');
const { genPassword, verifyPassword } = require('../utils/passwordutils');
const { genToken } = require('../utils/token');

const signup = async (req, res, next) => {
  try {
    const { password, ...userdata } = req.body;
    userdata.password = await genPassword(password);
    const { qrcode, secret } = await genOtp(userdata.username);
    userdata.secret = secret;
    userdata.qrcode = qrcode;
    const {
      password: hashed,
      secret: newsecret,
      ...user
    } = await usermodel.createUser(userdata);
    res.send(responseCreator(`signup sucessfull`, { user, qrcode }));
  } catch (err) {
    next(err);
  }
};
/**
 *
 * @param {*} req
 * @param {import("express").Response} res
 * @param {*} next
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { password: passwrodhash, ...user } = await usermodel.findUser(
      username
    );

    const isverified = await verifyPassword(password, passwrodhash);
    if (isverified) {
      const token = genToken(user);
      res.cookie('authToken', token, { httpOnly: true, maxAge: 3600_000 });
      res.send(responseCreator(' logged in sucessfully', user));
    } else {
      errorcreator('the password is invalid', 401);
    }
  } catch (err) {
    next(err);
  }
};

const resetpassword = async (req, res, next) => {
  try {
    const { username, password, otp } = req.body;
    const newpassword = password;
    const { secret } = await usermodel.findUser(username);
    const isverified = verifyOtp(secret, otp);
    if (isverified) {
      const hashpassword = await genPassword(newpassword);
      await usermodel.updatepassword(username, newpassword, hashpassword);
      res.send(responseCreator('the password changed sucessfully'));
    } else {
      errorcreator('Invalid password!!!');
    }
  } catch (err) {
    next(err);
  }
};

const loginviacookie = async (req, res, next) => {
  const userdata = res.locals.userdata;

  res.send(
    responseCreator(` ${userdata.username} logged in sucessfully`, userdata)
  );
};

/**
 *
 * @param {*} req
 * @param {import("express").Response} res
 * @param {*} next
 */
const logout = async (req, res, next) => {
  res.clearCookie('authToken');
  res.locals.userdata = null;
  res.send(responseCreator(' logged out sucessfully'));
};

const scancontroller = async (req, res, next) => {
  try {
    const { username } = req.body;
    const data = await usermodel.scanuserdetails(username);
    res.send(responseCreator('qr code generated succesfully', data));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  scancontroller,
  login,
  signup,
  resetpassword,
  logout,
  loginviacookie,
};
