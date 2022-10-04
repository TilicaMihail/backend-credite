import User from '../models/User.js'

export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        )
        res.status(200).json(updateUser)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("User deleted")
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        next(err)
    }
}

export const getAllStudents = async (req, res, next) => {
    try {
        const users = await User.where({ role: 'elev' }).find().sort({ totalCredite: -1 })
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

export const getAllTeachers = async (req, res, next) => {
    try {
        const users = await User.where({ role: 'profesor' }).find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

export const getAllUsers = async (req, res, next) => { 
    try {
        const users = await User.find().sort({ totalCredite: 1 })
        res.status(200).json(users)
    } catch(err) {
        next(err)
    }
}

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const getStudentsByClasa = async (req, res, next) => {
    try {
        const users = await User.where({ 
            role: 'elev', 
            clasa: req.query.clasa,
            profil: req.query.profil 
        }).find().sort({ totalCredite: 1 })
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}