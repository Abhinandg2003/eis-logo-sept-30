import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn-style Button. Use asChild to render a <Link> with button styles.
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  {
    variants: {
      variant: {
        brand: "bg-brand text-white hover:bg-brand-ink",
        dark: "bg-neutral-900 text-white hover:bg-neutral-700",
        outline: " bg-[var(--color-brand)]/10 text-black hover:bg-[var(--color-brand)]/15",
      },
      size: { sm: "h-9 px-4 text-sm ", md: "h-11 px-6 text-sm sm:text-base font-light", nav:"h-10 px-6 py-4 text-[14px] sm:text-[14px] font-light" },
    },
    defaultVariants: { variant: "brand", size: "md" },
  },
);

type Props = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
