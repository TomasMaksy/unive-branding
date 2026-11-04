"use client";

import {
  ArchiveIcon,
  CalendarIcon,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  FolderInputIcon,
  LinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Share2Icon,
  Trash2Icon,
  UserPlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from "@/components/ui/menu";
import { DocSection, Example, Grid, Props, Usage } from "./kit";

export default function MenuDoc() {
  return (
    <>
      <DocSection title="Usage">
        <Usage
          code={`import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@/components/ui/menu";

<Menu>
  <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
  <MenuPopup>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive">Delete</MenuItem>
  </MenuPopup>
</Menu>`}
        />
      </DocSection>

      <DocSection
        title="Actions"
        description="A menu is for doing things to one thing: an essay, a school, a deadline. Rows are verbs, the most common first, the dangerous one last and red."
      >
        <Grid cols={3}>
          <Example
            title="Plain"
            note="Short verbs, no full stops. Up to about seven rows."
            code={`<Menu>
  <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
  <MenuPopup>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Download as PDF</MenuItem>
  </MenuPopup>
</Menu>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
              <MenuPopup>
                <MenuItem>Rename</MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>Download as PDF</MenuItem>
              </MenuPopup>
            </Menu>
          </Example>
          <Example
            title="With icons"
            note="Icons sit first and turn pebble, so the words lead."
            code={`<MenuPopup>
  <MenuItem><PencilIcon /> Rename</MenuItem>
  <MenuItem><CopyIcon /> Duplicate</MenuItem>
  <MenuItem><DownloadIcon /> Download as PDF</MenuItem>
</MenuPopup>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
              <MenuPopup>
                <MenuItem>
                  <PencilIcon /> Rename
                </MenuItem>
                <MenuItem>
                  <CopyIcon /> Duplicate
                </MenuItem>
                <MenuItem>
                  <DownloadIcon /> Download as PDF
                </MenuItem>
              </MenuPopup>
            </Menu>
          </Example>
          <Example
            title="Disabled"
            note="Faded and skipped by the keyboard. Keep it in place so the menu doesn’t jump."
            code={`<MenuPopup>
  <MenuItem><Share2Icon /> Share with counsellor</MenuItem>
  <MenuItem disabled><LinkIcon /> Copy public link</MenuItem>
</MenuPopup>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Share</MenuTrigger>
              <MenuPopup>
                <MenuItem>
                  <Share2Icon /> Share with counsellor
                </MenuItem>
                <MenuItem disabled>
                  <LinkIcon /> Copy public link
                </MenuItem>
              </MenuPopup>
            </Menu>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Groups and shortcuts"
        description={
          <>
            Group related rows under a small label, separate groups with a hairline. Put the shortcut on the end with{" "}
            <code className="text-ink">MenuShortcut</code>. Delete goes last, on its own, with{" "}
            <code className="text-ink">variant="destructive"</code>.
          </>
        }
      >
        <Grid>
          <Example
            title="Grouped, with a destructive row"
            note="The red row turns soft red when highlighted, so it never looks like the others."
            code={`<MenuPopup>
  <MenuGroup>
    <MenuGroupLabel>Essay</MenuGroupLabel>
    <MenuItem><FileTextIcon /> Duplicate <MenuShortcut>⌘D</MenuShortcut></MenuItem>
    <MenuItem><CalendarIcon /> Set deadline</MenuItem>
  </MenuGroup>
  <MenuSeparator />
  <MenuGroup>
    <MenuGroupLabel>Share</MenuGroupLabel>
    <MenuItem><UserPlusIcon /> Invite a parent</MenuItem>
    <MenuItem><LinkIcon /> Copy link <MenuShortcut>⌘L</MenuShortcut></MenuItem>
  </MenuGroup>
  <MenuSeparator />
  <MenuItem variant="destructive"><Trash2Icon /> Delete</MenuItem>
</MenuPopup>`}
          >
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
                <MenuGroup>
                  <MenuGroupLabel>Share</MenuGroupLabel>
                  <MenuItem>
                    <UserPlusIcon /> Invite a parent
                  </MenuItem>
                  <MenuItem>
                    <LinkIcon /> Copy link <MenuShortcut>⌘L</MenuShortcut>
                  </MenuItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuItem variant="destructive">
                  <Trash2Icon /> Delete
                </MenuItem>
              </MenuPopup>
            </Menu>
          </Example>
          <Example
            title="Inset"
            note="When only some rows have icons, inset the rest so the words line up."
            code={`<MenuPopup>
  <MenuItem><PencilIcon /> Rename</MenuItem>
  <MenuItem inset>Move to top</MenuItem>
  <MenuItem inset>Move to bottom</MenuItem>
</MenuPopup>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Arrange</MenuTrigger>
              <MenuPopup>
                <MenuItem>
                  <PencilIcon /> Rename
                </MenuItem>
                <MenuItem inset>Move to top</MenuItem>
                <MenuItem inset>Move to bottom</MenuItem>
              </MenuPopup>
            </Menu>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Choices"
        description="Some menus set things rather than do them. Checkbox and switch rows turn things on and off, radio rows pick one of a few. All three keep the menu open, so you can change a few at once."
      >
        <Grid cols={3}>
          <Example
            title="Checkbox items"
            note="Filters: which deadlines to show."
            code={`<MenuPopup>
  <MenuGroup>
    <MenuGroupLabel>Show</MenuGroupLabel>
    <MenuCheckboxItem defaultChecked>Essays</MenuCheckboxItem>
    <MenuCheckboxItem defaultChecked>Tests</MenuCheckboxItem>
    <MenuCheckboxItem>Financial aid</MenuCheckboxItem>
  </MenuGroup>
</MenuPopup>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Show</MenuTrigger>
              <MenuPopup>
                <MenuGroup>
                  <MenuGroupLabel>Show</MenuGroupLabel>
                  <MenuCheckboxItem defaultChecked>Essays</MenuCheckboxItem>
                  <MenuCheckboxItem defaultChecked>Tests</MenuCheckboxItem>
                  <MenuCheckboxItem>Financial aid</MenuCheckboxItem>
                </MenuGroup>
              </MenuPopup>
            </Menu>
          </Example>
          <Example
            title={`variant="switch"`}
            note="Settings that are on or off: reminders, sharing."
            code={`<MenuPopup>
  <MenuGroup>
    <MenuGroupLabel>Notifications</MenuGroupLabel>
    <MenuCheckboxItem variant="switch" defaultChecked>Deadline reminders</MenuCheckboxItem>
    <MenuCheckboxItem variant="switch">Weekly summary</MenuCheckboxItem>
  </MenuGroup>
</MenuPopup>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Notifications</MenuTrigger>
              <MenuPopup>
                <MenuGroup>
                  <MenuGroupLabel>Notifications</MenuGroupLabel>
                  <MenuCheckboxItem variant="switch" defaultChecked>
                    Deadline reminders
                  </MenuCheckboxItem>
                  <MenuCheckboxItem variant="switch">Weekly summary</MenuCheckboxItem>
                </MenuGroup>
              </MenuPopup>
            </Menu>
          </Example>
          <Example
            title="Radio items"
            note="Sort by: one of a few, the current one ticked."
            code={`<MenuPopup>
  <MenuGroup>
    <MenuGroupLabel>Sort by</MenuGroupLabel>
    <MenuRadioGroup defaultValue="deadline">
      <MenuRadioItem value="deadline">Nearest deadline</MenuRadioItem>
      <MenuRadioItem value="name">School name</MenuRadioItem>
      <MenuRadioItem value="added">Recently added</MenuRadioItem>
    </MenuRadioGroup>
  </MenuGroup>
</MenuPopup>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Sort by</MenuTrigger>
              <MenuPopup>
                <MenuGroup>
                  <MenuGroupLabel>Sort by</MenuGroupLabel>
                  <MenuRadioGroup defaultValue="deadline">
                    <MenuRadioItem value="deadline">Nearest deadline</MenuRadioItem>
                    <MenuRadioItem value="name">School name</MenuRadioItem>
                    <MenuRadioItem value="added">Recently added</MenuRadioItem>
                  </MenuRadioGroup>
                </MenuGroup>
              </MenuPopup>
            </Menu>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Submenu"
        description="One level deep, for a list that would crowd the main menu: which school, which folder. It opens to the side on hover or the right arrow key."
      >
        <Grid>
          <Example
            title="Move to"
            code={`<MenuPopup>
  <MenuItem><PencilIcon /> Rename</MenuItem>
  <MenuSub>
    <MenuSubTrigger><FolderInputIcon /> Move to</MenuSubTrigger>
    <MenuSubPopup>
      <MenuItem>Yale</MenuItem>
      <MenuItem>Brown</MenuItem>
      <MenuItem>MIT</MenuItem>
    </MenuSubPopup>
  </MenuSub>
  <MenuItem><ArchiveIcon /> Archive</MenuItem>
</MenuPopup>`}
          >
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>Essay</MenuTrigger>
              <MenuPopup>
                <MenuItem>
                  <PencilIcon /> Rename
                </MenuItem>
                <MenuSub>
                  <MenuSubTrigger>
                    <FolderInputIcon /> Move to
                  </MenuSubTrigger>
                  <MenuSubPopup>
                    <MenuItem>Yale</MenuItem>
                    <MenuItem>Brown</MenuItem>
                    <MenuItem>MIT</MenuItem>
                  </MenuSubPopup>
                </MenuSub>
                <MenuItem>
                  <ArchiveIcon /> Archive
                </MenuItem>
              </MenuPopup>
            </Menu>
          </Example>
        </Grid>
      </DocSection>

      <DocSection
        title="Examples"
        description="Most menus in the app hang off a ghost icon button at the end of a row. Align the popup to the end so it opens under the button, not off the card."
      >
        <Grid>
          <Example
            title="On a card row"
            note="A ghost icon-sm button with MoreHorizontal and an aria-label naming the thing."
            tone="paper"
            code={`<div className="squircle flex items-center gap-3 bg-white py-3 ps-4 pe-2 shadow-warm [--sq:var(--radius-xl)]">
  <FileTextIcon className="size-5 text-pebble" />
  <div className="flex min-w-0 flex-1 flex-col">
    <span className="font-medium text-ink text-sm">Why Yale</span>
    <span className="text-pebble text-xs">640 words · edited 3 minutes ago</span>
  </div>
  <Menu>
    <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Options for Why Yale" />}>
      <MoreHorizontalIcon />
    </MenuTrigger>
    <MenuPopup align="end">
      <MenuItem><PencilIcon /> Rename</MenuItem>
      <MenuItem><CopyIcon /> Duplicate <MenuShortcut>⌘D</MenuShortcut></MenuItem>
      <MenuItem><Share2Icon /> Share with counsellor</MenuItem>
      <MenuSeparator />
      <MenuItem variant="destructive"><Trash2Icon /> Delete essay</MenuItem>
    </MenuPopup>
  </Menu>
</div>`}
          >
            <div className="squircle flex w-full max-w-sm items-center gap-3 bg-white py-3 ps-4 pe-2 shadow-warm [--sq:var(--radius-xl)]">
              <FileTextIcon className="size-5 shrink-0 text-pebble" />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium text-ink text-sm">Why Yale</span>
                <span className="text-pebble text-xs">640 words · edited 3 minutes ago</span>
              </div>
              <Menu>
                <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Options for Why Yale" />}>
                  <MoreHorizontalIcon />
                </MenuTrigger>
                <MenuPopup align="end">
                  <MenuItem>
                    <PencilIcon /> Rename
                  </MenuItem>
                  <MenuItem>
                    <CopyIcon /> Duplicate <MenuShortcut>⌘D</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    <Share2Icon /> Share with counsellor
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem variant="destructive">
                    <Trash2Icon /> Delete essay
                  </MenuItem>
                </MenuPopup>
              </Menu>
            </div>
          </Example>
          <Example
            title="In a list"
            note="Every row gets its own menu. The trigger stays visible, not only on hover, so touch screens can find it."
            tone="paper"
            code={`{schools.map((s) => (
  <li key={s.name} className="flex items-center gap-3 py-1.5 ps-4 pe-2">
    <span className="flex-1 text-ink text-sm">{s.name} <span className="text-pebble">· {s.round}</span></span>
    <Menu>
      <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={\`Options for \${s.name}\`} />}>
        <MoreHorizontalIcon />
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem><CalendarIcon /> Set deadline</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive"><Trash2Icon /> Remove school</MenuItem>
      </MenuPopup>
    </Menu>
  </li>
))}`}
          >
            <ul className="squircle flex w-full max-w-sm flex-col divide-y divide-(--hairline) bg-white py-1.5 shadow-warm [--sq:var(--radius-xl)]">
              {[
                ["Yale", "Early action"],
                ["Brown", "Regular decision"],
                ["MIT", "Early action"],
              ].map(([name, round]) => (
                <li key={name} className="flex items-center gap-3 py-1.5 ps-4 pe-2">
                  <span className="flex-1 text-ink text-sm">
                    {name} <span className="text-pebble">· {round}</span>
                  </span>
                  <Menu>
                    <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Options for ${name}`} />}>
                      <MoreHorizontalIcon />
                    </MenuTrigger>
                    <MenuPopup align="end">
                      <MenuItem>
                        <CalendarIcon /> Set deadline
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem variant="destructive">
                        <Trash2Icon /> Remove school
                      </MenuItem>
                    </MenuPopup>
                  </Menu>
                </li>
              ))}
            </ul>
          </Example>
        </Grid>
      </DocSection>

      <DocSection title="Props">
        <Props
          rows={[
            ["MenuItem variant", "default | destructive", "default", "Red text and a soft red highlight for deleting."],
            ["MenuItem inset", "boolean", "false", "Indents a row without an icon so it lines up with rows that have one."],
            ["MenuItem disabled", "boolean", "false", "Faded and skipped by the keyboard."],
            ["MenuItem closeOnClick", "boolean", "true", "Set false to keep the menu open after the row is chosen."],
            ["MenuCheckboxItem variant", "default | switch", "default", "A tick on the start, or a switch on the end."],
            ["MenuCheckboxItem checked / onCheckedChange", "boolean / (checked) => void", "—", "Control it from state; defaultChecked when you don’t need to."],
            ["MenuRadioGroup value / onValueChange", "any / (value) => void", "—", "The chosen MenuRadioItem; defaultValue for uncontrolled."],
            ["MenuGroupLabel inset", "boolean", "false", "Lines the label up with inset rows."],
            ["MenuPopup align", "start | center | end", "center", "Use end for a trigger at the end of a row."],
            ["MenuPopup side", "top | bottom | left | right | inline-start | inline-end", "bottom", "Where it opens. It flips if there isn’t room."],
            ["MenuPopup sideOffset", "number", "4", "The gap to the trigger, in px."],
            ["MenuSubPopup align", "start | center | end", "start", "Submenus open to the inline end, lined up with their row."],
          ]}
          note="Arrow keys move between rows, typing jumps to a row, Escape closes. Checkbox, switch and radio rows keep the menu open; plain rows close it."
        />
      </DocSection>
    </>
  );
}
