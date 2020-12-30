import jwt from 'jsonwebtoken'
import asyncHandler from './async.js'
import ErrorResponse from '../utils/errorResponse.js'
import User from '../models/User.js'


// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Set token from Bearer Token
        token = req.headers.authorization.split(' ')[1]
    } 
    // Set token from cookie
    // else if(req.cookies.token) {
    //     token = req.cookies.token
    // }

    // Make sure token exists
    if(!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        

        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
})

// Grant access to specific role
const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is unauthorized to access this route`, 403))
        }
        next()
    }
}

export {
    protect,
    authorize,
}