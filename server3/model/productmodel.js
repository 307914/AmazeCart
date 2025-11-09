const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const ProductSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'category is required'],
  },
  image: {
    type: String,
    required: [true, 'image is required'],
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
});

ProductSchema.statics.products = async (products) => {
  await Productmodel.deleteMany();
  const updateData = await Productmodel.insertMany(products);
  return updateData;
};

ProductSchema.statics.paginated = async (limit, pages) => {
  const skip = (pages - 1) * limit;
  const totalCount = await Productmodel.countDocuments();
  const updatedData = await Productmodel.aggregate([
    { $skip: skip },
    { $limit: limit },
  ]);
  return { updatedData, totalCount };
};

const Productmodel = model('Product', ProductSchema);

module.exports = Productmodel;
