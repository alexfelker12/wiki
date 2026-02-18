import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start"

import { IconArrowLeft } from "@tabler/icons-react"

import { Spinner } from "@/components/ui/spinner"

import { findLocationBySlug, SlugsObj } from "./-index.functions"
import { EncounterListProvider } from "./-components/EncounterListProvider"
import { EncounterList } from "./-components/EncounterList"
import { BackButton } from "./-components/BackButton"


// Route
const Route = createFileRoute('/rom-hacks/$romHackSlug/$locationSlug/')({
  loader: async ({ params }) => await getLocationBySlug({ data: params }),
  component: RouteComponent,
  pendingComponent: PendingComponent,
  notFoundComponent: NotFound,
})

// server function
const getLocationBySlug = createServerFn({ method: 'GET', })
  .inputValidator((data: SlugsObj) => data)
  .handler(({ data }) => {
    return findLocationBySlug(data)
  })

// main component(s)
function RouteComponent() {
  const location = Route.useLoaderData()

  if (!location) return <NotFound />

  return (
    <EncounterListProvider value={{ location: location }}>
      <div className="space-y-3 -mt-4">
        <div className="flex gap-2 items-center sticky top-0 bg-background pb-1 pt-4 z-10">
          <BackButton size="icon-sm" variant="secondary" ><IconArrowLeft /></BackButton>
          <h1 className="text-xl">{location.name} encounters</h1>
        </div>

        <EncounterList />
      </div>
    </EncounterListProvider>
  );
}

function PendingComponent() {
  return (
    <div className="size-full grid place-items-center">
      <Spinner className="size-6" />
    </div>
  )
}

function NotFound() {
  return (
    <div>Location was not found</div>
  );
}

export {
  Route
}
