"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const REMINDERS = ["Application deadlines", "Scholarship deadlines", "Financial aid forms"];

/** A parent box that is ticked, empty or a dash, depending on its children. */
function SelectAll() {
  const [picked, setPicked] = useState<string[]>(["Application deadlines"]);
  const all = picked.length === REMINDERS.length;
  const some = picked.length > 0 && !all;
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox checked={all} indeterminate={some} onCheckedChange={(on) => setPicked(on ? REMINDERS : [])} />
        All reminders
      </Label>
      <div className="flex flex-col gap-3 ps-7.5">
        {REMINDERS.map((r) => (
          <Label key={r} className="font-normal">
            <Checkbox
              checked={picked.includes(r)}
              onCheckedChange={(on) => setPicked(on ? [...picked, r] : picked.filter((p) => p !== r))}
            />
            {r}
          </Label>
        ))}
      </div>
    </div>
  );
}

/** The error shows only while the box is empty; ticking it clears both. */
function Required() {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-normal">
        <Checkbox
          checked={agreed}
          onCheckedChange={setAgreed}
          aria-invalid={!agreed || undefined}
          aria-describedby={agreed ? undefined : "cb-consent-error"}
        />
        My parent or guardian knows I’m using Unive
      </Label>
      <p
        id="cb-consent-error"
        aria-hidden={agreed || undefined}
        className="grid ps-7.5 text-[13px] text-danger-ink transition-[grid-template-rows,opacity] duration-200 ease-unive data-[hidden]:grid-rows-[0fr] data-[hidden]:opacity-0 grid-rows-[1fr]"
        data-hidden={agreed ? "" : undefined}
      >
        <span className="overflow-hidden">Tick this to continue.</span>
      </p>
    </div>
  );
}

export default function CheckboxDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

<Label className="font-normal">
  <Checkbox defaultChecked /> Remind me about deadlines
</Label>`}
        />
      </DocSection>

      <DocSection
        title="States"
        description="A small white squircle with a hairline. Checked, it fills meadow and the tick draws itself in; it dips as you press. Always wrap it in a Label so the words are part of what you can click."
      >
        <Grid cols={3}>
          <Example
            title="unchecked · checked"
            note="For choices that are saved with a button. If it acts at once, use a switch."
            code={`<Label className="font-normal">
  <Checkbox /> Share progress with my counsellor
</Label>
<Label className="font-normal">
  <Checkbox defaultChecked /> Remind me about deadlines
</Label>`}
          >
            <div className="flex flex-col gap-3">
              <Label className="font-normal">
                <Checkbox /> Share progress with my counsellor
              </Label>
              <Label className="font-normal">
                <Checkbox defaultChecked /> Remind me about deadlines
              </Label>
            </div>
          </Example>
          <Example
            title="indeterminate"
            note="A dash: some of the things below are ticked, not all. Only for a parent box."
            code={`<Label className="font-normal">
  <Checkbox indeterminate /> All reminders
</Label>`}
          >
            <Label className="font-normal">
              <Checkbox indeterminate /> All reminders
            </Label>
          </Example>
          <Example
            title="disabled"
            note="The box fades to 48%; has-data-disabled:text-pebble quietens the words. Say why nearby."
            code={`<Label className="font-normal has-data-disabled:text-pebble">
  <Checkbox disabled /> Text me reminders
</Label>
<Label className="font-normal has-data-disabled:text-pebble">
  <Checkbox defaultChecked disabled /> Email me reminders
</Label>`}
          >
            <div className="flex flex-col gap-3">
              <Label className="font-normal has-data-disabled:text-pebble">
                <Checkbox disabled /> Text me reminders
              </Label>
              <Label className="font-normal has-data-disabled:text-pebble">
                <Checkbox defaultChecked disabled /> Email me reminders
              </Label>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Examples"
        description="Checkboxes stack 12 px apart, one choice per line. Words on the right, starting with what it does."
      >
        <Grid>
          <Example
            title="With descriptions"
            note="A title in ink and one line in pebble. The box lines up with the title."
            code={`<Label className="items-start gap-3 font-normal">
  <Checkbox defaultChecked />
  <span className="flex flex-col gap-0.5">
    <span className="text-[15px] text-ink leading-5.5">Weekly plan</span>
    <span className="text-[13px] text-pebble leading-snug">
      What to do this week, every Monday morning.
    </span>
  </span>
</Label>`}
          >
            <div className="flex w-full max-w-sm flex-col gap-4">
              {[
                { title: "Weekly plan", note: "What to do this week, every Monday morning.", on: true },
                { title: "Deadline reminders", note: "A week before each one, and again the day before.", on: true },
                { title: "Counsellor notes", note: "When your counsellor comments on an essay.", on: false },
              ].map((o) => (
                <Label key={o.title} className="items-start gap-3 font-normal">
                  <Checkbox defaultChecked={o.on} />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[15px] text-ink leading-5.5">{o.title}</span>
                    <span className="text-[13px] text-pebble leading-snug">{o.note}</span>
                  </span>
                </Label>
              ))}
            </div>
          </Example>
          <Example
            title="Select all"
            note="The parent is ticked when every child is, a dash when some are. Pressing the dash ticks them all."
            code={`const [picked, setPicked] = useState(["Application deadlines"]);
const all = picked.length === reminders.length;
const some = picked.length > 0 && !all;

<Label>
  <Checkbox
    checked={all}
    indeterminate={some}
    onCheckedChange={(on) => setPicked(on ? reminders : [])}
  />
  All reminders
</Label>
<div className="flex flex-col gap-3 ps-7.5">
  {reminders.map((r) => (
    <Label key={r} className="font-normal">
      <Checkbox
        checked={picked.includes(r)}
        onCheckedChange={(on) => setPicked(on ? [...picked, r] : picked.filter((p) => p !== r))}
      />
      {r}
    </Label>
  ))}
</div>`}
          >
            <SelectAll />
          </Example>
          <Example
            title="Required"
            note="aria-invalid gives the box a red hairline and the line underneath says what to do. Tick it and both go: an error lasts only while it’s true."
            code={`const [agreed, setAgreed] = useState(false);

<div className="flex flex-col gap-2">
  <Label className="font-normal">
    <Checkbox
      checked={agreed}
      onCheckedChange={setAgreed}
      aria-invalid={!agreed || undefined}
      aria-describedby={agreed ? undefined : "consent-error"}
    />
    My parent or guardian knows I’m using Unive
  </Label>
  {!agreed && (
    <p id="consent-error" className="ps-7.5 text-[13px] text-danger-ink">
      Tick this to continue.
    </p>
  )}
</div>`}
          >
            <Required />
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["defaultChecked", "boolean", "false", "Starts ticked; the box keeps its own state."],
            ["checked / onCheckedChange", "boolean / (checked) => void", "—", "Control it from state."],
            ["indeterminate", "boolean", "false", "Shows a dash instead of a tick, for a parent of mixed children."],
            ["disabled", "boolean", "false", "Faded to 48% and not pressable."],
            ["aria-invalid", "boolean", "—", "A red hairline for a box that must be ticked."],
            ["name / value", "string", "—", "For forms: submitted when ticked."],
            ["required", "boolean", "false", "The form won’t submit until it’s ticked."],
          ]}
          note="Space toggles it from the keyboard. Every other prop goes to Base UI’s Checkbox.Root."
        />
      </DocSection>
    </>
  );
}
