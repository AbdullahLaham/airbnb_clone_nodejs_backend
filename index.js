import express from 'express';
import dotenv from 'dotenv/config';
import { dbConnect } from './config/dbConnect.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import listingRoutes from './routes/listingsRoutes.js'
import reservationRoutes from './routes/reservationsRoute.js';
import morgan from 'morgan';

const app = express();


app.use(morgan("dev"));
app.use(bodyParser.json({"limit": "30mb", extended: true})); // 30mb because we will send images
app.use(bodyParser.urlencoded({"limit": "30mb", extended: true}));
app.use(cookieParser());

app.use(cors())


app.use('/user', userRoutes);
app.use('/listings', listingRoutes);
app.use('/reservations', reservationRoutes)


app.use('/', async (req, res) => {
    res.json("Server is Running");
});



app.listen(5000, () => {
    console.log('Server is running on port', 5000)
});
dbConnect();

