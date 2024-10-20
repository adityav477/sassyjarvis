import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBarComponent from "../sidebarComponent";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" size={30} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SideBarComponent />
        <SheetClose className="bg-white text-white">
          <button className="bg-blue-50">X</button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}
