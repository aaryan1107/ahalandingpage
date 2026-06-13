import streamlit as st

from components.assistant_panel import render_assistant_panel
from components.insight_cards import render_reason_card, render_recommendation_chip, render_score_ring
from components.vehicle_showcase import render_vehicle_showcase
from data.vehicles import BRANDS, BUDGET_BANDS, REGIONS, USE_CASES
from utils.state import reset_compatibility, run_compatibility_check


def render_compatibility_workspace():
    brand_data = BRANDS[st.session_state.selected_brand]
    score = st.session_state.compatibility_score or brand_data["base_score"]
    status = st.session_state.compatibility_status

    st.markdown(
        """
        <div id="compatibility" class="aha-section-title">
          <div class="aha-kicker">Compatibility workspace</div>
          <h2>AI-powered vehicle fit analysis</h2>
          <p>A premium workspace for model selection, fit confidence, assistant review, and next-step recommendations.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.markdown('<div class="aha-compat-shell">', unsafe_allow_html=True)
    left, center, right = st.columns([0.8, 1.25, 1])

    with left:
        st.markdown('<div class="aha-compat-left">', unsafe_allow_html=True)
        st.markdown('<div class="aha-control-label">Selected model</div>', unsafe_allow_html=True)
        model = st.selectbox(
            "Model",
            brand_data["models"],
            index=brand_data["models"].index(st.session_state.selected_model)
            if st.session_state.selected_model in brand_data["models"]
            else 0,
            label_visibility="collapsed",
        )
        if model != st.session_state.selected_model:
            st.session_state.selected_model = model
            reset_compatibility()

        st.markdown('<div class="aha-control-label">Use case</div>', unsafe_allow_html=True)
        st.session_state.selected_use_case = st.selectbox("Use case", USE_CASES, label_visibility="collapsed")
        st.markdown('<div class="aha-control-label">Budget</div>', unsafe_allow_html=True)
        st.session_state.selected_budget = st.selectbox("Budget", BUDGET_BANDS, label_visibility="collapsed")
        st.markdown('<div class="aha-control-label">Region</div>', unsafe_allow_html=True)
        st.session_state.selected_region = st.selectbox("Region", REGIONS, label_visibility="collapsed")

        if st.button("Run compatibility scan", key="run_scan"):
            run_compatibility_check()
        st.markdown("</div>", unsafe_allow_html=True)

    with center:
        st.markdown('<div class="aha-compat-center">', unsafe_allow_html=True)
        render_vehicle_showcase(brand_data, st.session_state.selected_model)
        status_tone = "positive" if score >= 85 else "warning" if score >= 60 else "negative"
        st.markdown(f"<h3>{status}</h3><p>{brand_data['notes']}</p>", unsafe_allow_html=True)
        c1, c2 = st.columns([0.42, 0.58])
        with c1:
            render_score_ring(score, "Compatibility score")
        with c2:
            st.markdown('<div class="aha-reason-grid">', unsafe_allow_html=True)
            render_reason_card("Vehicle electronics", "Module handshake and accessory routing reviewed.", status_tone)
            render_reason_card("Charging profile", "Daily route and charge behaviour considered.", "info")
            render_reason_card("Install complexity", "Dashboard access and steering dial placement estimated.", status_tone)
            render_reason_card("Region support", f"{st.session_state.selected_region} installer path checked.", "positive")
            st.markdown("</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

    with right:
        render_assistant_panel(brand_data, st.session_state.selected_model)
        st.markdown("<div style='height:12px'></div>", unsafe_allow_html=True)
        for chip in brand_data["recommendations"]:
            render_recommendation_chip(chip)

    st.markdown("</div>", unsafe_allow_html=True)
