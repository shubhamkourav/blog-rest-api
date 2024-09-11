require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;
const modelsPath = path.join(__dirname, 'app/models');

// Middleware for parsing JSON requests
app.use(express.json()); // Add this to parse JSON request bodies

// Bootstrap models
fs.readdirSync(modelsPath)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        require(path.join(modelsPath, file)); // Load all models
    });


const blogRoutes = require('./app/routes/blog'); // Route for blogs
// Bootstrap routes
app.use('/api/blog', blogRoutes);

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'An error occurred!' });
});

// MongoDB connection
connectToMongoDB();

function connectToMongoDB() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db';
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
            // Start the server after successful DB connection
            startServer();
        })
        .catch(err => {
            console.error('Could not connect to MongoDB:', err);
        });
}

function startServer() {
    app.listen(port, () => {
        console.log('Express app started on port ' + port);
    });
}

module.exports = app;
