"use client"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

export default function LogOutServer() {
  return (
    <Button className="bg-slate-400" onClick={() => signOut()}>
      LogOut
    </Button>
  )
}
