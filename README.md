# unive-brand

The Unive brand in one place: logo, loaders, colour, type, gradients, imagery
and UI components. It's a small Next.js site (the brand book), and its source
is what other apps copy from.

```bash
bun install
bun dev              # brand book on http://localhost:3000
bun run build        # production build + typecheck
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/app/globals.css` | **All brand tokens**: colours (paper, ink, earth, meadow, sky, states), gradients, shadows, radius, easing. The only place a hex should appear |
| `src/components/ui/` | Base UI + cva primitives (button, input, select, dialog, …), same API as unive-v22, themed by the tokens |
| `src/components/brand/` | `Wordmark`, `Mark`, `AppIcon`, `UnLoader`, `UnProgress`, `HeroArt`, `PressBand` |
| `src/lib/un-wave.ts` | The “un” as a wave: the geometry behind every loader |
| `src/remotion/` | Remotion compositions: brand sting, flow loop, write loop |
| `public/logo/` | SVG wordmark, icon, app icons, favicon (generated) |
| `public/loaders/` | Self-contained looping SVG loaders, no JS (generated) |
| `public/scenes/`, `public/landing/`, `public/brand/`, `public/features/` | Hero art, scenes and press logos, copied from unive-v22 |
| `generator/source/` | The original hand-drawn artwork. **This is the master** |
| `generator/logo.py` | Traces the artwork to SVG; the only edits are listed in its docstring |
| `generator/centerline.py` | Extracts the icon's centreline and stroke width for the loaders |

## Regenerate

```bash
bun run logo                          # generator/logo.py → public/logo, src/lib/logo-paths.json
python3 -I generator/centerline.py    # → src/lib/un-geometry.json
bun run loaders                       # → public/loaders/*.svg
```

The Python scripts need numpy and opencv-python.

## Rules worth repeating

- The icon is “un” with **no dot**. Nothing ever animates the i’s dot.
- The logo is drawn, never typed. Don't rebuild it in Averia or any font.
- Motion uses one curve, `--ease-unive` (`cubic-bezier(0.22, 1, 0.36, 1)`), with no bounce or overshoot.
- Sky blue is for links and focus only.

## Licences

Averia Serif Libre and Inter are OFL (Google Fonts). Remotion needs a paid
company licence for companies above 3 people; check https://remotion.dev/license
before rendering videos commercially.
