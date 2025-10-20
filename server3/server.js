const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
require('./dbconnction');
const cors = require('cors');

const cookieparser = require('cookie-parser');
const router = require('./router/userrouter');
const errorHandler = require('./errorhandler');
const cartrouter = require('./router/cartrouter');
const productRouter = require('./router/products');
const checkOutRoute = require('./router/sessionRouter');
const sendEmail = require('./utils/mailutils');

const PORT = 2000;
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());
app.use('/router', router);
app.use('/cart', cartrouter);
app.use('/', productRouter);
app.use('/stripe', checkOutRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` the server running on ${PORT}`);
});
