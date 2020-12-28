import express from 'express'
import { getMe, login, register } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)

router.route('/me')
    .get(protect, getMe)


export default router