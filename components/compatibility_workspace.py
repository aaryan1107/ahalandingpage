import streamlit as st

from components.assistant_panel import render_assistant_panel
from components.insight_cards import render_reason_card, render_recommendation_chip, render_score_ring
from components.vehicle_showcase import render_vehicle_showcase
from data.vehicles import BRANDS, BUDGET_BANDS, FAQS, PRODUCT_FEATURES, REGIONS, USE_CASES
from utils.state import reset_compatibility, run_compatibility_check


def render_compatibility_workspace():
    brand_data = BRANDS[st.session_state.selected_brand]
    score = st.session_state.compatibility_score or brand_data["base_score"]
    status = st.session_state.compatibility_status

    st.markdown(
        """
        <div id="compatibility" class="aha-section-title">
          <div class="aha-kicker">Compatibility workspace</div>
          <h2>Check if your car can get the AHA drive.</h2>
          <p>Model selection, installer confidence, drive-mode fitment, and callback readiness in one funnel workspace.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

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

        st.markdown('<div class="aha-control-label">Primary use</div>', unsafe_allow_html=True)
        st.session_state.selected_use_case = st.selectbox("Use case", USE_CASES, label_visibility="collapsed")
        st.markdown('<div class="aha-control-label">Variant interest</div>', unsafe_allow_html=True)
        st.session_state.selected_budget = st.selectbox("Variant", BUDGET_BANDS, label_visibility="collapsed")
        st.markdown('<div class="aha-control-label">City / region</div>', unsafe_allow_html=True)
        st.session_state.selected_region = st.selectbox("Region", REGIONS, label_visibility="collapsed")

        if st.button("Run NexCruise scan", key="run_scan"):
            run_compatibility_check()
        st.markdown("</div>", unsafe_allow_html=True)

    with center:
        st.markdown('<div class="aha-compat-center">', unsafe_allow_html=True)
        render_vehicle_showcase(st.session_state.selected_brand, brand_data, st.session_state.selected_model)
        status_tone = "positive" if score >= 85 else "warning" if score >= 60 else "negative"
        st.markdown(f"<h3>{status}</h3><p>{brand_data['notes']}</p>", unsafe_allow_html=True)
        c1, c2 = st.columns([0.42, 0.58])
        with c1:
            render_score_ring(score, "AHA fit score")
        with c2:
            st.markdown('<div class="aha-reason-grid">', unsafe_allow_html=True)
            render_reason_card("Pedal coupler", "Accelerator coupler compatibility and clean routing reviewed.", status_tone)
            render_reason_card("Cruise behaviour", "Brake override, resume, and highway use case considered.", "info")
            render_reason_card("Install complexity", "OBD access and steering dial placement estimated.", status_tone)
            render_reason_card("Region support", f"{st.session_state.selected_region} installer path checked.", "positive")
            st.markdown("</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

    with right:
        render_assistant_panel(brand_data, st.session_state.selected_model)
        st.markdown("<div style='height:12px'></div>", unsafe_allow_html=True)
        for chip in brand_data["recommendations"]:
            render_recommendation_chip(chip)

    st.markdown(
        """
        <div class="aha-section-title">
          <div class="aha-kicker">NexCruise feature stack</div>
          <h2>What changes after the upgrade.</h2>
        </div>
        """,
        unsafe_allow_html=True,
    )
    feature_cols = st.columns(3)
    for index, (title, body) in enumerate(PRODUCT_FEATURES):
        with feature_cols[index % 3]:
            st.markdown(
                f"""
                <div class="aha-feature-card">
                  <span>{index + 1:02d}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
                """,
                unsafe_allow_html=True,
            )

    st.markdown(
        """
        <div class="aha-section-title">
          <div class="aha-kicker">FAQ</div>
          <h2>Questions drivers ask before they upgrade.</h2>
        </div>
        """,
        unsafe_allow_html=True,
    )
    for question, answer in FAQS:
        with st.expander(question):
            st.write(answer)
