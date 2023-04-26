import { Entity } from '../../../core/domain/entity'
import { left, right } from '../../../core/either'

export class DoorCollection extends Entity {
  constructor(props) {
    super({ ...props })
  }

  static createDoorsArray({ quantityOfDoors, width, height }) {
    return Array.from(
      {
        length: quantityOfDoors,
      },
      () => ({
        width,
        height,
        area: this.calcArea(width, height),
      }),
    )
  }

  get doors() {
    return this.props.doors
  }

  get area() {
    return this.props.width * this.props.height
  }

  static calcArea(width, height) {
    return width * height
  }

  static validate(quantityOfDoors) {
    if (typeof quantityOfDoors !== 'number' || quantityOfDoors % 1 !== 0) {
      return left(new Error('Quantity of doors must be an integer'))
    }

    if (quantityOfDoors < 0) {
      return left(new Error('Quantity of doors must be greater than zero'))
    }

    return right(null)
  }

  static create({ quantityOfDoors }) {
    if (!quantityOfDoors) {
      return right(
        new DoorCollection({
          doors: [],
        }),
      )
    }

    const result = this.validate(quantityOfDoors)

    if (result.isLeft()) {
      return left(result.value)
    }

    const width = 0.8
    const height = 1.9

    return right(
      new DoorCollection({
        quantityOfDoors,
        doors: this.createDoorsArray({
          quantityOfDoors,
          width,
          height,
        }),
        width,
        height,
      }),
    )
  }
}
