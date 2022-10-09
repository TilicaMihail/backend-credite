import mongoose from 'mongoose';
const { Schema } = mongoose;

const InternshipSchema = new Schema({
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
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    archived: {
        type: Boolean,
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
    price: {
        type: Number,
        default: 0,
    },
    minNumberCredits: {
        type: Number,
        default: 0,
    },
    signUpDateLimit: {
        type: Date,
    },
    students: {
        type: Object,
        default: {},
    },
}, { timestamps: true } ) 

export default mongoose.model('Internship', InternshipSchema)   