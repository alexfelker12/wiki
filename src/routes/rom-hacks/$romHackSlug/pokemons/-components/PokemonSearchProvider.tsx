import { createContext, use } from "react";

//* ------------------ Context ------------------
interface PokemonSearchContextValue {
  search: string
  setSearch: (search: string) => void
  input: string
  setInput: (input: string) => void
  romHackSlug: string
  inputRef: React.RefObject<HTMLInputElement | null>
}
const PokemonSearchContext = createContext<PokemonSearchContextValue | undefined>(undefined)

function usePokemonSearch() {
  const ctx = use(PokemonSearchContext)
  if (!ctx) throw new Error("usePokemonSearch must be used within PokemonSearchProvider")
  return ctx
}

//* ------------------ Provider ------------------
function PokemonSearchProvider(props: React.ComponentProps<typeof PokemonSearchContext.Provider>) {
  return <PokemonSearchContext.Provider {...props} />
}

//* ------------------ Exports ------------------
export {
  type PokemonSearchContextValue,
  usePokemonSearch,
  PokemonSearchProvider,
};
