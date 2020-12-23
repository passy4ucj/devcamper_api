import ErrorResponse from "../utils/errorResponse.js"

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message

    //Log to Console for dev
    console.log(err.stack.red)

    //Mongoose bad ObjectId
    if(err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

export default errorHandler