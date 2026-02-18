import { Link } from "@tanstack/react-router"
import { LocationType } from "generated/prisma/enums"
import { LocationModel } from "generated/prisma/models"
import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { IconBuilding, IconBuildings, IconDirectionsOff, IconMap, IconRouteSquare, IconTheater } from "@tabler/icons-react"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItemLocation, CommandList, CommandSeparator } from "@/components/ui/command"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"

import { type FindRomHackBySlugReturn } from "../-index.functions"
import { labelMappings } from "./mappings"
import { useLocationList } from "./LocationListProvider"


function LocationsList({ groupedLocations }: { groupedLocations: FindRomHackBySlugReturn }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (Object.values(groupedLocations).every(location => !location.length)) return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconDirectionsOff />
        </EmptyMedia>
        <EmptyTitle>No locations found</EmptyTitle>
        <EmptyDescription>This ROM-Hack apparently has no registered locations</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );

  return (
    <Command
      className={cn(
        // ghost style
        "bg-background p-0 rounded-none!",
        // input styling
        "*:data-[slot=command-input-wrapper]:p-0 *:data-[slot=command-input-wrapper]:pb-1",
        // scroll layout
        "flex-1 grid grid-cols-1 grid-rows-[auto_auto_1r]"
      )}
      // prevent cmdk keyboard navigation to mimic basic links listing accessibility
      // TODO: does not trigger navigation on Enter -> fix sometime
      onKeyDown={(e) => {
        // console.log(e)
        if (["ArrowUp", "ArrowDown", "Enter", "Home", "End"].includes(e.key)) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      <CommandInput placeholder="Search locations..." />
      <CommandList
        className={cn(
          "*:*:first:hidden max-h-none",
          !mounted && "pointer-events-none opacity-50"
        )}
      >
        {Object.entries(groupedLocations).map(([type, locations]) => {
          if (locations.length === 0) return null

          const groupName = labelMappings[type as LocationType] // type cast because entries types keys as `string`

          return (
            <React.Fragment key={type}>
              <CommandSeparator className="mt-1" />
              <CommandGroup heading={groupName} className="**:[[cmdk-group-items]]:space-y-1.5 **:[[cmdk-group-heading]]:px-0 **:[[cmdk-group-heading]]:-mx-1">
                {locations.map(location => (
                  <CommandItemLocation key={location.id} value={location.name} asChild>
                    <LocationItem location={location} />
                  </CommandItemLocation>
                ))}
              </CommandGroup >
            </React.Fragment>
          );
        })}
        {mounted && <CommandEmpty>No results found.</CommandEmpty>}
      </CommandList>
    </Command >
  );
}


function LocationItem({ location }: { location: LocationModel }) {
  const { romHackSlug } = useLocationList()
  return (
    <Item size="sm" variant="outline" className="focus-visible:bg-border/30 focus-visible:ring"
      render={
        <Link
          to="/rom-hacks/$romHackSlug/$locationSlug"
          params={{ romHackSlug, locationSlug: location.slug }}
        >
          <ItemMedia variant="icon" className="text-muted-foreground">
            <LocationTypeIcon type={location.type} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{location.name}</ItemTitle>
          </ItemContent>
        </Link>
      }
    />
  );
}

function LocationTypeIcon({ type }: Pick<LocationModel, "type">) {
  switch (type) {
    case "CITY":
      return <IconBuildings />
    case "ROUTE":
      return <IconRouteSquare />
    case "CAVE":
      return <IconTheater />
    case "BUILDING":
      return <IconBuilding />
    case "OTHER":
      return <IconMap />
    default:
      return null
  }
}

export { LocationsList }
