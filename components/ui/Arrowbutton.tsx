import Link from "next/link";
import type { ReactNode } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { cn } from "@/lib/utils";

type ArrowButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function ArrowButton({
  href,
  children,
  variant = "primary",
  className,
}: ArrowButtonProps) {
  return (
    <Link href={href} className={cn("btn btn-arrow", `btn-${variant}`, className)}>
      {/* Left arrow: appears on hover */}
      <span className="btn-arrow__icon btn-arrow__icon--in" aria-hidden="true">
        <IoIosArrowRoundForward size={22} />
      </span>

      <span>{children}</span>

      {/* Right arrow: disappears on hover */}
      <span className="btn-arrow__icon btn-arrow__icon--out" aria-hidden="true">
        <IoIosArrowRoundForward size={22} />
      </span>
    </Link>
  );
}