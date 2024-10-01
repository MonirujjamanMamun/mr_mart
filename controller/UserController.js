const createError = require('http-errors');
const fs = require('fs');
const User = require('../models/userModel');
const { findUserById } = require('../services/findUserById');
const getAllUser = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const searchRex = new RegExp('.*' + search + '.*', 'i');
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRex } },
        { email: { $regex: searchRex } },
        { phone: { $regex: searchRex } },
      ],
    };
    const options = { password: 0 };
    const user = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();
    if (!user) throw createError(404, 'User not found');
    // return res.status(404).json({ message: 'User not found' });
    res.status(200).json({
      success: true,
      user,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        totalResults: count,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: false };
    const user = await findUserById(id, option);
    if (!user) throw createError(404, 'User not found');
    const userImagePath = user.image;
    console.log('userImagePath', userImagePath);

    fs.access(userImagePath, (err) => {
      if (err) {
        console.error('User image does not exist');
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) throw err;
          console.log('User image deleted successfully');
        });
      }
    });
    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUser,
  getSingleUser,
  deleteUserById,
};
