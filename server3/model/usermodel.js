const { model, Schema } = require('mongoose');
const { errorcreator } = require('../creators/responsecreators');
const { verifyPassword } = require('../utils/passwordutils');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'is requried'],
  },
  name: {
    type: String,
    requried: [true, 'is required'],
  },

  email: {
    type: String,
    requried: [true, 'is required'],
  },
  password: {
    type: String,
    requried: [true, 'is required'],
  },
  secret: {
    type: String,
  },
  qrcode: {
    type: String,
  },
  orders: {
    type: [Object],
    default: [],
  },
  cart: {
    items: [Object],
    totalQuantity: Number,
    totalPrice: Number,
  },
});

userSchema.statics.createUser = async (userdata) => {
  const data = (await usermodel.create(userdata)).toObject();
  return data;
};

userSchema.statics.findUser = async (username) => {
  const updatedData = (
    await usermodel.findOne({ username }, { _id: 0, __v: 0 })
  )?.toObject();
  if (!updatedData) {
    const err = new Error('user doesnot exist');
    err.status = 404;
    throw err;
  }
  return updatedData;
};
userSchema.statics.calTotal = async (username) => {
  const pipeline = [
    {
      $match: {
        username,
      },
    },
    {
      $addFields: {
        'cart.totalQuantity': {
          $reduce: {
            input: '$cart.items',
            initialValue: 0,
            in: {
              $add: ['$$value', '$$this.quantity'],
            },
          },
        },
        'cart.totalPrice': {
          $round: [
            {
              $reduce: {
                input: '$cart.items',
                initialValue: 0,
                in: {
                  $add: [
                    '$$value',
                    { $multiply: ['$$this.price', '$$this.quantity'] },
                  ],
                },
              },
            },
            2,
          ],
        },
      },
    },
    {
      $merge: {
        into: 'users',
        on: '_id',
        whenMatched: 'merge',
        whenNotMatched: 'discard',
      },
    },
  ];

  await usermodel.aggregate(pipeline);

  return true;
};
userSchema.statics.addToCart = async (username, product) => {
  const updatedData = await usermodel.updateOne(
    { username },
    { $addToSet: { 'cart.items': { ...product, quantity: 1 } } }
  );

  if (updatedData.modifiedCount) {
    const data = await usermodel.calTotal(username);
    return await usermodel.findUser(username);
  }
  return await usermodel.findUser(username);
};

userSchema.statics.removeFromCart = async (username, product) => {
  const data = await usermodel.updateOne(
    { username, 'cart.items.id': product.id },
    { $pull: { 'cart.items': { id: product.id } } }
  );

  if (data.modifiedCount) {
    await usermodel.calTotal(username);
    return await usermodel.findUser(username);
  }
  return await usermodel.findUser(username);
};

userSchema.statics.increment = async (username, product) => {
  const data = await usermodel.updateOne(
    { username, 'cart.items.id': product.id },
    { $inc: { 'cart.items.$.quantity': 1 } }
  );

  if (data.modifiedCount) {
    await usermodel.calTotal(username);
    return await usermodel.findUser(username);
  }
  return await usermodel.findUser(username);
};

userSchema.statics.decrement = async (username, product) => {
  const data = await usermodel.findOneAndUpdate(
    { username, 'cart.items.id': product.id },
    { $inc: { 'cart.items.$.quantity': -1 } },
    { new: true }
  );

  if (data.cart?.items.find(({ id }) => id === product.id)?.quantity === 0) {
    await usermodel.removeFromCart(username, product);
    return await usermodel.findUser(username);
  }
  await usermodel.calTotal(username);
  return await usermodel.findUser(username);
};

userSchema.statics.getcartitems = async (username) => {
  const data = await usermodel.findOne({ username }, { cart: 1 });
  return data.cart;
};

userSchema.statics.clearcart = async (username) => {
  const data = await usermodel.findOneAndUpdate(
    { username },
    {
      $set: { 'cart.items': [], 'cart.totalQuantity': 0, 'cart.totalPrice': 0 },
    },
    { new: true }
  );

  return data.cart;
};

userSchema.statics.updatepassword = async (
  username,
  newpassword,
  hashedpassword
) => {
  const newdata = await usermodel.findUser(username);
  const isverified = await verifyPassword(newpassword, newdata.password);
  if (isverified) {
    errorcreator('new password should not be same as old password', 401);
  }
  const data = await usermodel.updateOne(
    { username },
    { $set: { password: hashedpassword } }
  );
  if (data.modifiedCount) {
    return true;
  }
};

userSchema.statics.updateOrders = async (username, order) => {
  await usermodel.clearcart(username);
  return await usermodel.updateOne(
    { username },
    {
      $push: { orders: order },
    }
  );
};
userSchema.statics.scanuserdetails = async (username) => {
  const data = (await usermodel.findOne({ username }))?.toObject();
  if (!data) {
    const err = new Error('user doesnot exist');
    err.status = 404;
    throw err;
  }
  const { qrcode } = data;
  return qrcode;
};

const usermodel = model('user', userSchema);

module.exports = usermodel;
