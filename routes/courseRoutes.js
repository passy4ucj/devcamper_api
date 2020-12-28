import express from 'express'
import advancedResults from '../middleware/advancedResults.js'
import Course from '../models/Course.js'
import { addCourse, deleteCourse, getCourse, getCourses, updateCourse } from '../controllers/courseController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router({ mergeParams: true })

router.route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name description'
    }), getCourses)
    .post(protect, addCourse)

router.route('/:id')
    .get(getCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse)



export default router