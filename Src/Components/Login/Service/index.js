const User = require('../../Users/Model/index');
const Admin = require('../../Admin/Model/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_LIFETIME }
        );
        return {user,token};
    } catch (error) {
        throw error;
    }
};
const adminLogin = async (email, password) => {
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ id: admin._id, email: admin.email },
            process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_LIFETIME }
        );
        return {admin,token};
    } catch (error) {
        throw error;
    }
};

module.exports = {
    userLogin,
    adminLogin
};
