import uuid

import streamlit as st

from data.vehicles import BRANDS, COMPATIBILITY_RULES
from utils.tracking import track_event


SOURCE_PROFILES = {
    "instagram": {
        "label": "Instagram",
        "headline": "Saw NexCruise on Instagram? Check your car before you DM.",
        "subcopy": "Pick your brand, verify the model, and move straight to WhatsApp or callback with the source already tagged.",
        "cta": "Instagram lead path",
        "use_case": "Cruise comfort",
    },
    "facebook": {
        "label": "Facebook",
        "headline": "From Meta ad to AHA fitment check.",
        "subcopy": "This page adapts to your campaign source so AHA can retarget visitors who select brands, scan compatibility, or request callbacks.",
        "cta": "Meta campaign visitor",
        "use_case": "Family safety",
    },
    "meta": {
        "label": "Meta Ads",
        "headline": "From Meta ad to AHA fitment check.",
        "subcopy": "This page adapts to your campaign source so AHA can retarget visitors who select brands, scan compatibility, or request callbacks.",
        "cta": "Meta campaign visitor",
        "use_case": "Family safety",
    },
    "whatsapp": {
        "label": "WhatsApp",
        "headline": "Shared on WhatsApp? Confirm compatibility in one scan.",
        "subcopy": "The funnel keeps WhatsApp attribution attached while you select brand, model, city, and callback timing.",
        "cta": "WhatsApp referral",
        "use_case": "Highway touring",
    },
    "google": {
        "label": "Google",
        "headline": "Searching for cruise control upgrades? Start with fitment.",
        "subcopy": "AHA checks model, coupler route, OBD access, city support, and the right NexCruise variant.",
        "cta": "Search visitor",
        "use_case": "Highway touring",
    },
    "direct": {
        "label": "Direct",
        "headline": "Your next highway drive. No leg pain. No fatigue stops.",
        "subcopy": "Plug-and-play cruise control, Eco/Sport/City drive modes, and speed governor support for compatible Indian cars.",
        "cta": "Direct visitor",
        "use_case": "Highway touring",
    },
}


def _first_query_value(params, key, default=""):
    value = params.get(key, default)
    if isinstance(value, list):
        return value[0] if value else default
    return value or default


def _normalize(value):
    return str(value or "").strip().lower().replace(" ", "_")


def init_state():
    defaults = {
        "selected_brand": "Tata",
        "selected_model": "Nexon",
        "compatibility_checked": False,
        "compatibility_score": 0,
        "compatibility_status": "Awaiting scan",
        "assistant_messages": ["Select a brand and run the NexCruise compatibility scan."],
        "selected_use_case": "Highway touring",
        "selected_budget": "Smart Rs 27,490+",
        "selected_region": "Delhi NCR",
        "game_started": False,
        "game_score": 0,
        "game_energy": 72,
        "game_route_choice": "Awaiting cruise lock",
        "game_feedback": "Start NexCruise and stop inside the AHA zone.",
        "lead_name": "",
        "lead_phone": "",
    }
    for key, value in defaults.items():
        st.session_state.setdefault(key, value)
    st.session_state.setdefault("session_id", f"aha-{uuid.uuid4()}")

    apply_utm_context()


def apply_utm_context():
    params = st.query_params
    source = _normalize(_first_query_value(params, "utm_source", "direct"))
    source_key = source if source in SOURCE_PROFILES else "direct"
    profile = SOURCE_PROFILES[source_key]
    campaign = _first_query_value(params, "utm_campaign", "")
    medium = _first_query_value(params, "utm_medium", "")
    content = _first_query_value(params, "utm_content", "")
    term = _first_query_value(params, "utm_term", "")

    st.session_state.utm_context = {
        "source": source_key,
        "source_label": profile["label"],
        "campaign": campaign,
        "medium": medium,
        "content": content,
        "term": term,
        "headline": profile["headline"],
        "subcopy": profile["subcopy"],
        "cta": profile["cta"],
    }

    brand_from_url = _first_query_value(params, "brand", "")
    if brand_from_url:
        brand_lookup = {name.lower().replace(" ", "_"): name for name in BRANDS}
        normalized_brand = _normalize(brand_from_url)
        matched_brand = brand_lookup.get(normalized_brand)
        if matched_brand and st.session_state.selected_brand != matched_brand:
            st.session_state.selected_brand = matched_brand
            st.session_state.selected_model = BRANDS[matched_brand]["models"][0]
            reset_compatibility()
            track_event(
                "BrandSelected",
                data={
                    "brand": matched_brand,
                    "model": st.session_state.selected_model,
                    "selection_source": "query_param",
                },
            )

    model_from_url = _first_query_value(params, "model", "")
    if model_from_url:
        current_models = BRANDS[st.session_state.selected_brand]["models"]
        model_lookup = {model.lower().replace(" ", "_"): model for model in current_models}
        matched_model = model_lookup.get(_normalize(model_from_url))
        if matched_model:
            st.session_state.selected_model = matched_model

    if not st.session_state.get("utm_use_case_applied"):
        st.session_state.selected_use_case = profile["use_case"]
        st.session_state.utm_use_case_applied = True


def reset_compatibility():
    st.session_state.compatibility_checked = False
    st.session_state.compatibility_score = 0
    st.session_state.compatibility_status = "Awaiting scan"
    st.session_state.assistant_messages = ["Selection changed. Run a fresh compatibility scan."]


def run_compatibility_check():
    brand = BRANDS[st.session_state.selected_brand]
    score = brand["base_score"]
    score += COMPATIBILITY_RULES.get(st.session_state.selected_use_case, 0)
    score += COMPATIBILITY_RULES.get(st.session_state.selected_region, 0)
    if st.session_state.selected_budget == "Under Rs 20k":
        score -= 8
    elif st.session_state.selected_budget == "Premium no-limit":
        score += 3
    score = max(42, min(98, score))

    if score >= 85:
        status = "Excellent Fit"
        message = "Excellent NexCruise fit signal. Book a callback to confirm variant year, fuel type, and installer slot."
    elif score >= 60:
        status = "Needs Review"
        message = "This profile looks workable, but AHA should review coupler routing and module match before installation."
    else:
        status = "Limited Fit"
        message = "Limited fit signal. Keep this as a manual AHA review instead of instant booking."

    st.session_state.compatibility_checked = True
    st.session_state.compatibility_score = score
    st.session_state.compatibility_status = status
    st.session_state.assistant_messages = [message, brand["notes"]]


def reset_game():
    st.session_state.game_started = False
    st.session_state.game_score = 0
    st.session_state.game_energy = 72
    st.session_state.game_route_choice = "Awaiting cruise lock"
    st.session_state.game_feedback = "Start NexCruise and stop inside the AHA zone."


def update_game_score(route):
    if not st.session_state.game_started:
        st.session_state.game_started = True

    if route == "Eco Mode":
        st.session_state.game_energy = min(100, st.session_state.game_energy + 10)
        st.session_state.game_score += 8
        st.session_state.game_feedback = "Eco mode held the route cleanly. Comfort and efficiency improved."
    elif route == "Sport Mode":
        st.session_state.game_energy = max(0, st.session_state.game_energy - 15)
        st.session_state.game_score += 12
        st.session_state.game_feedback = "Sport mode responded sharply. Great control, but energy dipped."
    else:
        st.session_state.game_energy = max(0, st.session_state.game_energy - 5)
        st.session_state.game_score += 18
        st.session_state.game_feedback = "Perfect AHA moment. Cruise locked into the comfort zone."

    st.session_state.game_route_choice = route
