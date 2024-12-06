// service/index.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const DB = require('./database.js');
const { websocketChat } = require('./websocketChat.js');

const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;
// const websocket_port = 5001;
const JWT_SECRET = 'BCE7DCB2ACAC6B5994D3CB34C2B3C'; // Use env variables in production

// Middleware
app.use(cors());
app.use(express.json());

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required.' });
  }

  // const existingUser = users.find(user => user.username === username);
  const existingUser = await DB.getUser(req.body.email);
  if (existingUser) {
    console.log(existingUser)
    return res.status(409).json({ message: 'email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // users.push({ username, password: hashedPassword });
  const user = await DB.addUser(req.body.email, hashedPassword)
  return res.status(201).json({ message: 'User registered successfully.' });
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.status(201).json({ message: 'User successfully logged in.'});
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Serve the frontend
const buildPath = path.join(__dirname, './public'); // Adjust path if needed
app.use(express.static(buildPath));

// Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});


// Creating WebSocket Server

// Attach WebSocket server to your Express server
const httpServer = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

websocketChat(httpServer);