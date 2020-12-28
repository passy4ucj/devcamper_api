import express from 'express'
import advancedResults from '../middleware/advancedResults.js'
import Bootcamp from '../models/Bootcamp.js'
import { getBootcamp, getBootcamps, bootcampPhotoUpload, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } from '../controllers/bootcampController.js'
import { protect } from '../middleware/auth.js'



const router = express.Router()


// Include other resource routers
import courseRouter from './courseRoutes.js'

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)


router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/:id/photo')
    .put(protect, bootcampPhotoUpload)

router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect, updateBootcamp)
    .delete(protect, deleteBootcamp)


export default router