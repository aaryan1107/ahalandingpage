import json
import os
import urllib.error
import urllib.request

import streamlit as st

from data.vehicles import BRANDS


def _post_lead_to_dashboard(payload):
    api_base = os.environ.get("AHA_DASHBOARD_API_URL", "http://127.0.0.1:3200").rstrip("/")
    headers = {"Content-Type": "application/json"}
    ingest_key = os.environ.get("AHA_DASHBOARD_LEAD_KEY", "").strip()
    if ingest_key:
        headers["x-aha-lead-key"] = ingest_key

    request = urllib.request.Request(
        f"{api_base}/api/leads/website",
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=6) as response:
        body = response.read().decode("utf-8")
        return json.loads(body) if body else {"ok": True}


def render_lead_capture():
    selected_brand = st.session_state.selected_brand
    selected_model = st.session_state.selected_model
    utm = st.session_state.get("utm_context", {})
    source_label = utm.get("source_label", "Direct")
    campaign = utm.get("campaign") or "not provided"
    medium = utm.get("medium") or "not provided"
    st.markdown(
        f"""
        <section class="aha-lead-panel">
          <div class="aha-kicker">Request callback</div>
          <h2>Confirm NexCruise fitment for your {selected_model}.</h2>
          <p style="color:rgba(255,255,255,.68)">Share contact details and AHA can verify variant year, transmission, installer route, and the right Basic or Smart variant.</p>
          <div class="aha-utm-note">Attribution: {source_label} / {campaign} / {medium}</div>
          <div class="aha-retarget-note">Meta Pixel events to map here: Lead, Used_Tool, BrandSelected, CompatibilityFormSubmitted, RequestCallbackSubmitted, WhatsAppClicked.</div>
        </section>
        """,
        unsafe_allow_html=True,
    )
    with st.container():
        col1, col2, col3 = st.columns(3)
        with col1:
            st.session_state.lead_name = st.text_input("Full name", value=st.session_state.lead_name)
        with col2:
            st.session_state.lead_phone = st.text_input("Phone number", value=st.session_state.lead_phone)
        with col3:
            preferred = st.selectbox("Car brand", list(BRANDS.keys()), index=list(BRANDS.keys()).index(selected_brand))
        col4, col5, col6 = st.columns(3)
        with col4:
            model = st.selectbox("Car model", BRANDS[preferred]["models"], index=0)
        with col5:
            city = st.text_input("City", value=st.session_state.selected_region if st.session_state.selected_region != "Other city" else "")
        with col6:
            contact_time = st.selectbox("Preferred contact time", ["Anytime", "Morning", "Afternoon", "Evening"])
        message = st.text_area(
            "Requirement",
            value=(
                f"I want to check NexCruise compatibility for my {preferred} {model}. "
                f"UTM source: {source_label}; campaign: {campaign}; medium: {medium}."
            ),
        )

        if st.button("Request premium callback", key="lead_submit"):
            payload = {
                "fullName": st.session_state.lead_name,
                "phone": st.session_state.lead_phone,
                "carBrand": preferred,
                "carModel": model,
                "city": city,
                "preferredContactTime": contact_time,
                "message": message,
                "sourceLabel": source_label,
                "utmSource": utm.get("source", "direct"),
                "utmMedium": utm.get("medium", ""),
                "utmCampaign": utm.get("campaign", ""),
                "utmContent": utm.get("content", ""),
                "utmTerm": utm.get("term", ""),
                "sessionId": st.session_state.session_id,
                "useCase": st.session_state.selected_use_case,
                "budget": st.session_state.selected_budget,
                "compatibilityStatus": st.session_state.compatibility_status,
                "compatibilityScore": st.session_state.compatibility_score,
                "swimlane": "B",
            }
            if not payload["phone"]:
                st.error("Add a phone number so the dashboard can save this lead.")
            else:
                try:
                    result = _post_lead_to_dashboard(payload)
                    lead = result.get("lead", {}) if isinstance(result, dict) else {}
                    lead_id = lead.get("id", "synced")
                    st.success(f"Lead synced to dashboard for {preferred} {model}. Lead ID: {lead_id}.")
                    st.caption("Dashboard: open digital_marketing-master Leads page and use the 90d range to see this website lead.")
                except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
                    st.warning(f"Lead captured locally for {preferred} {model}, but dashboard sync is pending.")
                    st.caption(f"Start the dashboard API with npm run dev in digital_marketing-master, then submit again. Detail: {exc}")
        st.markdown('<a class="aha-primary-btn" href="https://wa.me/91XXXXXXXXXX" target="_blank">Continue on WhatsApp</a>', unsafe_allow_html=True)
