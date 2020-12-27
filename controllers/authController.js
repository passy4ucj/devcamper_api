import User from '../models/User.js'
import asyncHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'


// @desc  Register User
// @route POST /api/v1/auth/register
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


// @desc  Login User
// @route POST /api/v1/auth/login
// @access Public
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Check if password matchs
    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Create Token
    const token = user.getSignedJwtToken()

    res.status(200).json({
        success: true,
        token
    })
    
})


export {
    register,
    login,
}