const  jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateUser = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            error : "unauthorized",
            message: "no token provided",
        });
    }

    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();

    }
    catch(err){
        return res.status(401).json({
            error: "unauthorized",
            message: "invalid token provided",
        })
    }
}

module.exports = authenticateUser;