import { WildEncounterModel } from "generated/prisma/models"

import { IconBrandHeadlessui, IconClipboard, IconFishHook, IconRipple, IconWalk, IconWreckingBall, IconZoomExclamation } from "@tabler/icons-react"

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

import { FindLocationBySlugReturn } from "../-index.functions"
import { useEncounterList } from "./EncounterListProvider"
import { Button } from "@/components/ui/button"
import { BackButton } from "./BackButton"


function EncounterList() {
  const { location } = useEncounterList()

  // const [mounted, setMounted] = useState(false)
  // useEffect(() => { setMounted(true) }, [])

  if (!location.wildEncounters.length) return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconZoomExclamation />
        </EmptyMedia>
        <EmptyTitle>Nothing here</EmptyTitle>
        <EmptyDescription>There are no wild encounters in this location</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <BackButton>Go to Listing</BackButton>
      </EmptyContent>
    </Empty>
  );

  const sortedEncounters = location.wildEncounters.sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name))

  return (
    <div className="space-y-1.5">
      {sortedEncounters.map(encounter => (
        <EncounterItem key={encounter.id} encounter={encounter} />
      ))}
    </div>
  );
}


function EncounterItem({ encounter }: { encounter: FindLocationBySlugReturn["wildEncounters"][number] }) {
  return (
    <Item variant="muted" size="xs">
      <ItemMedia variant="icon" className="text-muted-foreground">
        <EncounterMethodIcon method={encounter.method} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{encounter.pokemon.name}</ItemTitle>
        <ItemDescription>
          <span>
            {encounter.method} - {encounter.rate}%
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="xs"
          render={
            <a href={`https://pokewiki.de/${encounter.pokemon.name}`}>
              Go to Wiki
            </a>
          }
          nativeButton={false}
        />
      </ItemActions>
    </Item>
  );
}

function EncounterMethodIcon({ method }: Pick<WildEncounterModel, "method">) {
  switch (method) {
    case "WALK":
      return <IconWalk />
    case "SURF":
      return <IconRipple />
    case "OLD_ROD":
    case "GOOD_ROD":
    case "SUPER_ROD":
      return <IconFishHook />
    case "HEADBUTT":
      return <IconBrandHeadlessui />
    case "ROCK_SMASH":
      return <IconWreckingBall />
    case "OTHER":
      return <IconClipboard />
    default:
      return null
  }
}

export { EncounterList }

