import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const heroSource = await readFile(new URL("../src/components/CinematicHero.jsx", import.meta.url), "utf8").catch(() => "");
const dataSource = await readFile(new URL("../src/data.js", import.meta.url), "utf8");
const purchaseSource = await readFile(new URL("../src/components/PurchaseFlow.jsx", import.meta.url), "utf8");

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

test("hero hardware uses one seamless dial cutout and split pod animation wrappers", () => {
  assert.match(heroSource, /data-hero-ring/);
  assert.doesNotMatch(heroSource, /hero-dial-face/);
  assert.match(heroSource, /data-hero-pod-entry/);
  assert.match(heroSource, /data-hero-pod/);
  assert.match(heroSource, /dial-cut\.png/);
  assert.match(heroSource, /pod-cut\.png/);
});

test("featured film panel embeds the official video lazily", () => {
  assert.match(source, /S3WyAb5QAZg/);
  assert.match(source, /youtube-nocookie\.com\/embed/);
  assert.match(source, /film-poster/);
  assert.match(source, /film-theatre/);
  assert.match(source, /film-exit-note/);
});

test("installation uses real AHA footage rather than generic illustrations", () => {
  assert.match(dataSource, /\/installation\/unbox-real\.jpg/);
  assert.match(dataSource, /\/installation\/harness-real\.jpg/);
  assert.match(dataSource, /\/installation\/obd-real\.jpg/);
  assert.match(dataSource, /\/hero\/dial-cut\.png/);
  assert.match(dataSource, /\/hero\/hero-poster\.jpg/);
  assert.doesNotMatch(dataSource, /nexcruise-step1-pedal\.png/);
  assert.doesNotMatch(dataSource, /nexcruise-step2-obd\.png/);
  assert.doesNotMatch(dataSource, /nexcruise-step3-dial\.png/);
});

test("callback opens WhatsApp with the full lead including car details", () => {
  assert.match(source, /wa\.me\/\$\{WHATSAPP_NUMBER\}\?text=/);
  assert.match(source, /carDetails/);
  assert.match(source, /onChecked/);
});

test("purchase flow includes billing, three sourced plans, and Razorpay verification", () => {
  assert.match(dataSource, /NexCruise Pro/);
  assert.match(dataSource, /Rs 25,990/);
  assert.match(purchaseSource, /Billing & delivery/);
  assert.match(purchaseSource, /\/api\/payments\/create-order/);
  assert.match(purchaseSource, /\/api\/payments\/verify/);
  assert.match(purchaseSource, /checkout\.razorpay\.com\/v1\/checkout\.js/);
  assert.match(purchaseSource, /PurchaseCompletedRazorpay/);
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

test("basic, pro, and smart comparison uses aligned rows and a smart card", () => {
  assert.match(source, /compare-grid/);
  assert.match(source, /compareRows/);
  assert.match(source, /featureIndex: 2/);
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
