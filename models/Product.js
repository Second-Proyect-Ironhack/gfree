const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  refToPlace: String,
  refToUser: String,
  picture: {
    name: String,
    pic_path: String,
    pic_name: String
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
