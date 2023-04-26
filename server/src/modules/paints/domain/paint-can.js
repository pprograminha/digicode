import { Entity } from '../../../core/domain/entity'
import { right } from '../../../core/either'

export class PaintCan extends Entity {
  get liters() {
    return this.props.liters
  }

  constructor(props, id) {
    super(props, id)
  }

  static create(props, id) {
    const paintCan = new PaintCan(props, id)

    return right(paintCan)
  }
}

export class PaintCanCollection extends Entity {
  get paintCans() {
    return this.props.paintCans
  }

  constructor(props) {
    super(props)
  }

  suggestPaintCan({ paintCansLiters, litersNeeded }) {
    const paintObject = paintCansLiters.reduce((paintObject, paintCanLiter) => {
      paintObject[paintCanLiter] = 0
      return paintObject
    }, {})

    let remainingLiters = litersNeeded
    let index = 0

    while (remainingLiters > 0 && index < paintCansLiters.length) {
      const paintCanSize = paintCansLiters[index]

      if (remainingLiters >= paintCanSize) {
        paintObject[paintCanSize] += 1
        remainingLiters -= paintCanSize
      } else {
        index++
      }
    }
    return Object.entries(paintObject).reduce(
      (previousPaintObject, [paintObjectKey, paintObjectValue]) => {
        if (paintObjectValue === 0) {
          return previousPaintObject
        }
        return {
          ...previousPaintObject,
          [paintObjectKey]: paintObjectValue,
        }
      },
      {},
    )
  }

  calcQtyOfPaintNeeded(area) {
    const paint = area / 5

    return Math.ceil(paint)
  }

  static create(props) {
    return right(new PaintCanCollection(props))
  }
}
