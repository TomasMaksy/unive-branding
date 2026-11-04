"use client";

import { FileTextIcon, SchoolIcon, WalletIcon } from "lucide-react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

const PANEL = "pt-4 text-graphite text-sm";

export default function TabsDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

<Tabs defaultValue="essays">
  <TabsList>
    <TabsTab value="essays">Essays</TabsTab>
    <TabsTab value="schools">Schools</TabsTab>
  </TabsList>
  <TabsPanel value="essays">…</TabsPanel>
  <TabsPanel value="schools">…</TabsPanel>
</Tabs>`}
        />
      </DocSection>

      <DocSection
        title="Segmented"
        description="The default, after iOS: a mist capsule with the active tab a white capsule that slides across with a soft spring. For switching between views of the same thing, two to four short labels."
      >
        <Grid>
          <Example
            title="default"
            note="Labels of one or two words. The panel sits 16 px below."
            code={`<Tabs defaultValue="essays">
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
</Tabs>`}
          >
            <Tabs defaultValue="essays">
              <TabsList>
                <TabsTab value="essays">Essays</TabsTab>
                <TabsTab value="schools">Schools</TabsTab>
                <TabsTab value="aid">Financial aid</TabsTab>
              </TabsList>
              <TabsPanel value="essays" className={PANEL}>
                Three drafts in progress, one ready for review.
              </TabsPanel>
              <TabsPanel value="schools" className={PANEL}>
                Twelve schools on your list.
              </TabsPanel>
              <TabsPanel value="aid" className={PANEL}>
                FAFSA opens on 1 October.
              </TabsPanel>
            </Tabs>
          </Example>
          <Example
            title="Full width"
            note="w-full on the list and the tabs spread to fill it. Phones, and the top of a narrow card."
            code={`<Tabs defaultValue="student">
  <TabsList className="w-full">
    <TabsTab value="student">Student</TabsTab>
    <TabsTab value="parent">Parent</TabsTab>
    <TabsTab value="counsellor">Counsellor</TabsTab>
  </TabsList>
</Tabs>`}
          >
            <Tabs defaultValue="student" className="w-full max-w-sm">
              <TabsList className="w-full">
                <TabsTab value="student">Student</TabsTab>
                <TabsTab value="parent">Parent</TabsTab>
                <TabsTab value="counsellor">Counsellor</TabsTab>
              </TabsList>
            </Tabs>
          </Example>
          <Example
            title="With icons"
            note="An icon before the label sizes itself to the tab. Keep the words."
            code={`<TabsList>
  <TabsTab value="essays"><FileTextIcon /> Essays</TabsTab>
  <TabsTab value="schools"><SchoolIcon /> Schools</TabsTab>
  <TabsTab value="aid"><WalletIcon /> Aid</TabsTab>
</TabsList>`}
          >
            <Tabs defaultValue="essays">
              <TabsList>
                <TabsTab value="essays">
                  <FileTextIcon /> Essays
                </TabsTab>
                <TabsTab value="schools">
                  <SchoolIcon /> Schools
                </TabsTab>
                <TabsTab value="aid">
                  <WalletIcon /> Aid
                </TabsTab>
              </TabsList>
            </Tabs>
          </Example>
          <Example
            title="A tab not ready yet"
            note="disabled on a TabsTab fades it to 48% and skips it with the arrow keys."
            code={`<TabsList>
  <TabsTab value="plan">Plan</TabsTab>
  <TabsTab value="essays">Essays</TabsTab>
  <TabsTab value="results" disabled>Results</TabsTab>
</TabsList>`}
          >
            <Tabs defaultValue="plan">
              <TabsList>
                <TabsTab value="plan">Plan</TabsTab>
                <TabsTab value="essays">Essays</TabsTab>
                <TabsTab value="results" disabled>
                  Results
                </TabsTab>
              </TabsList>
            </Tabs>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Underline"
        description={
          <>
            <code className="text-ink">variant=&quot;underline&quot;</code>: no capsule, an ink line slides under the active tab. For
            sections of a page or a long list, where a segmented control would feel too heavy, or for more than four tabs.
          </>
        }
      >
        <Grid>
          <Example
            title="underline"
            note="Filters over a list: the content below changes, the page stays."
            code={`<Tabs defaultValue="week">
  <TabsList variant="underline">
    <TabsTab value="week">This week</TabsTab>
    <TabsTab value="month">This month</TabsTab>
    <TabsTab value="all">All</TabsTab>
  </TabsList>
  <TabsPanel value="week" className="pt-4 text-graphite text-sm">
    Two deadlines: Brown on Friday, Yale on Sunday.
  </TabsPanel>
  <TabsPanel value="month" className="pt-4 text-graphite text-sm">
    Seven deadlines, three essays due.
  </TabsPanel>
  <TabsPanel value="all" className="pt-4 text-graphite text-sm">
    31 deadlines across twelve schools.
  </TabsPanel>
</Tabs>`}
          >
            <Tabs defaultValue="week">
              <TabsList variant="underline">
                <TabsTab value="week">This week</TabsTab>
                <TabsTab value="month">This month</TabsTab>
                <TabsTab value="all">All</TabsTab>
              </TabsList>
              <TabsPanel value="week" className={PANEL}>
                Two deadlines: Brown on Friday, Yale on Sunday.
              </TabsPanel>
              <TabsPanel value="month" className={PANEL}>
                Seven deadlines, three essays due.
              </TabsPanel>
              <TabsPanel value="all" className={PANEL}>
                31 deadlines across twelve schools.
              </TabsPanel>
            </Tabs>
          </Example>
          <Example
            title="Vertical"
            note={`orientation="vertical" puts the list beside the panel, the line on its left edge. Settings pages.`}
            code={`<Tabs defaultValue="profile" orientation="vertical" className="gap-6">
  <TabsList variant="underline">
    <TabsTab value="profile">Profile</TabsTab>
    <TabsTab value="family">Family</TabsTab>
    <TabsTab value="reminders">Reminders</TabsTab>
  </TabsList>
  <TabsPanel value="profile" className="text-graphite text-sm">Your name, school and year.</TabsPanel>
  <TabsPanel value="family" className="text-graphite text-sm">Who can see your plan.</TabsPanel>
  <TabsPanel value="reminders" className="text-graphite text-sm">When we email you.</TabsPanel>
</Tabs>`}
          >
            <Tabs defaultValue="profile" orientation="vertical" className="w-full max-w-sm gap-6">
              <TabsList variant="underline">
                <TabsTab value="profile">Profile</TabsTab>
                <TabsTab value="family">Family</TabsTab>
                <TabsTab value="reminders">Reminders</TabsTab>
              </TabsList>
              <TabsPanel value="profile" className="text-graphite text-sm">
                Your name, school and year.
              </TabsPanel>
              <TabsPanel value="family" className="text-graphite text-sm">
                Who can see your plan.
              </TabsPanel>
              <TabsPanel value="reminders" className="text-graphite text-sm">
                When we email you.
              </TabsPanel>
            </Tabs>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Which one"
        description="Both switch what’s shown without leaving the page. If a tab would change the URL or open somewhere new, it’s navigation, not tabs."
      >
        <Grid>
          <div className="squircle flex flex-col gap-2 bg-white p-6 shadow-warm [--sq:28px]">
            <span className="font-medium text-ink text-sm">Segmented</span>
            <p className="text-graphite text-sm leading-relaxed">
              Two to four views of the same thing, side by side in weight: Essays and Schools, Student and Parent. Inside cards, dialogs and
              on phones, full width where it is the first thing in the card.
            </p>
          </div>
          <div className="squircle flex flex-col gap-2 bg-white p-6 shadow-warm [--sq:28px]">
            <span className="font-medium text-ink text-sm">Underline</span>
            <p className="text-graphite text-sm leading-relaxed">
              Sections of a page, filters over a list, or more tabs than fit a capsule. Quieter, so it can sit under a heading without
              competing with it.
            </p>
          </div>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["Tabs defaultValue / value", "string", "—", "The open tab."],
            ["Tabs onValueChange", "(value) => void", "—", "Called with the new tab’s value."],
            ["Tabs orientation", "horizontal | vertical", "horizontal", "vertical puts the list beside the panels."],
            ["TabsList variant", "default | underline", "default", "Segmented capsule, or a sliding underline."],
            ["TabsList className", "string", "w-fit", "w-full stretches the tabs to fill the width."],
            ["TabsTab value", "string", "—", "Matches the panel it opens. Required."],
            ["TabsTab disabled", "boolean", "false", "Faded to 48% and skipped by the arrow keys."],
            ["TabsPanel value", "string", "—", "The tab it belongs to."],
            ["TabsPanel keepMounted", "boolean", "false", "Keeps a hidden panel in the page, e.g. to keep a half-typed form."],
          ]}
          note="Arrow keys move between tabs; Tab moves into the panel. TabsTrigger and TabsContent are the same as TabsTab and TabsPanel."
        />
      </DocSection>
    </>
  );
}
