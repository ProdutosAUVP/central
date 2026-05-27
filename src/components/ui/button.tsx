import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-sora uppercase rounded-[5px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary hover:bg-transparent hover:text-primary hover:border-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary hover:bg-transparent hover:text-secondary hover:border-secondary dark:bg-transparent dark:text-foreground dark:border-foreground dark:hover:bg-foreground dark:hover:text-background dark:hover:border-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /** CTA estilo LP — bordas retas, transição de fundo */
        cta: "bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] border border-transparent hover:bg-transparent hover:text-[hsl(var(--cta))] hover:border-[hsl(var(--cta))] uppercase tracking-wider text-sm",
        /** CTA invertido para fundos escuros — hover mantém fundo claro com leve atenuação para preservar contraste */
        "cta-inverted":
          "bg-[hsl(0_0%_98%)] text-[hsl(var(--cta))] border border-[hsl(0_0%_98%)] hover:bg-[hsl(0_0%_88%)] hover:border-[hsl(0_0%_88%)] hover:text-[hsl(var(--cta))] dark:bg-[hsl(0_0%_98%)] dark:text-[hsl(155_93%_11%)] dark:hover:bg-[hsl(0_0%_88%)] dark:hover:border-[hsl(0_0%_88%)] dark:hover:text-[hsl(155_93%_11%)] uppercase tracking-wider text-sm",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8 py-[18px] text-sm",
        xl: "h-14 px-10 py-5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
