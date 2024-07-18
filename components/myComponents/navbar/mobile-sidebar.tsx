import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBarComponent from "../sidebarComponent";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SideBarComponent />
      </SheetContent>
    </Sheet>
  )
}
