"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

export default function InputDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<Label htmlFor="name">Student name</Label>
<Input id="name" placeholder="Alex Morgan" />`}
        />
      </DocSection>

      <DocSection
        title="Default"
        description="A filled mist capsule with no border. While you type it turns white with a meadow ring, so the field you’re in is always the clear one. Put the label above it, 8 px away."
      >
        <Grid>
          <Example
            title="With a label"
            note="The label names the thing in a word or two. The placeholder shows an example, never the instructions."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="name">Student name</Label>
  <Input id="name" placeholder="Alex Morgan" />
</div>`}
          >
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Label htmlFor="in-name">Student name</Label>
              <Input id="in-name" placeholder="Alex Morgan" />
            </div>
          </Example>
          <Example
            title="With helper text"
            note="A pebble line underneath for what isn’t obvious. Link it with aria-describedby so screen readers read it too."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="school">High school</Label>
  <Input id="school" placeholder="Westfield Academy" aria-describedby="school-help" />
  <p id="school-help" className="text-[13px] text-pebble">
    As it appears on your transcript.
  </p>
</div>`}
          >
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Label htmlFor="in-school">High school</Label>
              <Input id="in-school" placeholder="Westfield Academy" aria-describedby="in-school-help" />
              <p id="in-school-help" className="text-[13px] text-pebble">
                As it appears on your transcript.
              </p>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Sizes"
        description="Default (40 px) in the app, the same height as a default button so they sit side by side. lg (48 px) on pages and sign-up, sm and xs for dense tables and filters."
      >
        <Grid cols={1}>
          <Example
            title="xs · sm · default · lg"
            code={`<Input size="xs" placeholder="Extra small" aria-label="Extra small" />
<Input size="sm" placeholder="Small" aria-label="Small" />
<Input placeholder="Default" aria-label="Default" />
<Input size="lg" placeholder="Large" aria-label="Large" />`}
          >
            <div className="flex w-full max-w-sm flex-col gap-3">
              <Input size="xs" placeholder="Extra small" aria-label="Extra small" />
              <Input size="sm" placeholder="Small" aria-label="Small" />
              <Input placeholder="Default" aria-label="Default" />
              <Input size="lg" placeholder="Large" aria-label="Large" />
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Search"
        description={
          <>
            Set <code className="text-ink">type=&quot;search&quot;</code> and the field draws its own magnifier and makes room for it.
            The browser’s clear button is hidden, so it looks the same everywhere.
          </>
        }
      >
        <Grid>
          <Example
            title="Search"
            note="Give it an aria-label: the icon is not a label."
            code={`<Input type="search" placeholder="Search schools" aria-label="Search schools" />`}
          >
            <div className="w-full max-w-sm">
              <Input type="search" placeholder="Search schools" aria-label="Search schools" />
            </div>
          </Example>
          <Example
            title="Search, small"
            note="In a toolbar or above a list."
            code={`<Input type="search" size="sm" placeholder="Filter essays" aria-label="Filter essays" />`}
          >
            <div className="w-full max-w-xs">
              <Input type="search" size="sm" placeholder="Filter essays" aria-label="Filter essays" />
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="States"
        description={
          <>
            Set <code className="text-ink">aria-invalid</code> on a field that needs fixing: it takes a soft red fill and a red
            ring, and the ring stays red while you type in it. Underneath, one line in danger ink says what to do, not what went
            wrong.
          </>
        }
      >
        <Grid>
          <Example
            title="Error"
            note="“Add the rest of the email address”, not “Invalid email”. Show it once they leave the field, not on every key."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="email">Parent email</Label>
  <Input id="email" type="email" defaultValue="alex@" aria-invalid aria-describedby="email-error" />
  <p id="email-error" className="text-[13px] text-danger-ink">
    Add the rest of the email address, like alex@example.com.
  </p>
</div>`}
          >
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Label htmlFor="in-email">Parent email</Label>
              <Input id="in-email" type="email" defaultValue="alex@" aria-invalid aria-describedby="in-email-error" />
              <p id="in-email-error" className="text-[13px] text-danger-ink">
                Add the rest of the email address, like alex@example.com.
              </p>
            </div>
          </Example>
          <Example
            title="Disabled"
            note="Faded to 48%. Say why nearby, or leave it editable."
            code={`<div className="flex flex-col gap-2">
  <Label htmlFor="counsellor">Counsellor</Label>
  <Input id="counsellor" defaultValue="Ms Patel" disabled />
  <p className="text-[13px] text-pebble">Your school sets this.</p>
</div>`}
          >
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Label htmlFor="in-counsellor">Counsellor</Label>
              <Input id="in-counsellor" defaultValue="Ms Patel" disabled />
              <p className="text-[13px] text-pebble">Your school sets this.</p>
            </div>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Examples"
        description="Fields stack 16 px apart. Two short ones can share a row on wider screens; the action sits at the end."
      >
        <Grid>
          <Example
            title="A small form"
            note="Two fields side by side, one under the other on a phone."
            code={`<form className="flex flex-col gap-4">
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="flex flex-col gap-2">
      <Label htmlFor="first">First name</Label>
      <Input id="first" placeholder="Alex" />
    </div>
    <div className="flex flex-col gap-2">
      <Label htmlFor="last">Last name</Label>
      <Input id="last" placeholder="Morgan" />
    </div>
  </div>
  <div className="flex justify-end">
    <Button type="submit">Continue</Button>
  </div>
</form>`}
          >
            <form className="flex w-full max-w-md flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="in-first">First name</Label>
                  <Input id="in-first" placeholder="Alex" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="in-last">Last name</Label>
                  <Input id="in-last" placeholder="Morgan" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Example>
          <Example
            title="Field and button"
            note="Both 40 px, so they line up without help."
            code={`<form className="flex flex-col gap-2">
  <Label htmlFor="code">Class code</Label>
  <div className="flex gap-2">
    <Input id="code" placeholder="WEST-24" />
    <Button type="submit">Join</Button>
  </div>
</form>`}
          >
            <form className="flex w-full max-w-sm flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Label htmlFor="in-code">Class code</Label>
              <div className="flex gap-2">
                <Input id="in-code" placeholder="WEST-24" />
                <Button type="submit">Join</Button>
              </div>
            </form>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["size", "xs | sm | default | lg | number", "default", "Height and padding: 32, 36, 40 or 48 px. A number sets the native size attribute instead."],
            ["type", "string", "text", "search adds the magnifier. Use email, tel and url for the right phone keyboard."],
            ["aria-invalid", "boolean", "—", "The error look: soft red fill and a red ring."],
            ["disabled", "boolean", "false", "Faded to 48% and not editable."],
            ["className", "string", "—", "Goes on the capsule around the input, e.g. a width."],
            ["inputClassName", "string", "—", "Goes on the <input> itself."],
            ["unstyled", "boolean", "false", "Drops the capsule, for a bare input inside your own wrapper."],
            ["nativeInput", "boolean", "false", "Renders a plain <input> instead of Base UI’s."],
          ]}
          note="Every other prop goes to the <input>."
        />
      </DocSection>
    </>
  );
}
