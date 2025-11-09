const express = require('express');
const {
  addToCart,
  RemoveFromCart,
  Increment,
  Decrement,
  GetCartItems,
  ClearCart,
} = require('../controller/cartcontroller');
const authController = require('../controller/authcontroller');
const cartrouter = express.Router();

cartrouter.post('/add', authController, addToCart);

cartrouter.post('/remove', authController, RemoveFromCart);

cartrouter.patch('/increment', authController, Increment);

cartrouter.patch('/decrement', authController, Decrement);

cartrouter.get('/getcartitems', authController, GetCartItems);

cartrouter.delete('/clear-cart', authController, ClearCart);
cartrouter.all('/{*splat}', (req, res) => {
  res.send('invalid route');
});

module.exports = cartrouter;
