    const express = require('express');
    const router = express.Router();
    const User = require('../models/user');

    // Get User Profile
    router.get('/:id', (req, res) => {
        const user = User.findById(req.params.id);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: 'User  not found' });
        }
    });

    module.exports = router;
    
