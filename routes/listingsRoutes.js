import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createListing, getListings, getCurrentListing, deleteListing } from '../controllers/listingsController.js';
import { productImageResize, uploadPhoto } from '../middlewares/uploadImages.js';
import { uploadImages } from '../controllers/uploadController.js';

const router = express();

router.post('/', createListing);
router.get('/', getListings);
router.get('/:id', getCurrentListing);
router.put('/upload', authMiddleware, uploadPhoto.array("images", 10), productImageResize, uploadImages);
router.delete('/:id', authMiddleware, deleteListing);

export default router ;

