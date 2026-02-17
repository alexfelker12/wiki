import xlsx from "node-xlsx"
import path from "path"
import slugify from "slugify"

import { EncounterMethod, LocationType, ObtainType } from "generated/prisma/enums"

import { db } from "@/lib/db"

//* pnpm prisma db seed

/* -------------------------------------------------- */
/* CONFIG */
/* -------------------------------------------------- */

const ROM_HACK_NAME = "Theta Emerald EX"
const FILE_PATH = path.join(__dirname, "../../wild-pokemon-locations.xlsx")

/* -------------------------------------------------- */
/* XLSX PARSER LOGIC */
/* -------------------------------------------------- */

const groupSplitter = /,(?![^(]*\))/g
const bracketRegex = /(.*?)\s*\(([^)]+)\)/

type ParsedLocation = {
  locations: string[]
  additionalInfo: string[]
  condition: string | null
}

const extractLevel = (condition: string | null): number | null => {
  if (!condition) return null
  const match = condition.match(/Lv\.?\s*(\d+)/i)
  return match ? parseInt(match[1], 10) : null
}

const extractRate = (condition: string | null): number | null => {
  if (!condition) return null
  const match = condition.match(/(\d+)\s*%/)
  return match ? parseFloat(match[1]) : null
}

const detectObtainMethod = (entry: ParsedLocation) => {
  const first = entry.locations[0]
  if (!first) return null

  if (first.startsWith("Evolve")) {
    return {
      type: ObtainType.EVOLUTION,
      level: extractLevel(entry.condition),
      note: first
    }
  }

  if (first.toLowerCase().includes("trade")) {
    return {
      type: ObtainType.TRADE,
      level: null,
      note: first
    }
  }

  return null
}

const mapEncounterMethod = (additionalInfo: string[]): EncounterMethod => {
  const lower = additionalInfo.map(a => a.toLowerCase())

  if (lower.includes("surfing")) return EncounterMethod.SURF
  if (lower.includes("old rod")) return EncounterMethod.OLD_ROD
  if (lower.includes("good rod")) return EncounterMethod.GOOD_ROD
  if (lower.includes("super rod")) return EncounterMethod.SUPER_ROD

  return EncounterMethod.WALK
}

const parseLocationInfo = (locationInfo: string): ParsedLocation[] => {
  const parts = locationInfo.split(groupSplitter).map(p => p.trim())

  const results: ParsedLocation[] = []
  let buffer: string[] = []

  for (const part of parts) {
    const match = part.match(bracketRegex)

    if (match) {
      const beforeBracket = match[1].trim()
      const condition = match[2].trim()

      buffer.push(beforeBracket)

      const [first, ...rest] = buffer

      const locations = first
        .split("/")
        .map(l => l.trim())
        .filter(Boolean)

      results.push({
        locations,
        additionalInfo: rest,
        condition
      })

      buffer = []
    } else {
      buffer.push(part)
    }
  }

  return results
}

/* -------------------------------------------------- */
/* HELPER: Location Type Detection */
/* -------------------------------------------------- */

const detectLocationType = (name: string): LocationType => {
  if (name.startsWith("Route")) return LocationType.ROUTE
  if (name.includes("City")) return LocationType.CITY
  if (name.includes("Cave")) return LocationType.CAVE
  return LocationType.OTHER
}

/* -------------------------------------------------- */
/* SEED LOGIC */
/* -------------------------------------------------- */

async function main() {
  console.log("🌱 Seeding started...")

  const romHackSlug = slugify(ROM_HACK_NAME, { lower: true })
  const romHack = await db.romHack.upsert({
    where: {
      slug: romHackSlug
    },
    update: {},
    create: {
      name: ROM_HACK_NAME,
      slug: romHackSlug
    }
  })

  const workbook = xlsx.parse(FILE_PATH)

  for (const sheet of workbook) {
    const rows = sheet.data.slice(1) // remove header

    for (const row of rows) {
      const pokemonName = row[0]
      const locationInfo = row[1]

      console.log("Seeding data for:", pokemonName)

      if (!pokemonName || !locationInfo) continue

      const pokemonSlug = slugify(pokemonName, { lower: true, strict: true })
      const pokemon = await db.pokemon.upsert({
        where: { slug: pokemonSlug },
        update: {},
        create: {
          name: pokemonName,
          slug: pokemonSlug,
          generation: 1 // will be adjusted
        }
      })

      const parsedEntries = parseLocationInfo(locationInfo)

      for (const entry of parsedEntries) {
        const obtain = detectObtainMethod(entry)

        if (obtain) {
          await db.obtainMethod.create({
            data: {
              pokemonId: pokemon.id,
              type: obtain.type,
              level: obtain.level,
              note: obtain.note
            }
          })
          continue
        }

        const method = mapEncounterMethod(entry.additionalInfo)
        const rate = extractRate(entry.condition)
        const level = extractLevel(entry.condition)

        for (const locationName of entry.locations) {
          const locationSlug = slugify(locationName, { lower: true })
          const location = await db.location.upsert({
            where: {
              slug_romHackId: {
                slug: locationSlug,
                romHackId: romHack.id
              }
            },
            update: {},
            create: {
              name: locationName,
              slug: locationSlug,
              type: detectLocationType(locationName),
              romHackId: romHack.id
            }
          })

          await db.wildEncounter.upsert({
            where: {
              pokemonId_locationId_method_minLevel: {
                pokemonId: pokemon.id,
                locationId: location.id,
                method,
                minLevel: level || 0
              }
            },
            update: {},
            create: {
              pokemonId: pokemon.id,
              locationId: location.id,
              method,
              rate,
              minLevel: level,
              maxLevel: null,
              floor: null
            }
          })
        }
      }
    }
  }

  console.log("✅ Seeding finished.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
