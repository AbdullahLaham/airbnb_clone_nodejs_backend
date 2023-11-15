import express from 'express';
import { addListingToWishlist, createUser, loginUser,  } from '../controllers/userController.js';
import { authMiddleware,  } from '../middlewares/authMiddleware.js';

const router = express();

router.post('/register', createUser);
router.post('/login', loginUser);
router.put(`/addtoFavorites/:id`, authMiddleware, addListingToWishlist);

export default router;

