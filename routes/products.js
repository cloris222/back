import { Router } from 'express'
import content from '../middleware/content.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createProducts, getSellProducts, getAllProducts, getProduct } from '../controllers/products.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createProducts)
router.get('/', getSellProducts)
router.get('/all', jwt, admin, getAllProducts)
router.get('/:id', getProduct)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, createProducts)

export default router
