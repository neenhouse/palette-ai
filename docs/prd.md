# PaletteAI -- Product Requirements Document

## Overview

PaletteAI is an AI-powered design system generator. Users describe their brand in natural language, and the system produces a complete, production-ready token system covering colors, typography, spacing, and component styles. Tokens can be exported as CSS custom properties, JSON, Tailwind config, or Figma variables.

---

## Feature 1: Landing Page

### Description
A single-page marketing and entry point that communicates the value proposition and funnels users directly into the generation flow.

### Requirements
- **F1.1** Hero section with headline, subheadline, and a single CTA ("Describe your brand").
- **F1.2** Three-panel feature highlight: Colors, Typography, Export.
- **F1.3** Live demo preview showing an example generated palette with animated token cards.
- **F1.4** Footer with links to GitHub repo, documentation, and contact.
- **F1.5** Fully responsive (mobile-first). No layout shifts on load.
- **F1.6** Lighthouse performance score >= 95 on mobile.

### Acceptance Criteria
- Page loads in < 1.5s on 3G throttle (First Contentful Paint).
- CTA scrolls to or navigates to the brand input form.
- All text meets WCAG AA contrast requirements.

---

## Feature 2: Brand Description Input

### Description
A conversational input where users describe their brand personality, industry, mood, and preferences. The AI uses this to seed the token generation.

### Requirements
- **F2.1** Single textarea with placeholder examples ("A bold fintech startup that values trust and speed").
- **F2.2** Optional structured fields: industry dropdown, mood tags (playful, serious, luxurious, minimal, etc.), primary color preference.
- **F2.3** Character limit of 500 with live counter.
- **F2.4** "Generate" button triggers AI processing with a loading state.
- **F2.5** Input is saved to localStorage so users can iterate without retyping.
- **F2.6** Keyboard shortcut: Cmd/Ctrl + Enter to generate.

### Acceptance Criteria
- Submitting an empty form shows a validation message.
- AI generation begins within 200ms of submission (network request fired).
- Loading state shows a skeleton preview of the token system.

---

## Feature 3: Color Palette Generator

### Description
AI generates a complete color system: primary, secondary, accent, neutral, semantic (success, warning, error, info), and a full shade scale (50-950) for each.

### Requirements
- **F3.1** Generate primary, secondary, and accent colors from brand description.
- **F3.2** Auto-generate neutral gray scale harmonized with the primary hue.
- **F3.3** Generate semantic colors (success, warning, error, info) that complement the palette.
- **F3.4** Produce shade scales (50, 100, 200, ..., 900, 950) for each color using perceptual uniformity (OKLCH).
- **F3.5** Display each color as a swatch card showing hex, RGB, HSL, and OKLCH values.
- **F3.6** WCAG AA contrast checker on every foreground/background combination. Flag violations with a warning badge.
- **F3.7** Click any swatch to copy its value to clipboard.
- **F3.8** Allow manual override of any generated color with a color picker. Regenerate dependent shades on change.

### Acceptance Criteria
- Generated palette has at minimum: 1 primary, 1 secondary, 1 accent, 1 neutral, 4 semantic colors.
- Every shade scale has exactly 11 steps (50-950).
- No WCAG AA violations in the default text-on-background pairings.

---

## Feature 4: Typography System

### Description
AI selects and configures a typographic system: font pairings, size scale, line heights, letter spacing, and font weights.

### Requirements
- **F4.1** Suggest a heading font and a body font pairing from Google Fonts.
- **F4.2** Generate a modular type scale (e.g., minor third, major third) with sizes from xs to 5xl.
- **F4.3** Assign line-height and letter-spacing for each size step.
- **F4.4** Preview each type step with sample text in the generated fonts.
- **F4.5** Allow switching between scale ratios (minor second through golden ratio).
- **F4.6** Allow manual font override via search/autocomplete of Google Fonts.

### Acceptance Criteria
- Heading and body fonts are visually complementary (validated by AI reasoning).
- Type scale has at minimum 9 steps (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl).
- Preview renders actual Google Fonts (loaded dynamically).

---

## Feature 5: Spacing Scale

### Description
AI generates a spacing/sizing scale used for margins, padding, gaps, and component sizing.

### Requirements
- **F5.1** Generate a spacing scale from 0 to 96 (following a base-4 or base-8 system).
- **F5.2** Visualize each step as a horizontal bar with pixel and rem values.
- **F5.3** Include named semantic spacing tokens (page-margin, section-gap, card-padding, input-padding).
- **F5.4** Allow base unit adjustment (4px or 8px) with live recalculation.
- **F5.5** Show spacing in context: a mini component preview using the generated spacing values.

### Acceptance Criteria
- Scale has at minimum 16 steps.
- All values are expressed in rem with px equivalent shown.
- Semantic tokens map to specific scale values.

---

## Feature 6: CSS / Figma Token Export

### Description
Export the complete generated design system in multiple formats for immediate use in development or design tools.

### Requirements
- **F6.1** Export as CSS custom properties (`:root { --color-primary-500: ...; }`).
- **F6.2** Export as JSON (Design Tokens Community Group format).
- **F6.3** Export as Tailwind CSS theme config (`tailwind.config.ts` extend block).
- **F6.4** Export as Figma Variables (JSON importable via Figma plugin or Variables REST API).
- **F6.5** One-click "Copy all" for each format.
- **F6.6** Download as file (.css, .json, .ts) for each format.
- **F6.7** Syntax-highlighted code preview for each export format.
- **F6.8** Shareable URL: encode the token system in a URL so users can share or bookmark a generated palette.

### Acceptance Criteria
- CSS export is valid and parseable by a browser.
- JSON export conforms to the DTCG spec (https://design-tokens.github.io/community-group/format/).
- Tailwind config is valid TypeScript that extends the default theme.
- Shareable URL correctly reconstructs the full token system on load.
