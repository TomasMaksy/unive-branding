"use client";

import { cn } from "cn";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

/** A hex code you can click to copy. Colour follows the text around it. */
export function CopyHex({ hex, className }: { hex: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${hex}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(hex);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          // Clipboard blocked: the code is still there to select by hand.
        }
      }}
      className={cn(
        "-mx-1.5 inline-flex w-fit cursor-copy items-center gap-1.5 rounded-full px-1.5 py-0.5 font-mono text-[11px] tabular-nums uppercase transition-colors hover:bg-current/10",
        className,
      )}
    >
      {copied ? "Copied" : hex}
      {copied ? <CheckIcon className="size-3" aria-hidden /> : <CopyIcon className="size-3 opacity-60" aria-hidden />}
    </button>
  );
}
