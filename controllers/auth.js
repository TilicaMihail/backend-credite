import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { createError } from "../utils/error.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();


export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync('parola_temporara', salt)

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash, 
            phoneNumber: req.body.phoneNumber || undefined,
            role: req.body.role || 'elev',
            clasa: req.body.clasa || undefined,
            profil: req.body.profil || undefined,
        })
        const user = await newUser.save()
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_KEY)
        const { password, role, ...userData} = user._doc
        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'None' }).status(200).json({...userData})
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) 
            return next(createError(403, "Wrong password or email."))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect)
            return next(createError(403, "Wrong password or email"))

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_KEY)
        const { password, ...userData} = user._doc
        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'None' }).status(200).json({...userData})
    } catch (err) {
        next(err);
    } 
}

export const logout = async (req, res, next) => {
    res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'None' });
    res.status(200).json({ success: true})
}

export const changePassword = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    await User.findByIdAndUpdate(req.user.id, { 
        password: hash
    })
}