const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration for your Easypanel deployment
app.use(cors({
  origin: [
    // Development URLs
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173',
    'https://stealthygood-frontend.07cmzp.easypanel.host',
    
    // Your existing Vercel deployment
    'https://stealthygood.vercel.app',
    
    // Your Easypanel server IP
    'http://69.62.77.121:3000',
    'http://69.62.77.121:3001',
    'http://69.62.77.121:4000',
    'http://69.62.77.121:8080',
    
    // Add your custom domain when you set it up
    // 'https://yourdomain.com',
    // 'https://app.yourdomain.com'
  ],
  credentials: true,
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Stealthy Good API Server',
    status: 'Running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: process.env.PORT
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl
  });
});

module.exports = app;
