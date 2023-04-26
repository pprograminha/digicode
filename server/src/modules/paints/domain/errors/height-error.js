export class HeightError extends Error {
  constructor() {
    super(
      'The height of the door must be 30 cm less than the height of the wall',
    )
    this.name = 'HeightError'
  }
}
