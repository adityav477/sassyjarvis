"use client"
import { cn } from "@/lib/utils"
import { Brain, Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import FreeTier from "./freeTier"

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-green-200",
  },
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-red-200"
  },
  {
    label: "Image Generation",
    href: "/imagegeneration",
    icon: ImageIcon,
    color: "text-violet-300",
  },
  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-yellow-300",
  },
  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-orange-300",
  },
  {
    label: "Code Generation",
    href: "/codegeneration",
    icon: Code,
    color: "text-blue-300",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-sky-300",
  },
]
export default function SideBarComponent() {
  const pathname = usePathname();
  return (
    <div className="bg-slate-800 h-full flex flex-col justify-between text-white">
      <div>
        <Link href="/dashboard" className="bg-black">
          <div className="flex items-center justify-center gap-1 py-2 " >
            <Brain />
            <h1 className="relative bg-clip-text text-transparent font-semibold text-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Sassy
            </h1>
          </div>
        </Link>

        <div className="mt-8 space-y-1">
          {routes.map((route) => (
            <div className={cn("text-sm cursor-pointer transition hover:bg-white/10 rounded-lg p-2", route.href === pathname && "bg-white/10")}
              key={route.href}
            >
              <Link className="w-full" href={route.href} key={route.href} >
                <div className={cn("flex text-center gap-2", pathname === route.href ? "text-zinc-200/50" : "text-white")}>
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  <div className="text-white">
                    {route.label}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div >

      <div className="text-center mb-8">
        <FreeTier />
      </div>
    </div >
  )
}
