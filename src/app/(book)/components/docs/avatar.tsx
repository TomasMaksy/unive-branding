"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const TEAM = [
  ["AM", "bg-mist text-ink"],
  ["JL", "bg-meadow-soft text-meadow-ink"],
  ["RK", "bg-mist text-dusk"],
] as const;

const PEOPLE = [
  ["PP", "Priya Patel", "Counsellor", "bg-meadow-soft text-meadow-ink"],
  ["DO", "David Okafor", "Parent", "bg-mist text-ink"],
  ["AM", "Alex Morgan", "Student · Class of 2027", "bg-mist text-dusk"],
] as const;

export default function AvatarDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src={user.photo} alt="" />
  <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
</Avatar>`}
        />
      </DocSection>

      <DocSection
        title="Initials"
        description="Most people in Unive never upload a photo, so the initials are the avatar. Two letters, on a soft fill: mist for most people, meadow-soft to pick someone out, like the counsellor."
      >
        <Grid cols={3}>
          <Example
            title="Mist"
            note="The default for students and parents."
            code={`<Avatar>
  <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
</Avatar>`}
          >
            <Avatar>
              <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
            </Avatar>
          </Example>
          <Example
            title="Mist, dusk"
            note="A second mist, for telling neighbours apart in a group."
            code={`<Avatar>
  <AvatarFallback className="bg-mist text-dusk">RK</AvatarFallback>
</Avatar>`}
          >
            <Avatar>
              <AvatarFallback className="bg-mist text-dusk">RK</AvatarFallback>
            </Avatar>
          </Example>
          <Example
            title="Meadow soft"
            note="The person who matters here: the counsellor, a reviewer."
            code={`<Avatar>
  <AvatarFallback className="bg-meadow-soft text-meadow-ink">PP</AvatarFallback>
</Avatar>`}
          >
            <Avatar>
              <AvatarFallback className="bg-meadow-soft text-meadow-ink">PP</AvatarFallback>
            </Avatar>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Sizes"
        description={
          <>
            32 px by default. Change it with a <code className="text-ink">size-*</code> class, and step the text up with it.
            24 in dense lists, 40 in rows, 48 on a review or profile.
          </>
        }
      >
        <Grid cols={1}>
          <Example
            title="size-6 · size-8 · size-10 · size-12 · size-16"
            code={`<Avatar className="size-6 text-[10px]">…</Avatar>
<Avatar>…</Avatar>
<Avatar className="size-10 text-sm">…</Avatar>
<Avatar className="size-12 text-base">…</Avatar>
<Avatar className="size-16 text-xl">…</Avatar>`}
          >
            <Avatar className="size-6 text-[10px]">
              <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
            </Avatar>
            <Avatar className="size-10 text-sm">
              <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
            </Avatar>
            <Avatar className="size-12 text-base">
              <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
            </Avatar>
            <Avatar className="size-16 text-xl">
              <AvatarFallback className="bg-mist text-ink">AM</AvatarFallback>
            </Avatar>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Groups"
        description="Who else is on this plan. Overlap them by 8 px with a white ring so each one reads as its own circle, and say in words who they are."
      >
        <Grid>
          <Example
            title="Stack"
            code={`<div className="flex items-center gap-3">
  <div className="flex -space-x-2">
    <Avatar className="ring-2 ring-white"><AvatarFallback className="bg-mist text-ink">AM</AvatarFallback></Avatar>
    <Avatar className="ring-2 ring-white"><AvatarFallback className="bg-meadow-soft text-meadow-ink">JL</AvatarFallback></Avatar>
    <Avatar className="ring-2 ring-white"><AvatarFallback className="bg-mist text-dusk">RK</AvatarFallback></Avatar>
  </div>
  <span className="text-graphite text-sm">3 counsellors on this plan</span>
</div>`}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {TEAM.map(([i, tone]) => (
                  <Avatar key={i} className="ring-2 ring-white">
                    <AvatarFallback className={tone}>{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-graphite text-sm">3 counsellors on this plan</span>
            </div>
          </Example>
          <Example
            title="With a count"
            note="Show three, then the rest as a number in the same circle."
            code={`<div className="flex -space-x-2">
  <Avatar className="ring-2 ring-white"><AvatarFallback className="bg-mist text-ink">AM</AvatarFallback></Avatar>
  <Avatar className="ring-2 ring-white"><AvatarFallback className="bg-meadow-soft text-meadow-ink">JL</AvatarFallback></Avatar>
  <Avatar className="ring-2 ring-white"><AvatarFallback className="bg-mist text-dusk">RK</AvatarFallback></Avatar>
  <Avatar className="ring-2 ring-white"><AvatarFallback className="bg-paper-hover text-graphite">+4</AvatarFallback></Avatar>
</div>`}
          >
            <div className="flex -space-x-2">
              {TEAM.map(([i, tone]) => (
                <Avatar key={i} className="ring-2 ring-white">
                  <AvatarFallback className={tone}>{i}</AvatarFallback>
                </Avatar>
              ))}
              <Avatar className="ring-2 ring-white">
                <AvatarFallback className="bg-paper-hover text-graphite">+4</AvatarFallback>
              </Avatar>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Examples">
        <Grid>
          <Example
            title="Name and role"
            note="Avatar, then the name in ink and the role in pebble underneath."
            code={`<div className="flex items-center gap-3">
  <Avatar className="size-10 text-sm">
    <AvatarFallback className="bg-meadow-soft text-meadow-ink">PP</AvatarFallback>
  </Avatar>
  <div className="flex min-w-0 flex-col">
    <span className="font-medium text-ink text-sm">Priya Patel</span>
    <span className="text-pebble text-xs">Counsellor</span>
  </div>
</div>`}
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-10 text-sm">
                <AvatarFallback className="bg-meadow-soft text-meadow-ink">PP</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="font-medium text-ink text-sm">Priya Patel</span>
                <span className="text-pebble text-xs">Counsellor</span>
              </div>
            </div>
          </Example>
          <Example
            title="People on a plan"
            note="The same row, listed. The counsellor in meadow, everyone else in mist."
            stageClassName="block"
            code={`<ul className="flex flex-col gap-3">
  {people.map((p) => (
    <li key={p.name} className="flex items-center gap-3">
      <Avatar className="size-10 text-sm">
        <AvatarFallback className={p.tone}>{p.initials}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col">
        <span className="font-medium text-ink text-sm">{p.name}</span>
        <span className="text-pebble text-xs">{p.role}</span>
      </div>
    </li>
  ))}
</ul>`}
          >
            <ul className="mx-auto flex max-w-xs flex-col gap-3">
              {PEOPLE.map(([initials, name, role, tone]) => (
                <li key={name} className="flex items-center gap-3">
                  <Avatar className="size-10 text-sm">
                    <AvatarFallback className={tone}>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col">
                    <span className="font-medium text-ink text-sm">{name}</span>
                    <span className="text-pebble text-xs">{role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["Avatar className", "string", "size-8 text-xs", "Size and text size; a ring for stacks."],
            ["AvatarImage src / alt", "string", "—", "The photo. Shown once it has loaded; until then, and if it fails, the fallback shows."],
            ["AvatarFallback className", "string", "bg-muted", "The fill and text colour for the initials: bg-mist text-ink, or bg-meadow-soft text-meadow-ink."],
            ["AvatarFallback delay", "number", "—", "ms to wait before showing the fallback, so a fast photo doesn’t flash initials first."],
          ]}
          note="Give the photo an empty alt when the name is written next to it, so screen readers don’t say it twice."
        />
      </DocSection>
    </>
  );
}
