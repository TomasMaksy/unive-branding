"use client";

import { Player } from "@remotion/player";
import { BrandSting, FLOW_FRAMES, FlowLoop, FPS, STING_FRAMES, WRITE_FRAMES, WriteLoop } from "./compositions";

const COMPOSITIONS = {
  sting: { component: BrandSting, frames: STING_FRAMES, width: 1920, height: 1080 },
  flow: { component: FlowLoop, frames: FLOW_FRAMES, width: 1080, height: 1080 },
  write: { component: WriteLoop, frames: WRITE_FRAMES, width: 1080, height: 1080 },
} as const;

export function BrandPlayer({ id, controls = false }: { id: keyof typeof COMPOSITIONS; controls?: boolean }) {
  const c = COMPOSITIONS[id];
  return (
    <Player
      component={c.component}
      durationInFrames={c.frames}
      fps={FPS}
      compositionWidth={c.width}
      compositionHeight={c.height}
      style={{ width: "100%", aspectRatio: `${c.width} / ${c.height}` }}
      autoPlay
      loop
      controls={controls}
      clickToPlay={controls}
      initiallyMuted
    />
  );
}
