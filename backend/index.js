import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/user.routes.js';
import playerRoutes from './routes/player.routes.js';
import clubRoutes from './routes/club.routes.js';
import transferRoutes from './routes/transfer.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app);

// Set up Socket.IO for real-time updates
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173'],
  },
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`.green.bold);
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`.yellow);
  });
  
  // Handle transfer updates
  socket.on('join_transfer', (transferId) => {
    socket.join(`transfer_${transferId}`);
  });
  
  // Handle match updates
  socket.on('join_match', (matchId) => {
    socket.join(`match_${matchId}`);
  });
});

// Make io accessible from routes
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/analytics', analyticsRoutes);

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Any route that is not an API route will be directed to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});