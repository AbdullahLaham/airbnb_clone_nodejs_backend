import Reservation from '../models/ReservationModel.js';


export const getReservations = async (req, res) => {
     try {
        const { _id: userId } = req?.user;
        const reservations = await Reservation.find({userId}).populate({path: "listingId", strictPopulate: false});
        const reservationss =  await reservations?.filter((reservation) => String(reservation?.listingId?.userId) == userId)
        res.json(reservationss);
     } catch (error) {
        throw new Error(error)
     }
}

export const createReservation = async (req, res) => {
    try {

        const {_id} = req?.user;
        const { totalPrice, startDate, endDate, userId, listingId } = req.body;
        const reservation = await Reservation.create({ totalPrice, startDate, endDate, userId, listingId });
        console.log(reservation, 'rrtrtttttttttttttt')
        res.json(reservation);

    } catch (error) {
       throw new Error(error);
    }
}
export const getTrips = async (req, res) => {
    try {
        const { _id } = req?.user;
        const reservations = await Reservation.find({userId: _id}).populate({path: "listingId", strictPopulate: false});
        // console.log(req.params, "request params")
        res.json(reservations);
    } catch (error) {
        throw new Error(error);
    }
}
export const cancelReservation = async (req, res) => {
    const {_id} = req?.user;
    const {id} = req?.params;
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        res.json(deletedReservation);
    } catch(error) {
        throw new Error(error);
    }

}