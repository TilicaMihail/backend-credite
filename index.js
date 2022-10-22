import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import projectsRoute from './routes/projects.js'
import internshipsRoute from './routes/internships.js'
import statsRoute from './routes/stats.js'
import cookieParser from 'cookie-parser'
import boolParser from 'express-query-boolean'
// import { Agenda } from "agenda/es.js";
import cors from 'cors'
const app = express(); 
dotenv.config()

// export const agenda = new Agenda({db: { address: process.env.MONGO }})

// agenda.define('show time', () => {
//     const date = new Date()
//     console.log(date)
// })

const connect = async () => {
    try {
        // await agenda.start();
        // console.log('connected agenda')
        await mongoose.connect(process.env.MONGO)
        console.log('connected to db')
    } catch (error) {
        throw error
    }
}

const date = '2022-07-25T21:00:00.152Z'

//middlewares 

app.use(cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true 
}))
app.use(cookieParser())
app.use(express.json()) 
app.use(boolParser())

app.use('/api/auth', authRoute)
app.use('/api/projects', projectsRoute)
app.use('/api/users', usersRoute)
app.use('/api/internships', internshipsRoute)
app.use('/api/stats', statsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8800, async () => {
    await connect();  
})   

export default app  