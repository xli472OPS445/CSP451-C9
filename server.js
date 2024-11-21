// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());  // For parsing application/json

const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://db:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Endpoints

// GET /
app.get('/', (req, res) => {
  res.send('Welcome to the Feedback Management System!');
});

// POST /feedback
app.post('/feedback', async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const newFeedback = new Feedback({ name, message, rating });
    await newFeedback.save();
    res.status(201).send('Feedback added successfully');
  } catch (err) {
    console.error('Error adding feedback:', err);
    res.status(500).send('Error adding feedback');
  }
});

// GET /feedback
app.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    console.error('Error retrieving feedback:', err);
    res.status(500).send('Error retrieving feedback');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
