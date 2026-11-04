"use client";

import {
  ArrowRightIcon,
  CalendarIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  FileTextIcon,
  InfoIcon,
  PlusIcon,
  StarIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useState } from "react";
import { UnLoader } from "@/components/brand/un-loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Menu, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuSeparator, MenuShortcut, MenuTrigger } from "@/components/ui/menu";
import { Progress } from "@/components/ui/progress";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col gap-5 rounded-[28px] bg-white p-6 shadow-warm md:p-8 ${className}`}>
      <p className="eyebrow text-pebble">{title}</p>
      {children}
    </div>
  );
}

export function Buttons() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Brand, for pages and big moments">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="brand" size="lg">
            Buy now
          </Button>
          <Button variant="brand-outline" size="lg">
            Talk to us
          </Button>
          <Button variant="brand" size="lg" className="group gap-1.5 pr-5">
            Get started
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
        <p className="text-graphite text-xs leading-relaxed">
          Ink capsule that grows 4% on hover and sinks a touch when pressed. One per view.
        </p>
      </Panel>
      <Panel title="App, for everything inside the product">
        <div className="flex flex-wrap items-center gap-2">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="secondary">Draft</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="link">Learn more</Button>
          <Button variant="meadow">
            Build my plan
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="destructive">Delete essay</Button>
          <Button variant="destructive-outline">Remove</Button>
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
          <Button size="icon" variant="outline" aria-label="Add">
            <PlusIcon />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs" variant="outline">
            xs
          </Button>
          <Button size="sm" variant="outline">
            sm
          </Button>
          <Button variant="outline">default</Button>
          <Button size="lg" variant="outline">
            lg
          </Button>
          <Button size="xl" variant="outline">
            xl
          </Button>
        </div>
      </Panel>
    </div>
  );
}

export function Fields() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Text">
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-name">Student name</Label>
          <Input id="f-name" placeholder="Alex Morgan" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-email">Parent email</Label>
          <Input id="f-email" defaultValue="alex@" aria-invalid />
          <p className="text-[13px] text-danger-ink">Add the rest of the email address.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-note">Note to your counsellor</Label>
          <Textarea id="f-note" placeholder="What should we focus on this week?" />
        </div>
      </Panel>
      <Panel title="Select">
        <div className="flex flex-col gap-2">
          <Label>Intended major</Label>
          <Select defaultValue="cs" items={[{ value: "cs", label: "Computer science" }, { value: "bio", label: "Biology" }, { value: "eco", label: "Economics" }, { value: "eng", label: "English" }]}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              <SelectItem value="cs">Computer science</SelectItem>
              <SelectItem value="bio">Biology</SelectItem>
              <SelectItem value="eco">Economics</SelectItem>
              <SelectItem value="eng">English</SelectItem>
            </SelectPopup>
          </Select>
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          <Label>Application round</Label>
          <RadioGroup defaultValue="ed">
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
      </Panel>
      <Panel title="Toggles">
        <Label className="font-normal">
          <Checkbox defaultChecked /> Remind me about deadlines
        </Label>
        <Label className="font-normal">
          <Checkbox /> Share progress with my counsellor
        </Label>
        <Separator />
        <Label className="justify-between font-normal">
          Weekly summary email
          <Switch defaultChecked />
        </Label>
        <Label className="justify-between font-normal">
          Scholarship alerts
          <Switch />
        </Label>
        <Separator />
        <p className="flex items-center gap-1.5 text-graphite text-xs">
          Search <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </p>
      </Panel>
    </div>
  );
}

/** An icon toggle: outlined when off, filled meadow when on. */
function FavouriteToggle() {
  const [on, setOn] = useState(false);
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="ghost" size="icon" aria-label="Favourite" aria-pressed={on} onClick={() => setOn((v) => !v)} />}
      >
        <StarIcon
          className={on ? "scale-110 fill-meadow text-meadow" : "text-ink"}
          style={{ transition: "scale 300ms cubic-bezier(.3,1.4,.5,1), color 160ms, fill 160ms" }}
        />
      </TooltipTrigger>
      <TooltipPopup>{on ? "Remove from favourites" : "Add to favourites"}</TooltipPopup>
    </Tooltip>
  );
}

/** Toasts share the menu's surface: a white squircle with a soft shadow. */
const TOAST =
  "squircle flex gap-3 bg-white px-4 py-3.5 text-[15px] text-ink [--sq:var(--radius-xl)] shadow-[0_8px_28px_rgb(29_27_24/0.10),0_0_0_1px_rgb(29_27_24/0.06)]";

export function Feedback() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Alerts">
        <Alert variant="success">
          <CircleCheckIcon />
          <AlertTitle>Essay submitted</AlertTitle>
          <AlertDescription>Your counsellor will reply within two days.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <TriangleAlertIcon />
          <AlertTitle>Two deadlines this week</AlertTitle>
          <AlertDescription>Yale on Friday, Brown on Sunday.</AlertDescription>
        </Alert>
        <Alert variant="error">
          <CircleAlertIcon />
          <AlertTitle>Upload failed</AlertTitle>
          <AlertDescription>That file is over 10 MB. Try a PDF.</AlertDescription>
        </Alert>
        <Alert variant="info">
          <InfoIcon />
          <AlertTitle>Prompts updated</AlertTitle>
          <AlertDescription>Stanford released this year’s short questions.</AlertDescription>
        </Alert>
      </Panel>
      <div className="flex flex-col gap-4">
        <Panel title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge>Draft</Badge>
            <Badge variant="success">Accepted</Badge>
            <Badge variant="warning">Due soon</Badge>
            <Badge variant="error">Missing</Badge>
          </div>
          <p className="text-graphite text-xs">Neutral, then the three states. That’s all a badge needs.</p>
        </Panel>
        <Panel title="Toasts">
          {[
            { icon: <CircleCheckIcon className="size-5 fill-success text-white" />, t: "Saved", d: "Your changes are in." },
            { icon: <CircleAlertIcon className="size-5 fill-danger text-white" />, t: "Couldn’t connect", d: "We’ll retry in a moment." },
          ].map((x) => (
            <div key={x.t} className={`${TOAST} items-start`}>
              <span>{x.icon}</span>
              <div className="flex flex-col">
                <span className="font-medium">{x.t}</span>
                <span className="text-graphite">{x.d}</span>
              </div>
            </div>
          ))}
          <div className={`${TOAST} items-center`}>
            <span className="grid h-5 w-6 shrink-0 place-items-center"><UnLoader size={14} className="block text-ink" /></span>
            <span className="font-medium">Generating feedback…</span>
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function Overlays() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Tabs">
        <Tabs defaultValue="essays">
          <TabsList>
            <TabsTab value="essays">Essays</TabsTab>
            <TabsTab value="schools">Schools</TabsTab>
            <TabsTab value="aid">Financial aid</TabsTab>
          </TabsList>
          <TabsPanel value="essays" className="pt-4 text-graphite text-sm">
            Three drafts in progress, one ready for review.
          </TabsPanel>
          <TabsPanel value="schools" className="pt-4 text-graphite text-sm">
            Twelve schools on your list.
          </TabsPanel>
          <TabsPanel value="aid" className="pt-4 text-graphite text-sm">
            FAFSA opens on 1 October.
          </TabsPanel>
        </Tabs>
        <Tabs defaultValue="week">
          <TabsList variant="underline">
            <TabsTab value="week">This week</TabsTab>
            <TabsTab value="month">This month</TabsTab>
            <TabsTab value="all">All</TabsTab>
          </TabsList>
        </Tabs>
      </Panel>
      <Panel title="Dialog, menu, tooltip">
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Submit this essay?</DialogTitle>
                <DialogDescription>Your counsellor will be notified and can start leaving notes.</DialogDescription>
              </DialogHeader>
              <DialogPanel>
                <p className="squircle bg-mist px-4 py-3 text-graphite text-sm [--sq:var(--radius-xl)]">“Why Yale” · 640 words · edited 3 minutes ago</p>
              </DialogPanel>
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Not yet</DialogClose>
                <DialogClose render={<Button />}>Submit</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
          <Menu>
            <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
            <MenuPopup>
              <MenuGroup>
                <MenuGroupLabel>Essay</MenuGroupLabel>
                <MenuItem>
                  <FileTextIcon /> Duplicate <MenuShortcut>⌘D</MenuShortcut>
                </MenuItem>
                <MenuItem>
                  <CalendarIcon /> Set deadline
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuItem variant="destructive">Delete</MenuItem>
            </MenuPopup>
          </Menu>
          <FavouriteToggle />
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["AM", "JL", "RK"].map((i, n) => (
              <Avatar key={i} className="ring-2 ring-white">
                <AvatarFallback className={["bg-mist text-ink", "bg-meadow-soft text-meadow-ink", "bg-mist text-dusk"][n]}>{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-graphite text-sm">3 counsellors on this plan</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Application</span>
            <span className="text-pebble tabular-nums">64%</span>
          </div>
          <Progress value={64} />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      </Panel>
    </div>
  );
}

export function Cards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Card</CardTitle>
          <CardDescription>The base container in the app.</CardDescription>
        </CardHeader>
        <CardPanel className="text-graphite text-sm">A white squircle on paper with the warm shadow. No border.</CardPanel>
        <CardFooter className="gap-2">
          <Button size="sm">Open</Button>
          <Button size="sm" variant="ghost">
            Later
          </Button>
        </CardFooter>
      </Card>

      <article className="flex flex-col gap-4 rounded-2xl bg-surface p-5 lg:p-6">
        <h3 className="font-heading font-light text-lg text-graphite tracking-[-0.03em]">Nearest deadlines</h3>
        <ul className="flex flex-col">
          {[
            ["Yale", "Early action", "Nov 1", "bg-warning"],
            ["Brown", "Supplement", "Nov 3", "bg-meadow"],
            ["MIT", "Portfolio", "Nov 12", "bg-input"],
          ].map(([s, k, d, dot]) => (
            <li key={s} className="group squircle -mx-2 flex items-center gap-3 px-2 py-2 transition-colors duration-150 ease-out [--sq:var(--radius-lg)] hover:bg-surface-hover">
              <span className={`size-2 shrink-0 transition-transform duration-[260ms] ease-[cubic-bezier(.3,1.3,.5,1)] group-hover:translate-x-1 rounded-full ${dot}`} />
              <span className="flex-1 text-ink text-sm">
                {s} <span className="text-pebble">· {k}</span>
              </span>
              <span className="text-graphite text-sm tabular-nums">{d}</span>
            </li>
          ))}
        </ul>
      </article>

      {/* Review: who first (avatar, name), then meadow star tiles that
          catch the eye, then their words in plain Inter. */}
      <article className="squircle flex flex-col gap-4 bg-white p-6 shadow-warm [--sq:28px]">
        <div className="flex items-center gap-3.5">
          <Avatar className="size-12">
            <AvatarFallback className="bg-meadow-soft font-medium text-meadow-ink">MC</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-semibold text-base text-ink leading-tight">Maya Chen</span>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="grid size-5 place-items-center rounded-[3px] bg-meadow">
                    <StarIcon className="size-3.5 fill-white text-white" strokeWidth={0} />
                  </span>
                ))}
              </span>
              <span className="text-pebble text-sm">Parent · 2 weeks ago</span>
            </div>
          </div>
        </div>
        <p className="text-[15px] text-graphite leading-relaxed">
          “Applications used to take over our kitchen table. Now there is one plan, the deadlines are in it, and my
          daughter actually knows what to do next. Her counsellor’s notes arrive before we think to ask.”
        </p>
      </article>

      <article className="squircle flex flex-col gap-6 bg-white p-6 shadow-warm-lg [--sq:28px] md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">Pro</h3>
          <Badge variant="success">Save 20%</Badge>
        </div>
        <ul className="flex flex-col gap-3 border-border border-t pt-6 text-graphite text-sm">
          {["Unlimited essay feedback", "A counsellor on call", "Scholarship matching"].map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-mist text-dusk">
                <CircleCheckIcon className="size-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Button variant="brand" size="lg">
          Choose Pro
        </Button>
      </article>

      <article className="squircle relative flex min-h-56 flex-col justify-end overflow-hidden bg-meadow-soft p-6 [--sq:var(--radius-3xl)]">
        <div className="squircle absolute top-6 right-6 left-10 bg-white p-4 shadow-warm-xs [--sq:var(--radius-2xl)]">
          <p className="font-medium text-ink text-sm">Feedback on paragraph 2</p>
          <p className="mt-1 text-graphite text-xs">Show the robotics club, don’t tell it.</p>
        </div>
        <p className="relative font-heading font-light text-ink text-xl tracking-[-0.03em]">Feature frame</p>
      </article>

      <article className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-4xl border border-border border-dashed bg-white p-6 text-center">
        <UnLoader variant="write" size={44} className="text-meadow" />
        <div className="flex flex-col gap-1">
          <p className="font-heading font-light text-ink text-xl tracking-[-0.03em]">Building your plan</p>
          <p className="text-pebble text-sm">Empty and loading states use the “un”.</p>
        </div>
      </article>
    </div>
  );
}
