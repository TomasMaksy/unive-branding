"use client";

import { CircleCheckIcon, FileTextIcon, StarIcon, Trash2Icon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Toast } from "@/components/ui/toast";

/** Small, inert previews for the index cards: the real components, scaled to fit. */
const MENU_ROW = "squircle flex h-8 items-center gap-2 px-2.5 text-sm [--sq:var(--radius-md)] [&>svg]:size-3.5 [&>svg]:text-pebble";

const PREVIEWS: Record<string, React.ReactNode> = {
  button: (
    <div className="flex gap-2">
      <Button variant="secondary">Not yet</Button>
      <Button>Submit</Button>
    </div>
  ),
  input: <Input placeholder="Alex Morgan" className="w-56" />,
  textarea: (
    <div className="squircle flex h-20 w-56 items-start bg-mist px-4 py-3 text-pebble text-sm [--sq:var(--radius-xl)]">What should we focus on?</div>
  ),
  select: (
    <div className="flex h-10 w-48 items-center justify-between rounded-full bg-mist px-4 text-[15px] text-ink">
      Biology <span className="text-pebble">⌄</span>
    </div>
  ),
  checkbox: (
    <div className="flex flex-col gap-2.5 text-ink text-sm">
      <span className="flex items-center gap-2.5"><Checkbox defaultChecked /> Remind me</span>
      <span className="flex items-center gap-2.5"><Checkbox /> Share progress</span>
    </div>
  ),
  radio: (
    <RadioGroup defaultValue="ea" className="gap-2.5 text-ink text-sm">
      <span className="flex items-center gap-2.5"><Radio value="ed" /> Early decision</span>
      <span className="flex items-center gap-2.5"><Radio value="ea" /> Early action</span>
    </RadioGroup>
  ),
  switch: (
    <div className="flex items-center gap-3">
      <Switch defaultChecked />
      <Switch />
    </div>
  ),
  tabs: (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTab value="a">Essays</TabsTab>
        <TabsTab value="b">Schools</TabsTab>
      </TabsList>
    </Tabs>
  ),
  dialog: (
    <div className="squircle flex w-60 flex-col gap-3 bg-white p-4 shadow-frame [--sq:var(--radius-2xl)]">
      <span className="font-heading font-light text-ink text-lg leading-tight tracking-[-0.03em]">Submit this essay?</span>
      <div className="flex justify-end gap-1.5">
        <Button size="xs" variant="secondary">Not yet</Button>
        <Button size="xs">Submit</Button>
      </div>
    </div>
  ),
  menu: (
    <div className="squircle flex w-44 flex-col bg-white p-1 text-ink shadow-[0_8px_28px_rgb(29_27_24/0.10),0_0_0_1px_rgb(29_27_24/0.06)] [--sq:var(--radius-xl)]">
      <span className={`${MENU_ROW} bg-mist`}><FileTextIcon /> Duplicate</span>
      <span className={`${MENU_ROW} text-danger [&>svg]:text-danger`}><Trash2Icon /> Delete</span>
    </div>
  ),
  tooltip: (
    <div className="flex flex-col items-center gap-1.5">
      <span className="rounded-[10px] bg-white px-2.5 py-1.5 font-medium text-[13px] text-ink shadow-warm-lg ring-[0.5px] ring-(--hairline)">Add to favourites</span>
      <Button variant="ghost" size="icon" aria-label="Favourite">
        <StarIcon className="fill-meadow text-meadow" />
      </Button>
    </div>
  ),
  alert: (
    <Alert variant="success" className="w-60">
      <CircleCheckIcon />
      <AlertTitle>Essay submitted</AlertTitle>
    </Alert>
  ),
  toast: <Toast title="Saved" description="Your changes are in." className="w-60" />,
  badge: (
    <div className="flex gap-1.5">
      <Badge variant="success">Accepted</Badge>
      <Badge variant="warning">Due soon</Badge>
    </div>
  ),
  card: (
    <div className="squircle flex w-52 flex-col gap-2 bg-white p-4 shadow-warm [--sq:var(--radius-2xl)]">
      <span className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="grid size-4 place-items-center rounded-[3px] bg-meadow">
            <StarIcon className="size-3 fill-white text-white" strokeWidth={0} />
          </span>
        ))}
      </span>
      <span className="text-graphite text-xs leading-relaxed">“My daughter actually knows what to do next.”</span>
    </div>
  ),
  avatar: (
    <div className="flex -space-x-2">
      {["AM", "JL", "RK"].map((i, n) => (
        <Avatar key={i} className="ring-2 ring-white">
          <AvatarFallback className={["bg-mist text-ink", "bg-meadow-soft text-meadow-ink", "bg-mist text-dusk"][n]}>{i}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** A client component, so the server page can place it (plain JSX can't cross). */
export function Preview({ slug }: { slug: string }) {
  return <>{PREVIEWS[slug]}</>;
}
