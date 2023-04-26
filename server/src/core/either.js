export class Left {
  value

  constructor(value) {
    this.value = value
  }

  isLeft() {
    return true
  }

  isRight() {
    return false
  }
}

export class Right {
  value

  constructor(value) {
    this.value = value
  }

  isLeft() {
    return false
  }

  isRight() {
    return true
  }
}

export const left = (l) => {
  return new Left(l)
}

export const right = (a) => {
  return new Right(a)
}
