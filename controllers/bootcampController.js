// @desc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
const getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all bootcamps' })
}


// @desc  Get a single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
const getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Get a bootcamp ${req.params.id}` })
}


// @desc  Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Create a new bootcamp` })
}

export {
    getBootcamps,
    getBootcamp,
    createBootcamp,
}