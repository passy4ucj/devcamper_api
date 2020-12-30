import express from 'express'
import dotenv  from 'dotenv'
import path from 'path'
import fileupload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
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
import users from './routes/userRoutes.js'
import reviews from './routes/reviewRoutes.js'




const app = express()

// Body Parser
app.use(express.json())

// Cookie Parser
app.use(cookieParser())


// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// File uploading
app.use(fileupload())

// Sanitize Data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS (Cross-SIte Scripting) attacks
app.use(xss())

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 100
})
app.use(limiter)

// Prevent Http param pollution
app.use(hpp())

// Enable cors
app.use(cors())

// Set static folder
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

//Use error Middleware
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))