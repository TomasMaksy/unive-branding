"use client";

import { useEffect, useRef, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * A demo button for the book: press it and the label turns into the
 * flowing "un" for a moment, then comes back, as a real save would.
 */
export function PressToLoad({ ms = 2400, onClick, ...props }: ButtonProps & { ms?: number }) {
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <Button
      {...props}
      loading={loading}
      onClick={(e) => {
        onClick?.(e);
        setLoading(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setLoading(false), ms);
      }}
    />
  );
}
