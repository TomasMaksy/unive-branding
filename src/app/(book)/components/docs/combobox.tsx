"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/components/ui/combobox";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

type School = { value: string; label: string };

const SCHOOLS: School[] = [
  { value: "brown", label: "Brown" },
  { value: "columbia", label: "Columbia" },
  { value: "cornell", label: "Cornell" },
  { value: "dartmouth", label: "Dartmouth" },
  { value: "duke", label: "Duke" },
  { value: "harvard", label: "Harvard" },
  { value: "mit", label: "MIT" },
  { value: "northwestern", label: "Northwestern" },
  { value: "penn", label: "Penn" },
  { value: "princeton", label: "Princeton" },
  { value: "stanford", label: "Stanford" },
  { value: "uchicago", label: "UChicago" },
  { value: "yale", label: "Yale" },
];

const BY_COUNTRY: { value: string; items: School[] }[] = [
  {
    value: "United States",
    items: [
      { value: "harvard", label: "Harvard" },
      { value: "mit", label: "MIT" },
      { value: "stanford", label: "Stanford" },
      { value: "yale", label: "Yale" },
    ],
  },
  {
    value: "United Kingdom",
    items: [
      { value: "cambridge", label: "Cambridge" },
      { value: "edinburgh", label: "Edinburgh" },
      { value: "lse", label: "LSE" },
      { value: "oxford", label: "Oxford" },
    ],
  },
];

function SchoolPicker({ size, placeholder = "Search schools" }: { size?: "xs" | "sm" | "default" | "lg"; placeholder?: string }) {
  return (
    <Combobox items={SCHOOLS}>
      <ComboboxInput size={size} placeholder={placeholder} />
      <ComboboxPopup>
        <ComboboxEmpty>No schools match.</ComboboxEmpty>
        <ComboboxList>
          {(s: School) => (
            <ComboboxItem key={s.value} value={s}>
              {s.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

export default function ComboboxDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import {
  Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup,
} from "@/components/ui/combobox";

const schools = [
  { value: "yale", label: "Yale" },
  { value: "brown", label: "Brown" },
];

<Combobox items={schools}>
  <ComboboxInput placeholder="Search schools" />
  <ComboboxPopup>
    <ComboboxEmpty>No schools match.</ComboboxEmpty>
    <ComboboxList>
      {(s) => <ComboboxItem key={s.value} value={s}>{s.label}</ComboboxItem>}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>`}
        />
      </DocSection>

      <DocSection
        title="When to use it"
        description="Type to narrow, then pick one. Use it when the list is long enough that scrolling is a chore, about ten options or more: schools, countries, majors. For a handful of options use Select; for free text with no list, Input."
      >
        <Grid>
          <Example
            title="Pick a school"
            note="The list opens as you type and filters on the label. Arrow keys move, Enter picks, Esc closes."
            code={`<Combobox items={schools}>
  <ComboboxInput placeholder="Search schools" />
  <ComboboxPopup>
    <ComboboxEmpty>No schools match.</ComboboxEmpty>
    <ComboboxList>
      {(s) => <ComboboxItem key={s.value} value={s}>{s.label}</ComboboxItem>}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>`}
          >
            <div className="w-full max-w-xs">
              <SchoolPicker />
            </div>
          </Example>
          <Example
            title="Nothing matches"
            note="Say so in a plain sentence, in pebble. Try typing “Oxford” here."
            code={`<ComboboxEmpty>No schools match.</ComboboxEmpty>`}
          >
            <div className="w-full max-w-xs">
              <SchoolPicker placeholder="Try “Oxford”" />
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Grouped" description="Group long lists under an eyebrow label, the same one Select uses. Groups with no matches disappear as you type.">
        <Grid cols={1}>
          <Example
            title="By country"
            code={`const groups = [
  { value: "United States", items: [{ value: "yale", label: "Yale" }, …] },
  { value: "United Kingdom", items: [{ value: "oxford", label: "Oxford" }, …] },
];

<Combobox items={groups}>
  <ComboboxInput placeholder="Search schools" />
  <ComboboxPopup>
    <ComboboxEmpty>No schools match.</ComboboxEmpty>
    <ComboboxList>
      {(g) => (
        <ComboboxGroup key={g.value} items={g.items}>
          <ComboboxGroupLabel>{g.value}</ComboboxGroupLabel>
          <ComboboxCollection>
            {(s) => <ComboboxItem key={s.value} value={s}>{s.label}</ComboboxItem>}
          </ComboboxCollection>
        </ComboboxGroup>
      )}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>`}
          >
            <div className="w-full max-w-xs">
              <Combobox items={BY_COUNTRY}>
                <ComboboxInput placeholder="Search schools" />
                <ComboboxPopup>
                  <ComboboxEmpty>No schools match.</ComboboxEmpty>
                  <ComboboxList>
                    {(g: (typeof BY_COUNTRY)[number]) => (
                      <ComboboxGroup key={g.value} items={g.items}>
                        <ComboboxGroupLabel>{g.value}</ComboboxGroupLabel>
                        <ComboboxCollection>
                          {(s: School) => (
                            <ComboboxItem key={s.value} value={s}>
                              {s.label}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                      </ComboboxGroup>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Sizes" description="The input’s four heights, so a combobox lines up with the fields beside it.">
        <Grid cols={1}>
          <Example title="xs · sm · default · lg" code={`<ComboboxInput size="xs" />  // 32
<ComboboxInput size="sm" />  // 36
<ComboboxInput />            // 40
<ComboboxInput size="lg" />  // 48`}>
            <div className="flex w-full max-w-xs flex-col gap-3">
              <SchoolPicker size="xs" />
              <SchoolPicker size="sm" />
              <SchoolPicker />
              <SchoolPicker size="lg" />
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["items", "T[] | { value, items: T[] }[]", "—", "On Combobox. The options, flat or grouped; it filters them as you type."],
            ["value · onValueChange", "T | null", "—", "On Combobox. The picked option, controlled."],
            ["defaultValue", "T | null", "null", "On Combobox. The picked option, uncontrolled."],
            ["size", "xs | sm | default | lg", "default", "On ComboboxInput. Same heights as Input."],
            ["showClear", "boolean", "true", "On ComboboxInput. The × to empty the field."],
            ["showTrigger", "boolean", "true", "On ComboboxInput. The chevrons that open the list without typing."],
          ]}
          note="Options are objects with a label; the label is what is shown and searched. Every other prop on Combobox is Base UI’s."
        />
      </DocSection>
    </>
  );
}
