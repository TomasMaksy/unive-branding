"use client";

import { ArrowRightIcon, CopyIcon, DownloadIcon, PlusIcon, SparklesIcon, Trash2Icon } from "lucide-react";
import { PressToLoad } from "@/components/book/press-to-load";
import { Button } from "@/components/ui/button";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

export default function ButtonDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Button } from "@/components/ui/button";

<Button>Save</Button>
<Button variant="secondary">Draft</Button>`}
        />
      </DocSection>

      <DocSection
        title="Brand"
        description="For pages and big moments: the landing hero, pricing, sign-up. Ink that grows 4% on hover. One per view."
      >
        <Grid>
          <Example
            title="brand · brand-outline"
            note="The pair on the landing page. Always size lg or larger."
            code={`<Button variant="brand" size="lg">Get started</Button>
<Button variant="brand-outline" size="lg">See a sample</Button>`}
          >
            <Button variant="brand" size="lg">Get started</Button>
            <Button variant="brand-outline" size="lg">See a sample</Button>
          </Example>
          <Example
            title="With an arrow"
            note="The arrow nudges right on hover."
            code={`<Button variant="brand" size="lg" className="group gap-1.5 pr-5">
  Get started
  <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
</Button>`}
          >
            <Button variant="brand" size="lg" className="group gap-1.5 pr-5">
              Get started
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="App"
        description="Everything inside the product. Ink is the main action, mist its quiet partner; meadow is for growth moments, red only for things that can’t be undone."
      >
        <Grid cols={3}>
          <Example title="default" note="The main action. One per surface." code={`<Button>Save</Button>`}>
            <Button>Save</Button>
          </Example>
          <Example title="secondary" note="Mist. Cancel, Draft, Not yet." code={`<Button variant="secondary">Not yet</Button>`}>
            <Button variant="secondary">Not yet</Button>
          </Example>
          <Example title="outline" note="White with a hairline, on cards." code={`<Button variant="outline">Edit</Button>`}>
            <Button variant="outline">Edit</Button>
          </Example>
          <Example title="ghost" note="No fill until hover. Toolbars, Skip." code={`<Button variant="ghost">Skip</Button>`}>
            <Button variant="ghost">Skip</Button>
          </Example>
          <Example title="meadow" note="Plan ready, milestone reached." code={`<Button variant="meadow">Build my plan</Button>`}>
            <Button variant="meadow">Build my plan</Button>
          </Example>
          <Example title="stone" note="A calm solid grey; the Generating button." code={`<Button variant="stone">Continue later</Button>`}>
            <Button variant="stone">Continue later</Button>
          </Example>
          <Example title="destructive" note="Deleting for good. Ask first." code={`<Button variant="destructive">Delete essay</Button>`}>
            <Button variant="destructive">Delete essay</Button>
          </Example>
          <Example title="destructive-outline" note="Removing something small." code={`<Button variant="destructive-outline">Remove</Button>`}>
            <Button variant="destructive-outline">Remove</Button>
          </Example>
          <Example title="link" note="Inline, in a sentence." code={`<Button variant="link">Learn more</Button>`}>
            <Button variant="link">Learn more</Button>
          </Example>
          <Example
            title="inverse"
            tone="ink"
            note="Solid white on photos and dark panels."
            code={`<Button variant="inverse">Open the roadmap</Button>`}
          >
            <Button variant="inverse">Open the roadmap</Button>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Sizes"
        description="The text grows with the button, as on iOS. Default (40 px) in the app, lg (48 px) on pages, 2xl fills its container for phone sign-up flows."
      >
        <Grid cols={1}>
          <Example
            title="xs · sm · default · lg · xl"
            code={`<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra large</Button>`}
          >
            <Button size="xs" variant="outline">Extra small</Button>
            <Button size="sm" variant="outline">Small</Button>
            <Button variant="outline">Default</Button>
            <Button size="lg" variant="outline">Large</Button>
            <Button size="xl" variant="outline">Extra large</Button>
          </Example>
          <Example
            title="Icon only"
            note="Square sizes for icons: icon-xs, icon-sm, icon, icon-lg, icon-xl. Always give them an aria-label."
            code={`<Button size="icon" variant="outline" aria-label="Add school">
  <PlusIcon />
</Button>`}
          >
            {(["icon-xs", "icon-sm", "icon", "icon-lg", "icon-xl"] as const).map((s) => (
              <Button key={s} size={s} variant="outline" aria-label="Add school">
                <PlusIcon />
              </Button>
            ))}
          </Example>
          <Example
            title="2xl"
            note="Full width, 64 px: the one action on a phone screen."
            stageClassName="px-6 md:px-24"
            code={`<Button size="2xl">Create my plan</Button>`}
          >
            <Button size="2xl">Create my plan</Button>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Loading"
        description="Press one: the label squeezes to the centre and blurs away while the flowing “un” grows out of the same spot. The button keeps its width, so nothing around it moves."
      >
        <Grid>
          <Example
            title="loading"
            note="For a short wait. The label turns into the loader and back."
            code={`const [saving, setSaving] = useState(false);

<Button loading={saving} onClick={save}>Save essay</Button>`}
          >
            <PressToLoad>Save essay</PressToLoad>
            <PressToLoad variant="meadow">Build my plan</PressToLoad>
            <PressToLoad variant="outline">Check grammar</PressToLoad>
          </Example>
          <Example
            title="loadingLabel"
            note="For a long wait, say what is happening: the “un” flows beside the label."
            code={`<Button variant="stone" size="lg" loading loadingLabel="Generating" />`}
          >
            <Button variant="stone" size="lg" loading loadingLabel="Generating" />
            <Button variant="stone" loading loadingLabel="Reading your essay" />
          </Example>
          <Example
            title="disabled"
            note="Faded to 48%. Prefer explaining why over disabling silently."
            code={`<Button disabled>Submit</Button>`}
          >
            <Button disabled>Submit</Button>
            <Button variant="secondary" disabled>Draft</Button>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="With icons" description="Icons sit before the label for the thing, after it for direction. They size themselves to the button.">
        <Grid cols={3}>
          <Example
            title="Leading"
            code={`<Button variant="outline">
  <DownloadIcon /> Download PDF
</Button>`}
          >
            <Button variant="outline">
              <DownloadIcon /> Download PDF
            </Button>
          </Example>
          <Example
            title="Trailing"
            code={`<Button>
  Continue <ArrowRightIcon />
</Button>`}
          >
            <Button>
              Continue <ArrowRightIcon />
            </Button>
          </Example>
          <Example
            title="Destructive"
            code={`<Button variant="destructive">
  <Trash2Icon /> Delete
</Button>`}
          >
            <Button variant="destructive">
              <Trash2Icon /> Delete
            </Button>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Layouts"
        description="Buttons in a row go secondary first, primary last, 8 px apart. On a phone they stack full width with the primary on top, closest to the thumb."
      >
        <Grid>
          <Example
            title="Row, right aligned"
            note="Forms and cards: the primary sits at the end."
            stageClassName="justify-end"
            code={`<div className="flex justify-end gap-2">
  <Button variant="secondary">Cancel</Button>
  <Button>Save</Button>
</div>`}
          >
            <div className="flex w-full justify-end gap-2">
              <Button variant="secondary">Cancel</Button>
              <Button>Save</Button>
            </div>
          </Example>
          <Example
            title="Stacked, full width"
            note="Phones, onboarding, one decision that matters."
            code={`<div className="flex flex-col-reverse gap-2 *:w-full">
  <Button variant="secondary" size="lg">Not now</Button>
  <Button size="lg">Turn on reminders</Button>
</div>`}
          >
            <div className="flex w-full max-w-xs flex-col-reverse gap-2 *:w-full">
              <Button variant="secondary" size="lg">Not now</Button>
              <Button size="lg">Turn on reminders</Button>
            </div>
          </Example>
          <Example
            title="Split"
            note="A third action pinned to the start, away from the others."
            code={`<div className="flex gap-2">
  <Button variant="ghost" className="me-auto">Delete</Button>
  <Button variant="secondary">Cancel</Button>
  <Button>Save</Button>
</div>`}
          >
            <div className="flex w-full gap-2">
              <Button variant="ghost" className="me-auto text-danger hover:text-danger">Delete</Button>
              <Button variant="secondary">Cancel</Button>
              <Button>Save</Button>
            </div>
          </Example>
          <Example
            title="Toolbar"
            note="Ghost icon buttons, 4 px apart, with tooltips."
            code={`<div className="flex gap-1">
  <Button size="icon-sm" variant="ghost" aria-label="Copy"><CopyIcon /></Button>
  <Button size="icon-sm" variant="ghost" aria-label="Improve"><SparklesIcon /></Button>
  <Button size="icon-sm" variant="ghost" aria-label="Delete"><Trash2Icon /></Button>
</div>`}
          >
            <div className="flex gap-1">
              <Button size="icon-sm" variant="ghost" aria-label="Copy"><CopyIcon /></Button>
              <Button size="icon-sm" variant="ghost" aria-label="Improve"><SparklesIcon /></Button>
              <Button size="icon-sm" variant="ghost" aria-label="Delete"><Trash2Icon /></Button>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["variant", "default | secondary | outline | ghost | link | meadow | stone | destructive | destructive-outline | inverse | brand | brand-outline", "default", "The look. See App and Brand above."],
            ["size", "xs | sm | default | lg | xl | 2xl | comfortable | icon-xs | icon-sm | icon | icon-lg | icon-xl", "default", "Height and text size together."],
            ["loading", "boolean", "false", "Morphs the label into the “un” and disables the button."],
            ["loadingLabel", "ReactNode", "—", "While loading, shows the “un” beside this label instead."],
            ["render", "ReactElement", "—", "Render as another element, e.g. a Next Link, keeping the styles."],
            ["disabled", "boolean", "false", "Faded and not pressable."],
          ]}
          note="Every other prop goes to the <button>."
        />
      </DocSection>
    </>
  );
}
