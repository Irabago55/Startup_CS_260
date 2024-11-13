// backend/index.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'BCE7DCB2ACAC6B5994D3CB34C2B3C'; // In production, use environment variables

app.use(cors());
app.use(express.json());

// In-memory user store (for demonstration purposes)
const users = [];

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the new user
  users.push({ username, password: hashedPassword });
  return res.status(201).json({ message: 'User registered successfully.' });
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Find the user
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Create JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ message: 'Login successful.', token });
});

// Protected Route Example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}. This is a protected route.` });
});

// Middleware to Authenticate Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Access token required.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});