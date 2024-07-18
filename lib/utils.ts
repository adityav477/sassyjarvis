import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absolutePath ({url}: {url:string}){
  return  `${process.env.NEXT_PUBLIC_ROUTE}${url}`
}
