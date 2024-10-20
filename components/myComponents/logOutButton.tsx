"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
import LoaderButton from "./LoaderButton";

export default function LogOutServer() {
  const [loading, setIsLoading] = useState(false);

  return (
    <Button variant="default" className="bg-slate-500 rounded-lg w-full" onClick={() => {
      setIsLoading(prevValue => !prevValue)
      signOut()
    }}>
      {
        loading ?
          <LoaderButton /> :
          <span>LogOut</span>
      }
    </Button>
  )
}
