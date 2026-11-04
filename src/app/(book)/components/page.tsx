import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/book/section";
import { Buttons, Cards, Feedback, Fields, Overlays } from "./showcase";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Quiet tools on warm paper.">
        The same Base UI primitives the app uses, in <code className="text-ink">src/components/ui</code>, restyled with the
        brand tokens. Copy a file into a product and it picks up the brand from <code className="text-ink">globals.css</code>.
      </PageHeader>
      <Section title="Buttons" description="Two families. Brand buttons sell, on the landing page and at big moments. App buttons work, everywhere inside the product.">
        <Buttons />
      </Section>
      <Section title="Fields and choices" description="40 px tall on touch, 36 px on desktop. Errors use danger ink under the field, never red borders alone.">
        <Fields />
      </Section>
      <Section title="Feedback" description="Every state uses the warm semantic tokens: success, warning, danger, info.">
        <Feedback />
      </Section>
      <Section title="Navigation and overlays">
        <Overlays />
      </Section>
      <Section title="Cards" description="White on paper by default. Earth and meadow surfaces for moments that matter; gradients only from the gradient set.">
        <Cards />
      </Section>
    </>
  );
}
