const crypto = require('node:crypto')
const { prisma } = require('./client')

const main = async () => {
  const paintCan18Liters = await prisma.paintCan.findFirst({
    where: {
      liters: {
        equals: 18,
      },
    },
  })

  if (paintCan18Liters) return

  await prisma.paintCan.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        liters: 18,
      },
      {
        id: crypto.randomUUID(),
        liters: 3.6,
      },
      {
        id: crypto.randomUUID(),
        liters: 2.5,
      },
      {
        id: crypto.randomUUID(),
        liters: 0.5,
      },
    ],
  })
}
main()
