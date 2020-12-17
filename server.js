import express from 'express'
import dotenv  from 'dotenv'
import logger from './middleware/logger.js'
import morgan from 'morgan'


//Route files
import bootcamps from './routes/bootcampRoutes.js'

//Load env vars
dotenv.config({ path: './config/config.env' })


const app = express()


// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


app.use(logger)

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT || 5000
app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))