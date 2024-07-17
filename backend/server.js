import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Connect to MongoDB and start the server
mongoose.connect(config.MONGO_URI)
  .then(() => app.listen(config.PORT, () => console.log(`MongoDB connected and Server running on port ${config.PORT}`)))
  .catch((err) => console.error('Failed to connect to MongoDB', err));
  

export default app;  