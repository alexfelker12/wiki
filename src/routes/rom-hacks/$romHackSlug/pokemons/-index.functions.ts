import { db } from "@/lib/db"


type FindPokemonByNameReturn = Awaited<ReturnType<typeof findPokemonByName>>

const findPokemonByName = async ({ name }: { name: string }) => {
  return await db.pokemon.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: name
          }
        },
        {
          slug: {
            startsWith: name
          }
        },
      ]
    },
    include: {
      obtainMethods: true,
      wildEncounters: true
    }
  })
}

export {
  findPokemonByName, type FindPokemonByNameReturn
}

