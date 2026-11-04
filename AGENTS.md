# unive-brand

This is NOT the Next.js you know. Next 16 has breaking changes: read
`node_modules/next/dist/docs/` before writing Next code.

- `src/app/globals.css` is the single source of brand tokens. Change a value there, never inline a hex in a component.
- `src/components/ui/` are the shared primitives (Base UI + cva), the same API as unive-v22.
- `generator/` holds the master artwork and the Python tracer. Logos in `public/logo/` are generated: edit `generator/logo.py`, never the SVGs.
- The icon never has a dot. Loaders never animate the i-dot.
