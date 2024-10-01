const express = require('express');
const {
  getAllUser,
  getSingleUser,
  deleteUserById,
} = require('../controller/UserController');
const userRouter = express.Router();

userRouter.get('/', getAllUser);
userRouter.get('/:id', getSingleUser);
userRouter.delete('/:id', deleteUserById);

module.exports = userRouter;
