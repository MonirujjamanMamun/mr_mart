const express = require('express');
const { dummyUserCreate } = require('../controller/dummyUserController');
const dummyRouter = express.Router();

dummyRouter.get('/', dummyUserCreate);

module.exports = dummyRouter;
