import jwt from 'jsonwebtoken'
import { createError } from './error.js'
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import User from '../models/User.js';
import Internship from '../models/Internship.js';
dotenv.config()


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated"))
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err)
            return next(createError(403, "Token is invalid"))
        req.user = user
        const currentDate = new Date()
        req.year = currentDate.getFullYear()
        next();
    })
} 

export const verifyProfesor = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(err)     
            return next(err)
        else if(req.user.role !== "profesor" && req.user.role !== "admin") 
            return next(createError(401, "You are not authorized"))
        else 
            return next()
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(err)     
            return next(err)
        else if(req.user.role !== "admin") 
            return next(createError(401, "You are not authorized"))
        else 
            return next()
    })
}

export const verifyAuthorProject = (req, res, next) => {
    verifyToken(req, res, async (err) => {
        if(err)     
            return next(err)
        try {
            const project = await Project.findById(req.params.id)
            if(req.user.id !== project.author) 
                return next(createError(401, "You are not authorized"))
            else 
                return next()
        } catch (err) {
            return next(err)
        }  
    })
}

export const verifyMaster = (req, res, next) => {
    if(req.body.masterPassword === process.env.MASTER_PASSWORD)
        return next()
    else 
        return next(createError(401, "You are not master"))
}

export const verifyProfesorOrCurrentUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(err)     
            return next(err)
        else if(req.user.role !== "profesor" && req.user.role !== "admin" && req.user.id !== req.params.id) 
            return next(createError(401, "You are not authorized"))
        else 
            return next()
    })
}

export const verifySignUpToProject = async (req, res, next) => {
    verifyToken(req, res, async (err) => {
        if(err)     
            return next(err)
        try {
            const currentDate = new Date()
            const project = await Project.findById(req.params.id)
            if(!req.body.userId)
                req.body.userId = req.user.id
            const user = await User.findById(req.body.userId)
            if(!project)
                return next(createError(401, "You are not authorized, the project does not exist"))
            if(project.signUpDateLimit < currentDate)
                return next(createError(401, "You are not authorized, the sign up date limit has passed"))
            if(!project.approved)
                return next(createError(401, "You are not authorized, the project is not approved"))
            if(!user)
                return next(createError(401, "You are not authorized, no user has this id"))
            if(!project?.clase?.includes(user?.clasa))
                return next(createError(401, "You are not authorized, the project is not intended for your class"))
            if(req.body.userId !== req.user.id && req.user.id !== project?.author && req.user.role !== 'elev')
                return next(createError(401, "You are not authorized, only the author of the project can add other people"))
            if(req.body.userId === project?.author)
                return next(createError(401, "You are not authorized to sign up, you are the author of the project"))
            if(Object.keys(project.students).length + 1 > project.maxNumberStudents) 
                return next(createError(401, "You are not authorized, the maximum number of students was exceeded"))
            return next()
        } catch (err) { 
            return next(err)
        } 
    })
}

export const verifyAuthorProjectOrAdmin = (req, res, next) => {
    verifyToken(req, res, async (err) => {
        if(err)     
            return next(err)
        try {
            const project = await Project.findById(req.params.id)
            if(req.user.role !== "admin" && req.user.id !== project.author) 
                return next(createError(401, "You are not authorized"))
            else 
                return next()
        } catch (err) {
            return next(err)
        }        
    })
}

export const verifyUserIsSignedUpToProject = (req, res, next) => {
    verifyToken(req, res, async (err) => {
        if(err)     
            return next(err)
        try {
            const project = await Project.findById(req.params.id)
            if(!project)
                return next(createError(401, "You are not authorized, the project does no exist"))
            if(!project.students[req.body.userId]) 
                return next(createError(401, "You are not authorized, the student is not signed up to this project"))
            else 
                return next()
        } catch (err) {
            return next(err)
        }        
    })
}

export const verifySignUpToInternship = (req, res, next) => {
    verifyToken(req, res, async (err) => {
        if(err)     
            return next(err)
        try {
            const currentDate = new Date()
            const internship = await Internship.findById(req.params.id)
            const user = await User.findById(req.user.id)
            if(!internship)
                return next(createError(401, "You are not authorized, the internship does not exist"))
            if(internship.signUpDateLimit < currentDate)
                return next(createError(401, "You are not authorized, the sign up date limit has passed"))
            if(!user)
                return next(createError(401, "You are not authorized, no user has this id"))
            if(req.user.id === internship?.author)
                return next(createError(401, "You are not authorized to sign up, you are the author of the internship"))
            if(Object.keys(internship.students).length + 1 > internship.maxNumberStudents) 
                return next(createError(401, "You are not authorized, the maximum number of students was exceeded"))
            if(user.totalCredite < internship.minNumberCredits || user.totalCredite < internship.price)
                return next(createError(401, "You are not authorized, you do not have enough credits"))
            return next()
        } catch (err) { 
            return next(err)
        } 
    })
}
