"use client";

import { cn } from "cn";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toast, type ToastVariant } from "@/components/ui/toast";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

type Item = {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
  undo?: boolean;
  leaving?: boolean;
};

/**
 * A small stack for the book: no queue lives in the app yet, so this
 * holds toasts in local state, shows each for ~3 s and fades it out.
 */
function ToastDemo() {
  const [items, setItems] = useState<Item[]>([]);
  const next = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const later = (ms: number, fn: () => void) => {
    const t = setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, ms);
    timers.current.add(t);
  };
  const patch = (id: number, p: Partial<Item>) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const dismiss = (id: number) => {
    patch(id, { leaving: true });
    later(200, () => setItems((xs) => xs.filter((x) => x.id !== id)));
  };
  const show = (t: Omit<Item, "id">, ms = 3000) => {
    const id = next.current++;
    setItems((xs) => [...xs.slice(-2), { ...t, id }]);
    if (ms) later(ms, () => dismiss(id));
    return id;
  };

  return (
    <div className="flex h-80 w-full flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={() => show({ variant: "success", title: "Saved", description: "Your changes are in." })}>Save</Button>
        <Button
          variant="outline"
          onClick={() => show({ variant: "info", title: "Essay deleted", undo: true }, 5000)}
        >
          Delete essay
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const id = show({ variant: "loading", title: "Generating feedback…" }, 0);
            later(2400, () => {
              patch(id, { variant: "success", title: "Feedback ready", description: "Six notes on paragraph two." });
              later(3000, () => dismiss(id));
            });
          }}
        >
          Get feedback
        </Button>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-end gap-2" aria-live="polite">
        {items.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            description={t.description}
            action={
              t.undo ? (
                <Button size="xs" variant="secondary" onClick={() => dismiss(t.id)}>
                  Undo
                </Button>
              ) : undefined
            }
            className={cn(
              "transition-[opacity,translate,scale] duration-200 ease-unive starting:translate-y-2 starting:scale-96 starting:opacity-0",
              t.leaving && "translate-y-2 scale-96 opacity-0",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function ToastDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Toast } from "@/components/ui/toast";

<Toast variant="success" title="Saved" description="Your changes are in." />`}
        />
      </DocSection>

      <DocSection
        title="Variants"
        description="A toast is a floating note that something happened, or is happening, away from where you’re looking. It shares the menu’s surface: a white squircle with a soft shadow, and a filled disc that says how it went."
      >
        <Grid>
          <Example
            title="success"
            note="It worked. The most common one, and the one to keep shortest."
            code={`<Toast variant="success" title="Saved" description="Your changes are in." />`}
          >
            <Toast variant="success" title="Saved" description="Your changes are in." />
          </Example>
          <Example
            title="error"
            note="It didn’t work. Say what happens next. Read out straight away (role=“alert”)."
            code={`<Toast variant="error" title="Couldn’t connect" description="We’ll retry in a moment." />`}
          >
            <Toast variant="error" title="Couldn’t connect" description="We’ll retry in a moment." />
          </Example>
          <Example
            title="warning"
            note="It worked, with a catch."
            code={`<Toast variant="warning" title="Saved offline" description="We’ll sync when you’re back online." />`}
          >
            <Toast variant="warning" title="Saved offline" description="We’ll sync when you’re back online." />
          </Example>
          <Example
            title="info"
            note="Something changed that you didn’t do: a counsellor left a note."
            code={`<Toast variant="info" title="New note from Ms Patel" description="On “Why Yale”, paragraph two." />`}
          >
            <Toast variant="info" title="New note from Ms Patel" description="On “Why Yale”, paragraph two." />
          </Example>
          <Example
            title="loading"
            note="Still going. The disc becomes the flowing “un”; swap the toast to success or error when it’s done."
            code={`<Toast variant="loading" title="Generating feedback…" />`}
          >
            <Toast variant="loading" title="Generating feedback…" />
          </Example>
          <Example
            title="Title only"
            note="Most toasts need one line. The icon centres on it."
            code={`<Toast variant="success" title="Copied to clipboard" />`}
          >
            <Toast variant="success" title="Copied to clipboard" />
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="With an action"
        description={
          <>
            One small button on the end, through <code className="text-ink">action</code>: Undo after something you can take
            back, Retry after something that failed. Never the only way to do it.
          </>
        }
      >
        <Grid>
          <Example
            title="Undo"
            code={`<Toast
  variant="info"
  title="Essay deleted"
  action={<Button size="xs" variant="secondary">Undo</Button>}
/>`}
          >
            <Toast
              variant="info"
              title="Essay deleted"
              action={
                <Button size="xs" variant="secondary">
                  Undo
                </Button>
              }
            />
          </Example>
          <Example
            title="Retry"
            code={`<Toast
  variant="error"
  title="Upload failed"
  description="Check your connection."
  action={<Button size="xs" variant="secondary">Retry</Button>}
/>`}
          >
            <Toast
              variant="error"
              title="Upload failed"
              description="Check your connection."
              action={
                <Button size="xs" variant="secondary">
                  Retry
                </Button>
              }
            />
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="In a stack"
        description="Toast is the surface only; there is no toaster or queue yet. Hold the list in state, show each for about three seconds (five with Undo), and keep three at most. They rise in from just below and fade out the same way."
      >
        <Grid cols={1}>
          <Example
            title="Try it"
            note="Save pops a toast; Delete offers Undo; Get feedback starts loading and turns into success."
            tone="paper"
            code={`const [toasts, setToasts] = useState([]);

function show(toast, ms = 3000) {
  const id = nextId++;
  setToasts((ts) => [...ts.slice(-2), { ...toast, id }]);
  setTimeout(() => dismiss(id), ms);
}

<Button onClick={() => show({ variant: "success", title: "Saved", description: "Your changes are in." })}>
  Save
</Button>

<div className="flex flex-col items-center justify-end gap-2" aria-live="polite">
  {toasts.map((t) => (
    <Toast
      key={t.id}
      {...t}
      className={cn(
        "transition-[opacity,translate,scale] duration-200 ease-unive starting:translate-y-2 starting:scale-96 starting:opacity-0",
        t.leaving && "translate-y-2 scale-96 opacity-0",
      )}
    />
  ))}
</div>`}
          >
            <ToastDemo />
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Writing them"
        description="The title says what happened in two or three words, past tense: Saved, Essay deleted, Invite sent. The description, if any, says what happens next. No exclamation marks, no “Successfully”."
      >
        <Grid cols={3}>
          <Example title="Do" note="Short, past tense, the thing named." code={`<Toast title="Invite sent" description="Alex’s parent will get an email." />`}>
            <Toast title="Invite sent" description="Alex’s parent will get an email." />
          </Example>
          <Example title="Don’t" note="Shouting, and saying nothing the title didn’t.">
            <Toast title="Success!" description="The invite was sent successfully." />
          </Example>
          <Example title="Do" note="For a failure, what happens now." code={`<Toast variant="error" title="Not sent" description="We’ll try again when you’re online." />`}>
            <Toast variant="error" title="Not sent" description="We’ll try again when you’re online." />
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["variant", "success | error | warning | info | loading", "success", "The disc: green tick, red mark, amber triangle, ink info, or the flowing “un”."],
            ["title", "ReactNode", "—", "What happened. Required."],
            ["description", "ReactNode", "—", "One line under it, in graphite."],
            ["action", "ReactNode", "—", "A small button on the end: Undo, Retry."],
            ["onDismiss", "() => void", "—", "Shows a small × that calls it. Timing and stacking stay with you."],
            ["className", "string", "max-w-sm", "Add the enter and leave transition here."],
          ]}
          note="Errors get role=“alert”, everything else role=“status”. Every other prop goes to the <div>."
        />
      </DocSection>
    </>
  );
}
