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
  ProductExplored: "web.product_view",
  CheckCompatibilityClicked: "web.check_compatibility_click",
  CompatibilityToCallback: "web.connect_with_aha_dost_click",
  DeviceSelected: "web.device_selection_clicked",
  PlanSelected: "web.plan_section_clicked",
  ControllerSelected: "web.dial_selection_clicked",
  InstallationSelected: "web.installation_type_clicked",
  BillingDetailsSubmitted: "web.billing_details_clicked",
  PurchaseHandedOffToAhaTeam: "web.purchase_wizard_completion_bank",
  PurchaseCompletedRazorpay: "web.purchase_wizard_completion_razorpay",
  RequestCallbackSubmitted: "web.callback_form_completion",
  WhatsAppClicked: "web.connect_with_aha_dost_click",
  FAQOpened: "web.insight_button_click",
  AhaDostRequested: "web.connect_with_aha_dost_click",
  MiniGameCompleted: "web.insight_button_click",
  InstallCallbackClicked: "web.connect_with_aha_dost_click",
  CruiseSpeedGameLocked: "web.insight_button_click"
};

const FIRST_PARTY_PATH_TYPES = {
  BrandSelected: "website_widget",
  ProductExplored: "website_widget",
  CheckCompatibilityClicked: "website_widget",
  CompatibilityToCallback: "website_callback",
  DeviceSelected: "website_widget",
  PlanSelected: "website_widget",
  ControllerSelected: "website_widget",
  InstallationSelected: "website_widget",
  BillingDetailsSubmitted: "website_widget",
  PurchaseHandedOffToAhaTeam: "website_widget",
  PurchaseCompletedRazorpay: "website_widget",
  RequestCallbackSubmitted: "website_callback",
  WhatsAppClicked: "website_callback",
  FAQOpened: "website_callback",
  AhaDostRequested: "website_callback",
  MiniGameCompleted: "website_widget",
  InstallCallbackClicked: "website_callback",
  CruiseSpeedGameLocked: "website_widget"
};

const ATTRIBUTION_KEY = "aha_attribution";
const META_REQUIRED_UTMS = ["utmSource", "utmMedium", "utmCampaign"];
let pageSessionTracked = false;

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
  const now = new Date().toISOString();
  const current = compactObject({
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    utmId: params.get("utm_id") || undefined,
    campaignId: params.get("campaign_id") || params.get("utm_id") || undefined,
    campaignName: params.get("campaign_name") || undefined,
    adsetId: params.get("adset_id") || undefined,
    adsetName: params.get("adset_name") || undefined,
    adId: params.get("ad_id") || undefined,
    adName: params.get("ad_name") || undefined,
    fbclid: params.get("fbclid") || undefined,
    gclid: params.get("gclid") || undefined,
    swimlane: params.get("swimlane") || undefined,
    landingPage: window.location.href,
    referrer: document.referrer || undefined,
    firstSeenAt: now
  });
  const stored = readStoredAttribution();
  const hasFreshAttribution = Boolean(
    current.utmSource ||
    current.utmMedium ||
    current.utmCampaign ||
    current.campaignId ||
    current.campaignName ||
    current.fbclid ||
    current.gclid
  );

  const attribution = hasFreshAttribution
    ? compactObject({
      ...stored,
      ...current,
      firstSeenAt: stored.firstSeenAt || current.firstSeenAt,
      landingPage: stored.landingPage || current.landingPage,
      referrer: stored.referrer || current.referrer
    })
    : stored;

  if (hasFreshAttribution) writeStoredAttribution(attribution);

  const missingUtmFields = META_REQUIRED_UTMS.filter((field) => !attribution[field]);

  return compactObject({
    sessionId: getSessionId(),
    siteHost: window.location.hostname,
    pagePath: window.location.pathname,
    pageUrl: window.location.href,
    ...attribution,
    utmPresent: missingUtmFields.length === 0,
    missingUtmFields: missingUtmFields.length ? missingUtmFields.join(",") : undefined
  });
}

function compactObject(object = {}) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
}

function readStoredAttribution() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function writeStoredAttribution(attribution) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Storage can be blocked in private contexts; tracking should still continue.
  }
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
      landing_page: attributionContext.landingPage,
      page_url: attributionContext.pageUrl,
      referrer: attributionContext.referrer,
      utm_present: attributionContext.utmPresent,
      missing_utm_fields: attributionContext.missingUtmFields,
      utm_term: attributionContext.utmTerm,
      utm_id: attributionContext.utmId,
      adset_id: attributionContext.adsetId,
      adset_name: attributionContext.adsetName,
      ad_id: attributionContext.adId,
      ad_name: attributionContext.adName,
      fbclid: attributionContext.fbclid,
      gclid: attributionContext.gclid,
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
  }).then((res) => {
    // Surface rejected events (e.g. 401 key mismatch, 400 unknown eventId) instead
    // of failing silently — a silent drop looks identical to "no data collected".
    if (!res.ok) {
      res.text()
        .catch(() => "")
        .then((detail) => {
          console.warn(
            `[aha-track] event "${eventId}" rejected: ${res.status} ${res.statusText} ` +
              `from ${FIRST_PARTY_TRACKING_ENDPOINT}` +
              (detail ? ` — ${detail.slice(0, 200)}` : "")
          );
        });
    }
  }).catch((err) => {
    // Network/CORS failure (endpoint unreachable, blocked, cold-start drop).
    // Analytics should never block the website experience — just log it.
    console.warn(
      `[aha-track] event "${eventId}" failed to send to ${FIRST_PARTY_TRACKING_ENDPOINT}:`,
      err?.message || err
    );
  });
}

export function trackPageSession() {
  if (pageSessionTracked || typeof window === "undefined") return;
  pageSessionTracked = true;

  const attributionContext = getAttributionContext();
  trackFirstParty("web.session", {
    pathType: "website_widget",
    stepId: "LandingPageViewed",
    properties: {
      source_event: "LandingPageViewed",
      page_title: document.title,
      user_agent: navigator.userAgent
    }
  });
  trackCustom("LandingPageViewed", {
    source: "aha_automobiles_funnel",
    ...attributionContext
  });
  trackGoogle("LandingPageViewed", {
    source: "aha_automobiles_funnel",
    ...attributionContext
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
        model_uid: data.modelUid,
        compatibility_status: data.compatibility_status,
        plan: data.plan,
        controller: data.controller,
        installation: data.installation,
        amount: data.amount,
        name: data.name,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        state: data.state,
        pincode: data.pincode,
        order_id: data.order_id,
        payment_id: data.payment_id,
        city: data.city,
        location: data.location,
        lead_source: data.lead_source,
        preferred_time: data.preferred_time,
        challenge: data.challenge,
        speed: data.speed,
        matched: data.matched,
        fuel: data.fuel,
        transmission: data.transmission,
        year: data.year,
        order_total: data.orderTotal,
        checkout_status: data.checkout_status,
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
  Set VITE_AHA_TRACK_ENDPOINT to the live dashboard endpoint
  https://ahadigitalmarketingpage.onrender.com/api/track/event, and set
  VITE_AHA_TRACK_KEY only if the dashboard uses TRACK_API_KEY. Do not hardcode
  private dashboard keys in source control.
*/
