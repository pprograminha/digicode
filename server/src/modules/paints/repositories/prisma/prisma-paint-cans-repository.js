import { prisma } from '../../../../infra/prisma/client'
import { PaintCansMapper } from '../../mappers/paint-cans-mapper'

export class PrismaPaintCansRespository {
  async findMany() {
    const paintCans = await prisma.paintCan.findMany({
      orderBy: {
        liters: 'desc',
      },
    })

    return PaintCansMapper.toDomain(paintCans)
  }
}
