import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const heroSource = await readFile(new URL("../src/components/CinematicHero.jsx", import.meta.url), "utf8").catch(() => "");

test("compatibility action produces a visible result", () => {
  assert.match(source, /className="compatibility-result/);
  assert.match(source, /setCompatibilityResult/);
});

test("review controls change the active review", () => {
  assert.match(source, /setReviewIndex/);
});

test("callback submit produces visible confirmation", () => {
  assert.match(source, /callback-status/);
});

test("product explorer exposes GSAP-driven panels and tabs", () => {
  // The explorer is scroll/tab-driven by GSAP (useAnimations.js), not React state.
  assert.match(source, /data-panel-visual/);
  assert.match(source, /data-panel-copy/);
  assert.match(source, /component-tabs/);
});

test("brand garage renders brand-specific cards", () => {
  assert.match(source, /brand-garage/);
  assert.match(source, /brand-card/);
  assert.match(source, /brand\.confidence/);
});

test("cinematic hero uses the product film with a stable media fallback", () => {
  assert.match(heroSource, /hero-product-film/);
  assert.match(heroSource, /poster=/);
  assert.doesNotMatch(heroSource, /hero-dial-control/);
  assert.doesNotMatch(heroSource, /hero-speed-slider/);
});

test("hero hardware uses true cutouts with layered dial and dimensional pod", () => {
  assert.match(heroSource, /data-hero-ring/);
  assert.match(heroSource, /hero-dial-face/);
  assert.match(heroSource, /data-hero-pod/);
  assert.match(heroSource, /dial-cut\.png/);
  assert.match(heroSource, /pod-cut\.png/);
});

test("featured film panel embeds the official video lazily", () => {
  assert.match(source, /S3WyAb5QAZg/);
  assert.match(source, /youtube-nocookie\.com\/embed/);
  assert.match(source, /film-poster/);
});

test("callback opens WhatsApp with the full lead including car details", () => {
  assert.match(source, /wa\.me\/\$\{WHATSAPP_NUMBER\}\?text=/);
  assert.match(source, /carDetails/);
  assert.match(source, /onChecked/);
});

test("hero has no obsolete speed game controls", () => {
  assert.doesNotMatch(heroSource, /Increase cruise speed/);
  assert.doesNotMatch(heroSource, /Set cruise speed/);
});

test("owner proof auto-advances and pulls aha.store reviews", () => {
  assert.match(source, /REVIEW_INTERVAL_MS/);
  assert.match(source, /storeReviews/);
  assert.match(source, /setPaused/);
});

test("compatibility renders the selected car side profile", () => {
  assert.match(source, /CarStage/);
  const carSource = source;
  assert.match(carSource, /form\.brand/);
  assert.match(carSource, /compatibility-lower/);
});

test("basic vs smart comparison uses aligned rows and a smart card", () => {
  assert.match(source, /compare-grid/);
  assert.match(source, /compareRows/);
  assert.match(source, /data-smart-card/);
  assert.match(source, /const packageImage = "\/attached_assets\/nexcruise-box\.jpeg"/);
  assert.doesNotMatch(source, /nexcruise-product-still\.png/);
  assert.doesNotMatch(source, /smart-ring/);
  assert.doesNotMatch(source, /smart-sweep/);
});

test("partners marquee renders aha.store media logos", () => {
  assert.match(source, /data-marquee-track/);
  assert.match(source, /partners\.map|partners,/);
});
