"use client";

import { CircleAlertIcon, CircleCheckIcon, InfoIcon, LightbulbIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

export default function AlertDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";

<Alert variant="success">
  <CircleCheckIcon />
  <AlertTitle>Essay submitted</AlertTitle>
  <AlertDescription>Your counsellor will reply within two days.</AlertDescription>
</Alert>`}
        />
      </DocSection>

      <DocSection
        title="Variants"
        description="An alert sits in the page and stays until the thing it’s about changes. The tint says how much it matters; the icon goes first, then a short title, then one line on what to do."
      >
        <Grid>
          <Example
            title="default"
            note="White with a hairline. A neutral note: tips, context."
            stageClassName="block"
            code={`<Alert>
  <LightbulbIcon />
  <AlertTitle>Start with the short answers</AlertTitle>
  <AlertDescription>They take ten minutes each and get you writing.</AlertDescription>
</Alert>`}
          >
            <Alert>
              <LightbulbIcon />
              <AlertTitle>Start with the short answers</AlertTitle>
              <AlertDescription>They take ten minutes each and get you writing.</AlertDescription>
            </Alert>
          </Example>
          <Example
            title="success"
            note="Something went through. Often a toast is enough; use this when it should stay."
            stageClassName="block"
            code={`<Alert variant="success">
  <CircleCheckIcon />
  <AlertTitle>Essay submitted</AlertTitle>
  <AlertDescription>Your counsellor will reply within two days.</AlertDescription>
</Alert>`}
          >
            <Alert variant="success">
              <CircleCheckIcon />
              <AlertTitle>Essay submitted</AlertTitle>
              <AlertDescription>Your counsellor will reply within two days.</AlertDescription>
            </Alert>
          </Example>
          <Example
            title="warning"
            note="Needs attention soon, but nothing is broken."
            stageClassName="block"
            code={`<Alert variant="warning">
  <TriangleAlertIcon />
  <AlertTitle>Two deadlines this week</AlertTitle>
  <AlertDescription>Yale on Friday, Brown on Sunday.</AlertDescription>
</Alert>`}
          >
            <Alert variant="warning">
              <TriangleAlertIcon />
              <AlertTitle>Two deadlines this week</AlertTitle>
              <AlertDescription>Yale on Friday, Brown on Sunday.</AlertDescription>
            </Alert>
          </Example>
          <Example
            title="error"
            note="Something failed. Say what, and how to fix it."
            stageClassName="block"
            code={`<Alert variant="error">
  <CircleAlertIcon />
  <AlertTitle>Upload failed</AlertTitle>
  <AlertDescription>That file is over 10 MB. Try a PDF.</AlertDescription>
</Alert>`}
          >
            <Alert variant="error">
              <CircleAlertIcon />
              <AlertTitle>Upload failed</AlertTitle>
              <AlertDescription>That file is over 10 MB. Try a PDF.</AlertDescription>
            </Alert>
          </Example>
          <Example
            title="info"
            note="News that changes nothing yet: new prompts, a policy update."
            stageClassName="block"
            code={`<Alert variant="info">
  <InfoIcon />
  <AlertTitle>Prompts updated</AlertTitle>
  <AlertDescription>Stanford released this year’s short questions.</AlertDescription>
</Alert>`}
          >
            <Alert variant="info">
              <InfoIcon />
              <AlertTitle>Prompts updated</AlertTitle>
              <AlertDescription>Stanford released this year’s short questions.</AlertDescription>
            </Alert>
          </Example>
          <Example
            title="Title only"
            note="When one line says it all, drop the description. The icon lines up with the title."
            stageClassName="flex-col items-stretch"
            code={`<Alert variant="success">
  <CircleCheckIcon />
  <AlertTitle>All 31 deadlines are in your calendar</AlertTitle>
</Alert>
<Alert variant="warning">
  <TriangleAlertIcon />
  <AlertTitle>You’re offline. Changes will sync later.</AlertTitle>
</Alert>`}
          >
            <Alert variant="success">
              <CircleCheckIcon />
              <AlertTitle>All 31 deadlines are in your calendar</AlertTitle>
            </Alert>
            <Alert variant="warning">
              <TriangleAlertIcon />
              <AlertTitle>You’re offline. Changes will sync later.</AlertTitle>
            </Alert>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="With actions"
        description={
          <>
            Put buttons in <code className="text-ink">AlertAction</code>, after the description. On wider screens they sit on
            the right, centred; on phones they drop under the text. Small buttons, the main one last.
          </>
        }
      >
        <Grid>
          <Example
            title="One action"
            stageClassName="block"
            code={`<Alert variant="error">
  <CircleAlertIcon />
  <AlertTitle>Upload failed</AlertTitle>
  <AlertDescription>That file is over 10 MB. Try a PDF.</AlertDescription>
  <AlertAction>
    <Button size="xs">Try again</Button>
  </AlertAction>
</Alert>`}
          >
            <Alert variant="error">
              <CircleAlertIcon />
              <AlertTitle>Upload failed</AlertTitle>
              <AlertDescription>That file is over 10 MB. Try a PDF.</AlertDescription>
              <AlertAction>
                <Button size="xs">Try again</Button>
              </AlertAction>
            </Alert>
          </Example>
          <Example
            title="Two actions"
            note="The quiet one first: Later, Dismiss."
            stageClassName="block"
            code={`<Alert variant="warning">
  <TriangleAlertIcon />
  <AlertTitle>Your plan is a week old</AlertTitle>
  <AlertDescription>Two schools changed their deadlines.</AlertDescription>
  <AlertAction>
    <Button size="xs" variant="ghost">Later</Button>
    <Button size="xs">Update plan</Button>
  </AlertAction>
</Alert>`}
          >
            <Alert variant="warning">
              <TriangleAlertIcon />
              <AlertTitle>Your plan is a week old</AlertTitle>
              <AlertDescription>Two schools changed their deadlines.</AlertDescription>
              <AlertAction>
                <Button size="xs" variant="ghost">
                  Later
                </Button>
                <Button size="xs">Update plan</Button>
              </AlertAction>
            </Alert>
          </Example>
          <Example
            title="Title and action"
            stageClassName="block"
            code={`<Alert variant="info">
  <InfoIcon />
  <AlertTitle>FAFSA opens on 1 October</AlertTitle>
  <AlertAction>
    <Button size="xs" variant="outline">Remind me</Button>
  </AlertAction>
</Alert>`}
          >
            <Alert variant="info">
              <InfoIcon />
              <AlertTitle>FAFSA opens on 1 October</AlertTitle>
              <AlertAction>
                <Button size="xs" variant="outline">
                  Remind me
                </Button>
              </AlertAction>
            </Alert>
          </Example>
          <Example
            title="Without an icon"
            note="Fine for a neutral note; keep the icon on the tinted ones so colour isn’t the only signal."
            stageClassName="block"
            code={`<Alert>
  <AlertTitle>Invite a parent</AlertTitle>
  <AlertDescription>They can see the plan and deadlines, not your essays.</AlertDescription>
  <AlertAction>
    <Button size="xs" variant="outline">Send invite</Button>
  </AlertAction>
</Alert>`}
          >
            <Alert>
              <AlertTitle>Invite a parent</AlertTitle>
              <AlertDescription>They can see the plan and deadlines, not your essays.</AlertDescription>
              <AlertAction>
                <Button size="xs" variant="outline">
                  Send invite
                </Button>
              </AlertAction>
            </Alert>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="In context"
        description="An alert goes at the top of the thing it’s about, under the heading and above the content. One at a time; if there are two, the more urgent one wins."
      >
        <Grid cols={1}>
          <Example
            title="On a school page"
            tone="paper"
            stageClassName="block"
            code={`<header className="flex flex-col gap-1">
  <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.03em]">Yale</h3>
  <p className="text-graphite text-sm">Early action · 3 of 5 tasks done</p>
</header>
<Alert variant="warning">
  <TriangleAlertIcon />
  <AlertTitle>Due on Friday</AlertTitle>
  <AlertDescription>The “Why Yale” essay still needs 110 words.</AlertDescription>
  <AlertAction>
    <Button size="xs">Open essay</Button>
  </AlertAction>
</Alert>
<ul className="flex flex-col">…</ul>`}
          >
            <div className="squircle mx-auto flex w-full max-w-2xl flex-col gap-5 bg-white p-6 shadow-warm [--sq:28px] md:p-8">
              <header className="flex flex-col gap-1">
                <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.03em]">Yale</h3>
                <p className="text-graphite text-sm">Early action · 3 of 5 tasks done</p>
              </header>
              <Alert variant="warning">
                <TriangleAlertIcon />
                <AlertTitle>Due on Friday</AlertTitle>
                <AlertDescription>The “Why Yale” essay still needs 110 words.</AlertDescription>
                <AlertAction>
                  <Button size="xs">Open essay</Button>
                </AlertAction>
              </Alert>
              <ul className="flex flex-col divide-y divide-(--hairline) text-sm">
                {[
                  ["Common App essay", "Done"],
                  ["Activities list", "Done"],
                  ["Recommendation letters", "Done"],
                  ["“Why Yale” essay", "540 of 650 words"],
                  ["Short answers", "Not started"],
                ].map(([task, state]) => (
                  <li key={task} className="flex justify-between gap-4 py-2.5">
                    <span className="text-ink">{task}</span>
                    <span className="text-pebble">{state}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["variant", "default | success | warning | error | info", "default", "The tint and icon colour."],
            ["AlertTitle", "—", "—", "The message, in medium weight. Required."],
            ["AlertDescription", "—", "—", "One line on what to do. Optional."],
            ["AlertAction", "—", "—", "Buttons on the end; under the text on phones."],
          ]}
          note="Put a lucide icon first, as a direct child: it is sized and coloured for you. The alert has role=“alert”, so screen readers read it out when it appears."
        />
      </DocSection>
    </>
  );
}
