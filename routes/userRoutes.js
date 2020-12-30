import express from 'express'
import User from '../models/User.js'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/userController.js'
import { authorize, protect } from '../middleware/auth.js'
import advancedResults from '../middleware/advancedResults.js'

const router = express.Router({ mergeParams: true })

router.use(protect)
router.use(authorize('admin'))

router.route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser)


router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

    


export default router