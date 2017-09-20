const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  refToPlace: [Schema.Types.ObjectId],
  refToUser: Schema.Types.ObjectId,
  delete:{type:Number, default:0},
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
