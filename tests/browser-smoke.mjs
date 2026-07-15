import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:5180";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));
const TATA_UID = "010fbdb8-6fc1-48c6-91ad-127d0bb4cf0e";
const MAHINDRA_UID = "1ff1a0f1-cee1-489b-adb4-710168e46623";
const NEXON_UID = "11111111-2222-4333-8444-555555555555";
const THAR_UID = "66666666-7777-4888-8999-000000000000";
await page.addInitScript(() => {
  window.Razorpay = function Razorpay(options) {
    return {
      on() {},
      open() {
        queueMicrotask(() => options.handler({
          razorpay_order_id: "order_browser_test",
          razorpay_payment_id: "pay_browser_test",
          razorpay_signature: "browser_test_signature"
        }));
      }
    };
  };
});
await page.route("**/api/payments/create-order", (route) => route.fulfill({
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    orderId: "order_browser_test",
    keyId: "rzp_test_browser",
    amount: 2709000,
    currency: "INR",
    receipt: "aha_browser_test"
  })
}));
await page.route("**/api/payments/verify", (route) => route.fulfill({
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({ status: "captured", orderId: "order_browser_test", paymentId: "pay_browser_test" })
}));
await page.route("**/api/compatibility/companies", (route) => route.fulfill({
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({ source: "NCV2", companies: [
    { uid: TATA_UID, name: "Tata" },
    { uid: MAHINDRA_UID, name: "Mahindra" }
  ] })
}));
await page.route("**/api/compatibility/models*", (route) => {
  const isTata = new URL(route.request().url()).searchParams.get("companyUid") === TATA_UID;
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ source: "NCV2", models: isTata
      ? [{ uid: NEXON_UID, name: "Nexon" }]
      : [{ uid: THAR_UID, name: "Thar" }] })
  });
});
await page.route("**/api/compatibility/options*", (route) => route.fulfill({
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({ source: "NCV2", fuelOptions: ["Petrol", "Diesel"], transmissionOptions: ["Manual", "Automatic"], years: [2024, 2023], hasFitment: true })
}));
await page.route("**/api/compatibility/check", (route) => route.fulfill({
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({ status: "compatible", compatible: true, message: "Listed in NCV2." })
}));

await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => !document.querySelector("[data-logo-intro]"));
await page.waitForTimeout(500);

assert.equal(await page.locator(".hero-product-film").count(), 1);
assert.match(await page.locator(".hero-product-film").getAttribute("poster"), /hero-poster/);
assert.equal(await page.locator(".hero-dial-control").count(), 0);
assert.equal(await page.locator(".hero-product-film").isVisible(), true);
// Layered cutout dial (independent ring + upright face) and dimensional pod.
assert.equal(await page.locator("[data-hero-ring]").count(), 1);
assert.match(await page.locator("[data-hero-ring]").getAttribute("src"), /dial-cut\.png/);
assert.match(await page.locator(".hero-product-pod").getAttribute("src"), /pod-cut\.png/);
assert.equal(await page.locator("[data-hero-pod-entry]").count(), 1);
assert.equal(await page.locator("[data-hero-pod]").count(), 1);
// Official favicon is the aha.store teal A-mark, not the old placeholder.
assert.match(await page.locator('link[rel="icon"]').getAttribute("href"), /\/brand\/aha-mark\.svg/);
const faviconSvg = await page.evaluate(async () => (await fetch("/brand/aha-mark.svg")).text());
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
assert.equal(await page.locator("#compatibility select").nth(0).inputValue(), MAHINDRA_UID);
assert.equal(await page.locator("#compatibility select").nth(1).inputValue(), THAR_UID);

// The car stage shows the selected model and updates when the model changes.
await page.waitForTimeout(400);
assert.match(await page.locator(".car-nameplate strong").textContent(), /Mahindra Thar/);
await page.screenshot({ path: "/tmp/aha-carstage-thar.png" });

await goTo(".compatibility-workspace");
await page.locator("#compatibility select").nth(0).selectOption({ label: "Tata" });
await page.locator("#compatibility select").nth(1).selectOption({ label: "Nexon" });
await page.locator("#compatibility select").nth(2).selectOption("Petrol");
await page.locator("#compatibility select").nth(3).selectOption("Manual");
await page.locator("#compatibility select").nth(4).selectOption("2024");
await page.getByRole("button", { name: /check live compatibility/i }).click();
await page.waitForFunction(() => document.querySelector(".compatibility-result")?.dataset.status !== "loading");
assert.match(await page.locator(".compatibility-result strong").textContent(), /Tata Nexon/);
assert.match(await page.locator(".car-nameplate strong").textContent(), /Tata Nexon/);
assert.match(await page.locator(".compatibility-server-status").textContent(), /NCV2/);
await page.locator(".compatibility-lower").screenshot({ path: "/tmp/aha-compatibility-server.png" });

// Basic and Smart: one shared box image, two sourced plan cards.
await goTo(".compare-shell");
assert.equal(await page.locator(".compare-card").count(), 2);
assert.equal(await page.locator(".compare-hero > img").count(), 1);
assert.equal(await page.locator(".compare-hero > img").getAttribute("src"), "/attached_assets/nexcruise-box.jpeg");
assert.equal(await page.locator(".compare-visual").count(), 0);
assert.equal(await page.locator(".smart-ring").count(), 0);
assert.ok((await page.locator(".compare-card.is-smart .compare-rows li.included").count()) >= 8);
await page.screenshot({ path: "/tmp/aha-compare-desktop.png" });
assert.equal(await page.getByRole("button", { name: /Choose Pro/ }).count(), 0);
await page.getByRole("button", { name: /Choose Smart/ }).click();
assert.equal(await page.getByRole("dialog", { name: /Buy NexCruise/ }).isVisible(), true);
assert.equal(await page.locator(".purchase-choice").count(), 2);
assert.match(await page.locator(".purchase-summary-head strong").textContent(), /NexCruise Smart/);
await page.getByRole("button", { name: /AHA-assisted technician install/ }).click();
await page.getByRole("button", { name: /Continue to billing/ }).click();
const purchaseDialog = page.getByRole("dialog");
await purchaseDialog.getByLabel("Full name").fill("Aaryan Kansal");
await purchaseDialog.getByLabel("Mobile number").fill("8306924400");
await purchaseDialog.getByLabel("Email address").fill("aaryan@example.com");
await purchaseDialog.getByLabel("Billing and delivery address").fill("Malviya Nagar, Jaipur");
await purchaseDialog.getByLabel("City").fill("Jaipur");
await purchaseDialog.getByLabel("State").fill("Rajasthan");
await purchaseDialog.getByLabel("PIN code").fill("302017");
await page.getByRole("button", { name: /Pay .* securely/ }).click();
await page.waitForFunction(() => document.querySelector(".purchase-complete"));
assert.match(await page.locator(".purchase-complete h3").textContent(), /Payment verified/);
await page.getByRole("button", { name: /Return to NexCruise/ }).click();

// Featured film panel: poster first, iframe only after the play click.
await goTo(".film-section");
assert.equal(await page.locator(".film-theatre").count(), 1);
assert.equal(await page.locator(".film-frame iframe").count(), 0);
await page.locator(".film-poster").click();
await page.waitForTimeout(600);
assert.match(await page.locator(".film-frame iframe").getAttribute("src"), /youtube-nocookie\.com\/embed\/S3WyAb5QAZg/);

// Reverse the pinned hero story: the pod must return instead of inheriting
// the entrance timeline's hidden state.
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(1800);
assert.equal(await page.locator("[data-hero-pod-entry]").evaluate((el) => getComputedStyle(el).visibility), "visible");
assert.ok(Number(await page.locator("[data-hero-pod-entry]").evaluate((el) => getComputedStyle(el).opacity)) > 0.95);

// Every installation step uses either real AHA footage or a real product cutout.
await goTo(".installation-stage");
for (let index = 0; index < 5; index += 1) {
  await page.locator(".step-nav button").nth(index).click();
  const src = await page.locator(".step-image img").getAttribute("src");
  assert.match(src, /^\/(installation|hero)\//);
  await page.waitForFunction(() => {
    const image = document.querySelector(".step-image img");
    return image?.complete && image.naturalWidth > 0;
  });
}
await page.locator(".installation-section").screenshot({ path: "/tmp/aha-installation-step-5.png" });

await goTo(".owner-controls");
const firstReview = await page.locator(".owner-quote blockquote").textContent();
await page.getByRole("button", { name: "Next owner review" }).click({ force: true });
await page.waitForFunction(
  (previous) => document.querySelector(".owner-quote blockquote")?.textContent !== previous,
  firstReview
);

// Request callback must open WhatsApp carrying the FULL lead: name, city,
// plan, phone, and the car checked earlier in the compatibility garage.
await goTo(".callback-form");
await page.locator("#callback input").nth(0).fill("Aaryan");
await page.locator("#callback input").nth(1).fill("8306924400");
await page.locator("#callback input").nth(2).fill("Jaipur");
// Capture the WhatsApp URL at window.open itself — no external navigation,
// so the check is deterministic offline.
await page.evaluate(() => {
  window.__waUrl = null;
  window.open = (url) => { window.__waUrl = url; return null; };
});
await page.getByRole("button", { name: /request callback/i }).click();
const waUrl = decodeURIComponent(await page.evaluate(() => window.__waUrl)).replace(/\+/g, " ");
assert.match(waUrl, /wa\.me\/918306924400\?text=/);
assert.match(waUrl, /Aaryan/);
assert.match(waUrl, /Jaipur/);
assert.match(waUrl, /Tata Nexon/);
assert.match(waUrl, /8306924400/);
await page.locator(".callback-status").waitFor();

const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
assert.equal(desktopOverflow, false);
await page.screenshot({ path: "/tmp/aha-aurora-desktop.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE_URL}/?viewport=mobile`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "/tmp/aha-hero-mobile.png" });
await page.getByRole("button", { name: "Menu" }).click();
await page.getByLabel("Primary navigation").getByRole("button", { name: "Buy NexCruise" }).click();
const mobileDialog = page.getByRole("dialog", { name: /Buy NexCruise/ });
assert.equal(await mobileDialog.isVisible(), true);
assert.equal(await mobileDialog.locator(".purchase-choice").count(), 2);
const mobileCheckoutOverflow = await mobileDialog.evaluate((element) => element.scrollWidth > element.clientWidth);
assert.equal(mobileCheckoutOverflow, false);
await page.screenshot({ path: "/tmp/aha-purchase-mobile.png" });
await mobileDialog.getByRole("button", { name: /Continue to billing/ }).click();
assert.equal(await mobileDialog.locator(".billing-form").isVisible(), true);
const mobileBillingOverflow = await mobileDialog.evaluate((element) => element.scrollWidth > element.clientWidth);
assert.equal(mobileBillingOverflow, false);
await page.getByRole("button", { name: "Close checkout" }).click();
await page.getByRole("button", { name: "Menu" }).click();
await page.getByLabel("Primary navigation").getByRole("link", { name: "Compatibility" }).click();
await page.waitForTimeout(1400);
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
assert.equal(mobileOverflow, false);
await page.screenshot({ path: "/tmp/aha-aurora-mobile.png", fullPage: true });

assert.deepEqual(pageErrors, []);
await browser.close();
console.log("Browser smoke test passed: pinned explorer, brand garage, forms, navigation, responsive overflow, and screenshots verified.");
