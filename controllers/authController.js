import User from '../models/User.js'
import asyncHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'


// @desc  Register User
// @route GET /api/v1/auth/register
// @access Public
const register = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true
    })
    
})


export {
    register,
}