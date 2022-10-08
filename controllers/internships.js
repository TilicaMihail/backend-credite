import Internship from "../models/Internship.js"
import User from "../models/User.js"
import { createError } from "../utils/error.js"

export const createInternship = async (req, res, next) => {
    try {
        const internship = new Internship({
            name: req.body.name,
            description: req.body.description,
            author: req.user.id,
            img: req.body.img || '',
            maxNumberStudents: req.body.maxNumberStudents || 100000,
            price: req.body.price || 0,
            minNumberCredits: req.body.minNumberCredits || 0,
            signUpdateLimit: new Date(req.body.finalDate || '01-01-3000')
        })
        const user = await User.findByIdAndUpdate(req.user.id, {
            $addToSet: {
                createdInternshipsIds: req.params.id
            }
        })
        await internship.save()
        res.status(200).json(internship)
    } catch (err) {
        next(err)
    }
}

export const getAllInternships = async (req, res, next) => {
    try {
        const internships = await Internship.where({
            archived: false,
        }).find()
        res.status(200).json(internships).sort({ createdAt: -1 })
    } catch (err) {
        next(err)
    }
}

export const getInternshipById = async (req, res, next) => {
    try {
        const internship = await Internship.findById(req.params.id);
        res.status(200).json(internship)
    } catch (err) {
        next(err)
    }
}

export const getCreatedInternships = async (req, res, next) => {
    try {
        const internships = await Internship.where({
            author: req.params.id
        }).find().sort({ createdAt: -1 })
        res.status(200).json(internships)
    } catch (err) {
        next(err)
    }
}

export const getSignedUpInternships = async (req, res, next) => {
    try {
        const user = await  User.findById(req.user.id)
        const internships = await Internship.where({
            archived: req.body.includeArchived ? { $exists: true } : false, 
            _id: { $in: user.signedUpProjectsIds },
        }).find().sort({ createdAt: -1 })
        res.status(200).json(internships)
    } catch (err) {
        next(err)
    }
}

export const signUpToInternship = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const internship = await Internship.findByIdAndUpdate(req.params.id, {  
            $set: {
                [`students.${req.user.id}`]: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user._id,
                }
            }
        }, { new: true })
        await User.findByIdAndUpdate(req.user.id, {
            $inc: {
                totalCredite: -1 * internship.price
            }, 
            $addToSet: {
                signedUpInternshipsIds: req.params.id
            }
        })
        res.status(200).json(internship)
    } catch (err) {
        next(err)
    }
}

export const updateInternship = async (req, res, next) => {
    try {
        const internship = await Internship.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            signUpDateLimit: typeof req.body.signUpDateLimit === String? new Date(signUpDateLimit) : undefined,
            signUpDependsOn: req.body.signUpDependsOn,
            img: req.body.img,
            price: req.body.price,
            maxNumberStudents: req.body.maxNumberStudents,
            minNumberCredits: req.body.maxNumberCredits,
        }, { new: true}) 
        res.status(200).json(internship)
    } catch (err) {
        
    }
}

export const deleteInternship = async (req, res, next) => {
    try {
        await Internship.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true })
    } catch (err) {
        next(err)
    }
}

export const deleteAllIntenships = async (req, res, next) => {
    try {
        await Internship.deleteMany()
        await User.updateMany({}, { createdInternshipsIds: [], signedUpInternships: []})
        res.status(200).json({ success: true})
    } catch (err) {
        next(err)
    }
}