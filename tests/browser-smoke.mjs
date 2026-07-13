import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

await page.goto("http://127.0.0.1:5180/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);

assert.equal(await page.locator(".hero-product-film").count(), 1);
assert.match(await page.locator(".hero-product-film").getAttribute("poster"), /hero-poster/);
assert.equal(await page.locator(".hero-dial-control").count(), 0);
assert.equal(await page.locator(".hero-product-film").isVisible(), true);
// Official favicon is the aha.store teal A-mark, not the old placeholder.
assert.match(await page.locator('link[rel="icon"]').getAttribute("href"), /favicon\.svg/);
const faviconSvg = await page.evaluate(async () => (await fetch("/favicon.svg")).text());
assert.match(faviconSvg, /63C3BD/i);
// Partners marquee renders the aha.store media logos.
assert.ok((await page.locator(".marquee-item").count()) >= 10);
await page.screenshot({ path: "/tmp/aha-hero-desktop.png" });

// Playwright's CDP auto-scroll bypasses scroll events, which ScrollSmoother +
// ScrollTrigger rely on. Scroll explicitly (the app converts wrapper scrolls
// into real smoother scrolls) and give reveals a beat to play.
async function goTo(selector) {
  await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), selector);
  await page.waitForTimeout(1400);
}

// Tabs seek the pinned GSAP scroll sequence; wait for the scrub to arrive.
await goTo(".product-explorer");
await page.getByRole("tab", { name: "Wireless dial" }).click();
await page.waitForFunction(() => document.querySelector("[data-progress-current]")?.textContent === "03");
assert.match(await page.locator("[data-panel-copy='2'] h3").textContent(), /controls live/i);

// Brand garage: card click sets the form brand, model chip sets the model.
await goTo(".brand-garage");
await page.locator(".brand-card", { hasText: "Mahindra" }).click();
await page.locator(".brand-models button", { hasText: "Thar" }).first().click();
assert.equal(await page.locator("#compatibility select").nth(0).inputValue(), "Mahindra");
assert.equal(await page.locator("#compatibility select").nth(1).inputValue(), "Thar");

// The car stage shows the selected model and updates when the model changes.
await page.waitForTimeout(400);
assert.match(await page.locator(".car-nameplate strong").textContent(), /Mahindra Thar/);
await page.screenshot({ path: "/tmp/aha-carstage-thar.png" });

await goTo(".compatibility-workspace");
await page.locator("#compatibility select").nth(0).selectOption("Tata");
await page.locator("#compatibility select").nth(1).selectOption("Nexon");
await page.locator("#compatibility select").nth(2).selectOption("Petrol");
await page.locator("#compatibility select").nth(3).selectOption("Manual");
await page.locator("#compatibility select").nth(4).selectOption("2024");
await page.getByRole("button", { name: /check fitment path/i }).click();
assert.match(await page.locator(".compatibility-result strong").textContent(), /Tata Nexon/);
assert.match(await page.locator(".car-nameplate strong").textContent(), /Tata Nexon/);

// Basic vs Smart side-by-side comparison with per-card choose actions.
await goTo(".compare-grid");
assert.equal(await page.locator(".compare-card").count(), 2);
assert.equal(await page.locator(".compare-visual img").nth(0).getAttribute("src"), "/attached_assets/nexcruise-box.jpeg");
assert.equal(await page.locator(".compare-visual img").nth(1).getAttribute("src"), "/attached_assets/nexcruise-box.jpeg");
assert.equal(await page.locator(".smart-ring").count(), 0);
assert.ok((await page.locator(".compare-card.is-smart .compare-rows li.included").count()) >= 8);
await page.screenshot({ path: "/tmp/aha-compare-desktop.png" });
await page.getByRole("button", { name: /Choose Basic/ }).click();
await page.waitForFunction(() => document.querySelector("#callback select")?.value === "NexCruise Basic");
assert.equal(await page.locator("#callback select").inputValue(), "NexCruise Basic");

await goTo(".owner-controls");
const firstReview = await page.locator(".owner-quote blockquote").textContent();
await page.getByRole("button", { name: "Next owner review" }).click({ force: true });
await page.waitForFunction(
  (previous) => document.querySelector(".owner-quote blockquote")?.textContent !== previous,
  firstReview
);

await goTo(".callback-form");
await page.locator("#callback input").nth(0).fill("Aaryan");
await page.locator("#callback input").nth(1).fill("8306924400");
await page.locator("#callback input").nth(2).fill("Jaipur");
await page.getByRole("button", { name: /request callback/i }).click();
await page.locator(".callback-status").waitFor();

const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
assert.equal(desktopOverflow, false);
await page.screenshot({ path: "/tmp/aha-aurora-desktop.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:5180/?viewport=mobile", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "/tmp/aha-hero-mobile.png" });
await page.getByRole("button", { name: "Menu" }).click();
await page.getByLabel("Primary navigation").getByRole("link", { name: "Compatibility" }).click();
await page.waitForTimeout(1400);
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
assert.equal(mobileOverflow, false);
await page.screenshot({ path: "/tmp/aha-aurora-mobile.png", fullPage: true });

assert.deepEqual(pageErrors, []);
await browser.close();
console.log("Browser smoke test passed: pinned explorer, brand garage, forms, navigation, responsive overflow, and screenshots verified.");
