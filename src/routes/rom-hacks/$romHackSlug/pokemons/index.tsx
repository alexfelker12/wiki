import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from "react";

import { BackButton } from "@/components/BackButton";

import { PokemonResultList } from "./-components/PokemonResultList";
import { PokemonSearchInput } from "./-components/PokemonSearchInput";
import { PokemonSearchProvider } from "./-components/PokemonSearchProvider";


export const Route = createFileRoute('/rom-hacks/$romHackSlug/pokemons/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { romHackSlug } = Route.useParams()

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

      <div className="overflow-y-auto w-[calc(100%+calc(var(--spacing)*2))] -mx-1 px-1 -mt-1">
        <PokemonSearch romHackSlug={romHackSlug} />
      </div>
    </div>
  );
}

function PokemonSearch({ romHackSlug }: { romHackSlug: string }) {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <PokemonSearchProvider value={{ search, setSearch, romHackSlug, inputRef }}>
      <PokemonSearchInput />
      <PokemonResultList />
    </PokemonSearchProvider>
  );
}
