import { IconChevronDown } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Item, ItemContent, ItemDescription, ItemFooter, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";

import { usePokemonResult } from "./PokemonResultProvider";


function PokemonResultItem() {
  const { pokemonResult } = usePokemonResult()

  const obtainMethodCount = pokemonResult.obtainMethods.length
  const obtainMethodCountPart = `${obtainMethodCount} obtain method${obtainMethodCount === 1 ? "" : "s"}`
  const wildEncounterCount = pokemonResult.wildEncounters.length
  const wildEncounterCountPart = `${wildEncounterCount} wild encounters${wildEncounterCount === 1 ? "" : "s"}`

  return (
    <Collapsible>
      <Item variant="muted" size="xs">
        <CollapsibleTrigger className="w-full group/item-trigger">
          <div className="flex gap-2 items-center">
            <ItemContent className="h-10.5">
              <ItemTitle className="text-base transition-transform group-data-panel-open/item-trigger:translate-y-2.25">
                {pokemonResult.name}
              </ItemTitle>
              <ItemDescription className="transition-opacity group-data-panel-open/item-trigger:opacity-0">
                {`${obtainMethodCountPart}, ${wildEncounterCountPart}`}
              </ItemDescription>
            </ItemContent>
            <IconChevronDown className="chev-icon text-muted-foreground transition-transform group-data-panel-open/item-trigger:-rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="w-full space-y-2">
          <Separator className="w-full" />
          <ItemFooter className="flex-col items-start">
            <ObtainMethods />
            <WildEncounters />
            <Button
              size="xs"
              variant="outline"
              className="self-end"
              render={<a href={`https://pokewiki.de/${pokemonResult.name}`}>Go to Wiki</a>}
              nativeButton={false}
            />
          </ItemFooter>
        </CollapsibleContent>
      </Item>
    </Collapsible>
  );
}

function ObtainMethods() {
  const { pokemonResult } = usePokemonResult()

  return (
    <div className="space-y-2 rounded-md p-2 border border-solid w-full">
      <h4>Obtain methods:</h4>
      <pre className="text-xs">
        {JSON.stringify(pokemonResult.obtainMethods, null, 2)}
      </pre>
    </div>
  );
}

function WildEncounters() {
  const { pokemonResult } = usePokemonResult()

  return (
    <div className="space-y-2 rounded-md p-2 border border-solid w-full">
      <h4>Wild encounters:</h4>
      <pre className="text-xs">
        {JSON.stringify(pokemonResult.wildEncounters, null, 2)}
      </pre>
    </div>
  );
}

export { PokemonResultItem };
