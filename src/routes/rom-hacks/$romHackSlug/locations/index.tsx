import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start"
// import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions"

import { IconSlash } from "@tabler/icons-react"

import { BackButton } from "@/components/BackButton"

import { LocationsList } from "./-components/LocationList"
import { LocationListProvider } from "./-components/LocationListProvider"
import { findRomHackWithLocationsBySlug, RomHackSlug } from "./-index.functions"


// Route
const Route = createFileRoute('/rom-hacks/$romHackSlug/locations/')({
  loader: async ({ params: { romHackSlug } }) => {
    return await getRomHackWithLocationsBySlug({ data: { slug: romHackSlug } })
  },
  component: RouteComponent,
  notFoundComponent: NotFound,
})

// server function
const getRomHackWithLocationsBySlug = createServerFn({ method: 'GET', })
  .inputValidator((data: RomHackSlug) => data)
  // .middleware([staticFunctionMiddleware])
  .handler(({ data: { slug } }) => {
    return findRomHackWithLocationsBySlug({ slug })
  })

// main component(s)
function RouteComponent() {
  const romHackWithLocations = Route.useLoaderData()

  if (!romHackWithLocations) return <NotFound />

  return (
    <div className="max-h-full flex flex-col gap-y-4" data-maxscreenheight>
      <div className="flex gap-2 items-center">
        <BackButton
          fallbackNav={{
            to: "/rom-hacks/$romHackSlug",
            params: { romHackSlug: romHackWithLocations.slug }
          }}
        />

        <div className="flex gap-1 items-center text-lg">
          <h1>{romHackWithLocations.name}</h1>
          <IconSlash className="size-5 text-muted-foreground" />
          <h2>locations</h2>
        </div>
      </div>

      <LocationListProvider value={{ romHackSlug: romHackWithLocations.slug }}>
        <LocationsList groupedLocations={romHackWithLocations.locations} />
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

