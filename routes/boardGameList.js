import { Router } from 'express'
import content from '../middleware/content.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createList, getSellList, getAllList, getList, editList } from '../controllers/boardGameList.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createList)
router.get('/', getSellList)
router.get('/all', jwt, admin, getAllList)
router.get('/:id', getList)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editList)

export default router
