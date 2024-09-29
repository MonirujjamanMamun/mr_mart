const User = require('../models/userModel');
const dummy = require('../dummyData');
const dummyUserCreate = async (req, res, next) => {
  try {
    await User.deleteMany({});
    const users = await User.insertMany(dummy);
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating dummy data' });
  }
};

module.exports = {
  dummyUserCreate,
};
