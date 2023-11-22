import express from 'express';
import { addListingToWishlist, createUser, loginUser, getWishlist } from '../controllers/userController.js';
import { authMiddleware,  } from '../middlewares/authMiddleware.js';

const router = express();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/wishlist', authMiddleware, getWishlist)
router.put(`/addtoFavorites/:listingId`, authMiddleware, addListingToWishlist);

export default router;

