"use client";

import { GlobeIcon } from "lucide-react";
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
  ComboboxValue,
} from "@/components/ui/combobox";
import { Flag } from "@/components/ui/flag";
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

type Country = { value: string; label: string };

const COUNTRIES: Country[] = [
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "DK", label: "Denmark" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "HK", label: "Hong Kong" },
  { value: "IE", label: "Ireland" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "LT", label: "Lithuania" },
  { value: "NL", label: "Netherlands" },
  { value: "SG", label: "Singapore" },
  { value: "ES", label: "Spain" },
  { value: "CH", label: "Switzerland" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
];

type Field = { value: string; label: string; area: string };

const FIELDS: Field[] = [
  { value: "cs", label: "Computer Science", area: "Engineering & Technology" },
  { value: "ds", label: "Data Science", area: "Engineering & Technology" },
  { value: "ee", label: "Electrical Engineering", area: "Engineering & Technology" },
  { value: "econ", label: "Economics", area: "Social Sciences" },
  { value: "ppe", label: "Philosophy, Politics and Economics", area: "Social Sciences" },
  { value: "psych", label: "Psychology", area: "Social Sciences" },
  { value: "bio", label: "Biology", area: "Natural Sciences" },
  { value: "biochem", label: "Biochemistry and Molecular Biology", area: "Natural Sciences" },
  { value: "phys", label: "Physics", area: "Natural Sciences" },
  { value: "arch", label: "Architecture", area: "Arts & Design" },
  { value: "hist", label: "History", area: "Humanities" },
  { value: "med", label: "Medicine", area: "Health" },
];

type University = { value: string; label: string; city: string; country: string };

const UNIVERSITIES: University[] = [
  { value: "eth", label: "ETH Zurich", city: "Zurich", country: "CH" },
  { value: "harvard", label: "Harvard University", city: "Cambridge, Massachusetts", country: "US" },
  { value: "imperial", label: "Imperial College London", city: "London", country: "GB" },
  { value: "kth", label: "KTH Royal Institute of Technology", city: "Stockholm", country: "SE" },
  { value: "mit", label: "Massachusetts Institute of Technology", city: "Cambridge, Massachusetts", country: "US" },
  { value: "nus", label: "National University of Singapore", city: "Singapore", country: "SG" },
  { value: "oxford", label: "University of Oxford", city: "Oxford", country: "GB" },
  { value: "tud", label: "TU Delft", city: "Delft", country: "NL" },
  { value: "tum", label: "Technical University of Munich", city: "Munich", country: "DE" },
  { value: "ubc", label: "University of British Columbia", city: "Vancouver", country: "CA" },
  { value: "vu", label: "Vilnius University", city: "Vilnius", country: "LT" },
  { value: "yale", label: "Yale University", city: "New Haven, Connecticut", country: "US" },
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
            title="Enter picks the best match"
            note="The first match is always highlighted, so Enter never just closes the list. Type “Yale” and press Enter."
            code={`<Combobox items={schools}>  // autoHighlight is on by default`}
          >
            <div className="w-full max-w-xs">
              <SchoolPicker placeholder="Type “Yale”, then Enter" />
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

      <DocSection
        title="With flags"
        description="Countries, nationalities, where a school is: anything tied to a country gets its flag before the name. The flag is the emoji the product already uses (flagFromCountryCode), at 18px. Show the picked country’s flag in the input too, through ComboboxValue."
      >
        <Grid cols={1}>
          <Example
            title="Country"
            code={`import { Flag } from "@/components/ui/flag";

<Combobox items={countries}>
  <ComboboxInput
    placeholder="Search countries"
    leading={<ComboboxValue>{(c) => (c ? <Flag code={c.value} /> : <GlobeIcon />)}</ComboboxValue>}
  />
  <ComboboxPopup>
    <ComboboxEmpty>No countries match.</ComboboxEmpty>
    <ComboboxList>
      {(c) => (
        <ComboboxItem key={c.value} value={c} leading={<Flag code={c.value} />}>
          {c.label}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>`}
          >
            <div className="w-full max-w-xs">
              <Combobox items={COUNTRIES}>
                <ComboboxInput
                  placeholder="Search countries"
                  leading={<ComboboxValue>{(c: Country | null) => (c ? <Flag code={c.value} /> : <GlobeIcon />)}</ComboboxValue>}
                />
                <ComboboxPopup>
                  <ComboboxEmpty>No countries match.</ComboboxEmpty>
                  <ComboboxList>
                    {(c: Country) => (
                      <ComboboxItem key={c.value} value={c} leading={<Flag code={c.value} />}>
                        {c.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Two-line rows"
        description="For onboarding, where a name alone is not enough to pick the right one. The label is the headline, in ink, up to two lines; description is one quieter line under it, in pebble. Only the label is searched."
      >
        <Grid>
          <Example
            title="Field of study"
            note="The broad area under the field, so two fields with similar names are easy to tell apart."
            code={`<ComboboxItem value={f} description={\`Broad area: \${f.area}\`}>
  {f.label}
</ComboboxItem>`}
          >
            <div className="w-full max-w-xs">
              <Combobox items={FIELDS}>
                <ComboboxInput placeholder="Search fields of study" />
                <ComboboxPopup>
                  <ComboboxEmpty>No fields match.</ComboboxEmpty>
                  <ComboboxList>
                    {(f: Field) => (
                      <ComboboxItem key={f.value} value={f} description={`Broad area: ${f.area}`}>
                        {f.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
            </div>
          </Example>
          <Example
            title="University"
            note="Flag, name, and the city under it. Two lines and a flag is as rich as a row gets."
            code={`<ComboboxItem
  value={u}
  leading={<Flag code={u.country} />}
  description={u.city}
>
  {u.label}
</ComboboxItem>`}
          >
            <div className="w-full max-w-xs">
              <Combobox items={UNIVERSITIES}>
                <ComboboxInput
                  placeholder="Search universities"
                  leading={<ComboboxValue>{(u: University | null) => (u ? <Flag code={u.country} /> : null)}</ComboboxValue>}
                />
                <ComboboxPopup>
                  <ComboboxEmpty>No universities match.</ComboboxEmpty>
                  <ComboboxList>
                    {(u: University) => (
                      <ComboboxItem key={u.value} value={u} leading={<Flag code={u.country} />} description={u.city}>
                        {u.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
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
            ["autoHighlight", "boolean", "true", "On Combobox. Highlight the first match as you type, so Enter picks it."],
            ["size", "xs | sm | default | lg", "default", "On ComboboxInput. Same heights as Input."],
            ["showClear", "boolean", "true", "On ComboboxInput. The × to empty the field."],
            ["showTrigger", "boolean", "true", "On ComboboxInput. The chevrons that open the list without typing."],
            ["leading", "ReactNode", "—", "On ComboboxInput and ComboboxItem. A flag or icon before the text."],
            ["description", "ReactNode", "—", "On ComboboxItem. A second line in pebble; the row becomes two lines."],
            ["indicatorProps", "ItemIndicator props", "—", "On ComboboxItem. { hidden: true } for rows that never show a check, like “Add …”."],
          ]}
          note="Options are objects with a label; the label is what is shown and searched. Every other prop on Combobox is Base UI’s."
        />
      </DocSection>
    </>
  );
}
