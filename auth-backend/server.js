require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Sesuaikan dengan port frontend
  methods: ['GET', 'POST', 'OPTIONS'], // Tambahkan OPTIONS untuk preflight
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User Model
const User = mongoose.model('User', { 
  email: { type: String, unique: true },
  password: String 
});

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/register', async (req, res) => {
  // ↓ Tambahkan ini ↓
  console.log('Request received:', req.body); // 1. Log seluruh request body
  console.log('Email:', req.body.email);      // 2. Log email spesifik
  
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    
    await user.save();
    console.log('User registered successfully'); // 3. Log sukses
    res.status(201).send('User registered');

  } catch (err) {
    // ↓ Tambahkan ini ↓
    console.error('Registration error:', err.message); // 4. Log error detail
    res.status(400).json({ 
      error: err.message // Kirim error ke frontend
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/dashboard', auth, (req, res) => {
  res.json({ message: `Welcome user ${req.user._id}` });
});

app.listen(process.env.PORT || 5000, () => 
  console.log('Server running on port 5000'));

app.post('/register', async (req, res) => {
  // ↓ Tambahkan ini ↓
  console.log('Request received:', req.body); // 1. Log seluruh request body
  console.log('Email:', req.body.email);      // 2. Log email spesifik
  
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    
    await user.save();
    console.log('User registered successfully'); // 3. Log sukses
    res.status(201).send('User registered');

  } catch (err) {
    // ↓ Tambahkan ini ↓
    console.error('Registration error:', err.message); // 4. Log error detail
    res.status(400).json({ 
      error: err.message // Kirim error ke frontend
    });
  }
});