import {cloudinaryUploadImg, cloudinaryDeleteImg} from '../utils/cloudinary.js';
import Listing from '../models/ListingModel.js';
import User from '../models/UserModel.js'
export const getListings = async (req, res) => {
    try {
        const listings = await Listing.find({});
        console.log(req.params, "request params")
        res.json(listings);
    } catch (error) {
        throw new Error(error);
    }
}


export const createListing = async (req, res) => {
    try {
        const body = req?.body;
        const { title, description,  imageSrc,  category, roomCount, bathroomCount, guestCount, location, price, userId} = body;
        const listing = await Listing.create({title, description,  imageSrc,  category, roomCount, bathroomCount, guestCount, locationValue: location, price, userId})
        
        Object.keys(body).forEach((value) => {
            if (!body[value]) {
                throw new Error("there is no ", body[value]);
            }
        });
        
        res.json(listing);
    } catch (error) {
        throw new Error(error);
    }
}


export const deleteListing = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const deletedListing = await Listing.deleteOne({
            _id: id,
            userId: userId,
        });
        res.json(deletedListing);
    } catch (error) {
        throw new Error(error);
    }
}


export const getCurrentListing = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const currentListing = await Listing.findById(id).populate({path: 'userId', strictPopulate: false});
        res.json(currentListing);
    } catch (error) {
        throw new Error(error);
    }
}

