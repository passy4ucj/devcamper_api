import User from '../models/User.js'
import asyncHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'


// @desc  Register User
// @route GET /api/v1/auth/register
// @access Public
const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    // Create Token
    const token = user.getSignedJwtToken()

    res.status(200).json({
        success: true,
        token
    })
    
})


export {
    register,
}