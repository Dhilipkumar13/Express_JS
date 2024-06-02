const express = require('express');
const router = express.Router();
const userAuthenticate = require('../../Controller/userAuth');

router.post('/',userAuthenticate.handleLogin)

module.exports = router;