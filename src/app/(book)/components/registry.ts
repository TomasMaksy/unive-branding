/** Every component with a page of its own, in the order the index shows them. */
export type ComponentDoc = { slug: string; name: string; group: string; summary: string };

export const COMPONENTS: ComponentDoc[] = [
  { slug: "button", name: "Button", group: "Actions", summary: "Capsules with a spring press and the “un” as their loading state." },
  { slug: "input", name: "Input", group: "Fields", summary: "Filled capsules for one line of text, search and errors." },
  { slug: "textarea", name: "Textarea", group: "Fields", summary: "The same filled field for longer answers; it grows as you type." },
  { slug: "select", name: "Select", group: "Fields", summary: "Opens over itself, the chosen row exactly where the field was." },
  { slug: "combobox", name: "Combobox", group: "Fields", summary: "Type to narrow a long list, then pick one: schools, countries, majors." },
  { slug: "checkbox", name: "Checkbox", group: "Choices", summary: "A small squircle that fills meadow and draws its tick." },
  { slug: "radio", name: "Radio group", group: "Choices", summary: "One of a few: a circle whose centre springs in." },
  { slug: "switch", name: "Switch", group: "Choices", summary: "On and off, iOS shaped, meadow when on." },
  { slug: "tabs", name: "Tabs", group: "Navigation", summary: "A segmented control, or an underline for page sections." },
  { slug: "dialog", name: "Dialog", group: "Overlays", summary: "One white surface for a decision, with three button layouts." },
  { slug: "menu", name: "Menu", group: "Overlays", summary: "Actions on a thing: grouped rows, shortcuts, a red delete." },
  { slug: "tooltip", name: "Tooltip", group: "Overlays", summary: "A short label for an icon-only control." },
  { slug: "alert", name: "Alert", group: "Feedback", summary: "A tinted message in the page: success, warning, danger, info." },
  { slug: "toast", name: "Toast", group: "Feedback", summary: "A floating note that something happened, or is happening." },
  { slug: "badge", name: "Badge", group: "Feedback", summary: "Status at a glance: submitted, due soon, missing." },
  { slug: "card", name: "Card", group: "Layout", summary: "White squircles on paper: content, pricing, reviews." },
  { slug: "avatar", name: "Avatar", group: "Layout", summary: "A person: photo or initials, alone or in a stack." },
];

export const GROUP_ORDER = ["Actions", "Fields", "Choices", "Navigation", "Overlays", "Feedback", "Layout"];
