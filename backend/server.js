const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// ✅ Simple DB connect (this already worked before)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/elections', require('./routes/elections'));
app.use('/api/voting', require('./routes/voting'));

// Base routerss
app.get('/', (req, res) => {
  res.json({ message: 'E-Voting System API running ✅' });
});

// 🔥 IMPORTANT FIX (only this was needed)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});