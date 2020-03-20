const express = require('express');
const router = express.Router();
const { getUsers, addUsers} = require('../controllers/usersControllers');

router.route("/").get(getUsers).post(addUsers);

module.exports = router;