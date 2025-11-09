const express = require('express');
const Productmodel = require('../model/productmodel');
const { products } = require('../data');
const errorHandler = require('../errorhandler');
const { responseCreator } = require('../creators/responsecreators');
const router = express.Router();

router.post('/products', async (req, res, next) => {
  try {
    const newdata = await Productmodel.products(products);
    res.send(responseCreator('fetched products', newdata));
  } catch (err) {
    next(err);
  }
});

router.get('/paginated', async (req, res, next) => {
  try {
    const { limit = 10, pages = 1 } = req.query;
    const data = await Productmodel.paginated(+limit, +pages);
    res.send(responseCreator('the products are', data));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
