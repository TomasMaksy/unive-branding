"use client";

import { BellIcon, CopyIcon, DownloadIcon, SearchIcon, SparklesIcon, StarIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

/** An icon toggle: outlined when off, filled meadow when on. */
function FavouriteToggle() {
  const [on, setOn] = useState(false);
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="ghost" size="icon" aria-label="Favourite" aria-pressed={on} onClick={() => setOn((v) => !v)} />}
      >
        <StarIcon
          className={on ? "scale-110 fill-meadow text-meadow" : "text-ink"}
          style={{ transition: "scale 300ms cubic-bezier(.3,1.4,.5,1), color 160ms, fill 160ms" }}
        />
      </TooltipTrigger>
      <TooltipPopup>{on ? "Remove from favourites" : "Add to favourites"}</TooltipPopup>
    </Tooltip>
  );
}

const SIDES = [
  ["top", "Opens above"],
  ["right", "Opens to the right"],
  ["bottom", "Opens below"],
  ["left", "Opens to the left"],
] as const;

export default function TooltipDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Copy" />}>
    <CopyIcon />
  </TooltipTrigger>
  <TooltipPopup>Copy</TooltipPopup>
</Tooltip>`}
        />
      </DocSection>

      <DocSection
        title="On icon buttons"
        description="Every icon-only button gets one: the tooltip says in words what the icon means. A verb or a short phrase, sentence case, no full stop. Hover or focus to see it."
      >
        <Grid>
          <Example
            title="One button"
            note="Keep the aria-label and the tooltip saying the same thing."
            code={`<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Download PDF" />}>
    <DownloadIcon />
  </TooltipTrigger>
  <TooltipPopup>Download PDF</TooltipPopup>
</Tooltip>`}
          >
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Download PDF" />}>
                <DownloadIcon />
              </TooltipTrigger>
              <TooltipPopup>Download PDF</TooltipPopup>
            </Tooltip>
          </Example>
          <Example
            title="A toolbar"
            note="Wrap the row in TooltipProvider: once one is open, the next shows straight away as you move along."
            code={`<TooltipProvider>
  <div className="flex gap-1">
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Copy" />}><CopyIcon /></TooltipTrigger>
      <TooltipPopup>Copy</TooltipPopup>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Improve with AI" />}><SparklesIcon /></TooltipTrigger>
      <TooltipPopup>Improve with AI</TooltipPopup>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Delete" />}><Trash2Icon /></TooltipTrigger>
      <TooltipPopup>Delete</TooltipPopup>
    </Tooltip>
  </div>
</TooltipProvider>`}
          >
            <TooltipProvider>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Copy" />}><CopyIcon /></TooltipTrigger>
                  <TooltipPopup>Copy</TooltipPopup>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Improve with AI" />}><SparklesIcon /></TooltipTrigger>
                  <TooltipPopup>Improve with AI</TooltipPopup>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Delete" />}><Trash2Icon /></TooltipTrigger>
                  <TooltipPopup>Delete</TooltipPopup>
                </Tooltip>
              </div>
            </TooltipProvider>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Toggles"
        description="For a button that switches something on and off, the tooltip says what pressing it will do next, so it changes with the state."
      >
        <Grid>
          <Example
            title="Favourite"
            note="Outlined ink when off, filled meadow with a small spring when on."
            code={`const [on, setOn] = useState(false);

<Tooltip>
  <TooltipTrigger
    render={<Button variant="ghost" size="icon" aria-label="Favourite" aria-pressed={on} onClick={() => setOn((v) => !v)} />}
  >
    <StarIcon
      className={on ? "scale-110 fill-meadow text-meadow" : "text-ink"}
      style={{ transition: "scale 300ms cubic-bezier(.3,1.4,.5,1), color 160ms, fill 160ms" }}
    />
  </TooltipTrigger>
  <TooltipPopup>{on ? "Remove from favourites" : "Add to favourites"}</TooltipPopup>
</Tooltip>`}
          >
            <FavouriteToggle />
          </Example>
          <Example
            title="With a shortcut"
            note="Add the keys after the label with Kbd, for people who like the keyboard."
            code={`<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Search" />}>
    <SearchIcon />
  </TooltipTrigger>
  <TooltipPopup>
    <span className="flex items-center gap-2">
      Search
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </span>
  </TooltipPopup>
</Tooltip>`}
          >
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Search" />}>
                <SearchIcon />
              </TooltipTrigger>
              <TooltipPopup>
                <span className="flex items-center gap-2">
                  Search
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                </span>
              </TooltipPopup>
            </Tooltip>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Placement"
        description={
          <>
            Above by default. Set <code className="text-ink">side</code> on <code className="text-ink">TooltipPopup</code>{" "}
            when something sits there already, like a toolbar at the top of the screen. It flips on its own near an edge.
          </>
        }
      >
        <Grid cols={1}>
          <Example
            title="top · right · bottom · left"
            code={`<Tooltip>
  <TooltipTrigger render={<Button variant="outline" />}>Right</TooltipTrigger>
  <TooltipPopup side="right">Opens to the right</TooltipPopup>
</Tooltip>`}
          >
            <TooltipProvider>
              {SIDES.map(([side, label]) => (
                <Tooltip key={side}>
                  <TooltipTrigger render={<Button variant="outline" className="capitalize" />}>{side}</TooltipTrigger>
                  <TooltipPopup side={side}>{label}</TooltipPopup>
                </Tooltip>
              ))}
            </TooltipProvider>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Examples">
        <Grid>
          <Example
            title="Explaining a disabled button"
            note="A disabled button can’t be hovered, so put the tooltip on a wrapper and say why."
            code={`<Tooltip>
  <TooltipTrigger render={<span tabIndex={0} />}>
    <Button disabled>Submit</Button>
  </TooltipTrigger>
  <TooltipPopup>Add your personal statement first</TooltipPopup>
</Tooltip>`}
          >
            <Tooltip>
              <TooltipTrigger render={<span tabIndex={0} className="rounded-full" />}>
                <Button disabled>Submit</Button>
              </TooltipTrigger>
              <TooltipPopup>Add your personal statement first</TooltipPopup>
            </Tooltip>
          </Example>
          <Example
            title="On a card"
            note="Small and quiet: icon buttons on the card’s header row."
            tone="paper"
            code={`<div className="squircle flex items-center gap-3 bg-white py-3 ps-4 pe-2 shadow-warm [--sq:var(--radius-xl)]">
  <div className="flex flex-1 flex-col">
    <span className="font-medium text-ink text-sm">Yale · Early action</span>
    <span className="text-pebble text-xs">Due 1 November</span>
  </div>
  <Tooltip>
    <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Remind me" />}>
      <BellIcon />
    </TooltipTrigger>
    <TooltipPopup>Remind me</TooltipPopup>
  </Tooltip>
</div>`}
          >
            <div className="squircle flex w-full max-w-sm items-center gap-3 bg-white py-3 ps-4 pe-2 shadow-warm [--sq:var(--radius-xl)]">
              <div className="flex flex-1 flex-col">
                <span className="font-medium text-ink text-sm">Yale · Early action</span>
                <span className="text-pebble text-xs">Due 1 November</span>
              </div>
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Remind me" />}>
                  <BellIcon />
                </TooltipTrigger>
                <TooltipPopup>Remind me</TooltipPopup>
              </Tooltip>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["TooltipPopup side", "top | right | bottom | left | inline-start | inline-end", "top", "Where it opens. It flips if there isn’t room."],
            ["TooltipPopup align", "start | center | end", "center", "Along the side."],
            ["TooltipPopup sideOffset", "number", "4", "The gap to the trigger, in px."],
            ["TooltipTrigger delay", "number", "600", "ms of hover before it opens."],
            ["TooltipTrigger closeDelay", "number", "0", "ms before it closes once the pointer leaves."],
            ["TooltipTrigger render", "ReactElement", "—", "The element to hover, usually a Button."],
            ["TooltipProvider delay / closeDelay", "number", "—", "One delay for a group; neighbours open instantly once one is open."],
            ["Tooltip open / onOpenChange", "boolean / (open) => void", "—", "Control it from state."],
            ["Tooltip disabled", "boolean", "false", "Turns the tooltip off without removing it."],
          ]}
          note="Tooltips are for labels, not instructions: nothing in one can be clicked, and touch screens never see it. Anything important goes on the page."
        />
      </DocSection>
    </>
  );
}
