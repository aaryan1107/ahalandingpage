import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { INTRO_SESSION_KEY } from "./components/LogoIntro";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

// Dev-only: embedded preview panes report the tab as hidden, which pauses
// requestAnimationFrame and freezes GSAP's ticker mid-animation. Drive the
// ticker on a timer while hidden so animations settle to their real-time
// state (tweens advance by elapsed time, so even 1fps is enough to verify).
if (import.meta.env.DEV) {
  gsap.ticker.lagSmoothing(0);
  setInterval(() => {
    if (document.visibilityState === "hidden") gsap.ticker.tick();
  }, 250);
  // Console access for debugging scroll states in dev.
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

// Smooth-scroll-aware navigation. Falls back to native scrolling when
// ScrollSmoother isn't active (reduced motion, no JS motion block).
export function scrollToSection(target, offset = "top 88px") {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(target, true, offset);
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

const EXPLORER_PANELS = 3;
const EXPLORER_UNITS = EXPLORER_PANELS * 2 - 1; // dwell/transition beats

function explorerParts() {
  return {
    visuals: gsap.utils.toArray("[data-panel-visual]"),
    copies: gsap.utils.toArray("[data-panel-copy]"),
    tabs: gsap.utils.toArray(".component-tabs button")
  };
}

function setActiveExplorerUI(index) {
  const { tabs } = explorerParts();
  tabs.forEach((tab, i) => tab.classList.toggle("active", i === index));
  const current = document.querySelector("[data-progress-current]");
  if (current) current.textContent = String(index + 1).padStart(2, "0");
}

// Crossfade panels directly (mobile + reduced-motion fallback where the
// pinned scroll sequence doesn't run).
function jumpToPanel(index, instant) {
  const { visuals, copies } = explorerParts();
  const d = instant ? 0 : 0.55;
  visuals.forEach((el, i) =>
    gsap.to(el, { autoAlpha: i === index ? 1 : 0, scale: 1, duration: d, ease: "power2.out", overwrite: "auto" })
  );
  copies.forEach((el, i) =>
    gsap.to(el, { autoAlpha: i === index ? 1 : 0, y: 0, duration: d, ease: "power2.out", overwrite: "auto" })
  );
  setActiveExplorerUI(index);
}

export function useSiteAnimations(scopeRef) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---------------------------------------------------------------- //
      // All motion                                                        //
      // ---------------------------------------------------------------- //
      mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.1,
          effects: true
        });

        // scrollIntoView (browser anchor jumps, test runners) scrolls the fixed
        // wrapper instead of the window, which bypasses ScrollTrigger entirely.
        // Convert any stray wrapper scroll into a real smoother scroll.
        const wrapper = document.querySelector("#smooth-wrapper");
        const fixWrapperScroll = () => {
          if (!wrapper.scrollTop) return;
          const target = smoother.scrollTop() + wrapper.scrollTop;
          wrapper.scrollTop = 0;
          smoother.scrollTo(target, false);
        };
        wrapper.addEventListener("scroll", fixWrapperScroll);

        // Anchor links must route through the smoother.
        const onAnchorClick = (event) => {
          const link = event.target.closest('a[href^="#"]');
          if (!link) return;
          const hash = link.getAttribute("href");
          if (!document.querySelector(hash)) return;
          event.preventDefault();
          scrollToSection(hash);
        };
        document.addEventListener("click", onAnchorClick);

        // --- Aurora-style logo intro: zoom through the mark into the hero //
        // Plays once per session (LogoIntro renders only when due). The hero
        // media starts slightly zoomed and settles as the mark flies past,
        // so the page reads as having existed behind the logo.
        const introEl = document.querySelector("[data-logo-intro]");
        const heroDelay = introEl ? 1.5 : 0;
        if (introEl) {
          // Mark the session as soon as the intro starts: a refresh mid-intro
          // counts as the same entry and must not replay it.
          try {
            window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
          } catch {
            /* private mode: intro simply replays next entry */
          }
          gsap.set(".hero-media", { scale: 1.12, transformOrigin: "50% 42%" });
          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              onComplete() {
                introEl.remove();
              }
            })
            .fromTo("[data-logo-stage]", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.65 })
            .to("[data-logo-stage]", { scale: 14, autoAlpha: 0, duration: 1.05, ease: "power3.in" }, "+=0.35")
            .to(introEl, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "-=0.5")
            .to(".hero-media", { scale: 1, duration: 1.1, ease: "power3.out" }, "-=0.62");
        }

        // --- Hero intro timeline -------------------------------------- //
        // fromTo with explicit end values: StrictMode double-mounts
        // re-capture element state, so from() alone can freeze targets.
        const end = { y: 0, yPercent: 0, autoAlpha: 1 };
        gsap
          .timeline({ defaults: { ease: "power3.out" }, delay: heroDelay })
          .fromTo(".hero-product-name", { y: 18, autoAlpha: 0 }, { ...end, duration: 0.65 })
          .fromTo(".hero-copy h1", { y: 48, autoAlpha: 0 }, { ...end, duration: 1 }, "-=0.35")
          .fromTo(".hero-copy > p", { y: 28, autoAlpha: 0 }, { ...end, duration: 0.8 }, "-=0.55")
          .fromTo(".hero-actions > *", { y: 20, autoAlpha: 0 }, { ...end, duration: 0.6, stagger: 0.1 }, "-=0.45")
          .fromTo("[data-hero-dial-stack]", { x: 90, autoAlpha: 0, rotate: -14 }, { x: 0, autoAlpha: 1, rotate: 0, duration: 1.1 }, 0.3)
          .fromTo("[data-hero-pod-entry]", { x: 60, y: 30, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.9 }, 0.55)
          .fromTo(".hero-proof-strip > div", { yPercent: 100, autoAlpha: 0 }, { ...end, duration: 0.7, stagger: 0.08 }, "-=0.45");

        // --- Marquee: partners row accelerates with scroll velocity ----- //
        const marqueeTrack = document.querySelector("[data-marquee-track]");
        if (marqueeTrack) {
          const loop = gsap.to(marqueeTrack, { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
          let settle;
          ScrollTrigger.create({
            onUpdate(self) {
              const boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 260);
              if (boost > loop.timeScale()) {
                loop.timeScale(boost);
                if (settle) settle.kill();
                settle = gsap.to(loop, { timeScale: 1, duration: 1.6, ease: "power3.out" });
              }
            }
          });
        }

        // --- Smart card feature cascade -------------------------------- //
        const smartCard = document.querySelector("[data-smart-card]");
        if (smartCard) {
          gsap
            .timeline({ scrollTrigger: { trigger: smartCard, start: "top 72%", once: true } })
            .fromTo("[data-smart-row]", { x: 16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.09, ease: "power2.out" }, 0)
            .add(() => smartCard.classList.add("is-live"));
        }

        // Fine-pointer depth follows the viewer without moving layout.
        const hero = document.querySelector(".cinematic-hero");
        const heroMedia = document.querySelector(".hero-media");
        let onPointerMove;
        let onPointerLeave;
        if (hero && heroMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const moveX = gsap.quickTo(heroMedia, "x", { duration: 0.8, ease: "power3.out" });
          const moveY = gsap.quickTo(heroMedia, "y", { duration: 0.8, ease: "power3.out" });
          onPointerMove = (event) => {
            const bounds = hero.getBoundingClientRect();
            moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * -14);
            moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * -10);
          };
          onPointerLeave = () => { moveX(0); moveY(0); };
          hero.addEventListener("pointermove", onPointerMove);
          hero.addEventListener("pointerleave", onPointerLeave);
        }

        // --- Stat counters --------------------------------------------- //
        gsap.utils.toArray("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate() {
              el.textContent = Math.round(counter.value).toLocaleString("en-IN") + suffix;
            }
          });
        });

        // --- Statement: scroll-scrubbed word ink reveal ----------------- //
        gsap.fromTo(
          ".scroll-statement span",
          { color: "var(--color-fog)" },
          {
            color: "var(--color-horizon-navy)",
            stagger: 0.35,
            ease: "none",
            scrollTrigger: { trigger: ".statement-section", start: "top 72%", end: "center 42%", scrub: 0.4 }
          }
        );

        // --- Masked line reveals on big headings (SplitText) ------------ //
        // Split after fonts settle so line breaks are final.
        document.fonts.ready.then(() =>
          ctx.add(() => {
            // Static headings only — the owner blockquote re-renders with React
            // state, and SplitText's wrappers break React's reconciliation.
            gsap.utils
              .toArray(".section-heading h2, .compatibility-intro h2, .callback-copy h2")
              .forEach((el) => {
                const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-heading-line" });
                gsap.from(split.lines, {
                  yPercent: 115,
                  duration: 0.95,
                  ease: "power4.out",
                  stagger: 0.09,
                  scrollTrigger: { trigger: el, start: "top 85%", once: true }
                });
              });
            ScrollTrigger.refresh();
          })
        );

        // --- Variants section: clip reveal into the dark block ---------- //
        gsap.fromTo(
          ".variants-section",
          { clipPath: "inset(3.5% 3.5% 3.5% 3.5% round 14px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: ".variants-section", start: "top 85%", end: "top 25%", scrub: 0.4 }
          }
        );

        // --- Section reveals (batched, staggered) ----------------------- //
        // Hero elements are excluded: the intro timeline above owns them.
        const revealTargets = gsap.utils.toArray("[data-reveal]").filter((el) => !el.closest(".hero"));
        gsap.set(revealTargets, { autoAlpha: 0, y: 32 });
        ScrollTrigger.batch(revealTargets, {
          start: "top 86%",
          once: true,
          onEnter: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              // Cap the total spread: natural scrolling batches 2-4 elements
              // (full 0.12s feel), while deep anchor jumps can batch everything
              // at once — without the cap the last elements lag ~3s.
              stagger: Math.min(0.12, 0.7 / elements.length),
              overwrite: true
            })
        });

        window.addEventListener("load", ScrollTrigger.refresh, { once: true });

        return () => {
          document.removeEventListener("click", onAnchorClick);
          wrapper.removeEventListener("scroll", fixWrapperScroll);
          if (onPointerMove) hero.removeEventListener("pointermove", onPointerMove);
          if (onPointerLeave) hero.removeEventListener("pointerleave", onPointerLeave);
          smoother.kill();
        };
      });

      // ---------------------------------------------------------------- //
      // Hero media story — desktop with motion                             //
      // ---------------------------------------------------------------- //
      // The product film owns the dial and pod composition. Keeping the
      // hardware inside one rendered frame prevents duplicate layers from
      // escaping their container when ScrollTrigger refreshes on reverse.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 981px)", () => {
        const heroSection = document.querySelector(".cinematic-hero");
        if (heroSection) {
          // Explicit initial brightness: GSAP normalizes a "none" start filter
          // to brightness(0), which blacks the copy out at scrub progress 0.
          gsap.set(".hero-copy", { filter: "brightness(0.85)" });
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                id: "hero-story",
                trigger: heroSection,
                start: "top top",
                end: "+=85%",
                pin: true,
                scrub: 0.6
              }
            })
            // Explicit from-values everywhere: the pin is active at scroll 0,
            // so plain .to() captures starts DURING the entrance animation and
            // scrolling back would restore those mid-flight values (dial never
            // returns). fromTo pins the rest state as the true zero.
            .fromTo("[data-hero-ring]", { rotate: 0 }, { rotate: 170, immediateRender: false }, 0)
            .fromTo("[data-hero-dial-stack]", { x: 0, y: 0, scale: 1, autoAlpha: 1 }, { x: "-30vw", y: "16vh", scale: 0.9, immediateRender: false }, 0)
            .fromTo("[data-hero-halo]", { autoAlpha: 1, scale: 1 }, { autoAlpha: 0.2, scale: 1.25, immediateRender: false }, 0)
            .fromTo("[data-hero-pod]", { x: 0, y: 0, scale: 1, autoAlpha: 1 }, { x: "-4vw", y: "-9vh", scale: 1.1, autoAlpha: 1, immediateRender: false }, 0)
            .fromTo(".hero-copy", { filter: "brightness(0.85)" }, { filter: "brightness(1)", immediateRender: false }, 0)
            .to("[data-hero-dial-stack]", { y: "58vh", autoAlpha: 0, ease: "power1.in" }, 0.62)
            .to("[data-hero-pod]", { y: "30vh", autoAlpha: 0.15, ease: "power1.in" }, 0.72)
            .to(".hero-copy", { yPercent: -8, autoAlpha: 0.72 }, 0.6)
            .to(".hero-media", { scale: 1.04, filter: "brightness(.8) saturate(.85)" }, 0.2);
        }

        const explorer = document.querySelector(".product-explorer");
        if (!explorer) return;
        const { visuals, copies, tabs } = explorerParts();
        const steps = visuals.length - 1;

        gsap.set(visuals.slice(1), { autoAlpha: 0, scale: 0.94 });
        gsap.set(copies.slice(1), { autoAlpha: 0, y: 44 });
        gsap.set([visuals[0], copies[0]], { autoAlpha: 1, y: 0, scale: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "explorer",
            trigger: explorer,
            start: "top 96px",
            end: "+=" + steps * 85 + "%",
            pin: true,
            scrub: 0.5,
            onUpdate(self) {
              const index = Math.min(steps, Math.round((self.progress * EXPLORER_UNITS) / 2));
              setActiveExplorerUI(index);
            }
          }
        });

        // Beat layout per panel i: dwell at [2i, 2i+1], transition at [2i+1, 2i+2].
        for (let i = 1; i <= steps; i += 1) {
          const at = i * 2 - 1;
          tl.to(visuals[i - 1], { autoAlpha: 0, scale: 1.05, duration: 1 }, at)
            .fromTo(visuals[i], { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 1 }, at)
            .to(copies[i - 1], { autoAlpha: 0, y: -44, duration: 1 }, at)
            .fromTo(copies[i], { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 1 }, at);
        }
        tl.to({}, { duration: 1 }, EXPLORER_UNITS - 1); // trailing dwell

        // Tabs seek the scroll position for their panel's dwell beat.
        const seekHandlers = tabs.map((tab, i) => {
          const handler = () => {
            const st = ScrollTrigger.getById("explorer");
            if (!st) return;
            const progress = (i * 2 + 0.5) / EXPLORER_UNITS;
            st.scroll(st.start + progress * (st.end - st.start));
          };
          tab.addEventListener("click", handler);
          return () => tab.removeEventListener("click", handler);
        });

        return () => seekHandlers.forEach((remove) => remove());
      });

      // ---------------------------------------------------------------- //
      // Explorer fallback — small screens or reduced motion               //
      // ---------------------------------------------------------------- //
      mm.add(
        [
          "(prefers-reduced-motion: no-preference) and (max-width: 980px)",
          "(prefers-reduced-motion: reduce)"
        ].join(", "),
        () => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const { visuals, tabs } = explorerParts();
          if (!visuals.length) return;
          jumpToPanel(0, true);

          const handlers = tabs.map((tab, i) => {
            const handler = () => jumpToPanel(i, reduce);
            tab.addEventListener("click", handler);
            return () => tab.removeEventListener("click", handler);
          });
          return () => handlers.forEach((remove) => remove());
        }
      );

      return () => mm.revert();
    },
    { scope: scopeRef }
  );
}
