import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageSrc: String,
  category:  String,
  roomCount: Number,
  bathroomCount: Number,
  guestCount: Number,
  locationValue: String,
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  price: Number,
  reservations: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
    }
  ]
});

export default mongoose.model("Listing", ListingSchema);