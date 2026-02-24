import { QueryClient } from "@tanstack/react-query"
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import { DefaultNotFound } from "./components/DefaultNotFound"
import { FullScreenPending } from "./components/FullscreenPending"


// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient()

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultNotFoundComponent: DefaultNotFound,
    defaultPendingComponent: FullScreenPending
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
