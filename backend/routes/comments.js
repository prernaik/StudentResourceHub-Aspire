/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a comment to a resource
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resourceId: { type: string }
 *               userId: { type: string }
 *               content: { type: string }
 *               rating: { type: number }
 *     responses:
 *       201:
 *         description: Comment added
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/comments/resource/{resourceId}:
 *   get:
 *     summary: Get all comments for a resource
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: List of comments
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Edit a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Comment updated
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Add Comment
router.post('/', async (req, res) => {
    try {
        const { resourceId, userId, content, rating } = req.body;
        const comment = new Comment({ resourceId, userId, content, rating });
        await comment.save();
        res.status(201).json({ message: 'Comment added', comment });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get Comments for a Resource
router.get('/resource/:resourceId', async (req, res) => {
    try {
        const comments = await Comment.find({ resourceId: req.params.resourceId });
        res.status(200).json({ comments });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Edit Comment
router.put('/:id', async (req, res) => {
    try {
        const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updated) {
            res.status(200).json({ message: 'Comment updated', comment: updated });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete Comment
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Comment.findByIdAndDelete(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Comment deleted' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
