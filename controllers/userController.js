
import { generateNewToken } from '../utils/refreshToken.js';
import User from '../models/UserModel.js';
import { generateToken } from '../config/jwtToken.js';
import bcrypt from 'bcrypt'
export const createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const currentUser = await User.findOne({
            email,
        });
        if (currentUser?.email) return res.status(500).send("there exist a user with the same email");
        
        const user = await User.create({email, name, password})
        
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const currentUser = await User.findOne({email});

        if (currentUser && await bcrypt.compare(password, currentUser?.password)) {
            const refreshToken = await generateNewToken(currentUser?._id);
            await User.findByIdAndUpdate(currentUser?._id, {
                refreshToken,
            }, {new: true});
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000, 
            });
            res.json({
                _id: currentUser?._id,
                name: currentUser?.name,
                email: currentUser?.email,
                image: currentUser?.image,
                mobile: currentUser?.mobile,
                favoriteIds: currentUser?.favoriteIds,
                token: generateToken(currentUser?._id),
              });
        } else {
            throw new Error("Invalid Credentials");
        }
        // const user = await User.find({});
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
}

export const getWishlist = async (req, res) => {
    try {
        const {_id: userId} = req?.user;
        const user = await User.findById(userId).populate({path: "favoriteIds", strictPopulate: false});
        res.json(user?.favoriteIds);
    } catch(error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
}

export const addListingToWishlist = async (req, res) => {
    try {
        const {_id: userId} = req?.user;
        const currentUser = await User.findById(userId);
        const {listingId} = req.params;

        // let isInFavoriteIds = currentUser.favoriteIds.find((id) => id.toString() == listingId.toString())
        console.log(listingId);

        if (listingId) {
            const user = await User.findByIdAndUpdate(userId, {
                $push: {favoriteIds: listingId}
            }, {new: true});
            res.json(user); 
        }
       
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
}

export const deleteListingFromWishlist = async (req, res) => {
    try {
        const {_id: userId} = req?.user;
        const currentUser = await User.findById(userId);
        const {listingId} = req?.params;
        const hasFavoritted = currentUser?.favoriteIds.find((id) => id.toString() == listingId.toString());
        if (hasFavoritted) {
            const user = await User.findByIdAndUpdate(userId, {
                $pull: {favoriteIds: listingId}
            }, { new: true });
            res.json(user);
        } else {
            res.status(500).json("listing is not added to the wishlist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message, sucess: false },);
    }
}
