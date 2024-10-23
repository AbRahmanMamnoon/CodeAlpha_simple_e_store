// packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Utiles
import connectDB from './config/db.js';

// Import routs
import productRout from './routes/productRoutes.js';
import userRout from './routes/userRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route with CORS enabled
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the allowed origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());

// Routes
app.use('/api/v1/products', productRout);
app.use('/api/v1/users', userRout);

// Not Found
app.use('/', (req, res) => {
  res.send('The Route You Requested Does Not Exist!');
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
