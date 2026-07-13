# Cinematic Product Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally launch a product-authentic cinematic hero featuring the NexCruise steering dial and control pod.

**Architecture:** A dedicated Remotion composition renders deterministic hero media from local product assets. A focused React `CinematicHero` component overlays accessible content and controls, while the existing GSAP animation module owns runtime depth and scroll choreography.

**Tech Stack:** React 19, Vite 7, GSAP 3, Remotion, Playwright browser smoke tests

## Global Constraints

- Use the supplied dial and pod photographs as product truth.
- Preserve the current Aurora-inspired AHA token system.
- Keep all readable content visible without JavaScript animation.
- Support reduced motion and mobile viewports.
- Do not add voiceover, fabricated specifications, or fake hardware.

---

### Task 1: Motion Contract Tests

**Files:**
- Modify: `tests/interaction-contract.test.mjs`
- Modify: `tests/browser-smoke.mjs`

**Interfaces:**
- Consumes: rendered React markup and local browser URL
- Produces: assertions for hero media, dial controls, product annotations, and responsive overflow

- [ ] Add source-contract assertions for `hero-product-film`, `hero-dial-control`, `hero-product-dial`, and `hero-product-pod`.
- [ ] Run `npm test` and confirm the new assertions fail because the cinematic hero does not exist.
- [ ] Add browser assertions for video/poster presence and dial value changes.
- [ ] Keep tests failing until Tasks 2-4 provide the feature.

### Task 2: Product Asset Pipeline and Remotion Composition

**Files:**
- Create: `remotion/index.jsx`
- Create: `remotion/HeroProductFilm.jsx`
- Create: `remotion/render.mjs`
- Modify: `package.json`
- Add: `public/hero/dial-source.png`
- Add: `public/hero/pod-source.jpg`

**Interfaces:**
- Consumes: local product photographs under `public/hero/`
- Produces: Remotion composition `NexCruiseHeroFilm` and `public/hero/nexcruise-hero.mp4`

- [ ] Add the Remotion dependencies and render scripts.
- [ ] Build a 1920x1080, 30fps, 270-frame composition using frame-driven interpolation only.
- [ ] Render a representative still and inspect focal hierarchy.
- [ ] Render the MP4 and verify it is readable with `ffprobe`.

### Task 3: Accessible Cinematic Hero

**Files:**
- Create: `src/components/CinematicHero.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.css`

**Interfaces:**
- Consumes: `/hero/nexcruise-hero.mp4`, `/hero/hero-poster.jpg`, local product assets, `scrollToSection`, tracking helpers
- Produces: `.cinematic-hero` with accessible video fallback, dial controls, annotations, and working CTAs

- [ ] Replace the current hero markup with `CinematicHero`.
- [ ] Add responsive styling with a protected product focal area.
- [ ] Add keyboard-accessible dial controls with a 40-120 km/h range.
- [ ] Ensure the poster composition remains complete if video playback fails.

### Task 4: GSAP Runtime Choreography

**Files:**
- Modify: `src/useAnimations.js`

**Interfaces:**
- Consumes: `.cinematic-hero`, `[data-hero-dial]`, `[data-hero-pod]`, `[data-hero-copy]`
- Produces: scoped intro, pointer parallax, dial response, and ScrollTrigger transition with cleanup

- [ ] Add a scoped load timeline using transforms and `autoAlpha`.
- [ ] Add pointer parallax via `gsap.quickTo` on fine pointers only.
- [ ] Add a scrubbed ScrollTrigger timeline for dial/pod separation.
- [ ] Disable continuous transforms when reduced motion is requested.

### Task 5: Verification and Local Launch

**Files:**
- Modify: `tests/browser-smoke.mjs`

**Interfaces:**
- Consumes: completed Vite build and local dev server
- Produces: passing unit/build/browser checks and desktop/mobile screenshots

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Start Vite on an available local port.
- [ ] Run browser smoke checks at desktop and mobile widths.
- [ ] Capture screenshots and visually inspect hero framing and overlaps.
- [ ] Run `git diff --check` when executed inside a Git worktree; otherwise verify source formatting directly.
