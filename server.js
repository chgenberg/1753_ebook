const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware (adjusted for local development)
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // Full security for production
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
        // Allow PDF.js to create a Blob-based worker
        workerSrc: ["'self'", "blob:", "https://cdnjs.cloudflare.com"],
        // Allow blob: URLs for fonts/images if needed in future
        childSrc: ["blob:"],
        upgradeInsecureRequests: [],
      },
    },
  }));
} else {
  // No helmet in development to avoid SSL issues
  console.log('Development mode: Security headers disabled');
  
  // Add development-friendly headers
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });
}

// Enable compression for better performance
app.use(compression());

// Enable CORS for cross-origin requests (needed for Shopify integration)
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle favicon requests (returning 204 No Content to avoid errors if no icon file is present)
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 E-book reader server running on port ${PORT}`);
  console.log(`📚 Access your e-book at: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
}); 