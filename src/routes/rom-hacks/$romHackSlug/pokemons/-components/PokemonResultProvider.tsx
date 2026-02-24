import { createContext, use } from 'react';
import { FindPokemonByNameReturn } from "../-index.functions";

//* ------------------ Context ------------------
interface PokemonResultContextValue {
  pokemonResult: FindPokemonByNameReturn[0]
}
const PokemonResultContext = createContext<PokemonResultContextValue | undefined>(undefined)

function usePokemonResult() {
  const ctx = use(PokemonResultContext)
  if (!ctx) throw new Error("usePokemonResult must be used within PokemonResultProvider")
  return ctx
}

//* ------------------ Provider ------------------
function PokemonResultProvider(props: React.ComponentProps<typeof PokemonResultContext.Provider>) {
  return <PokemonResultContext.Provider {...props} />
}

//* ------------------ Exports ------------------
export {
  type PokemonResultContextValue,
  usePokemonResult,
  PokemonResultProvider
};
