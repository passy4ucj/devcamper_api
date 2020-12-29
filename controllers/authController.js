import User from '../models/User.js'
import asyncHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import sendEmail from '../utils/sendEmail.js'


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

    sendTokenResponse(user, 200, res)
    
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

    sendTokenResponse(user, 200, res)
    
})



// @desc  Get Current logged in User
// @route GET /api/v1/auth/me
// @access Private
const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        data: user
    })
})


// @desc  Forgot password
// @route GET /api/v1/auth/forgotpassword
// @access Public
const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if(!user) {
        return next(new ErrorResponse('There is no user with that email', 404))
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken()

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`

    const message = `You are receiving this email because you (or someone else)
        has requested the reset of a password. please make a PUT request to: \n \n ${resetUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })
        res.status(200).json({
            success: true,
            data: 'Email sent'
        })
    } catch (error) {
        console.log(error)
        user.getResetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({
            validateBeforeSave: false
        })
        
        return next(new ErrorResponse('Email could not be sent', 500))
    }
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        data: user
    })
})


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create Token
    const token = user.getSignedJwtToken() 

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }
    
    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}


export {
    register,
    login,
    getMe,
    forgotPassword,
}