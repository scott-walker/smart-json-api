// prisma/seed.ts
import { PrismaClient, Endpoint } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const endpoint: Endpoint = await prisma.endpoint.upsert({
    where: { id: "test" },
    create: {
      url: "test",
      query: "Дай список инструментов для бизнеса",
      params: {},
      schema: {},
    },
    update: {
      query: "Дай список инструментов для бизнеса",
      params: {},
      schema: {},
    },
  })

  console.log({ endpoint })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
