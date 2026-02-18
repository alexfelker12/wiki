import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from '@tanstack/react-router'


export const Route = createFileRoute('/rom-hacks/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-2">
      <h1>ROM Hacks</h1>
      <div>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={
            <Link
              to="/rom-hacks/$romHackSlug"
              params={{ romHackSlug: "theta-emerald-ex" }}
            >
              Theta Emerald EX
            </Link>
          }
        />
      </div>
    </div>
  );
}
