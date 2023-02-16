import { Router } from 'express'
import { jwt } from '../middleware/auth.js'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import { createOrders, getAvailableOrders, getMyOrders, getAllOrders } from '../controllers/orders.js'

const router = Router()

router.post('/', jwt, createOrders)
router.post('/getDate', content('application/json'), jwt, getAvailableOrders)
router.get('/', jwt, getMyOrders)
router.get('/all', jwt, admin, getAllOrders)

export default router
