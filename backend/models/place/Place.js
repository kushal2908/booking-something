import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extra_info: String,
  check_in: Number,
  check_out: Number,
  max_guest: Number,
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.export = PlaceModel;
