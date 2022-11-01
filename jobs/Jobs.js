import Internship from "../models/Internship.js"
import Project from "../models/Project.js"
import User from "../models/User.js"

export const reversEndOfYearJob = async () => {
    // might be useful if endOfYearJob executes more than once in a year
    await User.updateMany( {}, { $inc: { clasa: -1 } }, {} )
}

export const endOfYearJob = async () => {
    await Internship.updateMany( {}, { archived: true }, {} )
    await Project.updateMany( {}, { archived: true }, {} )
    await User.updateMany( {}, { totalCredite: 0 }, {} )
    await User.updateMany( {}, { $inc: { clasa: 1 } }, {} )
}

export const makeDbBackup = async () => {
    console.log('backup made')
}