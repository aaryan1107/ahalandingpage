export const WHATSAPP_NUMBER = "918306924400";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const DEFAULT_META_TEST_EVENT_CODE = "TEST40117";
export const GOOGLE_ADS_ID = "AW-18243205076";
export const GOOGLE_LEADS_CONVERSION_LABEL = "UYYRCM7u18AcENTvhPtD";
export const GOOGLE_LEADS_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_LEADS_CONVERSION_LABEL}`;
export const FIRST_PARTY_TRACKING_ENDPOINT =
  import.meta.env.VITE_AHA_TRACK_ENDPOINT || "https://ahadigitalmarketingpage.onrender.com/api/track/event";
export const FIRST_PARTY_TRACKING_KEY = import.meta.env.VITE_AHA_TRACK_KEY || "";

const FIRST_PARTY_EVENT_IDS = {
  BrandSelected: "web.insight_button_click",
  CheckCompatibilityClicked: "web.check_compatibility_click",
  RequestCallbackSubmitted: "web.callback_form_completion",
  WhatsAppClicked: "web.connect_with_aha_dost_click",
  CruiseSpeedGameLocked: "web.insight_button_click"
};

const FIRST_PARTY_PATH_TYPES = {
  BrandSelected: "website_widget",
  CheckCompatibilityClicked: "website_widget",
  RequestCallbackSubmitted: "website_callback",
  WhatsAppClicked: "website_callback",
  CruiseSpeedGameLocked: "website_widget"
};

function getSessionId() {
  if (typeof window === "undefined") return "";

  const key = "aha_sid";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;

  const generated = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(key, generated);
  return generated;
}

export function getAttributionContext() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  return {
    sessionId: getSessionId(),
    siteHost: window.location.hostname,
    pagePath: window.location.pathname,
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    campaignId: params.get("campaign_id") || params.get("utm_id") || undefined,
    campaignName: params.get("campaign_name") || undefined,
    swimlane: params.get("swimlane") || undefined
  };
}

function compactObject(object = {}) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
}

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

export function trackGoogle(eventName, data = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, compactObject(data));
  }
}

export function trackGoogleAdsLeadConversion(data = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", compactObject({
      send_to: GOOGLE_LEADS_SEND_TO,
      ...data
    }));
  }
}

export function trackFirstParty(eventId, data = {}) {
  if (typeof window === "undefined" || !FIRST_PARTY_TRACKING_ENDPOINT) return;

  const attributionContext = getAttributionContext();
  const payload = compactObject({
    eventId,
    ...attributionContext,
    pathType: data.pathType,
    stepId: data.stepId,
    contactNumber: data.contactNumber,
    properties: compactObject({
      site_host: attributionContext.siteHost,
      ...data.properties
    })
  });

  const headers = { "Content-Type": "application/json" };
  if (FIRST_PARTY_TRACKING_KEY) {
    headers["x-aha-track-key"] = FIRST_PARTY_TRACKING_KEY;
  }

  window.fetch(FIRST_PARTY_TRACKING_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {
    // Analytics should never block the website experience.
  });
}

export function trackFunnel(eventName, data = {}) {
  const funnelPayload = {
    source: "aha_automobiles_funnel",
    ...getAttributionContext(),
    ...data
  };

  trackCustom(eventName, funnelPayload);
  trackGoogle(eventName, funnelPayload);

  const firstPartyEventId = FIRST_PARTY_EVENT_IDS[eventName];
  if (firstPartyEventId) {
    trackFirstParty(firstPartyEventId, {
      pathType: FIRST_PARTY_PATH_TYPES[eventName],
      stepId: eventName,
      contactNumber: data.contactNumber,
      properties: {
        brand: data.brand,
        model: data.model,
        city: data.city,
        location: data.location,
        lead_source: data.lead_source,
        preferred_time: data.preferred_time,
        challenge: data.challenge,
        speed: data.speed,
        matched: data.matched,
        source_event: eventName
      }
    });
  }
}

export function trackWhatsApp(location) {
  trackFunnel("WhatsAppClicked", { location });
  trackMeta("Contact", { method: "whatsapp", location });
}

export function trackLead(eventName, data = {}) {
  trackMeta("Lead", data);
  trackFunnel(eventName, data);
  trackGoogleAdsLeadConversion({
    event_category: "lead",
    event_label: eventName,
    value: 1
  });
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

  Google Ads:
  Leads submit the conversion event AW-18243205076/UYYRCM7u18AcENTvhPtD.

  First-party dashboard:
  Set VITE_AHA_TRACK_ENDPOINT to the dashboard endpoint, for example
  https://dashboard.ahaautomotive.in/api/track/event, and set
  VITE_AHA_TRACK_KEY only if the dashboard uses TRACK_API_KEY. Do not hardcode
  private dashboard keys in source control.
*/
