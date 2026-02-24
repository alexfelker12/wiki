import { LocationType } from "generated/prisma/enums"
import type { LocationModel, RomHackModel } from "generated/prisma/models"

import { db } from "@/lib/db"


type RomHackSlug = Pick<RomHackModel, "slug">
type FindRomHackWithLocationsBySlugReturn = NonNullable<Awaited<ReturnType<typeof findRomHackWithLocationsBySlug>>>["locations"]

const findRomHackWithLocationsBySlug = async ({ slug }: RomHackSlug) => {
  const romHack = await db.romHack.findUnique({
    where: {
      slug
    },
    include: {
      locations: true
    },
    cacheStrategy: {
      ttl: 31536000, // 1 year
      swr: 31536000, // 1 year
    },
  })

  if (!romHack) return null

  // manually group locations by type
  const groupedLocations: (Record<LocationType, LocationModel[]>) = {
    CITY: [],
    ROUTE: [],
    CAVE: [],
    BUILDING: [],
    OTHER: [],
  }
  romHack.locations.forEach(location => { groupedLocations[location.type].push(location) })

  // const groupedLocations2 = await db.location.groupBy({
  //   where: { romHack: { slug } },
  //   by: ["type", "name"],
  //   orderBy: { name: "asc" }
  // })

  // sort grouped arrays alphabetically
  const sortedGroupedLocations = Object.fromEntries(
    Object.entries(groupedLocations).map(
      ([type, locations]) => [
        type, // key should be of type `LocationType`, sadly get's lost even when casting
        locations.sort((a, b) => a.name.localeCompare(b.name)) // ascending
      ]
    )
  )

  return {
    ...romHack,
    locations: sortedGroupedLocations
  }
}

export {
  type RomHackSlug,
  type FindRomHackWithLocationsBySlugReturn,
  findRomHackWithLocationsBySlug
}
