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
const path = require('path');
const productRouter = require('./router/products');
const checkOutRoute = require('./router/sessionRouter');
const sendEmail = require('./utils/mailutils');

const PORT = 2000;
app.use(
  cors({
    // origin: 'http://127.0.0.1:5500',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());
app.use('/router', router);
app.use('/cart', cartrouter);
app.use('/', productRouter);
app.use('/stripe', checkOutRoute);

app.use('/', express.static(path.join(__dirname, 'dist')));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` the server running on ${PORT}`);
});
