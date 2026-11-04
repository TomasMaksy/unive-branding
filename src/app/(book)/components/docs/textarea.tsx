"use client";

import { cn } from "cn";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const LIMIT = 150;

/** A live count under the field that turns red past the limit. */
function CountedTextarea() {
  const [text, setText] = useState("");
  const over = text.length > LIMIT;
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="ta-activity">Describe this activity</Label>
      <Textarea
        id="ta-activity"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Founded the coding club and taught 20 younger students to build their first app."
        aria-invalid={over || undefined}
        aria-describedby="ta-activity-count"
      />
      <p id="ta-activity-count" className={cn("text-end text-[13px] tabular-nums", over ? "text-danger-ink" : "text-pebble")}>
        {over ? `${text.length - LIMIT} over the limit` : `${LIMIT - text.length} left`}
      </p>
    </div>
  );
}

export default function TextareaDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

<Label htmlFor="note">Note to your counsellor</Label>
<Textarea id="note" placeholder="What should we focus on this week?" />`}
        />
      </DocSection>

      <DocSection
        title="Default"
        description="The input’s filled mist, as a squircle instead of a capsule because it holds more than one line. It starts two lines tall and grows as you type, so nobody writes into a scrolling slot."
      >
        <Grid>
          <Example
            title="With a label"
            note="Type a few lines: the field grows with them."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="note">Note to your counsellor</Label>
  <Textarea id="note" placeholder="What should we focus on this week?" />
</div>`}
          >
            <div className="flex w-full max-w-md flex-col gap-2">
              <Label htmlFor="ta-note">Note to your counsellor</Label>
              <Textarea id="ta-note" placeholder="What should we focus on this week?" />
            </div>
          </Example>
          <Example
            title="With helper text"
            note="Say how long, or what a good answer looks like."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="why">Why this school?</Label>
  <Textarea id="why" aria-describedby="why-help" />
  <p id="why-help" className="text-[13px] text-pebble">
    A few sentences is plenty. You can polish it later.
  </p>
</div>`}
          >
            <div className="flex w-full max-w-md flex-col gap-2">
              <Label htmlFor="ta-why">Why this school?</Label>
              <Textarea id="ta-why" aria-describedby="ta-why-help" />
              <p id="ta-why-help" className="text-[13px] text-pebble">
                A few sentences is plenty. You can polish it later.
              </p>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Sizes"
        description="Text starts 16 px in, like the input’s, so a form lines up. sm is 14 px text for dense lists, lg is 16 px beside lg inputs."
      >
        <Grid cols={3}>
          <Example title="sm" code={`<Textarea size="sm" placeholder="Small" aria-label="Small" />`}>
            <Textarea size="sm" placeholder="Small" aria-label="Small" />
          </Example>
          <Example title="default" code={`<Textarea placeholder="Default" aria-label="Default" />`}>
            <Textarea placeholder="Default" aria-label="Default" />
          </Example>
          <Example title="lg" code={`<Textarea size="lg" placeholder="Large" aria-label="Large" />`}>
            <Textarea size="lg" placeholder="Large" aria-label="Large" />
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="States"
        description={
          <>
            As with the input: <code className="text-ink">aria-invalid</code> gives the soft red fill and red ring, and one line
            underneath says what to fix.
          </>
        }
      >
        <Grid>
          <Example
            title="Error"
            note="Keep what they wrote. Tell them the one thing missing."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="goal">Your goal for this term</Label>
  <Textarea id="goal" defaultValue="Get better" aria-invalid aria-describedby="goal-error" />
  <p id="goal-error" className="text-[13px] text-danger-ink">
    Add one thing you’ll do, so your counsellor can help.
  </p>
</div>`}
          >
            <div className="flex w-full max-w-md flex-col gap-2">
              <Label htmlFor="ta-goal">Your goal for this term</Label>
              <Textarea id="ta-goal" defaultValue="Get better" aria-invalid aria-describedby="ta-goal-error" />
              <p id="ta-goal-error" className="text-[13px] text-danger-ink">
                Add one thing you’ll do, so your counsellor can help.
              </p>
            </div>
          </Example>
          <Example
            title="Disabled"
            note="Faded to 48%. For a note someone else wrote."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="feedback">Counsellor feedback</Label>
  <Textarea id="feedback" defaultValue="Strong opening. Cut the second paragraph." disabled />
</div>`}
          >
            <div className="flex w-full max-w-md flex-col gap-2">
              <Label htmlFor="ta-feedback">Counsellor feedback</Label>
              <Textarea id="ta-feedback" defaultValue="Strong opening. Cut the second paragraph." disabled />
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Examples"
        description="Application forms have limits. Show what’s left as they type, and let them go over: the count turns red and the field takes the error look, but their words stay."
      >
        <Grid>
          <Example
            title="Character count"
            note="Right aligned under the field, in pebble, red past the limit."
            code={`const [text, setText] = useState("");
const over = text.length > 150;

<div className="flex flex-col gap-2">
  <Label htmlFor="activity">Describe this activity</Label>
  <Textarea
    id="activity"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Founded the coding club and taught 20 younger students to build their first app."
    aria-invalid={over || undefined}
    aria-describedby="activity-count"
  />
  <p
    id="activity-count"
    className={cn("text-end text-[13px] tabular-nums", over ? "text-danger-ink" : "text-pebble")}
  >
    {over ? \`\${text.length - 150} over the limit\` : \`\${150 - text.length} left\`}
  </p>
</div>`}
          >
            <CountedTextarea />
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["size", "sm | default | lg", "default", "Padding, starting height and text: 14, 15 or 16 px, inset like the input."],
            ["aria-invalid", "boolean", "—", "The error look: soft red fill and a red ring."],
            ["disabled", "boolean", "false", "Faded to 48% and not editable."],
            ["className", "string", "—", "Goes on the squircle around the textarea, e.g. a width."],
            ["unstyled", "boolean", "false", "Drops the squircle; className then goes on the <textarea>."],
          ]}
          note="Every other prop goes to the <textarea>. It sizes to its content, so rows has no effect where the browser supports field-sizing."
        />
      </DocSection>
    </>
  );
}
