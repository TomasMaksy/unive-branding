"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const MAJORS = [
  { value: "cs", label: "Computer science" },
  { value: "bio", label: "Biology" },
  { value: "eco", label: "Economics" },
  { value: "eng", label: "English" },
  { value: "und", label: "Undecided" },
];

const ROUNDS = [
  { value: "ed", label: "Early decision" },
  { value: "ea", label: "Early action" },
  { value: "rd", label: "Regular decision" },
];

const YEARS = [
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
];

function Items({ items }: { items: { value: string; label: string }[] }) {
  return items.map((i) => (
    <SelectItem key={i.value} value={i.value}>
      {i.label}
    </SelectItem>
  ));
}

export default function SelectDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";

const majors = [
  { value: "cs", label: "Computer science" },
  { value: "bio", label: "Biology" },
];

<Select items={majors} defaultValue="cs">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectPopup>
    {majors.map((m) => (
      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
    ))}
  </SelectPopup>
</Select>`}
        />
      </DocSection>

      <DocSection
        title="Default"
        description={
          <>
            The same filled capsule as the input. It opens over itself: the list grows out of the field, same width and same left
            edge, with the chosen row exactly where the field was and a meadow tick where the chevron sat. Pass{" "}
            <code className="text-ink">items</code> so the field can show the chosen label before the list has opened.
          </>
        }
      >
        <Grid>
          <Example
            title="With a label"
            note="Point the label at the trigger with htmlFor and id."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="major">Intended major</Label>
  <Select items={majors} defaultValue="cs">
    <SelectTrigger id="major">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>…</SelectPopup>
  </Select>
</div>`}
          >
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Label htmlFor="se-major">Intended major</Label>
              <Select items={MAJORS} defaultValue="cs">
                <SelectTrigger id="se-major">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  <Items items={MAJORS} />
                </SelectPopup>
              </Select>
            </div>
          </Example>
          <Example
            title="With a placeholder"
            note="No default value: the field shows the placeholder in pebble until they choose."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="round">Application round</Label>
  <Select items={rounds}>
    <SelectTrigger id="round">
      <SelectValue placeholder="Choose a round" />
    </SelectTrigger>
    <SelectPopup>…</SelectPopup>
  </Select>
</div>`}
          >
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Label htmlFor="se-round">Application round</Label>
              <Select items={ROUNDS}>
                <SelectTrigger id="se-round">
                  <SelectValue placeholder="Choose a round" />
                </SelectTrigger>
                <SelectPopup>
                  <Items items={ROUNDS} />
                </SelectPopup>
              </Select>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Sizes"
        description={
          <>
            Set <code className="text-ink">size</code> on <code className="text-ink">SelectTrigger</code>, the same steps as the
            input so a select and a field of the same size line up: xs (32 px) and sm (36 px) for filters, default (40 px)
            in forms, lg (48 px) beside lg inputs.
          </>
        }
      >
        <Grid cols={1}>
          <Example
            title="xs · sm · default · lg"
            code={`<SelectTrigger size="xs">…</SelectTrigger>
<SelectTrigger size="sm">…</SelectTrigger>
<SelectTrigger>…</SelectTrigger>
<SelectTrigger size="lg">…</SelectTrigger>`}
          >
            <div className="flex w-full max-w-xs flex-col gap-3">
              {(["xs", "sm", "default", "lg"] as const).map((s) => (
                <Select key={s} items={YEARS} defaultValue="2027">
                  <SelectTrigger size={s} aria-label={`Graduation year, ${s}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    <Items items={YEARS} />
                  </SelectPopup>
                </Select>
              ))}
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="States"
        description={
          <>
            <code className="text-ink">aria-invalid</code> on the trigger gives the input’s error look, with the same line
            underneath. Disabled fades it to 48%.
          </>
        }
      >
        <Grid>
          <Example
            title="Error"
            note="Say what to choose, not that the field is required."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="year">Graduation year</Label>
  <Select items={years}>
    <SelectTrigger id="year" aria-invalid aria-describedby="year-error">
      <SelectValue placeholder="Choose a year" />
    </SelectTrigger>
    <SelectPopup>…</SelectPopup>
  </Select>
  <p id="year-error" className="text-[13px] text-danger-ink">
    Choose the year you finish school.
  </p>
</div>`}
          >
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Label htmlFor="se-year">Graduation year</Label>
              <Select items={YEARS}>
                <SelectTrigger id="se-year" aria-invalid aria-describedby="se-year-error">
                  <SelectValue placeholder="Choose a year" />
                </SelectTrigger>
                <SelectPopup>
                  <Items items={YEARS} />
                </SelectPopup>
              </Select>
              <p id="se-year-error" className="text-[13px] text-danger-ink">
                Choose the year you finish school.
              </p>
            </div>
          </Example>
          <Example
            title="Disabled"
            note="Set disabled on Select. Say why nearby."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="locked">Application round</Label>
  <Select items={rounds} defaultValue="ed" disabled>
    <SelectTrigger id="locked">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>…</SelectPopup>
  </Select>
  <p className="text-[13px] text-pebble">Submitted, so the round is set.</p>
</div>`}
          >
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Label htmlFor="se-locked">Application round</Label>
              <Select items={ROUNDS} defaultValue="ed" disabled>
                <SelectTrigger id="se-locked">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  <Items items={ROUNDS} />
                </SelectPopup>
              </Select>
              <p className="text-[13px] text-pebble">Submitted, so the round is set.</p>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Examples"
        description="A select is the same height as an input and a button, so they share a row without any fixing."
      >
        <Grid cols={1}>
          <Example
            title="In a form row"
            note="Name, round and the action on one line; stacked on a phone."
            code={`<form className="flex flex-col gap-4 sm:flex-row sm:items-end">
  <div className="flex flex-1 flex-col gap-2">
    <Label htmlFor="school">School</Label>
    <Input id="school" placeholder="Brown University" />
  </div>
  <div className="flex flex-col gap-2 sm:w-52">
    <Label htmlFor="round">Round</Label>
    <Select items={rounds} defaultValue="rd">
      <SelectTrigger id="round">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>…</SelectPopup>
    </Select>
  </div>
  <Button type="submit">Add school</Button>
</form>`}
          >
            <form className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:items-end" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="se-school">School</Label>
                <Input id="se-school" placeholder="Brown University" />
              </div>
              <div className="flex flex-col gap-2 sm:w-52">
                <Label htmlFor="se-row-round">Round</Label>
                <Select items={ROUNDS} defaultValue="rd">
                  <SelectTrigger id="se-row-round">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    <Items items={ROUNDS} />
                  </SelectPopup>
                </Select>
              </div>
              <Button type="submit">Add school</Button>
            </form>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["Select items", "{ value, label }[]", "—", "The options, so the field can show the chosen label before the list opens."],
            ["Select defaultValue / value", "string", "—", "The chosen value; leave it out to show the placeholder."],
            ["Select onValueChange", "(value) => void", "—", "Called with the new value when they choose."],
            ["Select disabled", "boolean", "false", "Faded to 48% and won’t open."],
            ["SelectTrigger size", "xs | sm | default | lg", "default", "Height: 32, 36, 40 or 48 px, the same steps as Input."],
            ["SelectTrigger aria-invalid", "boolean", "—", "The error look: soft red fill and a red ring."],
            ["SelectValue placeholder", "ReactNode", "—", "Shown in pebble while nothing is chosen."],
            ["SelectPopup alignItemWithTrigger", "boolean", "true", "Opens with the chosen row over the field. false drops the list below it."],
            ["SelectPopup matchTriggerWidth", "boolean", "true", "Same width as the field. false lets long labels widen it."],
          ]}
          note="Escape, a click outside or choosing a row closes it. Arrow keys move through the rows; typing jumps to a match."
        />
      </DocSection>
    </>
  );
}
