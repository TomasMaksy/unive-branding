"use client";

import { CircleAlertIcon, CircleCheckIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocSection, Example, Grid, Props, Usage } from "./kit";


export default function BadgeDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Badge } from "@/components/ui/badge";

<Badge variant="success">Accepted</Badge>
<Badge variant="warning">Due soon</Badge>`}
        />
      </DocSection>

      <DocSection
        title="Variants"
        description="Four, and that is all an app needs: a neutral label and the three states. All soft fills, no outlines, no solid colours; a solid capsule reads as a button. Read the colour and the word together, never the colour alone."
      >
        <Grid cols={2}>
          <Example title="default" note="Neutral. A type, a round, a draft, a stage, anything new. Info is neutral here, so it lives here too." code={`<Badge>Draft</Badge>`}>
            <Badge>Draft</Badge>
            <Badge>Early action</Badge>
            <Badge>New</Badge>
          </Example>
          <Example title="success" note="Done, accepted, submitted. The only green badge." code={`<Badge variant="success">Accepted</Badge>`}>
            <Badge variant="success">Accepted</Badge>
            <Badge variant="success">Submitted</Badge>
          </Example>
          <Example title="warning" note="Needs doing soon." code={`<Badge variant="warning">Due soon</Badge>`}>
            <Badge variant="warning">Due soon</Badge>
            <Badge variant="warning">Waitlisted</Badge>
          </Example>
          <Example title="error" note="Missing, overdue, failed." code={`<Badge variant="error">Missing</Badge>`}>
            <Badge variant="error">Missing</Badge>
            <Badge variant="error">Overdue</Badge>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Sizes"
        description="Default fits a list row or a table cell. sm for a count beside a label, lg next to a heading. On phones each grows a step for easier reading."
      >
        <Grid cols={1}>
          <Example
            title="sm · default · lg"
            code={`<Badge size="sm" variant="warning">Due soon</Badge>
<Badge variant="warning">Due soon</Badge>
<Badge size="lg" variant="warning">Due soon</Badge>`}
          >
            <Badge size="sm" variant="warning">Due soon</Badge>
            <Badge variant="warning">Due soon</Badge>
            <Badge size="lg" variant="warning">Due soon</Badge>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="With icons" description="An icon before the word, sized to the badge. Useful when the badge sits far from its label.">
        <Grid cols={3}>
          <Example
            title="Done"
            code={`<Badge variant="success"><CircleCheckIcon /> Submitted</Badge>`}
          >
            <Badge variant="success">
              <CircleCheckIcon /> Submitted
            </Badge>
          </Example>
          <Example
            title="Time"
            code={`<Badge variant="warning"><ClockIcon /> 3 days left</Badge>`}
          >
            <Badge variant="warning">
              <ClockIcon /> 3 days left
            </Badge>
          </Example>
          <Example
            title="Attention"
            code={`<Badge variant="error"><CircleAlertIcon /> Missing</Badge>`}
          >
            <Badge variant="error">
              <CircleAlertIcon /> Missing
            </Badge>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Roadmap stages"
        description="Stages use the same badges, so there is nothing new to learn: a step that is done is success, every other step is neutral. Where you are is shown by the roadmap itself, not by a colour."
      >
        <Grid cols={1}>
          <Example
            title="Done, then neutral"
            code={`<Badge variant="success">Done</Badge>
<Badge>Current</Badge>
<Badge>Next</Badge>
<Badge>Upcoming</Badge>`}
          >
            <Badge variant="success">Done</Badge>
            <Badge>Current</Badge>
            <Badge>Next</Badge>
            <Badge>Upcoming</Badge>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Examples">
        <Grid cols={1}>
          <Example
            title="In a table"
            note="One badge per row, in its own column, so the eye can run down it."
            stageClassName="block p-0"
            code={`<tr>
  <td>Yale</td>
  <td className="text-graphite">Early action</td>
  <td className="tabular-nums">1 Nov</td>
  <td><Badge variant="warning">Due soon</Badge></td>
</tr>`}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="text-pebble text-xs">
                  <tr className="border-(--hairline) border-b">
                    <th className="px-6 py-3 font-medium">School</th>
                    <th className="px-6 py-3 font-medium">Round</th>
                    <th className="px-6 py-3 font-medium">Deadline</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["Yale", "Early action", "1 Nov", "warning", "Due soon"],
                      ["Brown", "Regular decision", "3 Jan", "default", "In progress"],
                      ["MIT", "Early action", "1 Nov", "error", "Missing essay"],
                      ["Edinburgh", "UCAS", "29 Jan", "success", "Submitted"],
                    ] as const
                  ).map(([school, round, date, variant, label]) => (
                    <tr key={school} className="border-(--hairline) border-b last:border-0">
                      <td className="px-6 py-3 font-medium text-ink">{school}</td>
                      <td className="px-6 py-3 text-graphite">{round}</td>
                      <td className="px-6 py-3 text-graphite tabular-nums">{date}</td>
                      <td className="px-6 py-3">
                        <Badge variant={variant}>{label}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Example>
          <Example
            title="Beside a heading"
            note="lg next to a title, on the same baseline."
            code={`<div className="flex items-center gap-2">
  <h3 className="font-heading font-light text-2xl text-ink tracking-[-0.03em]">Why Yale</h3>
  <Badge size="lg">Draft</Badge>
</div>`}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-light text-2xl text-ink tracking-[-0.03em]">Why Yale</h3>
              <Badge size="lg">Draft</Badge>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["variant", "default | success | warning | error", "default", "The look. See Variants."],
            ["size", "sm | default | lg", "default", "Height and text size together."],
            ["render", "ReactElement", "—", "Render as a link or button; it gets a hover and a bigger tap area."],
          ]}
          note="Every other prop goes to the <span>."
        />
      </DocSection>
    </>
  );
}
