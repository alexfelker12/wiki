import { createContext, use } from 'react';

//* ------------------ Context ------------------
export interface LocationListContextValue {
  romHackSlug: string
}
const LocationListContext = createContext<LocationListContextValue | undefined>(undefined)

export function useLocationList() {
  const ctx = use(LocationListContext)
  if (!ctx) throw new Error("useLocationList must be used within LocationListProvider")
  return ctx
}

//* ------------------ Provider ------------------
export function LocationListProvider({
  children,
  ...contextValues
}: LocationListContextValue & {
  children: React.ReactNode
}) {
  return (
    <LocationListContext.Provider value={contextValues}>
      {children}
    </LocationListContext.Provider>
  )
}
