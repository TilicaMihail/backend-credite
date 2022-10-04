import Project from "../models/Project.js"
import User from "../models/User.js"
import schedule from 'node-schedule'
import { createError } from "../utils/error.js"

export const createProject = async (req, res, next) => {
    try {
        if(new Date(req.body.creationDate) >= new Date(req.body.finalDate))
            return next(createError(400, "Final date must be greater than creation date"))
        const user = await User.findById(req.user.id)
        const newProject = new Project({
            name: req.body.name,
            description: req.body.description,
            finalDate: new Date(req.body.finalDate || '01-01-3000'),
            creationDate: new Date(req.body.creationDate || '01-01-3000'),
            maxNumberStudents: req.body.maxNumberStudents || 100000,
            img: req.body.img || '',
            advanced: req.body.advanced,
            maxNumberCredits: req.body.maxNumberCredits || 100,
            signUpDateLimit: new Date(req.body.signUpDateLimit || '01-01-3000'),
            signUpDependsOn: req.body.signUpDependsOn,
            author: req.user.id,
            authorName: user.firstName + ' ' + user.lastName,
            approved: req.user.role === 'admin' || req.user.role === 'profesor',
            clase: req.body.clase,
            profile: req.body.profile,
        })
        const project = await newProject.save()
        await User.findByIdAndUpdate(
            req.user.id,
            { $push: { createdProjectsIds: project._id}},
            { new: true }
        )
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.where({ 
            approved: true, 
            archived: req.query.includeArchived ? { $exists: true } : false,
            clase: { $in: req.query.clase },
            profile: { $in: req.query.profile}
        }).find().sort({ createdAt: -1 })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}

export const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

export const getUnapprovedProjects = async (req, res, next) => {
    try {
        const projects = await Project.where({ 
            approved: false 
        }).find().sort({ createdAt: -1 })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}

export const getAdvancedProjects = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const array = user.createdProjectsIds.concat(user.signedUpProjectsIds)
        const projects = await Project.where({ 
            advanced: true, 
            approved: true, 
            _id: { $nin: user.role === 'elev' ? array : [] },
            archived: req.query.includeArchived ? { $exists: true } : false,
            clase: { $in: req.query.clase },
            profile: { $in: req.query.profile}
        }).find().sort({ createdAt: -1 })
        res.status(200).json(projects)
    } catch (err) { 
        next(err)
    }
}

export const getVolunteeringProjects = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const array = user.createdProjectsIds.concat(user.signedUpProjectsIds)
        const projects = await Project.where({ 
            advanced: false, 
            approved: true, 
            _id: { $nin: user.role === 'elev' ? array : [] },
            archived: req.query.includeArchived ? { $exists: true } : false,
            clase: { $in: req.query.clase },
            profile: { $in: req.query.profile }
        }).find().sort({ createdAt: -1 })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}

export const getCreatedProjects = async (req, res, next) => {
    try {
        const projects = await Project.where({ 
            author: req.params.id, 
            archived: req.query.includeArchived ? { $exists: true } : false,
            clase: { $in: req.query.clase },
            profile: { $in: req.query.profile}
        }).find().sort({ createdAt: -1 })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}

export const getSignedUpProjects = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(user.role !== 'elev')
            return next(createError('404', 'You are not a student'))
        const projects = await Project.where({ 
            archived: req.query.includeArchived ? { $exists: true } : false, 
            _id: { $in: user.signedUpProjectsIds },
            approved: true,
            clase: { $in: req.query.clase },
            profile: { $in: req.query.profile}
        }).find().sort({ createdAt: -1 })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}

export const approveProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { approved: true }, { new: true })
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

export const signUpToProject = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId)
        await User.findByIdAndUpdate(req.body.userId, {
            $addToSet: {
                signedUpProjectsIds: req.params.id
            }
        }, { approved: true })
        const project = await Project.findByIdAndUpdate(req.params.id, {  
                $set: {
                    [`students.${req.body.userId}`]: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        _id: user._id,
                        present: false,
                        credite: 0,
                    }
                }
            }, { new: true })
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

export const gradeStudent = async (req, res, next) => {
    try {
        if(req.body.credite < 0) 
            return next(createError(401, 'The number of credits can not be negative'))
        if(typeof req.body.credite !== 'number') 
            return next(createError(401, 'You are not authorized, the number of credits must be a number' ))
        const project = await Project.findById(req.params.id);
        if(req.body.credite > project.maxNumberCredits)
            return next(createError(401, 'The number of credits is larger than the max number of credits'))
        const user = await User.findById(req.body.userId);
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
            $set: {
                [`students.${req.body.userId}.credite`]: req.body.credite
            }
        },
        {new: true})
        await User.findByIdAndUpdate(req.body.userId, {
            $set: {
                totalCredite: user.totalCredite + req.body.credite - project.students[req.body.userId].credite
            }
        })
        res.status(200).json(updatedProject)
    } catch (err) { 
        next(err)
    }
}

export const markStudentPresent = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, {
            $set: {
                [`students.${req.body.userId}.present`]: true
            }
        }, { new: true})
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

export const removeStudent = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
            $unset: {
                [`students.${req.body.userId}`]: ''
            }
        }, { new: true})
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { 
                signedUpProjectsIds: { $eq: req.params.id } 
            },
            $inc: { 
                totalCredite: -project?.students[req.body.userId].credite
            }
        }, { new: true })
        res.status(200).json(updatedProject)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const deleteProject = async (req, res, next) => {
    try {
        await Project.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true})
    } catch (err) {
        next(err)
    }
}

export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            signUpDateLimit: typeof req.body.signUpDateLimit === String? new Date(signUpDateLimit) : undefined,
            advanced: req.body.advanced,
            signUpDependsOn: req.body.signUpDependsOn,
            img: req.body.img,
            maxNumberStudents: req.body.maxNumberStudents,
            maxNumberCredits: req.body.maxNumberCredits,
            clase: req.body.clase,
            profile: req.body.profile,
        }, { new: true}) 
        res.status(200).json(project)
    } catch (err) {
        
    }
}

export const deleteAllProjects = async (req, res, next) => {
    try {
        await Project.deleteMany()
        await User.updateMany({}, { createdProjectsIds: [], signedUpProjects: []})
        res.status(200).json({ success: true})
    } catch (err) {
        next(err)
    }
}