   const express = require('express');
   const router = express.Router();
   const Resource = require('../models/resource');

   // Upload Resource
   router.post('/', (req, res) => {
       const { title, description, content, type, subject, semester, college, uploaderId } = req.body;
       const newResource = { id: Date.now().toString(), title, description, content, type, subject, semester, college, uploaderId, verified: false };
       Resource.create(newResource);
       res.status(201).json({ message: 'Resource uploaded successfully', resource: newResource });
   });

   // Get All Resources
   router.get('/', (req, res) => {
       const resources = Resource.findAll();
       res.status(200).json({ resources });
   });

   // Get Single Resource
   router.get('/:id', (req, res) => {
       const resource = Resource.findById(req.params.id);
       if (resource) {
           res.status(200).json({ resource });
       } else {
           res.status(404).json({ error: 'Resource not found' });
       }
   });

   module.exports = router;
   
