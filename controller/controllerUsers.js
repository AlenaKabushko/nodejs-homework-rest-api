const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../models/schemaUsers');
const { hashedPassword, checkPassword } = require('../utils/passwordHash');
const { RegistrationConflictError, LoginAuthError, VerificationError, ValidationError } = require('../utils/errorList');
const gravatar = require('gravatar');
const { JWT_SECRET } = process.env;
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');
const { v4: uuid } = require('uuid');
const { sendEmail } = require('../utils/sendEmailNodemailer');


const addUser = async (req, res, next) => {
    const { email, password } = req.query
    const conflictUser = await User.findOne({ email })
    const createdAvatar = gravatar.url(email, {protocol: 'https', s: '400', r: 'g', d: 'identicon', f: 'y'})
    const verificationToken = uuid()

    if (conflictUser) {
        throw new RegistrationConflictError('Email in use, please change it and try again')
    }

    const user = await User.create({
        email,
        password: await hashedPassword(password),
        avatarURL: createdAvatar,
        verificationToken: verificationToken
    })

    await sendEmail(email, verificationToken)

    return res.status(201).json({
        newUser: {
            email: user.email,
            subscription: user.subscription,
            avatar: user.avatarURL
        }
    })
}


const loginUser = async (req, res, next) => {
    const { email, password } = req.query   
    
    const user = await User.findOne({ email })
    if (!user) {
        throw new LoginAuthError('Email is wrong, please try again')
    }

    if (!user.verify) {
        throw new VerificationError("User not verified")
    }

    const validPassw = await checkPassword(password, user.password)
    if (!validPassw) {
        throw new LoginAuthError('Password is wrong, please try again')
    }

    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "5d", 
    })

    await User.findByIdAndUpdate(user._id, { token }, { new: true })
    
    return res.status(201).json({
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription,
            avatar: user.avatarURL
        }        
    })

}

const logoutUser = async (req, res, next) => {
    if (!req.user) {
        throw new LoginAuthError("Missing User in body!")
    }

    const token = null
    await User.findByIdAndUpdate(req.user.id, { token }, { new: true })

    return res.status(204).json({
        message: 'No Content',
    })
}

const currentUser = async (req, res, next) => {
    if (!req.user) {
        throw new LoginAuthError("Missing User in body!")
    }

    const user = await User.findById(req.user.id)    
    if (!user) {
        throw new LoginAuthError("Not authorized")
    }

    return res.status(200).json({
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL
    }) 
}


const folder = path.join(__dirname, "../", "public", "avatars")
const addAvatar = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new LoginAuthError("Not authorized")
    }
    
    const { path: temporaryName, originalname } = req.file
    
    const fileName = path.join(req.user.id + "-" + originalname)
    const avatarURL = path.join("public", "avatars", fileName)

    await Jimp.read(temporaryName)
        .then(avatar => {
        return avatar
            .resize(250, 250)
            .write(temporaryName);
        }).catch(err => {
            return next(err)
        })

    try {
        await fs.rename(temporaryName, path.join(folder, fileName))
        await User.findByIdAndUpdate(req.user.id, { avatarURL })

        res.status(200).json({
            email: user.email,
            avatarURL: user.avatarURL
        })
    } catch (err) {
        await fs.unlink(temporaryName)
        return next(err)
    }    
}

const verifyUser = async (req, res, next) => {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })

    if (!user) {
        throw new VerificationError("User not found")
    }

    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "5d"})

    await User.findByIdAndUpdate(user._id, {
        token: token,
        verificationToken: null,
        verify: true
    }, { new: true })

    return res.status(200).json({
        message: 'Verification successful'
    }) 
}

const resendVerifyEmail = async (req, res, next) => {
    const { email } = req.query
    const { verificationToken } = req.params

    if (!email) {
        throw new RegistrationConflictError('Missing required field email')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new VerificationError('User not found')
    }

    if (user.verify) {
        throw new ValidationError('Verification has already been passed')
    }
    
    await sendEmail(email, verificationToken)

    return res.status(200).json({
        message: 'Verification email sent',
    })
}

module.exports = {
    addUser, 
    loginUser,
    logoutUser,
    currentUser,
    addAvatar,
    verifyUser,
    resendVerifyEmail
}