import { auth, signOut } from "@/auth"
import DashboardComponents from "@/components/myComponents/dashboardComponents";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const routes = [
  //   {
  //   label: "Dashboard",
  //   href: "/dashboard",
  //   icon: LayoutDashboard,
  //   color: "text-green-800",
  //   bgcolor: "bg-green-200/50",
  // },
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-red-800",
    bgcolor: "bg-red-200/50",
  },
  {
    label: "Image Generation",
    href: "/imagegeneration",
    icon: ImageIcon,
    color: "text-violet-800",
    bgcolor: "bg-violet-200/50",
  },
  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-yellow-800",
    bgcolor: "bg-yellow-200/50",
  },
  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-orange-800",
    bgcolor: "bg-orange-200/50",
  },
  {
    label: "Code Generation",
    href: "/codegeneration",
    icon: Code,
    color: "text-blue-800",
    bgcolor: "bg-blue-200/50",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-sky-800",
    bgcolor: "bg-sky-200/50",
  },
]

export default async function Dashboard() {
  // const {data: session } = useSession();

  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-3xl font-bold md:text-2xl md:font-bold">
          Boldest AI Ever
        </div>
        <div className="text-md">
          {"Be Bold Be Brave"}
        </div>
      </div>
      <div className="h-full w-full flex flex-col justify-center items-center gap-4 mt-10">
        {
          routes.map((route) => (
            <Card key={route.href}
              className="flex justify-between items-center min-w-96 md:w-72 transition cursor-pointer p-2 gap-x-4 hover:shadow-md border-black/5"
            >
              <div className={cn("w-fit p-2 rounded-lg", route.bgcolor)}>
                <route.icon className={cn("h-6 w-6", route.color)} />
              </div>
              <DashboardComponents label={route.label} href={route.href} />
            </Card>
          ))
        }
      </div>
    </div >
  )

}
