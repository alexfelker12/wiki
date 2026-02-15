import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/lib/db";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => await getData()
})

const getTestData = async () => {
  return db.test.findMany()
}

const getData = createServerFn({
  method: 'GET',
}).handler(() => {
  return getTestData()
})

function App() {
  const testData = Route.useLoaderData()

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
          <ul>
            {testData.map(data => (
              <li key={data.id}>{data.value}</li>
            ))}
          </ul>
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