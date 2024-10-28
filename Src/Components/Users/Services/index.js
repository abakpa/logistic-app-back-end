const User = require('../Model/index');

const createUser = async (userData) => {
  userData.role = 'customer'
  const user = new User(userData);
  return await user.save();
};
const createStaff = async (userData) => {
  userData.role = 'staff'
  const user = new User(userData);
  await user.save();
  return user
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};


const getUsers = async () =>{
  try {
      return await User.find({});
  } catch (error) {
      throw error;
  }
}

const getUserById = async (userId) => {
  try {
      return await User.findById(userId);
  } catch (error) {
      throw error;
  }
}

const updateUser = async (userId, data) => {
  try {
    if (data.email) {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser && existingUser._id.toString() !== userId) {
          throw new Error('Email already in use');
      }
  }
      return await User.findByIdAndUpdate(userId, data, { new: true });
  } catch (error) {
      throw error;
  }
}

const deleteUser = async (userId) => {
  try {
      return await User.findByIdAndDelete(userId);
  } catch (error) {
      throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createStaff
};
