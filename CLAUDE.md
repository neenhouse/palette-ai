# PaletteAI

AI-powered design system generator. Describe your brand, get a complete token system (colors, typography, spacing, components) with Figma/CSS export.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8 |
| Backend | Cloudflare Workers (AI via Workers AI binding) |
| Styling | CSS custom properties |
| Deploy | Cloudflare Pages via GitHub Actions |
| Testing | Vitest + React Testing Library |
| Tooling | pnpm (package manager), mise (runtime versions) |

## Dev Commands

```bash
pnpm dev           # Start dev server
pnpm build         # TypeScript check + Vite production build
pnpm test          # Run Vitest
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with auto-fix
```

## Project Structure

```
src/
  pages/           # Route-level components
  components/
    ui/            # Reusable UI components
    sections/      # Page sections
  hooks/           # Custom React hooks
  lib/             # Utilities, AI prompt templates
docs/
  vision.md        # North star, audience, design principles
  prd.md           # Product requirements
.claude/
  agents/          # Agent definitions
```

## Conventions

- Use **pnpm** as package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)

## Documentation Hierarchy

```
CLAUDE.md              (this file -- root authority)
  docs/vision.md       (north star vision and design principles)
  docs/prd.md          (product requirements)
  .claude/agents/      (agent definitions)
```

When documents conflict, resolve by walking up the chain.

## Agent Team

| Agent | Role | Scope | Writes Code |
|-------|------|-------|-------------|
| `frontend-dev` | React, CSS, components, pages | `src/` | Yes |
| `qa` | Testing, accessibility, performance | Tests + read-only | Yes (tests) |

## Single Source of Truth

| Concern | Source File |
|---------|------------|
| Project overview | `CLAUDE.md` (this file) |
| Vision and design principles | `docs/vision.md` |
| Product requirements | `docs/prd.md` |
| Runtime versions | `.mise.toml` |
| CSS design tokens (live) | `src/index.css` |
