import express from 'express';
import { authMiddleware,  } from '../middlewares/authMiddleware.js';
import { createReservation, getReservations, cancelReservation, getTrips } from '../controllers/reservationsController.js';


const router = express();

router.post('/', authMiddleware, createReservation);
router.get('/', authMiddleware, getReservations);
router.get('/trips', authMiddleware, getTrips);
router.delete('/:id', authMiddleware, cancelReservation);
// router.put(`/addtoFavorites/:id`, loginUser);

export default router;

