"use client";

import { Fragment, useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const SETTINGS = [
  { title: "Weekly summary email", note: "Every Monday: what’s due and what you finished.", on: true },
  { title: "Deadline reminders", note: "A week before each deadline, and the day before.", on: true },
  { title: "Scholarship alerts", note: "New scholarships that match your list.", on: false },
];

/** A switch that says what it changed, straight away. */
function Reminders() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label className="flex justify-between gap-6 font-normal">
        Deadline reminders
        <Switch checked={on} onCheckedChange={setOn} />
      </Label>
      <p className="text-[13px] text-pebble">
        {on ? "We’ll email you a week before each deadline." : "No reminders. You can turn them back on any time."}
      </p>
    </div>
  );
}

export default function SwitchDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

<Label className="justify-between font-normal">
  Weekly summary email
  <Switch defaultChecked />
</Label>`}
        />
      </DocSection>

      <DocSection
        title="On and off"
        description="Shaped like iOS: a capsule track and a thumb that stretches while pressed and springs across. On is meadow. A switch acts the moment it moves; if the change waits for a Save button, use a checkbox."
      >
        <Grid cols={3}>
          <Example
            title="off · on"
            note="On its own it needs an aria-label."
            code={`<Switch aria-label="Scholarship alerts" />
<Switch defaultChecked aria-label="Weekly summary email" />`}
          >
            <Switch aria-label="Scholarship alerts" />
            <Switch defaultChecked aria-label="Weekly summary email" />
          </Example>
          <Example
            title="With a label"
            note="Words on the left, switch on the right, the whole row pressable."
            code={`<Label className="flex justify-between gap-6 font-normal">
  Scholarship alerts
  <Switch />
</Label>`}
          >
            <Label className="flex w-full max-w-xs justify-between gap-6 font-normal">
              Scholarship alerts
              <Switch />
            </Label>
          </Example>
          <Example
            title="disabled"
            note="Faded to 48%. Say who can change it."
            code={`<Switch disabled aria-label="Share with school" />
<Switch defaultChecked disabled aria-label="Share with counsellor" />`}
          >
            <Switch disabled aria-label="Share with school" />
            <Switch defaultChecked disabled aria-label="Share with counsellor" />
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Settings rows"
        description="The main home for switches: a list of rows, each a title and one line of pebble on the left, the switch on the right, a hairline Separator between them."
      >
        <Grid>
          <Example
            title="Notifications"
            note="12 px above and below each row; the separators run the full width."
            code={`<div className="flex flex-col">
  {settings.map((s, i) => (
    <Fragment key={s.title}>
      {i > 0 && <Separator />}
      <Label className="flex justify-between gap-6 py-3 font-normal">
        <span className="flex flex-col gap-0.5">
          <span className="text-[15px] text-ink">{s.title}</span>
          <span className="text-[13px] text-pebble leading-snug">{s.note}</span>
        </span>
        <Switch defaultChecked={s.on} />
      </Label>
    </Fragment>
  ))}
</div>`}
          >
            <div className="flex w-full max-w-md flex-col">
              {SETTINGS.map((s, i) => (
                <Fragment key={s.title}>
                  {i > 0 && <Separator />}
                  <Label className="flex justify-between gap-6 py-3 font-normal">
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] text-ink">{s.title}</span>
                      <span className="text-[13px] text-pebble leading-snug">{s.note}</span>
                    </span>
                    <Switch defaultChecked={s.on} />
                  </Label>
                </Fragment>
              ))}
            </div>
          </Example>
          <Example
            title="With a locked row"
            note="When someone else decides, disable the switch and say who."
            code={`<Label className="flex justify-between gap-6 py-3 font-normal">
  <span className="flex flex-col gap-0.5">
    <span className="text-[15px] text-ink">Share progress with your counsellor</span>
    <span className="text-[13px] text-pebble leading-snug">They see your plan and deadlines.</span>
  </span>
  <Switch defaultChecked />
</Label>
<Separator />
<Label className="flex justify-between gap-6 py-3 font-normal">
  <span className="flex flex-col gap-0.5">
    <span className="text-[15px] text-ink">Share progress with your school</span>
    <span className="text-[13px] text-pebble leading-snug">Your counsellor manages this.</span>
  </span>
  <Switch defaultChecked disabled />
</Label>`}
          >
            <div className="flex w-full max-w-md flex-col">
              <Label className="flex justify-between gap-6 py-3 font-normal">
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] text-ink">Share progress with your counsellor</span>
                  <span className="text-[13px] text-pebble leading-snug">They see your plan and deadlines.</span>
                </span>
                <Switch defaultChecked />
              </Label>
              <Separator />
              <Label className="flex justify-between gap-6 py-3 font-normal">
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] text-ink">Share progress with your school</span>
                  <span className="text-[13px] text-pebble leading-snug">Your counsellor manages this.</span>
                </span>
                <Switch defaultChecked disabled />
              </Label>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Examples" description="Because it acts at once, say what changed right under it.">
        <Grid>
          <Example
            title="Controlled"
            note="checked and onCheckedChange, with a line that follows the state."
            code={`const [on, setOn] = useState(true);

<Label className="flex justify-between gap-6 font-normal">
  Deadline reminders
  <Switch checked={on} onCheckedChange={setOn} />
</Label>
<p className="text-[13px] text-pebble">
  {on ? "We’ll email you a week before each deadline." : "No reminders. You can turn them back on any time."}
</p>`}
          >
            <Reminders />
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["defaultChecked", "boolean", "false", "Starts on; the switch keeps its own state."],
            ["checked / onCheckedChange", "boolean / (checked) => void", "—", "Control it from state."],
            ["disabled", "boolean", "false", "Faded to 48% and not pressable."],
            ["name / value", "string", "—", "For forms: submitted when on."],
            ["aria-label", "string", "—", "Needed when there are no words beside it."],
          ]}
          note="Space toggles it from the keyboard. Every other prop goes to Base UI’s Switch.Root."
        />
      </DocSection>
    </>
  );
}
