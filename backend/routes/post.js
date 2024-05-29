const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ message: 'No token provided!' });

    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token!' });

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Create a post
router.post('/', authenticate, async (req, res) => {
    const { message } = req.body;

    try {
        const post = new Post({ message, userId: req.userId });
        await post.save();
        res.status(201).send({ message: 'Post created successfully!' });
    } catch (err) {
        res.status(500).send({ message: 'Error creating post!' });
    }
});

// Edit a post
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).send({ message: 'Post not found!' });

        if (post.userId.toString() !== req.userId) return res.status(403).send({ message: 'Not authorized!' });

        post.message = message;
        await post.save();
        res.status(200).send({ message: 'Post updated successfully!' });
    } catch (err) {
        res.status(500).send({ message: 'Error updating post!' });
    }
});

// Delete a post
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).send({ message: 'Post not found!' });

        if (post.userId.toString() !== req.userId && req.userRole !== 'admin') return res.status(403).send({ message: 'Not authorized!' });

        await post.remove();
        res.status(200).send({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting post!' });
    }
});

// View all posts (admin only)
router.get('/', authenticate, async (req, res) => {
    if (req.userRole !== 'admin') return res.status(403).send({ message: 'Not authorized!' });

    try {
        const posts = await Post.find().populate('userId', 'nome email');
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching posts!' });
    }
});

// View posts of the logged-in user
router.get('/my-posts', authenticate, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.userId });
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching posts!' });
    }
});

module.exports = router;
