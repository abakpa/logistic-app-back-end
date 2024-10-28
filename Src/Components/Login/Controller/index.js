const userService = require('../Service/index');
const adminService = require('../Service/index');


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const {user,token} = await userService.userLogin(email, password);

      
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
            },
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const {admin,token} = await adminService.adminLogin(email, password);

      
        res.status(200).json({
            message: 'Login successful',
            admin: {
                id: admin._id,
                email: admin.email,
            },
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    userLogin,
    adminLogin
};
