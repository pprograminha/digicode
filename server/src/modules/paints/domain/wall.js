import { left, right } from '../../../core/either'
import { Entity } from '../../../core/domain/entity'
import { HeightError } from './errors/height-error'

export class Wall extends Entity {
  constructor(props) {
    super(props)
  }

  get windows() {
    return this.props.windows
  }

  get doors() {
    return this.props.doors
  }

  get area() {
    return this.props.width * this.props.height
  }

  validateDoorHeight() {
    const maximumAllowableHeightMinus = 0.3

    if (this.props.doors.length === 0) {
      return right(null)
    }

    const validatedDoor = this.props.doors.some((door) => {
      return this.props.height - maximumAllowableHeightMinus >= door.height
    })

    if (!validatedDoor) {
      return left(new HeightError())
    }

    return right(null)
  }

  windowsArea() {
    return this.props.windows.reduce((windowArea, window) => {
      return windowArea + window.area
    }, 0)
  }

  doorsArea() {
    return this.props.doors.reduce((doorArea, door) => {
      return doorArea + door.area
    }, 0)
  }

  doorsWindowsArea() {
    return this.doorsArea() + this.windowsArea()
  }

  checkWallOpeningsRatio() {
    const wallArea = this.area
    const isWallOpeningsRatioExceeded = wallArea * 0.5 < this.doorsWindowsArea()

    if (isWallOpeningsRatioExceeded) {
      return left(
        new Error(
          'The total area of doors and windows in the wall exceeds half the area of the wall. Please check the dimensions and try again.',
        ),
      )
    }
    return right(null)
  }

  static calcArea(width, height) {
    return width * height
  }

  static validate({ width, height }) {
    if (typeof width !== 'number' || typeof height !== 'number') {
      return left(new Error('Width and height must be numbers'))
    }

    if (width < 1 || width > 50) {
      return left(new Error('Width must be between 1 and 50'))
    }

    if (height < 1 || height > 50) {
      return left(new Error('Height must be between 1 and 50'))
    }

    return right({ width, height })
  }

  static create({ width, height, windows, doors }) {
    const result = this.validate({ width, height })

    if (result.isLeft()) {
      return left(result.value)
    }
    const area = this.calcArea(width, height)

    return right(
      new Wall({
        width,
        height,
        windows,
        doors,
        area,
      }),
    )
  }
}

export class WallCollection extends Entity {
  constructor(props) {
    super(props)
  }

  get walls() {
    return this.props.walls
  }

  totalWindowsArea() {
    return this.props.walls.reduce((totalWindowArea, wall) => {
      return (
        totalWindowArea +
        wall.value.windows.reduce((totalWindowArea, window) => {
          return totalWindowArea + window.area
        }, 0)
      )
    }, 0)
  }

  totalDoorsArea() {
    return this.props.walls.reduce((totalDoorArea, wall) => {
      return (
        totalDoorArea +
        wall.value.doors.reduce((totalDoorArea, door) => {
          return totalDoorArea + door.area
        }, 0)
      )
    }, 0)
  }

  totalDoorsWindowsArea() {
    return this.totalDoorsArea() + this.totalWindowsArea()
  }

  totalWallsArea() {
    return this.props.walls.reduce((totalWallArea, wall) => {
      return totalWallArea + wall.value.area
    }, 0)
  }

  paintableArea() {
    return this.totalWallsArea() - this.totalDoorsWindowsArea()
  }

  static validate(walls) {
    if (!Array.isArray(walls)) {
      return left(new Error('Invalid walls array'))
    }

    if (walls.length > 4) {
      return left(new Error('There cannot be more than 4 walls'))
    }

    return right(walls)
  }

  static create({ walls }) {
    const result = this.validate(walls)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(new WallCollection({ walls }))
  }
}
