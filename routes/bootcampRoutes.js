import express from 'express'
import advancedResults from '../middleware/advancedResults.js'
import Bootcamp from '../models/Bootcamp.js'
import { getBootcamp, getBootcamps, bootcampPhotoUpload, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } from '../controllers/bootcampController.js'
import { authorize, protect } from '../middleware/auth.js'



const router = express.Router()


// Include other resource routers
import courseRouter from './courseRoutes.js'
import reviewRouter from './reviewRoutes.js'

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)


router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/:id/photo')
    .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)


export default router