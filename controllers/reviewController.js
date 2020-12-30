import Review from '../models/Review.js'
import Bootcamp from '../models/Bootcamp.js'
import asyncHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'


// @desc  Get reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
const getReviews = asyncHandler(async (req, res, next) => {
   

    if(req.params.bootcampId) {
      const reviews = await Review.find({ bootcamp: req.params.bootcampId })
    
      return res.status(200).json({
          success: true,
          count: reviews.length,
          data: reviews
      })
    } else {
        res.status(200).json(res.advancedResults)
    }

    
})


// @desc  Get a single review
// @route GET /api/v1/reviews/:id
// @access Public
const getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if(!review) {
        return next(new ErrorResponse(`No review with the id of ${req.params.id}`), 404)
    }

    res.status(200).json({
        success: true,
        data: review
    })
})




export {
    getReviews,
    getReview,
}