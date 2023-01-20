const { User } = require('../models/schemaUsers');
const { hashedPassw, checkPass } = require('../utils/passwHash');
const { HttpError } = require('../utils/errorList');
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config()
const { JWT_SECRET } = process.env;

const addUser = async (req, res, next) => {
    const { email, password } = req.query
    await User.findOne({ email }) && next(HttpError(409, 'Email in use, please change it and try again'))

    const user = await User.create({
        email, password: await hashedPassw(password)
    })
    
    return res.status(201).json({
        newUser: { email: user.email, subscription: user.subscription }
    });
}


const loginUser = async (req, res, next) => {
    const { email, password } = req.query   
    
    const user = await User.findOne({ email })
    // !user && next(HttpError(401, 'Email is wrong, please try again'))
    if (!user) {
        return next(HttpError(401, 'Email is wrong, please try again'))
    }

    const validPassw = await checkPass(password, user.password);
    // !validPassw && next(HttpError(401, 'Password is wrong, please try again'))
    if (!validPassw) {
        return next(HttpError(401, 'Password is wrong, please try again'))
    }

    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d", 
    });
    
    return res.status(201).json({
        token,
        newUser: { email: user.email, subscription: user.subscription }
    });
}


module.exports = {
    addUser, 
    loginUser
}