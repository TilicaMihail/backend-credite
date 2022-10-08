import User from "../models/User.js"

export const getCreatedProjectsCount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id) 
        res.status(200).json({ count: user?.createdProjectsIds.length })
    } catch (err) {
        next(err)
    }
}

export const getSignedUpProjectsCount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id) 
        res.status(200).json({ count: user?.signedUpProjectsIds.length })
    } catch (err) { 
        next(err)
    }
}

export const getUsersCount = async (req, res, next) => {
    try {
        const count = await User.count()
        res.status(200).json({ count: count})
    } catch (err) {
        next(err)
    }
}

export const getCreditsCount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ count: user.totalCredite})
    } catch (err) {
        next(err)
    }
}