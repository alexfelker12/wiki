import type { LocationModel, RomHackModel } from "generated/prisma/models"

import { db } from "@/lib/db"


type SlugsObj = {
  romHackSlug: RomHackModel["slug"]
  locationSlug: LocationModel["slug"]
}
type FindLocationBySlugReturn = NonNullable<Awaited<ReturnType<typeof findLocationBySlug>>>

const findLocationBySlug = async ({ romHackSlug, locationSlug }: SlugsObj) => {
  return await db.location.findFirst({
    where: {
      romHack: {
        slug: romHackSlug
      },
      slug: locationSlug
    },
    include: {
      wildEncounters: {
        include: {
          pokemon: true
        }
      },
      romHack: {
        select: {
          slug: true
        }
      }
    }
  })
}

export {
  type SlugsObj,
  type FindLocationBySlugReturn,
  findLocationBySlug,
}

