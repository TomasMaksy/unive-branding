"use client";

import { cn } from "cn";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const ESSAY = (
  <p className="squircle bg-mist px-4 py-3 text-graphite text-sm [--sq:var(--radius-xl)]">“Why Yale” · 640 words · edited 3 minutes ago</p>
);

/**
 * The dialog drawn in place, not in a portal, so a tile can show how it
 * looks when open. Same surface, header and footer as DialogPopup.
 */
function Specimen({
  title,
  description,
  panel,
  className,
  children,
}: {
  title: string;
  description: string;
  panel?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("squircle relative w-full max-w-md bg-white text-ink shadow-frame [--sq:var(--radius-3xl)]", className)}>
      <DialogHeader>
        <p className="font-heading font-light text-2xl text-ink leading-tight tracking-[-0.03em]">{title}</p>
        <p className="text-[15px] text-graphite leading-relaxed">{description}</p>
      </DialogHeader>
      {panel ? <div className="px-7 py-2">{panel}</div> : null}
      {children}
      <span aria-hidden className="absolute end-3 top-3 grid size-8 place-items-center text-pebble">
        <XIcon className="size-4" />
      </span>
    </div>
  );
}

export default function DialogDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import {
  Dialog, DialogClose, DialogDescription, DialogFooter,
  DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Submit essay</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Submit this essay?</DialogTitle>
      <DialogDescription>Your counsellor will be notified.</DialogDescription>
    </DialogHeader>
    <DialogPanel>…</DialogPanel>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Not yet</DialogClose>
      <DialogClose render={<Button />}>Submit</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>`}
        />
      </DocSection>

      <DocSection
        title="Button layouts"
        description={
          <>
            Set <code className="text-ink">layout</code> on <code className="text-ink">DialogFooter</code>. Write the buttons
            secondary first, primary last; the footer orders them for the screen. Each tile shows the dialog as it opens;
            press “Open it” for the real one, and make the window narrow to see phones.
          </>
        }
      >
        <Grid cols={1}>
          <Example
            title="inline"
            note="The default. A row on the right; on phones, stacked full width with the primary on top."
            tone="paper"
            stageClassName="flex-col gap-5"
            code={`<DialogFooter>
  <DialogClose render={<Button variant="secondary" />}>Not yet</DialogClose>
  <DialogClose render={<Button />}>Submit</DialogClose>
</DialogFooter>`}
          >
            <Specimen
              title="Submit this essay?"
              description="Your counsellor will be notified and can start leaving notes."
              panel={ESSAY}
            >
              <DialogFooter>
                <Button variant="secondary">Not yet</Button>
                <Button>Submit</Button>
              </DialogFooter>
            </Specimen>
            <Dialog>
              <DialogTrigger render={<Button variant="ghost" size="sm" />}>Open it</DialogTrigger>
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Submit this essay?</DialogTitle>
                  <DialogDescription>Your counsellor will be notified and can start leaving notes.</DialogDescription>
                </DialogHeader>
                <DialogPanel>{ESSAY}</DialogPanel>
                <DialogFooter>
                  <DialogClose render={<Button variant="secondary" />}>Not yet</DialogClose>
                  <DialogClose render={<Button />}>Submit</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </Example>
          <Example
            title="stacked"
            note="Always full width, primary on top. One decision that matters, or a narrow dialog."
            tone="paper"
            stageClassName="flex-col gap-5"
            code={`<DialogPopup className="max-w-sm">
  …
  <DialogFooter layout="stacked">
    <DialogClose render={<Button variant="secondary" size="lg" />}>Not now</DialogClose>
    <DialogClose render={<Button size="lg" />}>Turn on reminders</DialogClose>
  </DialogFooter>
</DialogPopup>`}
          >
            <Specimen
              className="max-w-sm"
              title="Never miss a deadline"
              description="We’ll remind you a week before each one, and again the day before."
            >
              <DialogFooter layout="stacked">
                <Button variant="secondary" size="lg">Not now</Button>
                <Button size="lg">Turn on reminders</Button>
              </DialogFooter>
            </Specimen>
            <Dialog>
              <DialogTrigger render={<Button variant="ghost" size="sm" />}>Open it</DialogTrigger>
              <DialogPopup className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Never miss a deadline</DialogTitle>
                  <DialogDescription>We’ll remind you a week before each one, and again the day before.</DialogDescription>
                </DialogHeader>
                <DialogFooter layout="stacked">
                  <DialogClose render={<Button variant="secondary" size="lg" />}>Not now</DialogClose>
                  <DialogClose render={<Button size="lg" />}>Turn on reminders</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </Example>
          <Example
            title="split"
            note="A third action pinned left, away from the main pair: Delete, Learn more."
            tone="paper"
            stageClassName="flex-col gap-5"
            code={`<DialogPopup className="max-w-lg">
  …
  <DialogFooter layout="split">
    <Button variant="ghost">Delete draft</Button>
    <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
    <DialogClose render={<Button />}>Save</DialogClose>
  </DialogFooter>
</DialogPopup>`}
          >
            <Specimen
              className="max-w-lg"
              title="Save your changes?"
              description="You edited the second paragraph. Keep the new version?"
            >
              <DialogFooter layout="split">
                <Button variant="ghost" className="text-danger hover:text-danger">Delete draft</Button>
                <Button variant="secondary">Cancel</Button>
                <Button>Save</Button>
              </DialogFooter>
            </Specimen>
            <Dialog>
              <DialogTrigger render={<Button variant="ghost" size="sm" />}>Open it</DialogTrigger>
              <DialogPopup className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Save your changes?</DialogTitle>
                  <DialogDescription>You edited the second paragraph. Keep the new version?</DialogDescription>
                </DialogHeader>
                <DialogFooter layout="split">
                  <DialogClose render={<Button variant="ghost" className="text-danger hover:text-danger" />}>Delete draft</DialogClose>
                  <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
                  <DialogClose render={<Button />}>Save</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Examples">
        <Grid cols={3}>
          <Example
            title="Destructive"
            note="Name the thing in the title; the red button says exactly what happens."
            code={`<DialogPopup>
  <DialogHeader>
    <DialogTitle>Delete “Why Yale”?</DialogTitle>
    <DialogDescription>The essay and its 12 comments will be gone for good.</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose render={<Button variant="secondary" />}>Keep it</DialogClose>
    <DialogClose render={<Button variant="destructive" />}>Delete essay</DialogClose>
  </DialogFooter>
</DialogPopup>`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="destructive-outline" />}>Delete essay</DialogTrigger>
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Delete “Why Yale”?</DialogTitle>
                  <DialogDescription>The essay and its 12 comments will be gone for good.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="secondary" />}>Keep it</DialogClose>
                  <DialogClose render={<Button variant="destructive" />}>Delete essay</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </Example>
          <Example
            title="Form"
            note="Fields go in DialogPanel. Keyboard users land on the first field."
            code={`<DialogPopup>
  <DialogHeader>
    <DialogTitle>Invite a parent</DialogTitle>
    <DialogDescription>They can see the plan and deadlines, not your essays.</DialogDescription>
  </DialogHeader>
  <DialogPanel>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="parent@example.com" />
  </DialogPanel>
  <DialogFooter>
    <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
    <Button type="submit">Send invite</Button>
  </DialogFooter>
</DialogPopup>`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Invite a parent</DialogTrigger>
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Invite a parent</DialogTitle>
                  <DialogDescription>They can see the plan and deadlines, not your essays.</DialogDescription>
                </DialogHeader>
                <DialogPanel className="flex flex-col gap-2">
                  <Label htmlFor="d-invite">Email</Label>
                  <Input id="d-invite" type="email" placeholder="parent@example.com" />
                </DialogPanel>
                <DialogFooter>
                  <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
                  <DialogClose render={<Button />}>Send invite</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </Example>
          <Example
            title="One button"
            note="An acknowledgement. Drop the close button: there is only one way out."
            code={`<DialogPopup showCloseButton={false} className="max-w-sm">
  <DialogHeader>…</DialogHeader>
  <DialogFooter layout="stacked">
    <DialogClose render={<Button variant="meadow" size="lg" />}>See my plan</DialogClose>
  </DialogFooter>
</DialogPopup>`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Plan ready</DialogTrigger>
              <DialogPopup showCloseButton={false} className="max-w-sm">
                <DialogHeader className="pe-7">
                  <DialogTitle>Your plan is ready</DialogTitle>
                  <DialogDescription>Twelve schools, 31 deadlines, and the first thing to do this week.</DialogDescription>
                </DialogHeader>
                <DialogFooter layout="stacked">
                  <DialogClose render={<Button variant="meadow" size="lg" />}>See my plan</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["DialogFooter layout", "inline | stacked | split", "inline", "How the buttons sit. See Button layouts."],
            ["DialogPopup showCloseButton", "boolean", "true", "The × in the top corner."],
            ["DialogPopup className", "string", "max-w-md", "Width: max-w-sm for a quick question, max-w-lg for a form."],
            ["Dialog open / onOpenChange", "boolean / (open) => void", "—", "Control it from state instead of a trigger."],
          ]}
          note="A click opens it calm, with no focus ring; keyboard users land on the first control. Escape and the backdrop close it."
        />
      </DocSection>
    </>
  );
}
