import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'

import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from "@cloudflare/vite-plugin";


const config = defineConfig(({ mode }) => ({
  plugins: [
    devtools(),
    tailwindcss(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    mode === "production" && cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      prerender: {
        enabled: false,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
        autoSubfolderIndex: true,
      },
    }),
    viteReact(),
  ].filter(Boolean),
}))

export default config
