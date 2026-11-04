"use client";

import {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  BookOpen,
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  ClockIcon,
  Component,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  Images,
  InfoIcon,
  LayoutGrid,
  LightbulbIcon,
  LinkIcon,
  type LucideIcon,
  MonitorPlay,
  MoreHorizontalIcon,
  Palette,
  PanelLeftClose,
  Shapes,
  PencilIcon,
  PlusIcon,
  SchoolIcon,
  SearchIcon,
  Share2Icon,
  Signature,
  SparklesIcon,
  StarIcon,
  Trash2Icon,
  TriangleAlertIcon,
  Type,
  UserPlusIcon,
  WalletIcon,
  Waves,
  XIcon,
} from "lucide-react";
import { useState } from "react";

type Entry = { icon: LucideIcon; name: string; use: string };

/** The icons the product and this book use, by job. Names are Lucide's. */
const SETS: { title: string; entries: Entry[] }[] = [
  {
    title: "Actions",
    entries: [
      { icon: PlusIcon, name: "Plus", use: "Add" },
      { icon: PencilIcon, name: "Pencil", use: "Edit" },
      { icon: CopyIcon, name: "Copy", use: "Copy, duplicate" },
      { icon: DownloadIcon, name: "Download", use: "Download a file" },
      { icon: Share2Icon, name: "Share2", use: "Share" },
      { icon: LinkIcon, name: "Link", use: "Copy link" },
      { icon: ArchiveIcon, name: "Archive", use: "Archive" },
      { icon: Trash2Icon, name: "Trash2", use: "Delete" },
      { icon: SearchIcon, name: "Search", use: "Search fields" },
      { icon: MoreHorizontalIcon, name: "MoreHorizontal", use: "More actions" },
    ],
  },
  {
    title: "Status",
    entries: [
      { icon: CircleCheckIcon, name: "CircleCheck", use: "Done, saved" },
      { icon: TriangleAlertIcon, name: "TriangleAlert", use: "Warning" },
      { icon: CircleAlertIcon, name: "CircleAlert", use: "Error" },
      { icon: InfoIcon, name: "Info", use: "Information" },
      { icon: ClockIcon, name: "Clock", use: "Time left" },
      { icon: BellIcon, name: "Bell", use: "Reminders" },
      { icon: CheckIcon, name: "Check", use: "Ticked, chosen" },
    ],
  },
  {
    title: "Things",
    entries: [
      { icon: FileTextIcon, name: "FileText", use: "Essay, document" },
      { icon: CalendarIcon, name: "Calendar", use: "Deadline, date" },
      { icon: SchoolIcon, name: "School", use: "University" },
      { icon: WalletIcon, name: "Wallet", use: "Financial aid" },
      { icon: UserPlusIcon, name: "UserPlus", use: "Invite someone" },
      { icon: SparklesIcon, name: "Sparkles", use: "Improve with AI" },
      { icon: LightbulbIcon, name: "Lightbulb", use: "Tip" },
      { icon: StarIcon, name: "Star", use: "Favourite" },
    ],
  },
  {
    title: "Direction",
    entries: [
      { icon: ArrowRightIcon, name: "ArrowRight", use: "Continue, go" },
      { icon: ArrowLeftIcon, name: "ArrowLeft", use: "Back" },
      { icon: ChevronRightIcon, name: "ChevronRight", use: "Opens more" },
      { icon: ChevronsUpDownIcon, name: "ChevronsUpDown", use: "Select" },
      { icon: XIcon, name: "X", use: "Close" },
      { icon: PanelLeftClose, name: "PanelLeftClose", use: "Fold the sidebar" },
    ],
  },
  {
    title: "This book",
    entries: [
      { icon: BookOpen, name: "BookOpen", use: "Overview" },
      { icon: LayoutGrid, name: "LayoutGrid", use: "Moodboard" },
      { icon: Signature, name: "Signature", use: "Logo" },
      { icon: Palette, name: "Palette", use: "Colour" },
      { icon: Type, name: "Type", use: "Typography" },
      { icon: Images, name: "Images", use: "Imagery" },
      { icon: Shapes, name: "Shapes", use: "Icons" },
      { icon: Waves, name: "Waves", use: "Motion" },
      { icon: Component, name: "Component", use: "Components" },
      { icon: MonitorPlay, name: "MonitorPlay", use: "Landing preview" },
    ],
  },
];

/** One tile: the icon, its Lucide name (click to copy the import) and its job. */
function Tile({ icon: Icon, name, use }: Entry) {
  const [copied, setCopied] = useState(false);
  const component = `${name}Icon`;
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(component);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          // Clipboard blocked: the name is on the tile to type by hand.
        }
      }}
      aria-label={`Copy ${component}`}
      className="group squircle flex cursor-copy flex-col items-start gap-5 bg-white p-4 text-left shadow-warm transition-shadow duration-200 [--sq:var(--radius-2xl)] hover:shadow-warm-lg"
    >
      <span className="grid size-10 place-items-center rounded-full bg-paper text-ink transition-[scale] duration-300 ease-[cubic-bezier(.3,1.4,.5,1)] group-hover:scale-110 group-active:scale-95">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate font-mono text-[12px] text-ink">{copied ? "Copied" : name}</span>
        <span className="text-pebble text-xs">{use}</span>
      </span>
    </button>
  );
}

export function IconSet() {
  return (
    <div className="flex flex-col gap-10">
      {SETS.map((set) => (
        <div key={set.title} className="flex flex-col gap-3">
          <p className="eyebrow text-pebble">{set.title}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {set.entries.map((e) => (
              <Tile key={e.name} {...e} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
