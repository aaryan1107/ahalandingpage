# Design Principles Reference

## Impeccable (Paul Bakaus)
- **Hierarchy**: Clear visual hierarchy is non-negotiable.
- **Vocabulary**: Use designer-specific terms (leading, tracking, whitespace).
- **Audit-First**: Always audit the existing UI before redesigning.
- **Live Iteration**: Iterate directly in the browser.
- **Anti-Patterns**: Avoid generic LLM design slop (over-rounded corners, bad contrast).

## Taste-Skill (Anti-Slop)
- **Brief Inference**: Read the room (vibe, audience, brand).
- **Contextual Rules**: No one-size-fits-all; apply rules that fit the specific context.
- **Brand Assets**: Use existing logos, colors, and typography as starting material.
- **Anti-Center Bias**: Avoid centering everything; use asymmetrical layouts for modern feel.
- **Micro-interactions**: Add motion and feedback to improve quality.

## Refero Styles
- **Reference Systems**: Use high-quality design systems (Linear, Stripe, Apple).
- **Tokens**: Use design tokens for consistency (colors, spacing, typography).
- **AI-Readable**: Format design systems as DESIGN.md for better AI understanding.

## Spacing & Layout
- **8px Grid**: Use an 8px base for all spacing and layout.
- **Whitespace**: Don't be afraid of generous whitespace.
- **Consistency**: Maintain consistent margins and padding across components.
- **Responsive**: Design mobile-first with thoughtful breakpoints.

## Typography
- **Scale**: Use a clear typographic scale.
- **Contrast**: Ensure high contrast for readability.
- **Font Choice**: Use professional fonts (Inter, Plus Jakarta Sans, IBM Plex Mono).

## Colors
- **Palette**: Use a limited, cohesive color palette.
- **Accessibility**: Ensure color contrast meets WCAG standards.
- **Semantic**: Use semantic color variables (--bg-main, --text-muted).

## Implemented Improvements for AHA NexCruise
- **Spacing**: Switched to a strict 8px grid system using CSS variables (`--space-1` to `--space-20`).
- **Typography**: Refined typographic scale with `Plus Jakarta Sans` for headings and `Inter` for body. Improved hierarchy with clear font weights and line heights.
- **Layout**: Increased whitespace across all sections, especially in the Hero and Compatibility Workspace. Improved section rhythm.
- **Visual Polish**:
  - Refined glassmorphism with better blur (`32px`) and saturation (`180%`).
  - Added smooth transitions to all interactive elements.
  - Improved button hierarchy and hover states.
  - Enhanced brand cards with better typography and active states.
  - Refined the assistant panel with better card density and clear labels.
- **Responsive**: Updated media queries to ensure the new spacing and layout scale gracefully on mobile and tablet.
- **Hierarchy**: Used design tokens to ensure consistent margins, padding, and border radii (`--radius-lg`, `--radius-xl`).
