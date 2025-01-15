const express = require('express');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Point to our mock database
const middlewares = jsonServer.defaults();

const JWT_SECRET = 'your-secret-key'; // Store a secret key for signing JWTs

app.use(cors());
app.use(express.json()); // To parse JSON body in requests
app.use(middlewares);

app.use('/api', router); // All our routes will be prefixed with /api

// Register Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email,
    password: hashedPassword
  };

  // Add user to the database (in-memory for this demo)
  const db = router.db;
  const usersCollection = db.get('users');
  usersCollection.push(newUser).write();

  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const db = router.db;
  const usersCollection = db.get('users');
  const user = usersCollection.find(u => u.username === username).value();

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Protected Route (requires JWT token)
app.get('/profile', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: `Welcome, ${decoded.username}` });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

