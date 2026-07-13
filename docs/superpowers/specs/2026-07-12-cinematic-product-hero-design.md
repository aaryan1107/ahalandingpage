# Cinematic Product Hero Design

## Outcome

Replace the current hero with a premium product-led sequence that makes the physical NexCruise system immediately understandable: the steering dial is the interface, the pod is the control hardware, and both belong in a real vehicle cockpit.

## Visual Sequence

The hero uses a seamless nine-second silent loop. It begins with the AHA NexCruise mark over a dark cockpit, pushes toward the steering wheel, activates the blue dial lighting, separates the dial and pod into a restrained exploded composition, and settles into a product frame that can loop without a visible cut.

The supplied dial and pod photographs are the source of truth. Their form, controls, branding, and proportions must not be regenerated or altered. Remotion may crop, mask, grade, scale, and light those photographs, but it must not invent replacement hardware.

## Runtime Composition

Remotion renders the deterministic background loop and poster frame. The website layers real HTML copy and controls over the media so links remain accessible and responsive. GSAP controls the logo handoff, product-layer parallax, dial rotation, depth, and the scroll transition into the product-system section.

The hero contains only four text groups: AHA NexCruise label, two-line headline, short description, and two actions. Product details appear in the visual annotation rail, not as an oversized feature list.

## Interaction

- Pointer movement adds subtle product depth on desktop.
- Scrolling rotates the dial and separates the pod before resolving into the next chapter.
- The dial can be dragged or changed with keyboard-accessible minus and plus buttons.
- Reduced-motion users receive a static poster and immediate content.
- Mobile uses the same media with a protected focal crop and simplified transforms.

## Performance

Render MP4 and WebM where local codecs permit, preload the poster, lazy-load noncritical media, keep website animation to transforms and opacity, and never hide readable content behind an animation class.

## Acceptance Criteria

- Dial and pod are both clearly visible in the first viewport.
- Primary and WhatsApp actions work.
- Hero does not overflow at 390x844, 768x1024, or 1440x900.
- Reduced-motion mode has no continuous motion.
- Video failure falls back to a complete static product composition.
- Existing page interactions continue to pass browser smoke tests.
