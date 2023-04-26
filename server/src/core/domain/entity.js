import crypto from 'node:crypto'

export class Entity {
  _id
  props

  get id() {
    return this._id
  }

  constructor(props, id) {
    this._id = id || crypto.randomUUID()
    this.props = props
  }
}
