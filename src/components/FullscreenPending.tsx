import { Spinner } from "@/components/ui/spinner"

function FullScreenPending() {
  return (
    <div className="size-full grid place-items-center">
      <Spinner className="size-6" />
    </div>
  )
}

export {
  FullScreenPending
}
