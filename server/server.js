const app = require('./src/app');
const dotenv = require('dotenv');
// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// IMPORTANT: Bind to 0.0.0.0 to accept external connections (not just localhost)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend Server running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 Frontend running on http://localhost:3000`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 Supported integrations: Gmail, HubSpot, Outlook, Streak`);
});
