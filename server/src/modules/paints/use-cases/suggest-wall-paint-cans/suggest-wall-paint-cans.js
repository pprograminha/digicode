import { left, right } from '../../../../core/either'
import { DoorCollection } from '../../domain/door'
import { PaintCanCollection } from '../../domain/paint-can'
import { Wall, WallCollection } from '../../domain/wall'
import { WindowCollection } from '../../domain/window'

export class SuggestWallPaintCans {
  prismaPaintCansRepository

  constructor(prismaPaintCansRepository) {
    this.prismaPaintCansRepository = prismaPaintCansRepository
  }

  async exec({ walls: _walls }) {
    const wallsWithDoorsAndWindows = _walls.map((wall) => {
      const doorCollectionResult = DoorCollection.create({
        quantityOfDoors: wall.quantityOfDoors,
      })
      const windowCollectionResult = WindowCollection.create({
        quantityOfWindows: wall.quantityOfWindows,
      })

      if (doorCollectionResult.isLeft()) {
        return left(doorCollectionResult.value)
      }
      if (windowCollectionResult.isLeft()) {
        return left(windowCollectionResult.value)
      }

      const doors = doorCollectionResult.value.doors
      const windows = windowCollectionResult.value.windows

      const wallResult = Wall.create({
        ...wall,
        doors,
        windows,
      })

      return wallResult
    })

    const wallCollectionResult = WallCollection.create({
      walls: wallsWithDoorsAndWindows,
    })

    if (wallCollectionResult.isLeft()) {
      return left(wallCollectionResult.value)
    }
    const walls = wallCollectionResult.value.walls

    const wallResult = walls.find((wallResult) => wallResult.isLeft())

    if (wallResult) {
      return left(wallResult.value)
    }

    const wallDoorHeightResult = walls
      .map((wall) => wall.value.validateDoorHeight())
      .find((validateDoorHeightResult) => validateDoorHeightResult.isLeft())

    if (wallDoorHeightResult) {
      return left(wallDoorHeightResult.value)
    }

    const wallOpeningsRatioResult = walls
      .map((wall) => wall.value.checkWallOpeningsRatio())
      .find((validateDoorHeightResult) => validateDoorHeightResult.isLeft())

    if (wallOpeningsRatioResult) {
      return left(wallOpeningsRatioResult.value)
    }
    const paintCans = await this.prismaPaintCansRepository.findMany()
    const paintCansLiters = paintCans.map((paintCan) => paintCan.value.liters)
    const paintCanCollectionResult = PaintCanCollection.create({
      paintCans,
    })

    if (paintCanCollectionResult.isLeft()) {
      return left(paintCanCollectionResult.value)
    }

    const paintableArea = wallCollectionResult.value.paintableArea()
    const totalQtyOfPaintNeeded =
      paintCanCollectionResult.value.calcQtyOfPaintNeeded(paintableArea)

    const suggestedPaintCans = paintCanCollectionResult.value.suggestPaintCan({
      paintCansLiters,
      litersNeeded: totalQtyOfPaintNeeded,
    })

    return right({
      totalQtyOfPaintNeeded,
      paintCansLiters,
      suggestedPaintCans,
    })
  }
}
