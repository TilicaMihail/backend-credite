import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudentSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    _id: {
        type: String,
        required: true,
    },
    credite: {
        type: Number,
        default: 0,
    },
    present: {
        type: Boolean,
        default: false,
    }
})

const ProjectSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    authorName: {
        type: String, 
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    finalDate: {
        type: Date,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
    },
    archived: {
        type: Boolean,
        default: false,
    }, 
    approved: {
        type: Boolean, 
        required: true,
        default: false,
    },
    img: {
        type: String,
        default: 'http://unblast.com/wp-content/uploads/2020/05/Back-to-School-Illustration.jpg'
    },
    maxNumberStudents: {
        type: Number,
        default: 1000,
    },
    maxNumberCredits: {
        type: Number,
        default: 100,
    },
    signUpDateLimit: {
        type: Date,
    },
    advanced: {
        type: Boolean,
        default: true,
    },
    clase: {
        type: [Number],
        default: [9, 10, 11, 12]
    },
    profile: {
        type: [String],
        default: ["A", "B"]
    },
    signUpDependsOnProjects:{
        type: Object,
        default: {},
    },
    year: {
        type: Number,
    },
    students: {
        type: Object,
        default: {},
    },
}, { timestamps: true } ) 

export default mongoose.model('Project', ProjectSchema)   