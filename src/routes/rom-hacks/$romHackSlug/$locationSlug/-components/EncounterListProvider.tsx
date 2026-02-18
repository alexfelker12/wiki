import { createContext, use } from 'react';
import { FindLocationBySlugReturn } from "../-index.functions";

//* ------------------ Context ------------------
export interface EncounterListContextValue {
  location: FindLocationBySlugReturn
}
const EncounterListContext = createContext<EncounterListContextValue | undefined>(undefined)

export function useEncounterList() {
  const ctx = use(EncounterListContext)
  if (!ctx) throw new Error("useEncounterList must be used within EncounterListProvider")
  return ctx
}

//* ------------------ Provider ------------------
export function EncounterListProvider(props: React.ComponentProps<typeof EncounterListContext.Provider>) {
  return (
    <EncounterListContext.Provider {...props} />
  )
}
