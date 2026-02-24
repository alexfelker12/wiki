import { useState } from "react"

import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start"

import { IconSearch } from "@tabler/icons-react"

import { BackButton } from "@/components/BackButton"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

import { findPokemonByName } from "./-index.functions"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemFooter, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { ObtainMethodModel, WildEncounterModel } from "generated/prisma/models"


export const Route = createFileRoute('/rom-hacks/$romHackSlug/pokemons/')({
  component: RouteComponent,
})

// server function
const getPokemonByName = createServerFn({ method: 'GET' })
  .inputValidator((data: string) => data)
  // .middleware([staticFunctionMiddleware])
  .handler(({ data: name }) => {
    return findPokemonByName({ name })
  })


function RouteComponent() {
  const { romHackSlug } = Route.useParams()

  const [pokemonName, setPokemonName] = useState('')
  const [searchActive, setSearchActive] = useState(false)

  const { data } = useQuery({
    queryKey: ["pokemon", "search", pokemonName],
    queryFn: () => getPokemonByName({ data: pokemonName }),
    enabled: searchActive
  })

  return (
    <div className="max-h-full flex flex-col gap-y-4" data-maxscreenheight>
      <div className="flex gap-2 items-center">
        <BackButton
          fallbackNav={{
            to: "/rom-hacks/$romHackSlug",
            params: { romHackSlug }
          }}
        />

        <div className="flex gap-1 items-center text-lg">
          <h1>Search Pokémons</h1>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()

          console.log("searching pokemon...")
          setSearchActive(true)
        }}
      >
        <ButtonGroup className="w-full">
          <InputGroup className="border-input/30 h-8! text-muted-foreground">
            <InputGroupInput
              placeholder="Type to search..."
              className="text-sm text-popover-foreground"
              value={pokemonName}
              onInput={(e) => {
                setPokemonName(e.currentTarget.value)
                if (searchActive) setSearchActive(false)
              }}
            />
            <InputGroupAddon align="inline-start" className="text-muted-foreground">
              <IconSearch className="opacity-50" />
            </InputGroupAddon>
          </InputGroup>
          <Button aria-label="Search" type="submit">Search</Button>
        </ButtonGroup>
      </form>

      <div className="space-y-1.5 overflow-x-hidden overflow-y-auto no-scrollbar">
        {!data || data.length === 0
          ? <span>no data</span>
          : data.map(pokemon => (
            <Collapsible key={pokemon.id}>
              <Item variant="muted" size="xs">
                <CollapsibleTrigger className="w-full">
                  <ItemContent>
                    <ItemTitle className="text-base">{pokemon.name}</ItemTitle>
                    {/* <ItemDescription>some text</ItemDescription> */}
                  </ItemContent>
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full space-y-2">
                  <Separator className="w-full" />
                  <ItemFooter className="flex-col items-start">
                    {/* <ObtainMethods methods={pokemon.obtainMethods} />
                    <WildEncounters encounters={pokemon.wildEncounters} /> */}
                    <Button
                      size="xs"
                      variant="outline"
                      className="self-end"
                      render={
                        <a href={`https://pokewiki.de/${pokemon.name}`}>
                          Go to Wiki
                        </a>
                      }
                      nativeButton={false}
                    />
                  </ItemFooter>
                </CollapsibleContent>
              </Item>
            </Collapsible>
          ))
        }
      </div>

    </div>
  );
}


function ObtainMethods({ methods }: { methods: ObtainMethodModel[] }) {
  return (
    <div>ObtainMethods</div>
  );
}

function WildEncounters({ encounters }: { encounters: WildEncounterModel[] }) {
  return (
    <div>WildEncounters</div>
  );
}
