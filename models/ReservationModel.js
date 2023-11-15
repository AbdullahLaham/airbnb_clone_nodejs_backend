import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    listingId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
    },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,

});

export default mongoose.model("Reservation", ReservationSchema);

