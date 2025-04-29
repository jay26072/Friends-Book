// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a simple schema and model
const FriendSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: String,
    mobileno: String,
    password: String,
});

const Friend = mongoose.model('Friend', FriendSchema);  // <<< Fixed

// CRUD Operations

// Create
app.post('/api/items', async (req, res) => {
    const newFriend = new Friend(req.body);
    await newFriend.save();
    res.status(201).json(newFriend);
});

// Read
app.get('/api/items', async (req, res) => {
    const friends = await Friend.find();
    res.json(friends);
});

// Update
app.put('/api/items/:id', async (req, res) => {
    const updatedFriend = await Friend.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFriend);
});

// Delete
app.delete('/api/items/:id', async (req, res) => {
    await Friend.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Friend.findOne({ email, password });
    if (user) {
        res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
