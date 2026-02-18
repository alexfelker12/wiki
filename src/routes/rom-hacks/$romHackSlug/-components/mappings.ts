import { LocationType } from "generated/prisma/enums";

const labelMappings: Record<LocationType, string> = {
  CITY: "Cities",
  ROUTE: "Routes",
  CAVE: "Caves",
  BUILDING: "Buildings",
  OTHER: "Other locations"
}

export {
  labelMappings
}