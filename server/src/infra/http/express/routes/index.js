import express from 'express'
import { paintsRouter } from './paints.routes'

const router = express.Router()

router.use([paintsRouter])

export { router }
