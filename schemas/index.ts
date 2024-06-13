import z from "zod";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

//signUp Schema 
export const RegistrationSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(12)
})

//conversation schema 
export const ConversationSchema = z.object({
  message: z.string().min(1, {
    message: "Required Field"
  })
})


export const ImageSchema = z.object({
  message: z.string().min(1, {
    message: "Required for Image Generation",
  }),
  numberOfImages: z.number().int().gte(1).lte(5),
  resolution: z.string().min(1, {
    message: "Resolutions is required",
  }),
})


//const values
export const sideBarRoutes = [
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

export const dashBoadRoutes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-green-800",
    bgcolor: "bg-green-200/50",
  },
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

export const amountOfPhotos = [
  {
    label: "1 Photo",
    value: 1
  },
  {
    label: "2 Photos",
    value: 2,
  },
  {
    label: "3 Photos",
    value: 3,
  },
  {
    label: "4 Photos",
    value: 4,
  },
  {
    label: "5 Photos",
    value: 5,
  }
]

export const resolutions = [
  {
    label: "256x256",
    value: "256x256",
  },
  {
    label: "512x512",
    value: "512x512",
  },
  {
    label: "1024x1024",
    value: "1024x1024",
  },
]
