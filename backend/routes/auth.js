   const express = require('express');
   const router = express.Router();
   const User = require('c:/Users/prerna naik/Documents/GitHub/StudentResourceHub-Aspire/backend/models/user');

   // Register User
   router.post('/register', (req, res) => {
       const { username, email, password, role } = req.body;
       const newUser  = { id: Date.now().toString(), username, email, password, role, points: 0 };
       User.create(newUser );
       res.status(201).json({ message: 'Registration successful', user: newUser  });
   });

   // Login User
   router.post('/login', (req, res) => {
       const { email, password } = req.body;
       const user = User.findAll().find(u => u.email === email && u.password === password);
       if (user) {
           res.status(200).json({ token: 'fake-jwt-token', user });
       } else {
           res.status(401).json({ error: 'Invalid credentials' });
       }
   });

   module.exports = router;
   