export const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace with actual AHA Automobiles WhatsApp number.
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export function trackMeta(eventName, data = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, data);
  }
}

export function trackCustom(eventName, data = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, data);
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
*/
