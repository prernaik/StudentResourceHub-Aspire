    const express = require('express');
    const router = express.Router();
    const User = require('../models/user');

    // Get User Profile
    router.get('/:id', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                res.status(200).json({ user });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    });

    module.exports = router;
    
