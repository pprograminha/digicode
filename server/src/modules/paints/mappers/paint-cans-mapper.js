import { PaintCan } from '../domain/paint-can'

export class PaintCansMapper {
  static toDomain(paintCans) {
    return paintCans.map((paintCan) =>
      PaintCan.create(
        {
          liters: paintCan.liters,
        },
        paintCan.id,
      ),
    )
  }
}
