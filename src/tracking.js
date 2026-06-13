export const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace with actual AHA Automobiles WhatsApp number.
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const DEFAULT_META_TEST_EVENT_CODE = "TEST40117";

export function getMetaTestEventCode() {
  if (typeof window === "undefined") return DEFAULT_META_TEST_EVENT_CODE;

  const params = new URLSearchParams(window.location.search);
  const urlTestCode = params.get("test_event_code");

  if (urlTestCode) {
    window.localStorage.setItem("meta_test_event_code", urlTestCode);
    return urlTestCode;
  }

  return window.localStorage.getItem("meta_test_event_code") || DEFAULT_META_TEST_EVENT_CODE;
}

export function withMetaTestEventCode(data = {}) {
  const testEventCode = getMetaTestEventCode();
  return testEventCode ? { test_event_code: testEventCode, ...data } : data;
}

export function trackMeta(eventName, data = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, withMetaTestEventCode(data));
  }
}

export function trackCustom(eventName, data = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, withMetaTestEventCode(data));
  }
}

export function trackFunnel(eventName, data = {}) {
  trackCustom(eventName, {
    source: "aha_automobiles_funnel",
    ...data
  });

  // Google Analytics placeholder:
  // if (window.gtag) window.gtag("event", eventName, data);
}

export function trackWhatsApp(location) {
  trackFunnel("WhatsAppClicked", { location });
  trackMeta("Contact", { method: "whatsapp", location });
}

export function trackLead(eventName, data = {}) {
  trackMeta("Lead", data);
  trackFunnel(eventName, data);
}

/*
  Retargeting logic:
  Meta Ads audiences can later be built from users who visit the website,
  click WhatsApp, submit callback forms, select a car brand, open FAQs,
  complete the mini game, or use compatibility tools.

  Meta Test Events:
  The current test_event_code is included in browser Pixel payloads so
  Events Manager can attribute PageView, Lead, Used_Tool, Contact, and
  custom funnel events to the active test session. Override the default by
  opening the site with ?test_event_code=YOUR_CODE.
*/
