import { db } from "@/lib/db"


type FindPokemonByNameReturn = Awaited<ReturnType<typeof findPokemonByName>>

const findPokemonByName = async ({ name }: { name: string }) => {
  const searchString = name.toLowerCase()
  // await new Promise<void>((res) => { setTimeout(() => res(), 2000) })
  return await db.pokemon.findMany({
    where: {
      OR: [
        { name: { startsWith: searchString } },
        { slug: { startsWith: searchString } },
      ]
    },
    include: {
      obtainMethods: true,
      wildEncounters: {
        include: { location: true }
      }
    }
  })
}

export {
  findPokemonByName, type FindPokemonByNameReturn
};
