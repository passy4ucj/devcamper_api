const errorHandler = (err, req, res, next) => {
    //Log to Console for dev
    console.log(err.stack.red)

    res.status(500).json({
        success: false,
        error: err.message
    })
}

export default errorHandler