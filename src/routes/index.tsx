import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { IconBinoculars } from "@tabler/icons-react";


export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h1 className="text-2xl">ROM-Hack wiki</h1>
        <p className="text-muted-foreground">Find Information about different ROM-Hacks here</p>
      </div>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        nativeButton={false}
        render={
          <Link to="/rom-hacks">Explore ROM-Hacks <IconBinoculars className="size-5" /></Link>
        }
      />
    </div>
  );
}