import express from 'express'
import { forgotPassword, getMe, login, register, resetPassword, updateDetails, updatePassword } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)

router.route('/me')
    .get(protect, getMe)

router.route('/forgotpassword')
    .post(forgotPassword)

router.route('/resetpassword/:resettoken')
    .put(resetPassword)

router.route('/updatedetails')
    .put(protect, updateDetails)

router.route('/updatepassword')
    .put(protect, updatePassword)


export default router