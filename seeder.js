import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'


//Load env vars
dotenv.config({ path: './config/config.env' })

//Load Models
import Bootcamp from './models/Bootcamp.js'

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})


const __dirname = path.resolve()
// Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
    //const bootcamps = await Bootcamp.insertMany(bootcamps)
    try {
        await Bootcamp.create(bootcamps)

        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
        
    }
}

//Delete data from DB
const deleteData = async () => {
    //const bootcamps = await Bootcamp.insertMany(bootcamps)
    try {
        await Bootcamp.deleteMany()

        console.log('Data Destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}


if(process.argv[2] === '-d') {
    deleteData()
} else {
    importData()
}