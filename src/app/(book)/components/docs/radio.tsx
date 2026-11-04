"use client";

import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const PACES = [
  { value: "steady", title: "Steady", note: "A little each week, everything finished by October." },
  { value: "summer", title: "Summer push", note: "Most of the work in July and August, lighter in term." },
  { value: "sprint", title: "Last stretch", note: "For deadlines less than eight weeks away." },
];

export default function RadioDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";

<RadioGroup defaultValue="ed">
  <Label className="font-normal">
    <Radio value="ed" /> Early decision
  </Label>
  <Label className="font-normal">
    <Radio value="rd" /> Regular decision
  </Label>
</RadioGroup>`}
        />
      </DocSection>

      <DocSection
        title="Groups"
        description="One choice out of a few, all visible at once. A white circle with a hairline; chosen, it fills meadow and the white centre springs in. More than five or six options? Use a select."
      >
        <Grid>
          <Example
            title="Vertical"
            note="The default, 12 px apart. Name the group with a label above it."
            code={`<div className="flex flex-col gap-3">
  <Label id="round">Application round</Label>
  <RadioGroup defaultValue="ed" aria-labelledby="round">
    <Label className="font-normal"><Radio value="ed" /> Early decision</Label>
    <Label className="font-normal"><Radio value="ea" /> Early action</Label>
    <Label className="font-normal"><Radio value="rd" /> Regular decision</Label>
  </RadioGroup>
</div>`}
          >
            <div className="flex flex-col gap-3">
              <Label id="ra-round">Application round</Label>
              <RadioGroup defaultValue="ed" aria-labelledby="ra-round">
                <Label className="font-normal">
                  <Radio value="ed" /> Early decision
                </Label>
                <Label className="font-normal">
                  <Radio value="ea" /> Early action
                </Label>
                <Label className="font-normal">
                  <Radio value="rd" /> Regular decision
                </Label>
              </RadioGroup>
            </div>
          </Example>
          <Example
            title="Horizontal"
            note="Two or three short options in a row: flex-row on the group."
            code={`<div className="flex flex-col gap-3">
  <Label id="role">I’m a</Label>
  <RadioGroup defaultValue="student" aria-labelledby="role" className="flex-row gap-6">
    <Label className="font-normal"><Radio value="student" /> Student</Label>
    <Label className="font-normal"><Radio value="parent" /> Parent</Label>
    <Label className="font-normal"><Radio value="counsellor" /> Counsellor</Label>
  </RadioGroup>
</div>`}
          >
            <div className="flex flex-col gap-3">
              <Label id="ra-role">I’m a</Label>
              <RadioGroup defaultValue="student" aria-labelledby="ra-role" className="flex-row gap-6">
                <Label className="font-normal">
                  <Radio value="student" /> Student
                </Label>
                <Label className="font-normal">
                  <Radio value="parent" /> Parent
                </Label>
                <Label className="font-normal">
                  <Radio value="counsellor" /> Counsellor
                </Label>
              </RadioGroup>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Cards"
        description="When each option needs a sentence, make the whole row the target: a white squircle with the radio, a title and one line. The chosen row turns meadow soft with a meadow ring, all from CSS, no extra state."
      >
        <Grid>
          <Example
            title="Card options"
            tone="paper"
            note="has-data-checked styles the row whose radio is chosen."
            code={`<RadioGroup defaultValue="steady" aria-label="Pace" className="gap-2">
  {paces.map((p) => (
    <Label
      key={p.value}
      className="squircle flex w-full cursor-pointer items-start gap-3 bg-white p-4 font-normal shadow-[inset_0_0_0_1px_var(--hairline)] transition-[background-color,box-shadow] duration-200 [--sq:var(--radius-xl)] has-data-checked:bg-meadow-soft has-data-checked:shadow-[inset_0_0_0_1.5px_var(--meadow)]"
    >
      <Radio value={p.value} />
      <span className="flex flex-col gap-0.5">
        <span className="font-medium text-[15px] text-ink leading-5.5">{p.title}</span>
        <span className="text-[13px] text-graphite leading-snug">{p.note}</span>
      </span>
    </Label>
  ))}
</RadioGroup>`}
          >
            <RadioGroup defaultValue="steady" aria-label="Pace" className="w-full max-w-sm gap-2">
              {PACES.map((p) => (
                <Label
                  key={p.value}
                  className="squircle flex w-full cursor-pointer items-start gap-3 bg-white p-4 font-normal shadow-[inset_0_0_0_1px_var(--hairline)] transition-[background-color,box-shadow] duration-200 [--sq:var(--radius-xl)] has-data-checked:bg-meadow-soft has-data-checked:shadow-[inset_0_0_0_1.5px_var(--meadow)]"
                >
                  <Radio value={p.value} />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-medium text-[15px] text-ink leading-5.5">{p.title}</span>
                    <span className="text-[13px] text-graphite leading-snug">{p.note}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </Example>
          <Example
            title="States"
            note="disabled on one Radio greys that option; on the group, all of them. Add has-data-disabled:text-pebble to the Label so the words fade with it."
            code={`<RadioGroup defaultValue="email" aria-label="Send reminders by">
  <Label className="font-normal"><Radio value="email" /> Email</Label>
  <Label className="font-normal has-data-disabled:text-pebble"><Radio value="sms" disabled /> Text message (coming soon)</Label>
</RadioGroup>

<RadioGroup defaultValue="yes" aria-label="Fee waiver" disabled>…</RadioGroup>`}
          >
            <div className="flex flex-col gap-8">
              <RadioGroup defaultValue="email" aria-label="Send reminders by">
                <Label className="font-normal">
                  <Radio value="email" /> Email
                </Label>
                <Label className="font-normal has-data-disabled:text-pebble">
                  <Radio value="sms" disabled /> Text message (coming soon)
                </Label>
              </RadioGroup>
              <RadioGroup defaultValue="yes" aria-label="Fee waiver" disabled>
                <Label className="font-normal has-data-disabled:text-pebble">
                  <Radio value="yes" /> Fee waiver approved
                </Label>
                <Label className="font-normal has-data-disabled:text-pebble">
                  <Radio value="no" /> No fee waiver
                </Label>
              </RadioGroup>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["RadioGroup defaultValue / value", "string", "—", "The chosen option. Usually start with one chosen."],
            ["RadioGroup onValueChange", "(value) => void", "—", "Called with the new value when they choose."],
            ["RadioGroup disabled", "boolean", "false", "Greys out every option."],
            ["RadioGroup name", "string", "—", "For forms: the field name the value is submitted under."],
            ["RadioGroup className", "string", "flex-col gap-3", "flex-row gap-6 for a horizontal group."],
            ["Radio value", "string", "—", "What this option stands for. Required."],
            ["Radio disabled", "boolean", "false", "Greys out this one option."],
          ]}
          note="Arrow keys move between options and choose as they go; Tab leaves the group. RadioGroupItem is the same as Radio."
        />
      </DocSection>
    </>
  );
}
