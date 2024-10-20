import { LoaderCircle } from "lucide-react"

export default function LoaderButton() {
  return (
    <>
      <div className="animate-spin px-2">
        <LoaderCircle />
      </div>
      <div className="text-sm font-semibold">
        Loading...
      </div>
    </>
  )
}
