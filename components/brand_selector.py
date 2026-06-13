import streamlit as st

from data.vehicles import BRANDS
from utils.state import reset_compatibility


def render_brand_selector():
    st.markdown(
        """
        <div class="aha-section-title">
          <div class="aha-kicker">Brand-specific experience</div>
          <h2>Select your vehicle family</h2>
          <p>The active brand changes model choices, accent tone, assistant copy, and compatibility scoring.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    cols = st.columns(4)
    for index, (name, data) in enumerate(BRANDS.items()):
        active = name == st.session_state.selected_brand
        with cols[index % 4]:
            st.markdown(
                f"""
                <div class="aha-brand-card {'aha-brand-card-active' if active else ''}" style="--brand-accent:{data['accent']}">
                  <div class="aha-brand-mark" style="background:{data['accent']}">{name[:2].upper()}</div>
                  <strong>{name}</strong>
                  <p style="font-size:12px;margin:6px 0">{data['tone']}</p>
                  <span class="aha-chip">{data['metrics']['confidence']} confidence</span>
                </div>
                """,
                unsafe_allow_html=True,
            )
            if st.button(f"Use {name}", key=f"brand_{name}"):
                st.session_state.selected_brand = name
                st.session_state.selected_model = data["models"][0]
                reset_compatibility()
