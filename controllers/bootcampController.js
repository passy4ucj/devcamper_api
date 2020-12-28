import path from 'path'
import Bootcamp from '../models/Bootcamp.js'
import asyncHandler from '../middleware/async.js'
import geocoder from '../utils/geocoder.js'
import ErrorResponse from '../utils/errorResponse.js'


// @desc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
const getBootcamps = asyncHandler(async (req, res, next) => {
    
    res.status(200).json(res.advancedResults)
    
})


// @desc  Get a single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
const getBootcamp = asyncHandler(async (req, res, next) => {
    
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })
})


// @desc  Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id    

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id })

    // If the user is not an admin, they can only add one bootcamp
    if(publishedBootcamp && req.user.role !== 'admin') {
        return next(new ErrorResponse(`The user with ID  ${req.user.id} has already published a bootcamp`, 400))
    }

    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
        success: true,
        data: bootcamp
    })
    
})

// @desc  Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
const updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })
    
})


// @desc  Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
    
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    await bootcamp.remove()

    res.status(200).json({
        success: true,
        data: {}
    })
    
})


// @desc  Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params

    //Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,
    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

// @desc  Upload photo for bootcamp
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
      }
    
      const file = req.files.file;
    
      // Make sure the image is a photo
      if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
      }
    
      // Check filesize
      if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
          new ErrorResponse(
            `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
            400
          )
        );
      }
    
      // Create custom filename
      file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
      file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
          if(err) {
              console.error(err)
              return next(
                new ErrorResponse(
                  `Problem with file upload`,
                  400
                )
              )
          }
          await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name })
  
          res.status(200).json({
              success: true,
              data: file.name
          })
     })

})

export {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload,
}
