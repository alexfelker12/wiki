import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from '@tanstack/react-router'


export const Route = createFileRoute('/rom-hacks/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h1 className="text-xl">ROM Hacks</h1>
        {/* <p className="text-muted-foreground"></p> */}
      </div>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
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
  );
}
