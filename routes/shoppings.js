import { Router } from 'express'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createShoppings, getMyShoppings, getAllShoppings } from '../controllers/shoppings.js'

const router = Router()

router.post('/', jwt, createShoppings)
router.get('/', jwt, getMyShoppings)
router.get('/all', jwt, admin, getAllShoppings)

export default router
