import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start"
// import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions"

import { BackButton } from "@/components/BackButton"

import { findLocationBySlug, SlugsObj } from "./-index.functions"
import { EncounterListProvider } from "./-components/EncounterListProvider"
import { EncounterList } from "./-components/EncounterList"


// Route
const Route = createFileRoute('/rom-hacks/$romHackSlug/locations/$locationSlug/')({
  loader: async ({ params }) => await getLocationBySlug({ data: params }),
  component: RouteComponent,
  notFoundComponent: NotFound,
})

// server function
const getLocationBySlug = createServerFn({ method: 'GET', })
  .inputValidator((data: SlugsObj) => data)
  // .middleware([staticFunctionMiddleware])
  .handler(({ data }) => {
    return findLocationBySlug(data)
  })

// main component(s)
function RouteComponent() {
  const location = Route.useLoaderData()

  if (!location) return <NotFound />

  return (
    <div className="space-y-3 -mt-4">
      <div className="flex gap-2 items-center sticky top-0 bg-background pb-1 pt-4 z-10">
        <BackButton
          fallbackNav={{
            to: "/rom-hacks/$romHackSlug/locations",
            params: { romHackSlug: location.romHack.slug }
          }}
        />
        <h1 className="text-xl">{location.name} encounters</h1>
      </div>

      <EncounterListProvider value={{ location: location }}>
        <EncounterList />
      </EncounterListProvider>
    </div>
  );
}

function NotFound() {
  return (
    <div>Location was not found</div>
  );
}

export {
  Route
}
