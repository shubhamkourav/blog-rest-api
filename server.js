// create express server
const express = require('express');
const join = require('path').join;
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;
const models = join(__dirname, 'app/models');

module.exports = app;

// Bootstrap models
fs.readdirSync(models)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        require(join(models, file));
    });

    // bootstrap routes
connect()

function listen() {
    app.listen(port);
    console.log('Express app started on port ' + port);
}


function connect() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db';
    mongoose.connect(uri)
        .then(() => {
            // Start the server
            listen();
            console.log('Connected to MongoDB')
        })
        .catch(err => console.error('Could not connect to MongoDB:', err));
}
