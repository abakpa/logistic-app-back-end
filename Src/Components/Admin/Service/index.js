const Admin = require('../Model/index');

const createAdmin = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
};
// const createStaff = async (userData) => {
//   userData.role = 'staff'
//   const user = new User(userData);
//   return await user.save();
// };

const getAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};


const getAdmins = async () =>{
  try {
      return await Admin.find({});
  } catch (error) {
      throw error;
  }
}

const getAdminById = async (adminId) => {
  try {
      return await Admin.findById(adminId);
  } catch (error) {
      throw error;
  }
}

const updateAdmin = async (adminId, data) => {
  try {
    if (data.email) {
      const existingAdmin = await Admin.findOne({ email: data.email });
      if (existingAdmin && existingAdmin._id.toString() !== adminId) {
          throw new Error('Email already in use');
      }
  }
      return await Admin.findByIdAndUpdate(adminId, data, { new: true });
  } catch (error) {
      throw error;
  }
}

const deleteAdmin = async (adminId) => {
  try {
      return await Admin.findByIdAndDelete(adminId);
  } catch (error) {
      throw error;
  }
}

module.exports = {
  createAdmin,
  getAdminByEmail,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  // createStaff
};
