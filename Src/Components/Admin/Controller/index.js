const adminService = require('../Service/index');
const bcrypt = require('bcrypt')


const registerAdmin = async (req, res) => {
  try {
  const salt = await bcrypt.genSalt()
  req.body.password = await bcrypt.hash(req.body.password,salt)
    const { name, phone, email, address, password,role } = req.body;
    const existingAdmin = await adminService.getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await adminService.createAdmin({ name, phone, email,address, password,role });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// const registerStaff = async (req, res) => {
//   try {
//   const salt = await bcrypt.genSalt()
//   req.body.password = await bcrypt.hash(req.body.password,salt)
//     const { name, phone, email,address, password } = req.body;
//     const existingUser = await adminService.getUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'Staff already exists' });
//     }
//     const newUser = await adminService.createStaff({ name, phone, email,address, password });
//     res.status(201).json({ message: 'Staff registered successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


const getAdmins = async (req, res) => {
  try {
      const admins = await adminService.getAdmins();
      res.status(200).json(admins);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const getAdminById = async (req, res) =>{
  try {
      const admin = await adminService.getAdminById(req.params.id);
      if (!admin) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const updateAdmin = async (req, res) =>{
  try {
  const salt = await bcrypt.genSalt()
  req.body.password = await bcrypt.hash(req.body.password,salt)
      const admin = await adminService.updateAdmin(req.params.id, req.body);
      if (!admin) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const deleteAdmin = async (req, res) =>{
  try {
      const admin = await adminService.deleteAdmin(req.params.id);
      if (!admin) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
module.exports = {
  registerAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
//   registerStaff
};
