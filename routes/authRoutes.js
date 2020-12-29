import express from 'express'
import { forgotPassword, getMe, login, register, resetPassword } from '../controllers/authController.js'
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


export default router