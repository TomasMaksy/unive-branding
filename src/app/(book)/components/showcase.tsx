"use client";

import {
  ArrowRightIcon,
  CalendarIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  FileTextIcon,
  InfoIcon,
  PlusIcon,
  SparklesIcon,
  StarIcon,
  TriangleAlertIcon,
} from "lucide-react";
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
          <Button variant="brand" className="h-12 px-7 text-base sm:h-12 sm:text-base">
            Buy now
          </Button>
          <Button variant="brand-outline" className="h-12 px-7 text-base sm:h-12 sm:text-base">
            Talk to us
          </Button>
          <Button variant="brand" className="group h-12 gap-1.5 pr-6 pl-7 text-base sm:h-12 sm:text-base">
            Get started
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
        <p className="text-graphite text-xs leading-relaxed">
          From the landing hero: ink fill, rounded-xl, grows 5% on hover. One per view.
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
            <SparklesIcon />
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
          <p className="text-destructive-foreground text-xs">Add the rest of the email address.</p>
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
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Accepted</Badge>
            <Badge variant="warning">Due soon</Badge>
            <Badge variant="error">Missing</Badge>
            <Badge variant="info">New</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-success-soft px-2.5 py-1 font-semibold text-success-foreground text-xs">Done</span>
            <span className="inline-flex items-center rounded-full bg-meadow-soft px-2.5 py-1 font-semibold text-meadow-ink text-xs">Current</span>
            <span className="inline-flex items-center rounded-full bg-paper-hover px-2.5 py-1 font-semibold text-graphite text-xs">Next</span>
            <span className="inline-flex items-center rounded-full bg-paper px-2.5 py-1 font-semibold text-pebble text-xs">Upcoming</span>
          </div>
          <p className="text-graphite text-xs">Roadmap stages are pills; statuses are badges.</p>
        </Panel>
        <Panel title="Toasts">
          {[
            { icon: <CircleCheckIcon className="size-4 text-success" />, t: "Saved", d: "Your changes are in." },
            { icon: <CircleAlertIcon className="size-4 text-destructive" />, t: "Couldn’t connect", d: "We’ll retry in a moment." },
          ].map((x) => (
            <div key={x.t} className="flex items-start gap-2.5 rounded-lg border bg-popover px-3.5 py-3 text-sm shadow-lg/5">
              <span className="mt-0.5">{x.icon}</span>
              <div className="flex flex-col">
                <span className="font-medium">{x.t}</span>
                <span className="text-muted-foreground">{x.d}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2.5 rounded-lg border bg-popover px-3.5 py-3 text-sm shadow-lg/5">
            <UnLoader size={14} className="text-ink" />
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
                <p className="text-graphite text-sm">“Why Yale” · 640 words · last edited 3 minutes ago</p>
              </DialogPanel>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>Not yet</DialogClose>
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
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Favourite" />}>
              <StarIcon />
            </TooltipTrigger>
            <TooltipPopup>Add to favourites</TooltipPopup>
          </Tooltip>
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["AM", "JL", "RK"].map((i, n) => (
              <Avatar key={i} className="ring-2 ring-white">
                <AvatarFallback className={["bg-sand text-ink", "bg-meadow-soft text-meadow-ink", "bg-linen text-dusk"][n]}>{i}</AvatarFallback>
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
        <CardPanel className="text-graphite text-sm">White on paper, rounded-2xl, a hairline border and a soft shadow.</CardPanel>
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
            ["MIT", "Portfolio", "Nov 12", "bg-clay"],
          ].map(([s, k, d, dot]) => (
            <li key={s} className="flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-surface-hover">
              <span className={`size-2 rounded-full ${dot}`} />
              <span className="flex-1 text-ink text-sm">
                {s} <span className="text-pebble">· {k}</span>
              </span>
              <span className="text-graphite text-sm tabular-nums">{d}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="flex flex-col items-start gap-3 rounded-2xl bg-white px-5 py-5 shadow-warm">
        <div className="flex gap-0.5 text-[#F5B400]">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className="size-4 fill-current" strokeWidth={0} />
          ))}
        </div>
        <p className="font-heading font-light text-ink text-lg leading-snug">“Sample review text sits here, in Averia, in the reviewer’s own words.”</p>
        <div className="flex items-center gap-2.5">
          <Avatar>
            <AvatarFallback className="bg-sand text-ink">SR</AvatarFallback>
          </Avatar>
          <span className="text-graphite text-sm">Review card · sample</span>
        </div>
      </article>

      <article className="flex flex-col gap-6 rounded-[28px] p-6 shadow-warm-lg md:p-8" style={{ backgroundImage: "var(--gradient-linen)" }}>
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">Pro</h3>
          <span className="rounded-full bg-success-soft px-2.5 py-0.5 font-medium text-success-foreground text-xs">Save 20%</span>
        </div>
        <ul className="flex flex-col gap-3 border-[#EEE9E5] border-t pt-6 text-graphite text-sm">
          {["Unlimited essay feedback", "A counsellor on call", "Scholarship matching"].map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-sand text-brick">
                <CircleCheckIcon className="size-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Button variant="brand" className="h-11 sm:h-11">
          Choose Pro
        </Button>
      </article>

      <article className="relative flex min-h-56 flex-col justify-end overflow-hidden rounded-3xl p-6" style={{ backgroundImage: "var(--gradient-sage)" }}>
        <div className="absolute top-6 right-6 left-10 rounded-2xl rounded-tl-md border border-[#dfe5d6] bg-white p-4 shadow-[0_3px_14px_rgba(80,63,84,0.06)]">
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
