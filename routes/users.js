import { Router } from 'express'
import content from ''

const router = Router()

router.post('/', content('application/json'), register)
