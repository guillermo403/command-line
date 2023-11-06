import { Router } from 'express'
import { helloWorld } from '../controllers/helloWorld%%ext'
const router = Router()

export default router

router.get('/', helloWorld)
