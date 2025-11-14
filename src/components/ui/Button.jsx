"use client";

import { Button as MTButton } from "@material-tailwind/react";
import { cn } from "@/lib/cn";

export default function Button({
  className,
  children,
  color = "blue",
  size = "md",
  ...props
}) {
  return (
    <MTButton
      color={color}
      size={size}
      className={cn("rounded-lg font-medium shadow-md", className)}
      {...props}
    >
      {children}
    </MTButton>
  );
}
