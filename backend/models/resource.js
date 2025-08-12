
const mongoose = require('mongoose');
const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['note', 'video', 'question_paper', 'project'], required: true },
    subject: { type: String, required: true },
    semester: { type: Number, required: true },
    college: { type: String, required: true },
    uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    verified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
   
