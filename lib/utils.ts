import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
/** Merge Tailwind classes safely (shadcn convention). */
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
