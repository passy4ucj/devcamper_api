import express from 'express'
import dotenv  from 'dotenv'
import path from 'path'
import fileupload from 'express-fileupload'
import logger from './middleware/logger.js'
import morgan from 'morgan'
import errorHandler from './middleware/error.js'
import colors from 'colors'
import connectDB from './config/db.js'


//Load env vars
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

//Route files
import bootcamps from './routes/bootcampRoutes.js'
import courses from './routes/courseRoutes.js'
import auth from './routes/authRoutes.js'




const app = express()

// Body Parser
app.use(express.json())


// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// File uploading
app.use(fileupload())

// Set static folder
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)

//Use error Middleware
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))