// copied from: https://github.com/vercel/next.js/discussions/74685#discussioncomment-11803529

import { useRouter } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import { useEncounterList } from "./EncounterListProvider"


function BackButton({ ...rest }: React.ComponentProps<typeof Button>) {
  const { location } = useEncounterList()
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(window.history.length > 1)
  }, [])

  const handleBack = useCallback(() => {
    if (canGoBack) {
      router.history.back()
    } else {
      router.navigate({
        to: "/rom-hacks/$romHackSlug",
        params: { romHackSlug: location.romHack.slug }
      })
    }
  }, [canGoBack, router])

  return (
    <Button onClick={handleBack} {...rest} />
  )
}

export {
  BackButton
}
