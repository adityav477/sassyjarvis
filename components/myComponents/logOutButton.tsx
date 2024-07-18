"use client"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

export default function LogOutServer() {
  return (
    <Button variant="default" className="bg-slate-500" onClick={() => signOut()}>
      LogOut
    </Button>
  )
}
