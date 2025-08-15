
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');


// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role, college } = req.body;
        
        // Validation
        if (!username || !email || !password || !college) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role, college, points: 0 });
        await newUser.save();
        
        res.status(201).json({ message: 'Registration successful', user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            college: newUser.college,
            points: newUser.points,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        }});
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing credentials' });
        }
        
        const user = await User.findOne({ email });
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
            college: user.college,
            points: user.points,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }});
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

   module.exports = router;
   
