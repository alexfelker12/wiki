import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from "@tanstack/react-start";

import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";

import { findRomHackBySlug } from "./-index.functions";


export const Route = createFileRoute('/rom-hacks/$romHackSlug/')({
  loader: async ({ params: { romHackSlug } }) => {
    return await getRomHackBySlug({ data: { slug: romHackSlug } })
  },
  component: RouteComponent,
})

// server function
const getRomHackBySlug = createServerFn({ method: 'GET', })
  .inputValidator((data: { slug: string }) => data)
  // .middleware([staticFunctionMiddleware])
  .handler(({ data: { slug } }) => {
    return findRomHackBySlug({ slug })
  })

function RouteComponent() {
  const romHack = Route.useLoaderData()

  if (!romHack) return null

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <BackButton fallbackNav={{ to: "/rom-hacks" }} />
        <h1 className="text-xl">{romHack.name}</h1>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          nativeButton={false}
          render={
            <Link
              to="/rom-hacks/$romHackSlug/locations"
              params={{ romHackSlug: romHack.slug }}
            >
              Locations
            </Link>
          }
        />
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          nativeButton={false}
          render={
            <Link
              to="/rom-hacks/$romHackSlug/pokemons"
              params={{ romHackSlug: romHack.slug }}
            >
              Pokémons
            </Link>
          }
        />
      </div>

    </div>
  );
}
