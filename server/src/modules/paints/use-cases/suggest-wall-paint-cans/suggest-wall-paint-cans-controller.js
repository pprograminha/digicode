import { ok, genericError, fail } from '../../../../core/infra/http-response'

export class SuggestWallPaintCansController {
  suggestWallPaintCans

  constructor(suggestWallPaintCans) {
    this.suggestWallPaintCans = suggestWallPaintCans
  }

  async handle({ walls }) {
    try {
      const result = await this.suggestWallPaintCans.exec({
        walls,
      })

      if (result.isLeft()) {
        return genericError(result.value)
      }

      const paintCans = result.value

      return ok(paintCans)
    } catch (error) {
      console.log(error)
      return fail()
    }
  }
}
