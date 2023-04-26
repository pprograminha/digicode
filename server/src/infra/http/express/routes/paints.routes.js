import express from 'express'

import { adaptRoute } from '../../../../core/infra/adapters/express-router-adapter'
import { makeSuggestWallPaintCanControllerFactory } from '../../factories/make-suggest-wall-paint-can-controller-factory'

const paintsRouter = express.Router()

paintsRouter.post(
  '/suggest-wall-paint-can',
  adaptRoute(makeSuggestWallPaintCanControllerFactory()),
)

paintsRouter.use('/paints', paintsRouter)

export { paintsRouter }
