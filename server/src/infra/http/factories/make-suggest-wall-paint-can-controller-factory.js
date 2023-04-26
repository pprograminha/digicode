import { PrismaPaintCansRespository } from '../../../modules/paints/repositories/prisma/prisma-paint-cans-repository'
import { SuggestWallPaintCans } from '../../../modules/paints/use-cases/suggest-wall-paint-cans/suggest-wall-paint-cans'
import { SuggestWallPaintCansController } from '../../../modules/paints/use-cases/suggest-wall-paint-cans/suggest-wall-paint-cans-controller'

export const makeSuggestWallPaintCanControllerFactory = () => {
  const prismaPaintCansRepository = new PrismaPaintCansRespository()
  const suggestWallPaintCans = new SuggestWallPaintCans(
    prismaPaintCansRepository,
  )
  const suggestWallPaintCansController = new SuggestWallPaintCansController(
    suggestWallPaintCans,
  )

  return suggestWallPaintCansController
}
