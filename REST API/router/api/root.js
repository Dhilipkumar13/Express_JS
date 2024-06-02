const express = require('express');
const path = require('path');
const router = express.Router();

// Route for index.html with optional .html extension
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'view', 'index.html'));
});

module.exports = router; // Ensure the router is exported
