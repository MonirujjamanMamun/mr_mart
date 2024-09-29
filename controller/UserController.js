const User = require('../models/userModel');
const getUser = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 3);
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
    if (!user) return res.status(404).json({ message: 'User not found' });
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

module.exports = {
  getUser,
};
