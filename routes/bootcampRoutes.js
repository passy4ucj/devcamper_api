import express from 'express'
import { getBootcamp, getBootcamps, createBootcamp } from '../controllers/bootcampController.js'
const router = express.Router()

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)


export default router