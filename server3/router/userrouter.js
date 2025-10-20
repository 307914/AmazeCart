const express = require('express');
const {
  login,
  signup,
  resetpassword,
  loginviacookie,
  logout,
  scancontroller,
} = require('../controller/usercontroller');
const authController = require('../controller/authcontroller');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.patch('/reset-password', resetpassword);

router.get('/login', authController, loginviacookie);
router.post('/scanqrcode', scancontroller);

router.post('/logout', logout);
module.exports = router;
