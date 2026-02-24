import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { IconSearchOff } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
// import { Skeleton } from "@/components/ui/skeleton";

import { findPokemonByName } from "../-index.functions";

import { PokemonResultItem } from "./PokemonResultItem";
import { PokemonResultProvider } from "./PokemonResultProvider";
import { usePokemonSearch } from "./PokemonSearchProvider";


// server function
const getPokemonByName = createServerFn({ method: 'GET' })
  .inputValidator((data: string) => data)
  .handler(({ data: name }) => {
    return findPokemonByName({ name })
  })

function PokemonResultList() {
  const { romHackSlug, search } = usePokemonSearch()

  //* search pokemon by name
  const { data, isFetching } = useQuery({
    queryKey: [romHackSlug, "pokemon", "search", search],
    queryFn: () => getPokemonByName({ data: search }),
    enabled: search.length > 2,
    staleTime: 1000 * 60 * 60 // stale after 1h 
  })

  if (!data && !isFetching) return <PokemonNoInitialData />
  if (!data && isFetching) return <PokemonResultsFetching />

  //* search has no results - rendering empty component
  if (data && data.length === 0) return <PokemonNoResults />

  //* search has results - rendering list
  return (
    <div>
      <div className="text-muted-foreground sticky top-11 pb-1 bg-background italic z-10">
        Results for <span className="text-foreground">{search}</span>:
      </div>
      <div className="space-y-1.5 overflow-x-hidden overflow-y-auto no-scrollbar">
        {data && data.map(pokemonResult => (
          <PokemonResultProvider value={{ pokemonResult }} key={pokemonResult.id}>
            <PokemonResultItem />
          </PokemonResultProvider>
        ))}
      </div>
    </div>
  );
}

function PokemonNoInitialData() {
  return (
    <Empty className="border border-solid">
      <EmptyHeader>
        <EmptyTitle className="text-base tracking-normal">Find Pokémons by name here</EmptyTitle>
        <EmptyDescription>To search, type at least 3 characters. Start by typing the name or the characters the name starts with</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function PokemonResultsFetching() {
  return (
    <div className="w-full h-32 grid place-items-center">
      <Spinner className="size-5" />
    </div>
  );
  // return (
  //   <div className="space-y-1.5">
  //     {Array.from({ length: 3 }).map((_, idx) => (
  //       <Skeleton key={idx} className="w-full h-15" />
  //     ))}
  //   </div>
  // );
}

function PokemonNoResults() {
  const { search, setSearch } = usePokemonSearch()

  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconSearchOff />
        </EmptyMedia>
        <EmptyTitle>`{search}` does not exist</EmptyTitle>
        <EmptyDescription>No Pokémon with that name or starting with that name could be found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={() => setSearch("")}>Clear search</Button>
      </EmptyContent>
    </Empty>
  );
}

export { PokemonResultList };
