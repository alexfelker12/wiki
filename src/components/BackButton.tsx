// copied from: https://github.com/vercel/next.js/discussions/74685#discussioncomment-11803529
//? addepted to own use case and usability

import { type NavigateOptions, useRouter } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"

import { IconArrowLeft } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"


function BackButton({
  size,
  variant = "secondary",
  children,
  fallbackNav,
  ...rest
}: React.ComponentProps<typeof Button> & {
  fallbackNav: NavigateOptions
}) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(window.history.length > 1)
  }, [])

  const handleBack = useCallback(() => {
    if (canGoBack) {
      router.history.back()
    } else {
      router.navigate(fallbackNav)
    }
  }, [canGoBack, router])

  return (
    <Button
      size={size || (!children ? "icon-sm" : "sm")}
      variant={variant}
      onClick={handleBack}
      {...rest}
    >
      <IconArrowLeft /> {children}
    </Button>
  )
}

export {
  BackButton
}
