import express from 'express'
import advancedResults from '../middleware/advancedResults.js'
import Review from '../models/Review.js'
import { getReview, getReviews } from '../controllers/reviewController.js'
import { authorize, protect } from '../middleware/auth.js'

const router = express.Router({ mergeParams: true })

router.route('/')
    .get(advancedResults(Review, {
        path: 'bootcamp',
        select: 'name description'
    }), getReviews)

router.route('/:id')
    .get(getReview)
    // .put(protect, authorize('publisher', 'admin'), updateCourse)
    // .delete(protect, authorize('publisher', 'admin'), deleteCourse)



export default router