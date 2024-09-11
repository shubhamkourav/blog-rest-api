const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // ensures that title is mandatory
    },
    content: {
        type: String,
        required: true, // ensures that content is mandatory
    },
    category: {
        type: String,
        required: true, // ensures that category is mandatory
    },
    tags: {
        type: [String], // array of strings for tags
        default: [],    // default to an empty array if not provided
    },
    views: {
        type: Number,
        default: 0,     // start views count at 0
    }
}, {
    timestamps: true, // adds createdAt and updatedAt timestamps automatically
    versionKey: false // disables the "__v" version key
});

// Register the model with the schema
module.exports = mongoose.model('Blog', blogSchema);