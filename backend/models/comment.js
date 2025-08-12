
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Comment', commentSchema);
   
