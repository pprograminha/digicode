import { Entity } from '../../../core/domain/entity'
import { left, right } from '../../../core/either'

export class WindowCollection extends Entity {
  constructor(props) {
    super({ ...props })
  }

  static createWindowsArray({ quantityOfWindows, width, height }) {
    return Array.from(
      {
        length: quantityOfWindows,
      },
      () => ({
        width,
        height,
        area: this.calcArea(width, height),
      }),
    )
  }

  get windows() {
    return this.props.windows
  }

  get area() {
    return this.props.width * this.props.height
  }

  static calcArea(width, height) {
    return width * height
  }

  static validate(quantityOfWindows) {
    if (typeof quantityOfWindows !== 'number' || quantityOfWindows % 1 !== 0) {
      return left(new Error('Quantity of windows must be an integer'))
    }

    if (quantityOfWindows < 0) {
      return left(new Error('Quantity of windows must be greater than zero'))
    }

    return right(null)
  }

  static create({ quantityOfWindows }) {
    if (!quantityOfWindows) {
      return right(
        new WindowCollection({
          windows: [],
        }),
      )
    }

    const result = this.validate(quantityOfWindows)

    if (result.isLeft()) {
      return left(result.value)
    }

    const width = 2
    const height = 1.2

    return right(
      new WindowCollection({
        quantityOfWindows,
        windows: this.createWindowsArray({
          quantityOfWindows,
          width,
          height,
        }),
        width,
        height,
      }),
    )
  }
}
