//create a new mongoose schema for blog

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    tags: [String],
    views: { type: Number, default: 0 }, // track views count for each blog post
}, {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    versionKey: false, // removes version key from the output
});

module.exports = mongoose.model('Blog', blogSchema);