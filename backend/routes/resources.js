   const express = require('express');
   const router = express.Router();
const Resource = require('../models/resource');


/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Upload a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               content: { type: string }
 *               type: { type: string, enum: [note, video, question_paper, project] }
 *               subject: { type: string }
 *               semester: { type: number }
 *               college: { type: string }
 *               uploaderId: { type: string }
 *     responses:
 *       201:
 *         description: Resource uploaded successfully
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
    try {
        const { title, description, content, type, subject, semester, college, uploaderId } = req.body;
        
        // Validation
        if (!title || !description || !content || !type || !subject || !semester || !college || !uploaderId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const resource = new Resource({ title, description, content, type, subject, semester, college, uploaderId });
        await resource.save();
        res.status(201).json({ message: 'Resource uploaded successfully', resource });
    } catch (err) {
        console.error('Resource upload error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of resources
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const { type, subject, semester, college, verified } = req.query;
        
        // Build filter object
        const filter = {};
        if (type) filter.type = type;
        if (subject) filter.subject = subject;
        if (semester) filter.semester = parseInt(semester);
        if (college) filter.college = college;
        if (verified !== undefined) filter.verified = verified === 'true';
        
        const resources = await Resource.find(filter)
            .populate('uploaderId', 'username role')
            .sort({ createdAt: -1 });
            
        res.status(200).json({ resources });
    } catch (err) {
        console.error('Get resources error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Get a single resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource found
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: Edit a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Resource updated
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource deleted
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)
            .populate('uploaderId', 'username role');
            
        if (resource) {
            res.status(200).json({ resource });
        } else {
            res.status(404).json({ error: 'Resource not found' });
        }
    } catch (err) {
        console.error('Get resource error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Edit Resource
router.put('/:id', async (req, res) => {
    try {
        const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updated) {
            res.status(200).json({ message: 'Resource updated', resource: updated });
        } else {
            res.status(404).json({ error: 'Resource not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete Resource
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Resource.findByIdAndDelete(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Resource deleted' });
        } else {
            res.status(404).json({ error: 'Resource not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

   module.exports = router;
   
