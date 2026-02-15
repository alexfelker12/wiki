import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="p-4">
      <Card size="sm" className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Boilerplate Card</CardTitle>
          <CardDescription>
            Some random description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Some more random text content to see the Card component in use
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Click
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}