import json
import os

import streamlit as st
import streamlit.components.v1 as components


META_PIXEL_ID = "2687561291629470"
META_TEST_EVENT_CODE = "TEST40117"
GOOGLE_ADS_ID = "AW-18243205076"
GOOGLE_LEADS_SEND_TO = "AW-18243205076/UYYRCM7u18AcENTvhPtD"

FIRST_PARTY_EVENT_IDS = {
    "BrandSelected": "web.insight_button_click",
    "CheckCompatibilityClicked": "web.check_compatibility_click",
    "RequestCallbackSubmitted": "web.callback_form_completion",
}

FIRST_PARTY_PATH_TYPES = {
    "BrandSelected": "website_widget",
    "CheckCompatibilityClicked": "website_widget",
    "RequestCallbackSubmitted": "website_callback",
}


def _json_for_script(payload):
    return json.dumps(payload, separators=(",", ":")).replace("</", "<\\/")


def _query_value(key, default=""):
    value = st.query_params.get(key, default)
    if isinstance(value, list):
        return value[0] if value else default
    return value or default


def _attribution_context():
    utm = st.session_state.get("utm_context", {})
    return {
        "sessionId": st.session_state.get("session_id", ""),
        "pagePath": "/streamlit",
        "utmSource": utm.get("source") or _query_value("utm_source", "direct"),
        "utmMedium": utm.get("medium") or _query_value("utm_medium"),
        "utmCampaign": utm.get("campaign") or _query_value("utm_campaign"),
        "utmContent": utm.get("content") or _query_value("utm_content"),
        "utmTerm": utm.get("term") or _query_value("utm_term"),
        "campaignId": _query_value("campaign_id") or _query_value("utm_id"),
        "campaignName": _query_value("campaign_name"),
        "swimlane": _query_value("swimlane"),
    }


def _tracker_endpoint():
    explicit = os.environ.get("AHA_TRACK_ENDPOINT", "").strip()
    if explicit:
        return explicit

    api_base = os.environ.get("AHA_DASHBOARD_API_URL", "").strip().rstrip("/")
    if api_base:
        return f"{api_base}/api/track/event"

    return "https://dashboard.ahaautomotive.in/api/track/event"


def inject_tracking_tags():
    test_code = _query_value("test_event_code", META_TEST_EVENT_CODE)
    payload = {
        "pixelId": META_PIXEL_ID,
        "testEventCode": test_code,
        "googleAdsId": GOOGLE_ADS_ID,
    }
    components.html(
        f"""
        <script>
          const config = {_json_for_script(payload)};
          if (!window.__ahaTrackingBooted) {{
            window.__ahaTrackingBooted = true;
            !function(f,b,e,v,n,t,s)
            {{if(f.fbq)return;n=f.fbq=function(){{n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)}};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', config.pixelId);
            fbq('track', 'PageView', {{ test_event_code: config.testEventCode, surface: 'streamlit_ui' }});

            const gtagScript = document.createElement('script');
            gtagScript.async = true;
            gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${{config.googleAdsId}}`;
            document.head.appendChild(gtagScript);
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){{dataLayer.push(arguments);}};
            gtag('js', new Date());
            gtag('config', config.googleAdsId);
          }}
        </script>
        """,
        height=0,
    )


def track_event(event_name, *, data=None, is_lead=False, contact_number=""):
    data = data or {}
    attribution = _attribution_context()
    test_code = _query_value("test_event_code", META_TEST_EVENT_CODE)
    first_party_event_id = FIRST_PARTY_EVENT_IDS.get(event_name)
    first_party_payload = None

    if first_party_event_id:
        first_party_payload = {
            **attribution,
            "eventId": first_party_event_id,
            "pathType": FIRST_PARTY_PATH_TYPES.get(event_name),
            "stepId": event_name,
            "contactNumber": contact_number or None,
            "properties": {
                "surface": "streamlit_ui",
                "source_event": event_name,
                **data,
            },
        }

    payload = {
        "pixelId": META_PIXEL_ID,
        "googleAdsId": GOOGLE_ADS_ID,
        "eventName": event_name,
        "metaEventData": {
            "source": "aha_streamlit_funnel",
            "test_event_code": test_code,
            **attribution,
            **data,
        },
        "isLead": is_lead,
        "googleLeadsSendTo": GOOGLE_LEADS_SEND_TO,
        "firstPartyEndpoint": _tracker_endpoint(),
        "firstPartyKey": os.environ.get("AHA_TRACK_KEY", os.environ.get("TRACK_API_KEY", "")).strip(),
        "firstPartyPayload": first_party_payload,
    }

    components.html(
        f"""
        <script>
          const payload = {_json_for_script(payload)};
          !function(f,b,e,v,n,t,s)
          {{if(f.fbq)return;n=f.fbq=function(){{n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)}};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', payload.pixelId);

          const gtagScript = document.createElement('script');
          gtagScript.async = true;
          gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${{payload.googleAdsId}}`;
          document.head.appendChild(gtagScript);
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){{dataLayer.push(arguments);}};
          gtag('js', new Date());
          gtag('config', payload.googleAdsId);

          if (typeof fbq === 'function') {{
            fbq('trackCustom', payload.eventName, payload.metaEventData);
            if (payload.isLead) fbq('track', 'Lead', payload.metaEventData);
          }}
          if (typeof gtag === 'function') {{
            gtag('event', payload.eventName, payload.metaEventData);
            if (payload.isLead) {{
              gtag('event', 'conversion', {{
                send_to: payload.googleLeadsSendTo,
                event_category: 'lead',
                event_label: payload.eventName,
                value: 1
              }});
            }}
          }}
          if (payload.firstPartyPayload && payload.firstPartyEndpoint) {{
            const headers = {{ 'Content-Type': 'application/json' }};
            if (payload.firstPartyKey) headers['x-aha-track-key'] = payload.firstPartyKey;
            fetch(payload.firstPartyEndpoint, {{
              method: 'POST',
              headers,
              body: JSON.stringify(payload.firstPartyPayload),
              keepalive: true
            }}).catch(() => {{}});
          }}
        </script>
        """,
        height=0,
    )
