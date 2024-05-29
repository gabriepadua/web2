const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/meanstack', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Import routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
