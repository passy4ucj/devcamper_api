import Bootcamp from '../models/Bootcamp.js'


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
const createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

// @desc  Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
const updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Updates a bootcamp ${req.params.id}` })
}


// @desc  Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Deletes a bootcamp ${req.params.id}` })
}

export {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
}