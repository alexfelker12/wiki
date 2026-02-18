import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rom-hacks/$romHackSlug/$locationSlug/')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return (
    <div className="space-y-2">
      <p>romHack slug: {params.romHackSlug}</p>
      <p>location slug: {params.locationSlug}</p>
    </div>
  );
}
