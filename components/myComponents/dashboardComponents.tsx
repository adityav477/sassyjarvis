import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardComponents({ label, href }: {
  label: string,
  href: string,
}) {
  return (
    <Link href={href} className="w-full flex items-center justify-between gap-x-2"
    >
      <div className="font-semibold text-md">
        {label}
      </div>
      <div>
        <ArrowRight />
      </div>
    </Link>

  )
}
