const express = require('express');
const authController = require('../controller/authcontroller');
const router = express.Router();
const Stripe = require('stripe');
const { responseCreator } = require('../creators/responsecreators');
const usermodel = require('../model/usermodel');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  '/create-checkout-session',
  authController,
  async (req, res, next) => {
    try {
      const { cart } = res.locals.userdata;
      const lineItems = cart.items.map((product) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:5173/cart/checkout/success',
        cancel_url: 'http://localhost:5173/cancel',
        line_items: lineItems,
        mode: 'payment',
      });
      res.cookie('session_id', session.id, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.send({ session, id: session.id });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/checkout-session', authController, async (req, res, next) => {
  try {
    const sessionId = req.cookies.session_id;
    const { username, cart } = res.locals.userdata;
    console.log('cart items are', cart.items);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const order = {
      stripeSessionId: sessionId,
      amount: cart.totalPrice,
      username,
      currency: session.currency,
      paymentstatus: session.payment_status,
      quantity: cart.totalQuantity,
      items: cart.items,
    };
    await usermodel.updateOrders(username, order);
    res.send(responseCreator('the order is placed successfully', order));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
