import streamlit as st

from data.vehicles import BRANDS, COMPATIBILITY_RULES


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
