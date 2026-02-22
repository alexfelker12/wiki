import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start"
// import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions"

import { LocationsList } from "./-components/LocationList"
import { findRomHackBySlug, RomHackSlug } from "./-index.functions"
import { LocationListProvider } from "./-components/LocationListProvider"


// Route
const Route = createFileRoute('/rom-hacks/$romHackSlug/')({
  loader: async ({ params: { romHackSlug } }) => {
    return await getRomHackBySlug({ data: { slug: romHackSlug } })
  },
  // loader: async ({ params }) => {
  //   console.log("slug:", params.romHackSlug)
  //   return { name: "test", slug: params.romHackSlug, locations: [] }
  // },
  component: RouteComponent,
  notFoundComponent: NotFound,
})

// server function
const getRomHackBySlug = createServerFn({ method: 'GET', })
  .inputValidator((data: RomHackSlug) => data)
  // .middleware([staticFunctionMiddleware])
  .handler(({ data: { slug } }) => {
    return findRomHackBySlug({ slug })
  })

// main component(s)
function RouteComponent() {
  const romHack = Route.useLoaderData()

  if (!romHack) return <NotFound />

  return (
    <LocationListProvider value={{ romHackSlug: romHack.slug }}>
      <div className="max-h-full flex flex-col gap-y-4" data-maxscreenheight>
        <h1 className="text-xl">{romHack.name}</h1>
        <LocationsList groupedLocations={romHack.locations} />
      </div>
    </LocationListProvider>
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
