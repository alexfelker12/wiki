import { createFileRoute } from '@tanstack/react-router'
import { PokemonClient } from 'pokenode-ts';


export const Route = createFileRoute('/test-route/')({
  component: RouteComponent,
  loader: async () => {
    const api = new PokemonClient()

    const res = await api.getPokemonByName("ralts")
    return res
  }
})

function RouteComponent() {

  const data = Route.useLoaderData()

  return (
    <pre className="text-sm">{JSON.stringify(data.game_indices, null, 2)}</pre>
  );
}
