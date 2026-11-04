"use client";

import { useState } from "react";
import { WordmarkWrite } from "@/components/brand/wordmark-write";
import { Switch } from "@/components/ui/switch";

/** The wordmark being written, with a switch between unive and unive.ai. */
export function WordmarkDemo() {
  const [ai, setAi] = useState(false);
  const text = ai ? "unive.ai" : "unive";
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <WordmarkWrite key={text} text={text} height={140} className="text-ink" />
      <label className="flex items-center gap-3 text-graphite text-sm">
        <span className={ai ? "" : "font-medium text-ink"}>unive</span>
        <Switch checked={ai} onCheckedChange={setAi} aria-label="Write unive.ai" />
        <span className={ai ? "font-medium text-ink" : ""}>unive.ai</span>
      </label>
    </div>
  );
}
