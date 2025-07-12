const express = require('express');
const router = express.Router();

// Import signup and login functions from authController
const { signup, login } = require('../controllers/authController');

// Define routes
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
