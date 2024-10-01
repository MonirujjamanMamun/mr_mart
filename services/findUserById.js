const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/userModel');
const findUserById = async (id) => {
  try {
    const options = { password: 0 };
    const user = await User.findById(id, options);
    if (!user) throw createError(404, 'User not found');
    return user;
  } catch (error) {
    // Check if the error is a CastError
    if (error instanceof mongoose.Error.CastError && error.path === '_id') {
      throw createError(
        400,
        'The user ID provided is invalid. Please check the ID and try again.'
      );
    }
    throw error;
  }
};

module.exports = { findUserById };
