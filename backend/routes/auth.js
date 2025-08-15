
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');


// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role, points: 0 });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful', user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            points: newUser.points,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        }});
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// Login User
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ token: 'fake-jwt-token', user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            points: user.points,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }});
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

   module.exports = router;
   
