const jwt = require('jsonwebtoken');
const { User } = require('../models/schemaUsers');
const { AuthError } = require('../utils/errorList');

const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization || ""
    const [type, token] = authHeader.split(" ")

    if (type !== "Bearer" || !token) {
        return next(AuthError(401, "No token or type is not valid")) 
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(data.id)
        
        if (!user || !user.token) {
            return next(AuthError(401, "Not authorized"))
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    auth
};