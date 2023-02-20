import { Router } from 'express'
import content from '../middleware/content.js'
import { register, login, logout, extend, getUser, getAllUsers, editCart, getCart, editProfiles } from '../controllers/users.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getUser)
router.get('/all', auth.jwt, admin, getAllUsers)
router.post('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)
router.patch('/:id', content('application/json'), auth.jwt, editProfiles)

export default router
