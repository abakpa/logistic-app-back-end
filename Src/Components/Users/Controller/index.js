const userService = require('../Services/index');
const bcrypt = require('bcrypt')


const registerUser = async (req, res) => {
  try {
  const salt = await bcrypt.genSalt()
  req.body.password = await bcrypt.hash(req.body.password,salt)
    const { name, phone, email, address, password } = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await userService.createUser({ name, phone, email,address, password });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const registerStaff = async (req, res) => {
  try {
  const salt = await bcrypt.genSalt()
  req.body.password = await bcrypt.hash(req.body.password,salt)
    const { name, phone, email,address, password } = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Staff already exists' });
    }
    const newUser = await userService.createStaff({ name, phone, email,address, password });
    res.status(201).json({ message: 'Staff registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getUsers = async (req, res) => {
  try {
      const users = await userService.getUsers();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const getUserById = async (req, res) =>{
  try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const updateUser = async (req, res) =>{
  try {
  const salt = await bcrypt.genSalt()
  req.body.password = await bcrypt.hash(req.body.password,salt)
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) =>{
  try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
module.exports = {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerStaff
};
