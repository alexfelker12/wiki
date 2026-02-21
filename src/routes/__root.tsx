import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import manifest from '/manifest.json?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ROM-Hack wiki',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'manifest',
        href: manifest,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full min-h-full">
      <head>
        <HeadContent />
      </head>
      <body className="grid grid-rows-[auto_1fr_auto] *:[main,header,footer]:w-full h-full antialiased">
        <header></header>
        <main className="p-4 has-data-maxscreenheight:overflow-y-hidden">
          {children}
        </main>
        <footer className="p-2 pt-0.5 border-t border-t-muted-foreground/50 bg-card">
          <a className="underline underline-offset-4 text-sm text-muted-foreground" href="https://www.flaticon.com/free-icons/wiki" title="wiki icons">Wiki icons created by Freepik - Flaticon</a>
        </footer>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
