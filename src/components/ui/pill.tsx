import { cn } from "cn";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-3 py-1.5 font-medium text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
