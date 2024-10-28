const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.send("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = { userId: payload.id, email: payload.email };

        next();
    } catch (error) {
        console.log(error);
        res.send("invalid authentication");
    }
};
const adminAuth = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.send("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.admin = { adminId: payload.id, email: payload.email };

        next();
    } catch (error) {
        console.log(error);
        res.send("invalid authentication");
    }
};
module.exports = {
    auth,
    adminAuth
}