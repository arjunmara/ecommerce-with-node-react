const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  productImg: {
    type: String
  },
  prouductPrice: {
    type: String,
    required: true
  },
  quantity: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
