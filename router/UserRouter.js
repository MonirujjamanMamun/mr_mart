const express = require('express');
const { getUser } = require('../controller/UserController');
const UserRouter = express.Router();

UserRouter.get('/', getUser);

module.exports = UserRouter;
