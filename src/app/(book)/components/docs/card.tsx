"use client";

import { CircleCheckIcon, MoreHorizontalIcon, StarIcon } from "lucide-react";
import { UnLoader } from "@/components/brand/un-loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const DEADLINES = [
  ["Yale", "Early action", "1 Nov", "bg-warning"],
  ["Brown", "Supplement", "3 Nov", "bg-meadow"],
  ["MIT", "Portfolio", "12 Nov", "bg-input"],
] as const;

export default function CardDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Why Yale</CardTitle>
    <CardDescription>640 words · edited 3 minutes ago</CardDescription>
  </CardHeader>
  <CardPanel>…</CardPanel>
  <CardFooter>
    <Button size="sm">Open</Button>
  </CardFooter>
</Card>`}
        />
      </DocSection>

      <DocSection
        title="Anatomy"
        description="The base container in the app: white on paper, a squircle with the warm shadow and no border. Its title is the light serif. Header, panel and footer share 24 px of padding and close up the gaps between them on their own."
      >
        <Grid cols={3}>
          <Example
            title="Header, panel, footer"
            note="The full set. Leave out what you don’t need."
            tone="paper"
            code={`<Card>
  <CardHeader>
    <CardTitle>Why Yale</CardTitle>
    <CardDescription>640 words · edited 3 minutes ago</CardDescription>
  </CardHeader>
  <CardPanel className="text-graphite text-sm">
    The robotics club paragraph is the strongest. Cut the opening line.
  </CardPanel>
  <CardFooter className="gap-2">
    <Button size="sm">Open</Button>
    <Button size="sm" variant="ghost">Later</Button>
  </CardFooter>
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Why Yale</CardTitle>
                <CardDescription>640 words · edited 3 minutes ago</CardDescription>
              </CardHeader>
              <CardPanel className="text-graphite text-sm">
                The robotics club paragraph is the strongest. Cut the opening line.
              </CardPanel>
              <CardFooter className="gap-2">
                <Button size="sm">Open</Button>
                <Button size="sm" variant="ghost">
                  Later
                </Button>
              </CardFooter>
            </Card>
          </Example>
          <Example
            title="CardAction"
            note="Top right of the header: a badge, or a menu button."
            tone="paper"
            code={`<Card>
  <CardHeader>
    <CardTitle>Brown</CardTitle>
    <CardDescription>Regular decision · due 3 January</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon-sm" aria-label="Options for Brown">
        <MoreHorizontalIcon />
      </Button>
    </CardAction>
  </CardHeader>
  <CardPanel>
    <Badge variant="warning">2 essays left</Badge>
  </CardPanel>
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Brown</CardTitle>
                <CardDescription>Regular decision · due 3 January</CardDescription>
                <CardAction>
                  <Button variant="ghost" size="icon-sm" aria-label="Options for Brown">
                    <MoreHorizontalIcon />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardPanel>
                <Badge variant="warning">2 essays left</Badge>
              </CardPanel>
            </Card>
          </Example>
          <Example
            title="Divided"
            note="Add border-b or border-t and the padding opens back up."
            tone="paper"
            code={`<Card>
  <CardHeader className="border-b">
    <CardTitle>This week</CardTitle>
  </CardHeader>
  <CardPanel className="text-graphite text-sm">Finish the Yale supplement.</CardPanel>
  <CardFooter className="justify-end border-t">
    <Button size="sm" variant="outline">See all</Button>
  </CardFooter>
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <CardHeader className="border-b">
                <CardTitle>This week</CardTitle>
              </CardHeader>
              <CardPanel className="text-graphite text-sm">Finish the Yale supplement.</CardPanel>
              <CardFooter className="justify-end border-t">
                <Button size="sm" variant="outline">
                  See all
                </Button>
              </CardFooter>
            </Card>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Card frame"
        description={
          <>
            A grey tray that holds cards under one heading, with its own header and footer.{" "}
            <code className="text-ink">CardFrame</code> takes the shadow off the cards inside and sets them 6 px apart, like grouped rows on iOS.
          </>
        }
      >
        <Grid>
          <Example
            title="A group of cards"
            tone="paper"
            code={`<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle>Essays</CardFrameTitle>
    <CardFrameDescription>3 drafts, 1 ready for review</CardFrameDescription>
    <CardFrameAction>
      <Button size="xs" variant="outline">New essay</Button>
    </CardFrameAction>
  </CardFrameHeader>
  <Card>
    <CardPanel className="flex items-center justify-between gap-3 text-sm">
      <span className="text-ink">Why Yale</span>
      <Badge>Ready</Badge>
    </CardPanel>
  </Card>
  <CardFrameFooter className="text-pebble text-xs">Updated 3 minutes ago</CardFrameFooter>
</CardFrame>`}
          >
            <CardFrame className="w-full max-w-md">
              <CardFrameHeader>
                <CardFrameTitle>Essays</CardFrameTitle>
                <CardFrameDescription>3 drafts, 1 ready for review</CardFrameDescription>
                <CardFrameAction>
                  <Button size="xs" variant="outline">
                    New essay
                  </Button>
                </CardFrameAction>
              </CardFrameHeader>
              <Card>
                <CardPanel className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-ink">Why Yale</span>
                  <Badge>Ready</Badge>
                </CardPanel>
              </Card>
              <CardFrameFooter className="text-pebble text-xs">Updated 3 minutes ago</CardFrameFooter>
            </CardFrame>
          </Example>
          <Example
            title="Two cards in a frame"
            note="Each card keeps its own corners, a size down from the tray’s."
            tone="paper"
            code={`<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle>Recommendations</CardFrameTitle>
  </CardFrameHeader>
  <Card>
    <CardPanel className="flex items-center justify-between gap-3 text-sm">
      <span className="text-ink">Ms Patel</span>
      <Badge variant="success">Received</Badge>
    </CardPanel>
  </Card>
  <Card>
    <CardPanel className="flex items-center justify-between gap-3 text-sm">
      <span className="text-ink">Mr Okafor</span>
      <span className="text-pebble">Asked 4 days ago</span>
    </CardPanel>
  </Card>
</CardFrame>`}
          >
            <CardFrame className="w-full max-w-md">
              <CardFrameHeader>
                <CardFrameTitle>Recommendations</CardFrameTitle>
              </CardFrameHeader>
              <Card>
                <CardPanel className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-ink">Ms Patel</span>
                  <Badge variant="success">Received</Badge>
                </CardPanel>
              </Card>
              <Card>
                <CardPanel className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-ink">Mr Okafor</span>
                  <span className="text-pebble">Asked 4 days ago</span>
                </CardPanel>
              </Card>
            </CardFrame>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Patterns"
        description="The card shapes the product and the site use most. They’re plain markup on brand tokens, not components: copy them and change the words."
      >
        <Grid>
          <Example
            title="Deadlines list"
            note="Surface grey, a dot for urgency. On hover the row fills and its dot nudges right, with a small spring."
            tone="white"
            stageClassName="block"
            code={`<article className="flex flex-col gap-4 rounded-2xl bg-surface p-5 lg:p-6">
  <h3 className="font-heading font-light text-lg text-graphite tracking-[-0.03em]">Nearest deadlines</h3>
  <ul className="flex flex-col">
    {deadlines.map(([school, kind, date, dot]) => (
      <li key={school} className="group squircle -mx-2 flex items-center gap-3 px-2 py-2 transition-colors duration-150 ease-out [--sq:var(--radius-lg)] hover:bg-surface-hover">
        <span className={\`size-2 shrink-0 transition-transform duration-[260ms] ease-[cubic-bezier(.3,1.3,.5,1)] group-hover:translate-x-1 rounded-full \${dot}\`} />
        <span className="flex-1 text-ink text-sm">{school} <span className="text-pebble">· {kind}</span></span>
        <span className="text-graphite text-sm tabular-nums">{date}</span>
      </li>
    ))}
  </ul>
</article>`}
          >
            <article className="flex flex-col gap-4 rounded-2xl bg-surface p-5 lg:p-6">
              <h3 className="font-heading font-light text-graphite text-lg tracking-[-0.03em]">Nearest deadlines</h3>
              <ul className="flex flex-col">
                {DEADLINES.map(([s, k, d, dot]) => (
                  <li
                    key={s}
                    className="group squircle -mx-2 flex items-center gap-3 px-2 py-2 transition-colors duration-150 ease-out [--sq:var(--radius-lg)] hover:bg-surface-hover"
                  >
                    <span className={`size-2 shrink-0 transition-transform duration-[260ms] ease-[cubic-bezier(.3,1.3,.5,1)] group-hover:translate-x-1 rounded-full ${dot}`} />
                    <span className="flex-1 text-ink text-sm">
                      {s} <span className="text-pebble">· {k}</span>
                    </span>
                    <span className="text-graphite text-sm tabular-nums">{d}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Example>

          <Example
            title="Review"
            note="Who first, then meadow star tiles that catch the eye, then their words in plain Inter."
            tone="paper"
            stageClassName="block"
            code={`<article className="squircle flex flex-col gap-4 bg-white p-6 shadow-warm [--sq:28px]">
  <div className="flex items-center gap-3.5">
    <Avatar className="size-12">
      <AvatarFallback className="bg-meadow-soft font-medium text-meadow-ink">MC</AvatarFallback>
    </Avatar>
    <div className="flex min-w-0 flex-col gap-1">
      <span className="font-semibold text-base text-ink leading-tight">Maya Chen</span>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="grid size-5 place-items-center rounded-[3px] bg-meadow">
              <StarIcon className="size-3.5 fill-white text-white" strokeWidth={0} />
            </span>
          ))}
        </span>
        <span className="text-pebble text-sm">Parent · 2 weeks ago</span>
      </div>
    </div>
  </div>
  <p className="text-[15px] text-graphite leading-relaxed">“…”</p>
</article>`}
          >
            <article className="squircle flex flex-col gap-4 bg-white p-6 shadow-warm [--sq:28px]">
              <div className="flex items-center gap-3.5">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-meadow-soft font-medium text-meadow-ink">MC</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-semibold text-base text-ink leading-tight">Maya Chen</span>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span key={i} className="grid size-5 place-items-center rounded-[3px] bg-meadow">
                          <StarIcon className="size-3.5 fill-white text-white" strokeWidth={0} />
                        </span>
                      ))}
                    </span>
                    <span className="text-pebble text-sm">Parent · 2 weeks ago</span>
                  </div>
                </div>
              </div>
              <p className="text-[15px] text-graphite leading-relaxed">
                “Applications used to take over our kitchen table. Now there is one plan, the deadlines are in it, and my
                daughter actually knows what to do next.”
              </p>
            </article>
          </Example>

          <Example
            title="Pricing"
            note="A bigger shadow lifts it off the page. One brand button, a success pill for the saving."
            tone="paper"
            stageClassName="block"
            code={`<article className="squircle flex flex-col gap-6 bg-white p-6 shadow-warm-lg [--sq:28px] md:p-8">
  <div className="flex items-center justify-between">
    <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">Pro</h3>
    <span className="rounded-full bg-success-soft px-2.5 py-0.5 font-medium text-success-foreground text-xs">Save 20%</span>
  </div>
  <ul className="flex flex-col gap-3 border-border border-t pt-6 text-graphite text-sm">
    {features.map((f) => (
      <li key={f} className="flex items-center gap-2.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-mist text-dusk">
          <CircleCheckIcon className="size-3.5" />
        </span>
        {f}
      </li>
    ))}
  </ul>
  <Button variant="brand" size="lg">Choose Pro</Button>
</article>`}
          >
            <article className="squircle flex flex-col gap-6 bg-white p-6 shadow-warm-lg [--sq:28px] md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">Pro</h3>
                <span className="rounded-full bg-success-soft px-2.5 py-0.5 font-medium text-success-foreground text-xs">Save 20%</span>
              </div>
              <ul className="flex flex-col gap-3 border-border border-t pt-6 text-graphite text-sm">
                {["Unlimited essay feedback", "A counsellor on call", "Scholarship matching"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="flex size-5 items-center justify-center rounded-full bg-mist text-dusk">
                      <CircleCheckIcon className="size-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="brand" size="lg">
                Choose Pro
              </Button>
            </article>
          </Example>

          <Example
            title="Feature frame"
            note="A meadow-soft squircle with a piece of the product floating in it. For the site, not the app."
            tone="white"
            stageClassName="block"
            code={`<article className="squircle relative flex min-h-56 flex-col justify-end overflow-hidden bg-meadow-soft p-6 [--sq:var(--radius-3xl)]">
  <div className="squircle absolute top-6 right-6 left-10 bg-white p-4 shadow-warm-xs [--sq:var(--radius-2xl)]">
    <p className="font-medium text-ink text-sm">Feedback on paragraph 2</p>
    <p className="mt-1 text-graphite text-xs">Show the robotics club, don’t tell it.</p>
  </div>
  <p className="relative font-heading font-light text-ink text-xl tracking-[-0.03em]">Notes that teach</p>
</article>`}
          >
            <article className="squircle relative flex min-h-56 flex-col justify-end overflow-hidden bg-meadow-soft p-6 [--sq:var(--radius-3xl)]">
              <div className="squircle absolute top-6 right-6 left-10 bg-white p-4 shadow-warm-xs [--sq:var(--radius-2xl)]">
                <p className="font-medium text-ink text-sm">Feedback on paragraph 2</p>
                <p className="mt-1 text-graphite text-xs">Show the robotics club, don’t tell it.</p>
              </div>
              <p className="relative font-heading font-light text-ink text-xl tracking-[-0.03em]">Notes that teach</p>
            </article>
          </Example>

          <Example
            title="Empty and loading"
            note="A dashed outline and the “un” writing itself. Say what’s coming, not that nothing is there."
            tone="paper"
            stageClassName="block"
            code={`<article className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-4xl border border-border border-dashed bg-white p-6 text-center">
  <UnLoader variant="write" size={44} className="text-meadow" />
  <div className="flex flex-col gap-1">
    <p className="font-heading font-light text-ink text-xl tracking-[-0.03em]">Building your plan</p>
    <p className="text-pebble text-sm">Twelve schools, about a minute.</p>
  </div>
</article>`}
          >
            <article className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-4xl border border-border border-dashed bg-white p-6 text-center">
              <UnLoader variant="write" size={44} className="text-meadow" />
              <div className="flex flex-col gap-1">
                <p className="font-heading font-light text-ink text-xl tracking-[-0.03em]">Building your plan</p>
                <p className="text-pebble text-sm">Twelve schools, about a minute.</p>
              </div>
            </article>
          </Example>

          <Example
            title="Empty, with an action"
            note="When the student has to start it: one line and one button."
            tone="paper"
            stageClassName="block"
            code={`<article className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-4xl border border-border border-dashed bg-white p-6 text-center">
  <div className="flex flex-col gap-1">
    <p className="font-heading font-light text-ink text-xl tracking-[-0.03em]">No schools yet</p>
    <p className="text-pebble text-sm">Add one and we’ll find its deadlines.</p>
  </div>
  <Button variant="outline">Add a school</Button>
</article>`}
          >
            <article className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-4xl border border-border border-dashed bg-white p-6 text-center">
              <div className="flex flex-col gap-1">
                <p className="font-heading font-light text-ink text-xl tracking-[-0.03em]">No schools yet</p>
                <p className="text-pebble text-sm">Add one and we’ll find its deadlines.</p>
              </div>
              <Button variant="outline">Add a school</Button>
            </article>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["Card render", "ReactElement", "—", "Render as another element, e.g. an <article> or a Next Link, keeping the styles."],
            ["CardHeader", "—", "—", "Title and description; a two-column grid once it holds a CardAction."],
            ["CardTitle · CardDescription", "—", "—", "Semibold 18 px · muted 14 px."],
            ["CardAction", "—", "—", "Pinned to the top right of the header."],
            ["CardPanel", "—", "—", "The body. Grows to fill; its padding closes up next to a header or footer."],
            ["CardFooter", "—", "—", "A row for buttons. Add border-t to divide it."],
            ["CardFrame · CardFrameHeader · CardFrameTitle · CardFrameDescription · CardFrameAction · CardFrameFooter", "—", "—", "The tray around a group of cards, with its own header and footer."],
          ]}
          note="Every part takes className and render. CardContent is an alias of CardPanel."
        />
      </DocSection>
    </>
  );
}
