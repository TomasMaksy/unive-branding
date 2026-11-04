import { cn } from "cn";
import { ArrowRightIcon, CalendarIcon, CheckIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type React from "react";
import { AppIcon, Wordmark } from "@/components/brand/logo";
import { UnLoader } from "@/components/brand/un-loader";
import { CopyHex } from "@/components/book/copy-hex";
import { PressToLoad } from "@/components/book/press-to-load";
import { PageHeader } from "@/components/book/section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const metadata: Metadata = { title: "Moodboard" };

/** One tile of the board: a squircle, with an optional label in its corner. */
function Tile({
  label,
  dark,
  className,
  children,
}: {
  label?: string;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("squircle relative flex min-w-0 flex-col overflow-hidden p-6 [--sq:28px] md:p-7", className)}>
      {label ? <p className={cn("eyebrow mb-5", dark ? "text-paper/60" : "text-pebble")}>{label}</p> : null}
      {children}
    </div>
  );
}

const COLOURS = [
  { name: "Paper", token: "--paper", hex: "#F9F9F7", fg: "text-ink", edge: true },
  { name: "Mist", token: "--mist", hex: "#EFEFEA", fg: "text-ink" },
  { name: "Stone", token: "--stone", hex: "#939290", fg: "text-white" },
  { name: "Graphite", token: "--graphite", hex: "#57524B", fg: "text-paper" },
  { name: "Ink", token: "--ink", hex: "#1D1B18", fg: "text-paper" },
  { name: "Meadow", token: "--meadow", hex: "#6F7644", fg: "text-paper" },
] as const;

/**
 * The brand at a glance, laid out on one 12-column grid: the name and its
 * motion, the four colours, the two typefaces, real components, imagery.
 */
export default function MoodboardPage() {
  return (
    <>
      <PageHeader eyebrow="Moodboard" title="The brand at a glance.">
        Paper and ink, one green, a hand-drawn name that moves. Everything here is the real component or token.
      </PageHeader>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-24 md:grid-cols-12 md:px-10">
        {/* ---- The name and its motion -------------------------------- */}
        <Tile className="items-center justify-center bg-white shadow-warm md:col-span-8 md:min-h-80">
          <Wordmark title="Unive" className="w-3/5 max-w-md text-ink" />
        </Tile>
        <Tile label="Loading" dark className="justify-between bg-ink text-paper md:col-span-4">
          <div className="flex flex-1 items-center justify-center py-6">
            <UnLoader size={84} className="text-paper" />
          </div>
          <p className="text-paper/70 text-sm">The “un” flows while something works. It never bounces.</p>
        </Tile>

        {/* ---- Colour and type ------------------------------------------ */}
        <Tile label="Colour" className="bg-white shadow-warm md:col-span-6">
          <div className="grid flex-1 grid-cols-3 gap-2 sm:grid-cols-6">
            {COLOURS.map((c) => (
              <div
                key={c.name}
                className={cn("squircle flex min-h-36 flex-col justify-end p-3 [--sq:var(--radius-xl)]", c.fg, "edge" in c && "ring-1 ring-border ring-inset")}
                style={{ background: `var(${c.token})` }}
              >
                <span className="font-medium text-sm">{c.name}</span>
                <CopyHex hex={c.hex} className="opacity-80" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-graphite text-sm">One warm grey ramp and one green. No blue, no decorative gradients.</p>
        </Tile>
        <Tile label="Type" className="bg-white shadow-warm md:col-span-6">
          <div className="flex flex-1 flex-col justify-between gap-6">
            <div className="flex items-end justify-between gap-4 border-border border-b pb-5">
              <span className="text-display text-[88px] text-ink leading-[0.8]">Aa</span>
              <div className="text-right">
                <p className="font-medium text-ink text-sm">Averia Serif Libre</p>
                <p className="text-pebble text-xs">Light 300 · titles and the voice</p>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4">
              <span className="font-medium text-[64px] text-ink leading-[0.8] tracking-[-0.04em]">Aa</span>
              <div className="text-right">
                <p className="font-medium text-ink text-sm">Inter</p>
                <p className="text-pebble text-xs">400 and 500 · everything else</p>
              </div>
            </div>
          </div>
        </Tile>

        {/* ---- Components ---------------------------------------------- */}
        <Tile label="Buttons · press one" className="bg-white shadow-warm md:col-span-5">
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <PressToLoad variant="brand" size="lg">
                Get started
              </PressToLoad>
              <PressToLoad variant="brand-outline" size="lg">
                See a sample
              </PressToLoad>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="stone" size="lg" loading loadingLabel="Generating" />
              <PressToLoad variant="meadow" size="lg">
                Build my plan
              </PressToLoad>
              <Button variant="secondary" size="lg">
                Later
              </Button>
            </div>
          </div>
        </Tile>
        <Tile label="Controls" className="bg-white shadow-warm md:col-span-4">
          <div className="flex flex-1 flex-col justify-center gap-4">
            <Input type="search" placeholder="Search universities" size="lg" />
            <label className="flex items-center justify-between gap-3 text-ink text-sm">
              Deadline reminders
              <Switch defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-3 text-ink text-sm">
              Weekly summary
              <Switch />
            </label>
            <label className="flex items-center gap-2.5 text-ink text-sm">
              <Checkbox defaultChecked />
              Share the plan with a parent
            </label>
          </div>
        </Tile>
        <Tile label="Feedback" className="bg-white shadow-warm md:col-span-3">
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="success">Submitted</Badge>
              <Badge variant="warning">Due soon</Badge>
              <Badge>Draft</Badge>
            </div>
            <Alert variant="success">
              <CheckIcon />
              <AlertTitle>Essay saved</AlertTitle>
              <AlertDescription>Your counsellor can see it now.</AlertDescription>
            </Alert>
          </div>
        </Tile>

        {/* ---- Product and imagery ------------------------------------- */}
        <Tile className="gap-5 bg-mist md:col-span-7">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-heading font-light text-2xl text-ink tracking-[-0.03em]">Your roadmap</h3>
            <Badge variant="success">On track</Badge>
          </div>
          <div className="squircle flex flex-col gap-4 bg-white p-5 shadow-warm-xs [--sq:var(--radius-2xl)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-ink text-sm">Yale · Early action</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-pebble text-xs">
                  <CalendarIcon className="size-3.5" /> 1 November
                </p>
              </div>
              <span className="font-medium text-meadow text-sm tabular-nums">64%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-paper-hover" role="progressbar" aria-valuenow={64} aria-label="Application progress">
              <div className="h-full w-[64%] rounded-full bg-meadow" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-graphite text-sm">Two essays left to write.</p>
              <Button size="sm">
                Continue <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </Tile>
        <Tile className="aspect-video justify-end bg-dusk p-0 md:col-span-5 md:aspect-auto md:p-0">
          <Image src="/scenes/application-strategy-wide.webp" alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ backgroundImage: "var(--scrim-ink)" }} />
          <div className="relative flex max-w-64 flex-col gap-4 p-6 md:p-7">
            <h3 className="font-heading font-light text-3xl text-white leading-[1.05] tracking-[-0.04em]">Plan it together</h3>
            <Button variant="inverse" className="w-fit">
              Open the roadmap
            </Button>
          </div>
        </Tile>


        {/* ---- Marks and voice ------------------------------------------ */}
        <Tile label="App icon" className="bg-white shadow-warm md:col-span-5">
          <div className="flex flex-1 items-center gap-4">
            <AppIcon tone="ink" title="" className="w-20" />
            <AppIcon tone="meadow" title="" className="w-20" />
            <AppIcon tone="paper" title="" className="w-20" />
          </div>
        </Tile>
        <Tile label="Voice" dark className="justify-end bg-ink md:col-span-7">
          <p className="text-display text-4xl text-paper md:text-5xl">
            Clear steps. <em className="italic">Kind words.</em>
          </p>
        </Tile>
      </div>
    </>
  );
}
