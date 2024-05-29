const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const user = new User({ nome, email, senha: bcrypt.hashSync(senha, 8) });
        await user.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).send({ message: 'Error registering user!' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ message: 'User not found!' });

        const validPassword = bcrypt.compareSync(senha, user.senha);
        if (!validPassword) return res.status(401).send({ message: 'Invalid password!' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send({ message: 'Error logging in!' });
    }
});

module.exports = router;
