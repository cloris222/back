import { Router } from 'express'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createOrders, getMyOrders, getAllOrders } from '../controllers/orders.js'

const router = Router()

router.post('/', jwt, createOrders)
router.get('/', jwt, getMyOrders)
router.get('/all', jwt, admin, getAllOrders)

export default router
