import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start"

import { LocationsList } from "./-components/LocationList"
import { findRomHackBySlug, RomHackSlug } from "./-index.functions"
import { LocationListProvider } from "./-components/LocationListProvider"


// Route
const Route = createFileRoute('/rom-hacks/$romHackSlug/')({
  loader: async ({ params: { romHackSlug } }) => {
    return await getRomHackBySlug({ data: { slug: romHackSlug } })
  },
  component: RouteComponent,
  notFoundComponent: NotFound,
})

// server function
const getRomHackBySlug = createServerFn({ method: 'GET', })
  .inputValidator((data: RomHackSlug) => data)
  .handler(({ data: { slug } }) => {
    return findRomHackBySlug({ slug })
  })

// main component(s)
function RouteComponent() {
  const romHack = Route.useLoaderData()

  if (!romHack) return <NotFound />

  return (
    <div className="max-h-full flex flex-col gap-y-4" data-maxscreenheight>
      <h1 className="text-xl">{romHack.name}</h1>
      <LocationListProvider value={{ romHackSlug: romHack.slug }}>
        <LocationsList groupedLocations={romHack.locations} />
      </LocationListProvider>
    </div>
  );
}

function NotFound() {
  return (
    <div>ROM-Hack was not found</div>
  );
}

export {
  Route
}
