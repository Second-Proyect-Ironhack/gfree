const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  rol : {
    type : String,
    enum : ["Shop", "Restaurant"],
    default : "Shop"
  },
  description: String,
  address: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  refToUser: Schema.Types.ObjectId,
  picture: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
