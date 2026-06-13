import streamlit as st

from data.vehicles import BRANDS, COMPATIBILITY_RULES


def init_state():
    defaults = {
        "selected_brand": "Volvo",
        "selected_model": "EX30",
        "compatibility_checked": False,
        "compatibility_score": 0,
        "compatibility_status": "Awaiting scan",
        "assistant_messages": ["I am ready to review your selected vehicle profile."],
        "selected_use_case": "Daily commute",
        "selected_budget": "Rs 20k - 35k",
        "selected_region": "Delhi NCR",
        "game_started": False,
        "game_score": 0,
        "game_energy": 72,
        "game_route_choice": "Awaiting route",
        "game_feedback": "Start the simulation and choose a route strategy.",
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
        message = "Excellent fit detected. I recommend booking an installer slot and confirming variant year."
    elif score >= 60:
        status = "Needs Review"
        message = "This profile is workable, but install routing and module match should be reviewed."
    else:
        status = "Limited Fit"
        message = "Limited fit. Keep this as an assisted review rather than an instant booking."

    st.session_state.compatibility_checked = True
    st.session_state.compatibility_score = score
    st.session_state.compatibility_status = status
    st.session_state.assistant_messages = [message, brand["notes"]]


def reset_game():
    st.session_state.game_started = False
    st.session_state.game_score = 0
    st.session_state.game_energy = 72
    st.session_state.game_route_choice = "Awaiting route"
    st.session_state.game_feedback = "Start the simulation and choose a route strategy."


def update_game_score(route):
    if not st.session_state.game_started:
        st.session_state.game_started = True

    if route == "Eco Route":
        st.session_state.game_energy = min(100, st.session_state.game_energy + 10)
        st.session_state.game_score += 8
        st.session_state.game_feedback = "Stable and efficient. Battery recovery improved route confidence."
    elif route == "Fast Route":
        st.session_state.game_energy = max(0, st.session_state.game_energy - 15)
        st.session_state.game_score += 12
        st.session_state.game_feedback = "Fast sector complete. Efficiency dipped, but arrival time improved."
    else:
        st.session_state.game_energy = max(0, st.session_state.game_energy - 5)
        st.session_state.game_score += 18
        st.session_state.game_feedback = "Optimal AI-assisted decision. Best balance of speed and energy."

    st.session_state.game_route_choice = route
