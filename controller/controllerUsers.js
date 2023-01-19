const { User } = require('../models/schemaUsers');
const { hashedPassw } = require('../utils/passwHash');
const { HttpError } = require('../utils/errorList')

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



module.exports = {
addUser
}