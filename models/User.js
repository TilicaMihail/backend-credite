import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    img: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    phoneNumber: {
        type: String, 
        required: true,
        default: "123"
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'elev',
    },
    createdProjectsIds: {
        type: [String],
        default: []
    },
    signedUpProjectsIds: {
        type: [String],
        default: []
    },
    createdInternshipsIds: {
        type: [String],
        default: [],
    },
    signedUpInternshipsIds: {
        type: [String],
        default: [],
    },
    totalCredite: {
        type: Number,
        default: 0,
    },
    clasa: {
        type: Number,
        default: 9,
    },
    profil: {
        type: String,  
        default: 'A',
    }
}, { timestamps: true} )

export default mongoose.model('User', UserSchema)   