import express from 'express';
import authRoute from './route/auth_route.js';
import connectToMongoDB from './DB/database.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();
  
// Middleware
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true ,limit: '1mb' }));

// Routes
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 8000;
connectToMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database', error);
        process.exit(1);  // Exit the process if database connection fails
});