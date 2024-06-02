
const express = require('express');
const router = express.Router();
const userController = require('../../Controller/userController');
router.route('/')
    .get(userController.userGet)
    .post(userController.userPost)
    .put(userController.userPut)
    .delete(userController.userDelete);

router.route('/:id')
    .get(userController.userGetId);

module.exports = router; // Ensure the router is exported
