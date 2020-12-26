import express from 'express'
import { getBootcamp, getBootcamps, bootcampPhotoUpload, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } from '../controllers/bootcampController.js'
const router = express.Router()

// Include other resource routers
import courseRouter from './courseRoutes.js'

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)


router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/:id/photo')
    .put(bootcampPhotoUpload)

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)


export default router