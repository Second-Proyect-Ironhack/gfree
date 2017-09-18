const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  description: String,
  address: String,
  coordinates: {
    lat: String,
    lng: String,
  },
  refToUser: String,
  picture: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Plsce = mongoose.model("Place", placeSchema);

module.exports = Place;
