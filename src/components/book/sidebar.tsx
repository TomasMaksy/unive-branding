"use client";

import { cn } from "cn";
import { Menu, MonitorPlay, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Mark, Wordmark } from "@/components/brand/logo";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GROUPS, PAGES } from "./pages";
import { SIDEBAR_KEY } from "./sidebar-state";

const isActive = (href: string, path: string) => (href === "/" ? path === "/" : path.startsWith(href));

/**
 * One row: icon and label. On the folded rail the label fades out and a
 * tooltip carries it instead.
 */
function Item({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
  onNavigate,
  trailing,
}: {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  active?: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
  trailing?: React.ReactNode;
}) {
  const link = (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? label : undefined}
      className={cn(
        "flex h-10 items-center gap-3 overflow-hidden rounded-full pr-3 pl-[15px] font-medium text-sm outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring",
        active ? "bg-ink text-paper" : "text-graphite hover:bg-paper-hover hover:text-ink",
      )}
    >
      {Icon ? <Icon className="size-[18px] shrink-0" aria-hidden /> : null}
      <span className="flex-1 truncate whitespace-nowrap transition-opacity duration-200 collapsed:opacity-0">{label}</span>
      {trailing}
    </Link>
  );
  return (
    <Tooltip disabled={!collapsed}>
      <TooltipTrigger render={link} />
      <TooltipPopup side="right" sideOffset={10}>
        {label}
      </TooltipPopup>
    </Tooltip>
  );
}

function Contents({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const path = usePathname();
  return (
    <nav aria-label="Brand book" className="flex flex-col gap-5">
      {GROUPS.map((g) => (
        <div key={g.label} className="flex flex-col gap-0.5">
          <div className="relative flex h-7 items-center px-[15px]">
            <p className="eyebrow whitespace-nowrap text-pebble transition-opacity duration-200 collapsed:opacity-0">
              {g.label}
            </p>
            {/* On the rail the group names become hairlines. */}
            <span
              aria-hidden
              className="absolute inset-x-3 top-1/2 hidden h-px bg-border collapsed:block"
            />
          </div>
          <ul className="flex flex-col gap-0.5">
            {g.pages.map((p) => (
              <li key={p.href}>
                <Item {...p} active={isActive(p.href, path)} collapsed={collapsed} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/**
 * The book's navigation. On large screens a sidebar that folds to an icon
 * rail (the toggle at its foot, or ⌘B); below that, a top bar and a drawer.
 */
export function Sidebar() {
  const path = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const page = PAGES.find((p) => isActive(p.href, path));

  // The layout's script already set the attribute; mirror it into state.
  useEffect(() => {
    setCollapsed(document.documentElement.dataset.sidebar === "collapsed");
  }, []);

  const toggle = useCallback(() => {
    setCollapsed((was) => {
      const next = !was;
      if (next) document.documentElement.dataset.sidebar = "collapsed";
      else delete document.documentElement.dataset.sidebar;
      try {
        localStorage.setItem(SIDEBAR_KEY, next ? "collapsed" : "expanded");
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [drawer]);

  const toggleButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!collapsed}
      className="flex h-10 w-full items-center gap-3 overflow-hidden rounded-full pr-3 pl-[15px] font-medium text-graphite text-sm outline-none transition-colors hover:bg-paper-hover hover:text-ink focus-visible:ring-2 focus-visible:ring-ring"
    >
      {collapsed ? (
        <PanelLeftOpen className="size-[18px] shrink-0" aria-hidden />
      ) : (
        <PanelLeftClose className="size-[18px] shrink-0" aria-hidden />
      )}
      <span className="flex-1 whitespace-nowrap text-left transition-opacity duration-200 collapsed:opacity-0">
        Collapse
      </span>
      <kbd className="whitespace-nowrap font-sans text-[11px] text-pebble transition-opacity duration-200 collapsed:opacity-0">
        ⌘B
      </kbd>
    </button>
  );

  return (
    <TooltipProvider delay={150}>
      {/* Large screens: a sidebar that folds to a rail. */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-border border-r bg-paper transition-[width] duration-300 ease-unive lg:flex collapsed:w-18">
        <Link
          href="/"
          className="relative flex h-18 shrink-0 items-center gap-3 overflow-hidden px-6 text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          aria-label="Unive brand book, home"
        >
          <span className="flex items-center gap-3 whitespace-nowrap transition-opacity duration-200 collapsed:opacity-0">
            <Wordmark title="" className="w-[76px] shrink-0" />
            <span className="eyebrow mt-1 text-pebble">Brand</span>
          </span>
          <Mark
            title=""
            className="absolute left-1/2 w-8 -translate-x-1/2 opacity-0 transition-opacity duration-200 collapsed:opacity-100"
          />
        </Link>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 pt-1 pb-6 [scrollbar-width:none]">
          <Contents collapsed={collapsed} />
        </div>

        <div className="flex shrink-0 flex-col gap-0.5 border-border border-t px-3 py-3">
          <Item
            href="/landing"
            label="Landing preview"
            icon={MonitorPlay}
            collapsed={collapsed}
            trailing={
              <span aria-hidden className="text-pebble transition-opacity duration-200 collapsed:opacity-0">
                ↗
              </span>
            }
          />
          <Tooltip disabled={!collapsed}>
            <TooltipTrigger render={toggleButton} />
            <TooltipPopup side="right" sideOffset={10}>
              Expand <span className="ml-1.5 text-pebble">⌘B</span>
            </TooltipPopup>
          </Tooltip>
        </div>
      </aside>

      {/* Small screens: top bar and drawer. */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-border/70 border-b bg-paper/90 px-4 backdrop-blur-md lg:hidden">
        <button
          type="button"
          aria-label="Open contents"
          aria-expanded={drawer}
          onClick={() => setDrawer(true)}
          className="-ml-1.5 grid size-9 place-items-center rounded-full text-ink hover:bg-paper-hover"
        >
          <Menu className="size-5" aria-hidden />
        </button>
        <Link href="/" className="text-ink" aria-label="Unive brand book, home">
          <Wordmark title="" className="w-[70px]" />
        </Link>
        {page && page.href !== "/" ? <span className="ml-auto truncate text-graphite text-sm">{page.label}</span> : null}
      </header>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-ink/30 transition-opacity duration-300 lg:hidden",
          drawer ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setDrawer(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contents"
        inert={!drawer}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] flex-col bg-paper shadow-frame transition-transform duration-300 ease-unive lg:hidden",
          drawer ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between px-5">
          <Mark title="" className="w-9 text-ink" />
          <button
            type="button"
            aria-label="Close contents"
            onClick={() => setDrawer(false)}
            className="-mr-1.5 grid size-9 place-items-center rounded-full text-ink hover:bg-paper-hover"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-2 pb-6">
          <Contents onNavigate={() => setDrawer(false)} />
        </div>
        <div className="shrink-0 border-border border-t px-3 py-3">
          <Item href="/landing" label="Landing preview" icon={MonitorPlay} collapsed={false} onNavigate={() => setDrawer(false)} />
        </div>
      </div>
    </TooltipProvider>
  );
}
