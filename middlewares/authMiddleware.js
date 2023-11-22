import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import expressAsyncHandler from 'express-async-handler';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    let token ;
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, 'mysecret');
                const user = await User.findById(decoded?.id);
                req.user = user;
                console.log(decoded);
                next();
            }
        } catch (error) {
            throw new Error('Token is Expired, Please Login again')
        }
    } else {
        throw new Error("There is no token attatched to the header")
    }
});
